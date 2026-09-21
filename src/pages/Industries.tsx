import { Footer } from '../components/Footer'
import { EmailPill, PageShell, TextPill } from '../components/PageShell'
import { INDUSTRIES } from '../lib/content'

export function Industries() {
  const [featured, ...rest] = INDUSTRIES

  return (
    <>
      <PageShell kicker="Industries" title="Manufacturing first. Then the work around it.">
        <article id={featured.id} className="mb-20 scroll-mt-28">
          <h2 className="mb-4 text-[26px] sm:text-[34px]">{featured.title}</h2>
          <p className="max-w-xl text-[18px] leading-relaxed sm:text-[22px]">
            {featured.body}
          </p>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-black/70 sm:text-[18px]">
            Typical work: materials and supplier visibility, production
            planning, procurement cycles, and dashboards that match how the
            plant actually runs — not a generic MES demo.
          </p>
        </article>

        <div className="space-y-16">
          {rest.map((item) => (
            <article key={item.id} id={item.id} className="scroll-mt-28">
              <h2 className="mb-3 text-[22px] sm:text-[26px]">{item.title}</h2>
              <p className="max-w-xl text-[16px] leading-relaxed text-black/80 sm:text-[18px]">
                {item.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-y-1">
          <TextPill to="/work">See our work</TextPill>
          <TextPill to="/contact">Show us a workflow</TextPill>
          <EmailPill />
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
