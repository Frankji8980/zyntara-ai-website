import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTypewriter } from '../hooks/useTypewriter'
import { EMAIL } from '../lib/content'
import { CopyIcon } from './CopyIcon'

const HERO_TEXT = 'AI that works inside your business.'
const SUPPORTING =
  'We find the workflows slowing your business down, build the right software, and deploy it into production.'

const PILLS = [
  { label: 'Show us a workflow', to: '/contact' },
  { label: 'Explore solutions', to: '/solutions' },
  { label: 'See our work', to: '/work' },
  { label: 'How we deploy', to: '/approach' },
] as const

const pillClass =
  'inline-flex items-center justify-center rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap transition-colors duration-200'

export function Hero() {
  const { displayed, done } = useTypewriter(HERO_TEXT)
  const [pillsVisible, setPillsVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setPillsVisible(true), 400)
    return () => window.clearTimeout(id)
  }, [])

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
    <section className="relative z-[1] flex h-screen flex-col overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0 justify-end">
      <div className="relative z-10 max-w-xl">
        <p
          className="pointer-events-none mb-5 select-none text-black sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            filter: 'blur(4px)',
          }}
        >
          Hey there, this is Zyntara AI,
          <br />
          Forward Deployed AI Engineering for Australian businesses
        </p>

        <p
          className="mb-5 text-black sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: 54,
          }}
        >
          {displayed}
          {!done ? (
            <span className="cursor-blink ml-[2px] inline-block h-[1.1em] w-[2px] align-middle bg-black" />
          ) : null}
        </p>

        <div
          className="mb-5 sm:mb-6"
          style={{
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
          }}
        >
          {SUPPORTING}
        </div>

        <div
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {PILLS.map((pill) => (
            <Link
              key={pill.to}
              to={pill.to}
              className={`${pillClass} border border-black/10 bg-white text-black hover:bg-black hover:text-white`}
            >
              {pill.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={copyEmail}
            className={`${pillClass} gap-2 border border-white bg-transparent text-white hover:bg-white hover:text-black sm:gap-3`}
            aria-label={`Copy ${EMAIL}`}
          >
            <span>
              Reach us:{' '}
              <span className="underline underline-offset-1">{EMAIL}</span>
            </span>
            <CopyIcon />
            {copied ? (
              <span className="sr-only">Copied</span>
            ) : null}
          </button>
        </div>
      </div>
    </section>
  )
}
