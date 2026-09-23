import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useLocation } from 'react-router-dom'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const STARTERS = [
  'Our production planning lives in spreadsheets',
  'We have too many manual approvals',
  'Knowledge is scattered across documents',
] as const

const WELCOME: Message = {
  role: 'assistant',
  content:
    "Tell me about a workflow that is slowing your business down. I can help map the problem and point you to relevant Zyntara work.",
}

const UNAVAILABLE = 'The assistant is temporarily unavailable. Please try again shortly.'
class AssistantDisplayError extends Error {}

export async function readAssistantResponse(response: Response): Promise<string> {
  // Platform/proxy failures may be plain text or HTML. Never display their bodies.
  if (!response.ok) {
    throw new AssistantDisplayError(
      response.status === 429
        ? 'Too many requests. Please try again shortly.'
        : response.status === 504
          ? 'The assistant took too long to respond. Please try again.'
          : UNAVAILABLE,
    )
  }
  let data: unknown
  try {
    data = await response.json()
  } catch {
    throw new AssistantDisplayError(UNAVAILABLE)
  }
  if (!data || typeof data !== 'object' || Array.isArray(data) ||
    !('reply' in data) || typeof data.reply !== 'string' || !data.reply.trim()) {
    throw new AssistantDisplayError(UNAVAILABLE)
  }
  return data.reply.trim()
}

export function WorkflowAssistant() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, loading, open])

  const send = async (text: string) => {
    const value = text.trim()
    if (!value || loading) return

    const nextMessages: Message[] = [
      ...messages,
      { role: 'user', content: value },
    ]
    setMessages(nextMessages)
    setInput('')
    setError('')
    setLoading(true)

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 35_000)
    try {
      const response = await fetch('/api/chat', {
        signal: controller.signal,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.slice(1).slice(-10),
          page: `${location.pathname}${location.hash}`,
        }),
      })
      const reply = await readAssistantResponse(response)

      setMessages((current) => [
        ...current,
        { role: 'assistant', content: reply },
      ])
    } catch (requestError) {
      setError(
        controller.signal.aborted
          ? 'The assistant took too long to respond. Please try again.'
          : requestError instanceof AssistantDisplayError
          ? requestError.message
          : UNAVAILABLE,
      )
    } finally {
      window.clearTimeout(timeout)
      setLoading(false)
    }
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    void send(input)
  }

  return (
    <div className="fixed right-4 bottom-4 z-[60] sm:right-6 sm:bottom-6">
      <div
        className={`absolute right-0 bottom-14 flex h-[min(650px,calc(100vh-100px))] w-[min(390px,calc(100vw-32px))] origin-bottom-right flex-col overflow-hidden border border-white/15 bg-[#0d0d0d] text-white shadow-2xl transition duration-300 ${
          open
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-3 scale-[0.98] opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-start justify-between border-b border-white/15 px-5 py-4">
          <div>
            <p className="text-[15px]">Zyntara Workflow Assistant</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/45">
              AI assistant · Human handoff available
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-[22px] leading-none text-white/55 hover:text-white"
            aria-label="Close assistant"
          >
            ×
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={
                  message.role === 'user'
                    ? 'ml-8 border border-white/25 bg-white px-4 py-3 text-black'
                    : 'mr-5 border-l border-[#ef6c35] pl-4 text-white/85'
                }
              >
                <p className="whitespace-pre-wrap text-[14px] leading-relaxed">
                  {message.content}
                </p>
              </div>
            ))}

            {loading ? (
              <p className="border-l border-[#ef6c35] pl-4 text-[13px] text-white/50">
                Mapping the workflow…
              </p>
            ) : null}
          </div>

          {messages.length === 1 ? (
            <div className="mt-6 space-y-2">
              {STARTERS.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  onClick={() => void send(starter)}
                  className="block w-full border border-white/15 px-3 py-2 text-left text-[12px] leading-relaxed text-white/65 transition hover:border-white/50 hover:text-white"
                >
                  {starter} →
                </button>
              ))}
            </div>
          ) : null}

          {error ? (
            <p className="mt-4 text-[12px] leading-relaxed text-[#ff9d77]">
              {error} You can also email frank.j@zyntaraai.com.au.
            </p>
          ) : null}
        </div>

        <form onSubmit={onSubmit} className="border-t border-white/15 p-4">
          <label htmlFor="workflow-message" className="sr-only">
            Describe your workflow
          </label>
          <div className="flex items-end gap-3">
            <textarea
              id="workflow-message"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  void send(input)
                }
              }}
              maxLength={1600}
              rows={2}
              placeholder="Describe the workflow…"
              className="min-h-12 flex-1 resize-none border-0 bg-transparent p-0 text-[14px] text-white outline-none placeholder:text-white/35"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="border border-white px-3 py-2 text-[12px] disabled:cursor-not-allowed disabled:opacity-30"
            >
              Send
            </button>
          </div>
          <p className="mt-3 text-[10px] leading-relaxed text-white/35">
            Do not share passwords, client data or confidential information.
          </p>
        </form>
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-3 rounded-full border border-black bg-black px-4 py-2 text-[13px] text-white shadow-lg transition hover:bg-white hover:text-black sm:px-5 sm:text-[14px]"
        aria-expanded={open}
      >
        <span className="h-2 w-2 rounded-full bg-[#ef6c35]" />
        {open ? 'Close' : 'Describe a workflow'}
      </button>
    </div>
  )
}
