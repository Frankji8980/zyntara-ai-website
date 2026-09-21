import { Footer } from '../components/Footer'
import { EmailPill, PageShell } from '../components/PageShell'
import { EMAIL } from '../lib/content'

export function Contact() {
  return (
    <>
      <PageShell kicker="Contact" title="Show us a workflow.">
        <p
          className="mb-10 max-w-xl"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
          }}
        >
          Tell us where work gets stuck — a planning cycle, an inbox, a shop
          floor hand-off. If it is a fit, we will say so plainly.
        </p>
        <p className="mb-8">
          <a
            href={`mailto:${EMAIL}`}
            className="text-[22px] underline underline-offset-2 sm:text-[28px]"
          >
            {EMAIL}
          </a>
        </p>
        <EmailPill />
      </PageShell>
      <Footer />
    </>
  )
}
