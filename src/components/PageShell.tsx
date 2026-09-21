import { Link } from 'react-router-dom'
import { EMAIL } from '../lib/content'
import { CopyIcon } from './CopyIcon'
import { useState, type ReactNode } from 'react'

export function PageShell({
  kicker,
  title,
  children,
}: {
  kicker?: string
  title: string
  children: ReactNode
}) {
  return (
    <main className="relative z-10 min-h-screen bg-white px-5 pb-24 pt-28 sm:px-8 md:px-10">
      <div className="mx-auto max-w-3xl">
        {kicker ? (
          <p className="mb-4 text-[15px] text-black/60">{kicker}</p>
        ) : null}
        <h1
          className="mb-10 text-[32px] leading-[1.2] tracking-tight sm:text-[42px]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h1>
        {children}
      </div>
    </main>
  )
}

const pillClass =
  'inline-flex items-center justify-center rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap transition-colors duration-200'

export function TextPill({
  to,
  children,
}: {
  to: string
  children: ReactNode
}) {
  return (
    <Link
      to={to}
      className={`${pillClass} border border-black/10 bg-white text-black hover:bg-black hover:text-white`}
    >
      {children}
    </Link>
  )
}

export function EmailPill() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copyEmail}
      className={`${pillClass} gap-2 border border-black bg-black text-white hover:bg-white hover:text-black sm:gap-3`}
    >
      <span>
        Reach us: <span className="underline underline-offset-1">{EMAIL}</span>
        {copied ? ' — copied' : ''}
      </span>
      <CopyIcon />
    </button>
  )
}
