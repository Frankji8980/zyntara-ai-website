import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { EmailPill, PageShell, TextPill } from '../components/PageShell'
import { INDUSTRIES, WORK_ITEMS } from '../lib/content'

export function Industries() {
  const [featured, ...rest] = INDUSTRIES
  const manufacturingWork = WORK_ITEMS.slice(0, 4)
  const financialWork = WORK_ITEMS.slice(4)

  return (
    <>
      <PageShell
        kicker="Industries"
        title="Manufacturing first. Then the work around it."
      >
        <article
          id={featured.id}
          className="mb-28 scroll-mt-28 border-t border-black pt-6"
        >
          <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="mb-3 text-[12px] uppercase tracking-[0.14em] text-black/45">
                Primary industry
              </p>
              <h2 className="mb-6 text-[30px] leading-tight sm:text-[44px]">
                {featured.title}
              </h2>
              <p className="max-w-xl text-[18px] leading-relaxed sm:text-[22px]">
                {featured.body}
              </p>
            </div>
            <div className="relative min-h-96 overflow-hidden bg-black p-6 text-white sm:p-8">
              <img
                src="/images/cnc-manufacturing.jpg"
                alt="CNC manufacturing floor with staged machined components"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
              <p className="relative z-10 mb-6 text-[12px] uppercase tracking-[0.14em] text-white/55">
                Operational ground
              </p>
              <p className="relative z-10 mt-36 text-[19px] leading-relaxed sm:text-[23px]">
                BOMs. Material readiness. Supplier RFQs. Production bays.
                Warehouse receiving. Quality stations. Systems that have to
                keep working when the network does not.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-px bg-black/15 sm:grid-cols-2">
            {manufacturingWork.map((item) => (
              <Link
                key={item.id}
                to={`/work#${item.id}`}
                className="group bg-white p-5 transition-colors hover:bg-black hover:text-white sm:p-7"
              >
                <p className="mb-8 text-[12px] text-black/45 group-hover:text-white/45">
                  {item.number} / {item.stage}
                </p>
                <h3 className="mb-3 text-[20px] leading-tight sm:text-[24px]">
                  {item.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-black/60 group-hover:text-white/65">
                  {item.flow}
                </p>
              </Link>
            ))}
          </div>
        </article>

        <div className="grid gap-16 border-t border-black/15 pt-12 md:grid-cols-3">
          {rest.map((item) => (
            <article key={item.id} id={item.id} className="scroll-mt-28">
              <h2 className="mb-4 text-[22px] leading-tight sm:text-[26px]">
                {item.title}
              </h2>
              <p className="text-[16px] leading-relaxed text-black/75 sm:text-[17px]">
                {item.body}
              </p>
              {item.id === 'accounting' ? (
                <div className="mt-6 space-y-3 border-t border-black/15 pt-5">
                  {financialWork.map((work) => (
                    <Link
                      key={work.id}
                      to={`/work#${work.id}`}
                      className="block text-[14px] underline underline-offset-4 hover:opacity-60"
                    >
                      {work.title}
                    </Link>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap gap-y-1">
          <TextPill to="/work">See selected work</TextPill>
          <TextPill to="/contact">Show us a workflow</TextPill>
          <EmailPill />
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
