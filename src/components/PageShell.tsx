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
      <div className="mx-auto max-w-[1200px]">
        {kicker ? (
          <p className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-black/60"><span aria-hidden="true" className="h-1.5 w-1.5 bg-[#ef6c35]" />{kicker}</p>
        ) : null}
        <h1
          className="mb-12 max-w-4xl text-[clamp(34px,4.6vw,68px)] leading-[1.05] tracking-[-0.035em]"
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

export function EmailPill({ inverse = false }: { inverse?: boolean }) {
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
      className={`${pillClass} gap-2 sm:gap-3 ${
        inverse
          ? 'border border-white bg-transparent text-white hover:bg-white hover:text-black'
          : 'border border-black bg-black text-white hover:bg-white hover:text-black'
      }`}
    >
      <span>
        Reach us: <span className="underline underline-offset-1">{EMAIL}</span>
        {copied ? ' — copied' : ''}
      </span>
      <CopyIcon />
    </button>
  )
}
