import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { EMAIL } from '../lib/content'
import { CopyIcon } from './CopyIcon'

const HERO_TEXT = 'AI that works inside your business.'
const SUPPORTING =
  'We find the workflows slowing your business down, build the right software, and deploy it into production.'

export function Hero() {
  const [copyStatus, setCopyStatus] = useState('')
  const copyTimer = useRef<ReturnType<typeof window.setTimeout> | null>(null)

  useEffect(() => () => {
    if (copyTimer.current !== null) window.clearTimeout(copyTimer.current)
  }, [])

  const copyEmail = async () => {
    if (copyTimer.current !== null) window.clearTimeout(copyTimer.current)
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopyStatus('Email copied')
    } catch {
      setCopyStatus(`Please email ${EMAIL}`)
    }
    copyTimer.current = window.setTimeout(() => setCopyStatus(''), 2400)
  }

  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <div className="home-container hero-composition">
        <p className="home-eyebrow hero-eyebrow">
          Forward deployed AI engineering <span aria-hidden="true">/</span> Australia
        </p>
        <h1 id="hero-title">{HERO_TEXT}</h1>
        <p className="hero-supporting">{SUPPORTING}</p>
        <div className="hero-actions">
          <Link to="/contact" className="home-button home-button-primary">
            Show us a workflow <span aria-hidden="true">↗</span>
          </Link>
          <Link to="/solutions" className="home-button hero-secondary">
            Explore solutions <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="hero-links">
          <Link to="/work">See our work <span aria-hidden="true">↗</span></Link>
          <Link to="/approach">How we deploy <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="hero-contact">
          <button type="button" onClick={copyEmail} aria-label={`Copy ${EMAIL}`}>
            <span>Reach us: <span className="hero-email">{EMAIL}</span></span>
            <CopyIcon />
          </button>
          <span className="hero-copy-status" role="status">{copyStatus}</span>
        </div>
      </div>
      <div className="home-container hero-footer" aria-hidden="true">
        <span>From problem to production.</span>
        <span>Scroll to explore ↓</span>
      </div>
    </section>
  )
}
