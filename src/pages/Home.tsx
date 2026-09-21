import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { ScrubVideo } from '../components/ScrubVideo'
import { EmailPill, TextPill } from '../components/PageShell'
import { INDUSTRIES, SOLUTIONS, STEPS, WORK_ITEMS } from '../lib/content'

function HomeSection({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: string
  children: ReactNode
}) {
  return (
    <section className="flex min-h-screen flex-col justify-center px-5 py-20 sm:px-8 md:px-10">
      <div className="max-w-3xl">
        <p className="mb-3 text-[15px] text-black/55">{kicker}</p>
        <h2
          className="mb-8 text-[28px] leading-[1.2] sm:text-[36px]"
          style={{ fontWeight: 400 }}
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

export function Home() {
  return (
    <div className="relative">
      <ScrubVideo />
      <Hero />

      <div className="relative z-10 bg-white">
        <HomeSection kicker="What we build" title="Four things you can buy.">
          <ul className="border-t border-black">
            {SOLUTIONS.map((item, index) => (
              <li key={item.id} className="border-b border-black/15">
                <Link
                  to={`/solutions#${item.id}`}
                  className="group grid gap-3 py-6 transition-all hover:pl-2 sm:grid-cols-[44px_1fr_1fr]"
                >
                  <span className="text-[12px] text-black/40">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[19px] sm:text-[23px]">{item.title}</span>
                  <span className="text-[14px] leading-relaxed text-black/50 sm:text-[16px]">
                    {item.line}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <TextPill to="/solutions">Explore solutions</TextPill>
          </div>
        </HomeSection>

        <section className="relative flex min-h-screen items-end overflow-hidden bg-black px-5 py-16 text-white sm:px-8 md:px-10 md:py-20">
          <img
            src="/images/industrial-operations.jpg"
            alt="Manufacturing operations team overlooking a production floor"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-black/10" />
          <div className="relative z-10 max-w-2xl">
            <p className="mb-3 text-[12px] uppercase tracking-[0.14em] text-white/55">
              Real workflows / Live systems
            </p>
            <h2 className="mb-8 text-[34px] leading-[1.08] tracking-tight sm:text-[50px]">
              Built for real operations.
            </h2>
            <p className="max-w-xl text-[19px] leading-[1.4] text-white/85 sm:text-[25px]">
              We work on the factory floor, the matter file, the ledger and the
              roster. Systems land where the work already happens, beside the
              tools your team already trusts.
            </p>
            <div className="mt-10 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.1em] text-white/65">
              <span className="border border-white/25 px-3 py-2">Data</span>
              <span className="border border-white/25 px-3 py-2">Workflow</span>
              <span className="border border-white/25 px-3 py-2">Decision</span>
              <span className="border border-white/25 px-3 py-2">Action</span>
            </div>
          </div>
        </section>

        <HomeSection kicker="Industries" title="Where we go first.">
          <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr]">
            <div className="overflow-hidden bg-black">
              <img
                src="/images/cnc-manufacturing.jpg"
                alt="CNC manufacturing floor with staged machined components"
                className="aspect-[4/3] h-full w-full object-cover transition duration-700 hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <ul className="border-t border-black">
              {INDUSTRIES.map((item, index) => (
                <li key={item.id} className="border-b border-black/15">
                  <Link
                    to={`/industries#${item.id}`}
                    className="flex items-start justify-between gap-6 py-5 transition-all hover:pl-2"
                  >
                    <span
                      className={
                        item.featured
                          ? 'text-[20px] sm:text-[25px]'
                          : 'text-[17px] text-black/65 sm:text-[20px]'
                      }
                    >
                      {item.title}
                    </span>
                    <span className="text-[12px] text-black/35">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10">
            <TextPill to="/industries">See industries</TextPill>
          </div>
        </HomeSection>

        <HomeSection kicker="Selected work" title="Systems shaped around live operations.">
          <div className="space-y-0 border-t border-black">
            {WORK_ITEMS.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                to={`/work#${item.id}`}
                className="grid gap-3 border-b border-black/15 py-6 transition-opacity hover:opacity-55 sm:grid-cols-[40px_1fr_1fr]"
              >
                <span className="text-[13px] text-black/45">{item.number}</span>
                <span className="text-[18px] sm:text-[22px]">{item.title}</span>
                <span className="text-[14px] leading-relaxed text-black/55 sm:text-[16px]">
                  {item.industry} / {item.stage}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <TextPill to="/work">See our work</TextPill>
          </div>
        </HomeSection>

        <HomeSection
          kicker="How we work"
          title="Discover. Build. Deploy. Improve."
        >
          <ol className="grid gap-px bg-black/15 sm:grid-cols-2">
            {STEPS.map((step, index) => (
              <li key={step.title} className="min-h-52 bg-white p-6 sm:p-8">
                <p className="mb-10 text-[12px] text-black/40">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="text-[22px] sm:text-[26px]">{step.title}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-black/65 sm:text-[16px]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <TextPill to="/approach">How we deploy</TextPill>
          </div>
        </HomeSection>

        <section className="flex min-h-[70vh] flex-col justify-center bg-black px-5 py-20 text-white sm:px-8 md:px-10">
          <div className="max-w-xl">
            <p className="mb-3 text-[12px] uppercase tracking-[0.14em] text-white/45">
              Next workflow
            </p>
            <h2 className="mb-6 text-[34px] leading-[1.08] sm:text-[50px]">
              Show us a workflow.
            </h2>
            <p
              className="mb-8"
              style={{
                fontSize: 'clamp(18px, 4vw, 26px)',
                lineHeight: 1.35,
              }}
            >
              Tell us where work gets stuck. We will tell you if we can put
              software into production around it.
            </p>
            <div className="flex flex-wrap gap-y-1">
              <TextPill to="/contact">Get in touch</TextPill>
              <EmailPill inverse />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
