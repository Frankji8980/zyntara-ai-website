import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { EmailPill, PageShell, TextPill } from '../components/PageShell'
import { SOLUTIONS } from '../lib/content'

export function Solutions() {
  return (
    <>
      <PageShell kicker="Solutions" title="What you can actually buy.">
        <p className="mb-12 max-w-2xl text-[18px] leading-relaxed sm:text-[22px]">
          Working systems for the workflows your business already depends on.
          We connect documents, operational data and human decisions, then
          deploy the result into the tools your team uses every day.
        </p>

        <div className="mb-24 bg-black px-5 py-7 text-white sm:px-8 sm:py-9">
          <p className="mb-8 text-[12px] uppercase tracking-[0.14em] text-white/45">
            Operating model
          </p>
          <div className="grid gap-6 text-[17px] sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center sm:text-[19px]">
            <p>Documents / Email / CRM / Practice systems</p>
            <span className="hidden text-white/35 sm:block">→</span>
            <p>Operational software + AI</p>
            <span className="hidden text-white/35 sm:block">→</span>
            <p>Decisions / Approvals / Actions</p>
          </div>
        </div>

        <div className="space-y-28">
          {SOLUTIONS.map((item, index) => (
            <article
              key={item.id}
              id={item.id}
              className="scroll-mt-28 border-t border-black pt-6"
            >
              <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(240px,0.8fr)]">
                <div>
                  <p className="mb-3 text-[13px] text-black/45">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mb-3 text-[28px] leading-tight sm:text-[38px]">
                    {item.title}
                  </h2>
                  <p className="mb-6 text-[14px] text-black/50 sm:text-[16px]">
                    {item.line}
                  </p>
                  <p className="max-w-xl text-[17px] leading-relaxed sm:text-[19px]">
                    {item.body}
                  </p>
                </div>

                <div className="border-l border-black/15 pl-5 sm:pl-7">
                  <p className="mb-4 text-[12px] uppercase tracking-[0.14em] text-black/45">
                    Typical workflows
                  </p>
                  <ul className="space-y-3 text-[15px] leading-relaxed sm:text-[16px]">
                    {item.workflows.map((workflow) => (
                      <li key={workflow}>— {workflow}</li>
                    ))}
                  </ul>
                  <p className="mb-3 mt-8 text-[12px] uppercase tracking-[0.14em] text-black/45">
                    Connects to
                  </p>
                  <p className="text-[14px] leading-relaxed text-black/65">
                    {item.systems.join(' / ')}
                  </p>
                </div>
              </div>

              <Link
                to={`/work#${item.relatedWork}`}
                className="mt-8 inline-block text-[14px] underline underline-offset-4 hover:opacity-60"
              >
                See related engineering work
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-24 border-t border-black/15 pt-10">
          <p className="mb-6 max-w-xl text-[20px] leading-relaxed sm:text-[26px]">
            The best place to start is one named workflow with an accountable
            owner and an outcome we can measure.
          </p>
          <div className="flex flex-wrap gap-y-1">
            <TextPill to="/approach">How we deploy</TextPill>
            <TextPill to="/contact">Show us a workflow</TextPill>
            <EmailPill />
          </div>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
