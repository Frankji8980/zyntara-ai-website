import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { ScrubVideo } from '../components/ScrubVideo'
import { EmailPill, TextPill } from '../components/PageShell'
import { FEATURED_WORK, INDUSTRIES, SOLUTIONS, STEPS } from '../lib/content'

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
          <ul className="space-y-6">
            {SOLUTIONS.map((item) => (
              <li key={item.id}>
                <Link to={`/solutions#${item.id}`} className="group block">
                  <p className="text-[18px] sm:text-[22px]">
                    {item.title}
                    <span className="text-black/50"> — {item.line}</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <TextPill to="/solutions">Explore solutions</TextPill>
          </div>
        </HomeSection>

        <HomeSection
          kicker="Real workflows"
          title="Built for real operations."
        >
          <p
            className="max-w-xl text-black"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35,
              fontWeight: 400,
            }}
          >
            We work on the factory floor, the matter file, the ledger and the
            roster — not a demo environment. Systems land where the work already
            happens, beside the tools your team already trusts.
          </p>
        </HomeSection>

        <HomeSection kicker="Industries" title="Where we go first.">
          <ul className="space-y-5">
            {INDUSTRIES.map((item) => (
              <li key={item.id}>
                <Link to={`/industries#${item.id}`} className="block">
                  <p
                    className={
                      item.featured
                        ? 'text-[22px] sm:text-[28px]'
                        : 'text-[18px] sm:text-[22px] text-black/70'
                    }
                  >
                    {item.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <TextPill to="/industries">See industries</TextPill>
          </div>
        </HomeSection>

        <HomeSection kicker="Featured work" title={FEATURED_WORK.title}>
          <p className="mb-2 text-[15px] uppercase tracking-wide text-black/55">
            {FEATURED_WORK.industry}
          </p>
          <p
            className="max-w-xl"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35,
            }}
          >
            {FEATURED_WORK.summary}
          </p>
          <p className="mt-6 text-[18px] sm:text-[22px]">
            {FEATURED_WORK.result}
          </p>
          <div className="mt-10">
            <TextPill to="/work">See our work</TextPill>
          </div>
        </HomeSection>

        <HomeSection
          kicker="How we work"
          title="Discover. Build. Deploy. Improve."
        >
          <ol className="space-y-6">
            {STEPS.map((step, index) => (
              <li key={step.title} className="max-w-xl">
                <p className="text-[18px] sm:text-[22px]">
                  {index + 1}. {step.title}
                </p>
                <p className="mt-1 text-[15px] leading-relaxed text-black/70 sm:text-[17px]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <TextPill to="/approach">How we deploy</TextPill>
          </div>
        </HomeSection>

        <section className="flex min-h-[70vh] flex-col justify-center px-5 py-20 sm:px-8 md:px-10">
          <div className="max-w-xl">
            <p className="mb-3 text-[15px] text-black/55">Final CTA</p>
            <h2 className="mb-6 text-[28px] leading-[1.2] sm:text-[36px]">
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
              <EmailPill />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
