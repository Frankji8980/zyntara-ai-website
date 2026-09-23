import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { ScrubVideo } from '../components/ScrubVideo'
import { EmailPill } from '../components/PageShell'
import { INDUSTRIES, SOLUTIONS, STEPS, WORK_ITEMS } from '../lib/content'

function HomeSection({ id, kicker, title, children, wide = false }: {
  id: string
  kicker: string
  title: string
  children: ReactNode
  wide?: boolean
}) {
  return (
    <section className={`home-section${wide ? ' home-section-wide' : ''}`} aria-labelledby={`${id}-title`}>
      <div className="home-container home-section-grid">
        <header className="home-section-heading">
          <p className="home-eyebrow">{kicker}</p>
          <h2 id={`${id}-title`}>{title}</h2>
        </header>
        <div className="home-section-content">{children}</div>
      </div>
    </section>
  )
}

function SectionLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link to={to} className="home-section-link">{children}<span aria-hidden="true">↗</span></Link>
}

function IndustryPreview() {
  const [activeIndustry, setActiveIndustry] = useState(0)
  const [paused, setPaused] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(true)
  const [visible, setVisible] = useState(false)
  const [foreground, setForeground] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreferences = () => {
      setMobile(mobileQuery.matches)
      setReducedMotion(motionQuery.matches)
    }
    const syncVisibility = () => setForeground(document.visibilityState === 'visible')
    syncPreferences()
    syncVisibility()
    mobileQuery.addEventListener('change', syncPreferences)
    motionQuery.addEventListener('change', syncPreferences)
    document.addEventListener('visibilitychange', syncVisibility)
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.35)
    }, { threshold: [0, 0.35] })
    if (previewRef.current) observer.observe(previewRef.current)
    return () => {
      observer.disconnect()
      mobileQuery.removeEventListener('change', syncPreferences)
      motionQuery.removeEventListener('change', syncPreferences)
      document.removeEventListener('visibilitychange', syncVisibility)
    }
  }, [])

  useEffect(() => {
    if (!mobile || reducedMotion || !visible || !foreground || paused) return
    const timer = window.setInterval(() => {
      setActiveIndustry((index) => (index + 1) % INDUSTRIES.length)
    }, 4500)
    return () => window.clearInterval(timer)
  }, [mobile, reducedMotion, visible, foreground, paused])

  const selectIndustry = (index: number) => {
    setPaused(true)
    setActiveIndustry(index)
  }

  return (
    <div
      className="industry-showcase"
      onPointerDownCapture={(event) => {
        if (!(event.target as HTMLElement).closest('[data-rotation-control]')) setPaused(true)
      }}
      onFocusCapture={(event) => {
        if (!(event.target as HTMLElement).closest('[data-rotation-control]')) setPaused(true)
      }}
    >
      <div>
        <div className="industry-image" ref={previewRef} id="industry-preview">
          {INDUSTRIES.map((item, index) => (
            <img
              key={item.id}
              src={item.image}
              alt={activeIndustry === index ? item.imageAlt : ''}
              aria-hidden={activeIndustry !== index}
              className={activeIndustry === index ? 'is-active' : ''}
              loading="lazy"
            />
          ))}
          <div className="industry-caption">
            <p>{INDUSTRIES[activeIndustry].title}</p>
            <span>{INDUSTRIES[activeIndustry].eyebrow}</span>
          </div>
        </div>
        <div className="industry-controls" aria-label="Industry image controls">
          <div className="industry-selectors">
            {INDUSTRIES.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectIndustry(index)}
                aria-label={`Show ${item.title} image`}
                aria-pressed={activeIndustry === index}
                aria-controls="industry-preview"
              >{String(index + 1).padStart(2, '0')}</button>
            ))}
          </div>
          {!reducedMotion && (
            <button
              type="button"
              data-rotation-control
              onClick={() => setPaused((value) => !value)}
              aria-controls="industry-preview"
              className="industry-pause"
            >{paused ? 'Resume rotation' : 'Pause rotation'}</button>
          )}
        </div>
      </div>
      <div className="industry-directory">
        <ul>
          {INDUSTRIES.map((item, index) => (
            <li key={item.id}>
              <Link
                to={`/industries#${item.id}`}
                onMouseEnter={() => { if (!mobile) selectIndustry(index) }}
                onFocus={() => selectIndustry(index)}
                className={`industry-link${activeIndustry === index ? ' is-active' : ''}`}
              >
                <span className="home-index">{String(index + 1).padStart(2, '0')}</span>
                <span>{item.title}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ul>
        <SectionLink to="/industries">See industries</SectionLink>
      </div>
    </div>
  )
}

export function Home() {
  const featuredWorkIds: ReadonlySet<string> = new Set([
    'production-planning-copilot', 'legal-matter-intelligence',
    'finance-operations-automation', 'healthcare-intake-roster',
  ])
  const featuredWork = WORK_ITEMS.filter((item) => featuredWorkIds.has(item.id))

  return (
    <div className="home-page">
      <ScrubVideo />
      <main>
        <Hero />
        <div className="home-sections">
          <HomeSection id="solutions" kicker="What we build" title="Four things you can buy.">
            <ul className="solution-list">
              {SOLUTIONS.map((item, index) => (
                <li key={item.id}>
                  <Link to={`/solutions#${item.id}`} className="solution-link">
                    <span className="home-index">{String(index + 1).padStart(2, '0')}</span>
                    <span><h3>{item.title}</h3><p>{item.line}</p></span>
                    <span className="home-link-arrow" aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
            <SectionLink to="/solutions">Explore solutions</SectionLink>
          </HomeSection>

          <section className="home-operations" aria-labelledby="operations-title">
            <img src="/images/financial-intelligence.jpg" alt="AI engineer working with operational data in a Sydney workspace" loading="lazy" />
            <div className="home-container operations-content">
              <p className="home-eyebrow">Real workflows / Live systems</p>
              <h2 id="operations-title">Built for real operations.</h2>
              <p className="operations-description">
                We work inside the matter, the ledger, the roster and the
                production plan. Systems land where the work already happens,
                beside the tools your team already trusts.
              </p>
              <ul className="operations-flow" aria-label="Operational workflow">
                {['Data', 'Workflow', 'Decision', 'Action'].map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>

          <HomeSection id="industries" kicker="Industries" title="Different sectors. The same operational friction." wide>
            <IndustryPreview />
          </HomeSection>

          <HomeSection id="work" kicker="Selected work" title="Systems shaped around real workflows." wide>
            <div className="work-list">
              {featuredWork.map((item) => (
                <Link key={item.id} to={`/work#${item.id}`} className="work-link">
                  <span className="home-index">{item.number}</span>
                  <span className="work-info"><h3>{item.title}</h3><span><p>{item.industry}</p><span className="work-stage">{item.stage}</span></span></span>
                  <span className="home-link-arrow" aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
            <SectionLink to="/work">See our work</SectionLink>
          </HomeSection>

          <HomeSection id="approach" kicker="How we work" title="Discover. Build. Deploy. Improve." wide>
            <ol className="home-steps">
              {STEPS.map((step, index) => (
                <li key={step.title}>
                  <span className="home-index">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
            <SectionLink to="/approach">How we deploy</SectionLink>
          </HomeSection>

          <section className="home-contact" aria-labelledby="contact-title">
            <div className="home-container home-contact-grid">
              <div><p className="home-eyebrow">Next workflow</p><h2 id="contact-title">Show us a workflow.</h2></div>
              <div>
                <p className="home-contact-description">Tell us where work gets stuck. We will tell you if we can put software into production around it.</p>
                <div className="home-contact-actions">
                  <Link to="/contact" className="home-button home-button-light">Get in touch <span aria-hidden="true">↗</span></Link>
                  <EmailPill inverse />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <div className="home-footer"><Footer /></div>
    </div>
  )
}
