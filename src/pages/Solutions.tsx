import { Footer } from '../components/Footer'
import { EmailPill, PageShell, TextPill } from '../components/PageShell'
import { SOLUTIONS } from '../lib/content'

export function Solutions() {
  return (
    <>
      <PageShell
        kicker="Solutions"
        title="What you can actually buy."
      >
        <p className="mb-16 max-w-xl text-[18px] leading-relaxed sm:text-[22px]">
          Zyntara AI sells working systems, not a workshop and a slide. These
          are the four things clients engage us to put into production.
        </p>

        <div className="space-y-20">
          {SOLUTIONS.map((item) => (
            <article key={item.id} id={item.id} className="scroll-mt-28">
              <h2 className="mb-3 text-[24px] sm:text-[30px]">{item.title}</h2>
              <p className="mb-4 text-[15px] text-black/55 sm:text-[17px]">
                {item.line}
              </p>
              <p className="max-w-xl text-[17px] leading-relaxed sm:text-[19px]">
                {item.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-y-1">
          <TextPill to="/approach">How we deploy</TextPill>
          <TextPill to="/contact">Show us a workflow</TextPill>
          <EmailPill />
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
