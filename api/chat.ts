import {
  AssistantRequestError,
  createAssistantReply,
  normaliseMessages,
} from '../server/assistant.js'
import type { IncomingMessage, ServerResponse } from 'node:http'

type ChatRequest = Pick<IncomingMessage, 'method' | 'headers' | 'socket'> & { body?: unknown }
type ChatResponse = ServerResponse & {
  status(code: number): ChatResponse
  json(body: { reply: string } | { error: string }): void
}

const requests = new Map<string, { count: number; resetAt: number }>()

function allowRequest(ip: string) {
  const now = Date.now()
  for (const [key, value] of requests) {
    if (value.resetAt <= now) requests.delete(key)
  }
  const current = requests.get(ip)

  if (!current || current.resetAt < now) {
    // Best-effort, per-instance limiting; cap retained entries on warm instances.
    if (requests.size >= 10_000) return false
    requests.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }

  if (current.count >= 10) return false
  current.count += 1
  return true
}

export default async function handler(req: ChatRequest, res: ChatResponse) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Allow', 'POST, OPTIONS')
  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const ip = String(req.headers['x-forwarded-for'] ?? req.socket?.remoteAddress ?? 'unknown')
    .split(',')[0]
    .trim()

  if (!allowRequest(ip)) {
    res.setHeader('Retry-After', '60')
    res.status(429).json({ error: 'Too many requests. Please try again shortly.' })
    return
  }

  if (req.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    res.status(415).json({ error: 'A JSON request is required.' })
    return
  }

  let body: Record<string, unknown>
  try {
    // Vercel parses body lazily and throws here for malformed JSON.
    const value = req.body
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      res.status(400).json({ error: 'A JSON object is required.' })
      return
    }
    body = value as Record<string, unknown>
  } catch {
    res.status(400).json({ error: 'Invalid JSON request.' })
    return
  }

  const messages = normaliseMessages(body.messages)
  if (!messages.length || messages.at(-1)?.role !== 'user') {
    res.status(400).json({ error: 'A user message is required.' })
    return
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.error('Assistant request failed', { code: 'not_configured' })
    res.status(503).json({ error: 'The assistant is temporarily unavailable.' })
    return
  }

  try {
    const reply = await createAssistantReply({
      apiKey,
      model: process.env.OPENAI_MODEL || 'gpt-5.6-luna',
      messages,
      page: typeof body.page === 'string' ? body.page.slice(0, 120) : undefined,
    })
    res.status(200).json({ reply })
  } catch (error) {
    // Never log raw exceptions, provider bodies, prompts, headers, or credentials.
    const failure = error instanceof AssistantRequestError ? error : undefined
    console.error('Assistant request failed', {
      code: failure?.code ?? 'unexpected_failure',
      upstreamStatus: failure?.upstreamStatus,
    })
    const timedOut = failure?.code === 'timeout'
    res.status(timedOut ? 504 : 502).json({
      error: timedOut
        ? 'The assistant took too long to respond. Please try again.'
        : 'The assistant is temporarily unavailable.',
    })
  }
}
