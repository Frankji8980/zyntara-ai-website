import {
  createAssistantReply,
  normaliseMessages,
} from '../server/assistant'

const requests = new Map<string, { count: number; resetAt: number }>()

function allowRequest(ip: string) {
  const now = Date.now()
  const current = requests.get(ip)

  if (!current || current.resetAt < now) {
    requests.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }

  if (current.count >= 10) return false
  current.count += 1
  return true
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const ip = String(req.headers['x-forwarded-for'] ?? req.socket?.remoteAddress ?? 'unknown')
    .split(',')[0]
    .trim()

  if (!allowRequest(ip)) {
    res.status(429).json({ error: 'Too many requests. Please try again shortly.' })
    return
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    res.status(503).json({ error: 'Assistant is not configured.' })
    return
  }

  const messages = normaliseMessages(req.body?.messages)
  if (!messages.length || messages.at(-1)?.role !== 'user') {
    res.status(400).json({ error: 'A user message is required.' })
    return
  }

  try {
    const reply = await createAssistantReply({
      apiKey,
      model: process.env.OPENAI_MODEL || 'gpt-5.6-luna',
      messages,
      page: typeof req.body?.page === 'string' ? req.body.page.slice(0, 120) : undefined,
    })
    res.status(200).json({ reply })
  } catch (error) {
    console.error('Assistant request failed', error)
    res.status(500).json({ error: 'The assistant is temporarily unavailable.' })
  }
}
