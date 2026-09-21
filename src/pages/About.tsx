import { Footer } from '../components/Footer'
import { EmailPill, PageShell, TextPill } from '../components/PageShell'

export function About() {
  return (
    <>
      <PageShell kicker="About" title="We sit between consulting and software engineering.">
        <figure className="relative mb-16 overflow-hidden bg-black">
          <img
            src="/images/engineering-workspace.jpg"
            alt="Engineering workspace with software, architecture diagrams and an industrial component"
            className="aspect-[16/9] w-full object-cover"
          />
          <figcaption className="absolute right-3 bottom-3 bg-black/80 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-white/65 backdrop-blur-sm">
            Software / Systems / Operations
          </figcaption>
        </figure>
        <div className="grid gap-10 md:grid-cols-[0.35fr_0.65fr]">
          <p className="text-[12px] uppercase tracking-[0.14em] text-black/45">
            Engineering in context
          </p>
          <div className="max-w-2xl space-y-8 text-[18px] leading-relaxed sm:text-[22px]">
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
            Our engineering perspective is grounded in manufacturing and
            enterprise work across Australia and China — from production
            planning and procurement to warehouse automation and industrial
            quality systems, market intelligence and quantitative research.
          </p>
          <p>
            AI that works inside your business. From problem to production.
          </p>
          </div>
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
