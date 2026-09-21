import { Footer } from '../components/Footer'
import { EmailPill, PageShell, TextPill } from '../components/PageShell'

export function About() {
  return (
    <>
      <PageShell kicker="About" title="We sit between consulting and software engineering.">
        <div className="max-w-xl space-y-8 text-[18px] leading-relaxed sm:text-[22px]">
          <p>
            Zyntara AI works directly with operational teams to understand how
            work actually happens, then builds and deploys the systems needed
            to improve it.
          </p>
          <p>
            We are not a consulting firm that leaves you with a roadmap. We
            are not a vendor selling one fixed SaaS product. Forward Deployed
            Engineering is the middle path: engineers inside the business,
            software in production, improvement after go-live.
          </p>
          <p>
            AI that works inside your business. From problem to production.
          </p>
        </div>
        <div className="mt-16 flex flex-wrap gap-y-1">
          <TextPill to="/approach">How we deploy</TextPill>
          <TextPill to="/contact">Get in touch</TextPill>
          <EmailPill />
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
