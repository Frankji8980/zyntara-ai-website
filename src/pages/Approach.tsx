import { Footer } from '../components/Footer'
import { EmailPill, PageShell, TextPill } from '../components/PageShell'
import { STEPS } from '../lib/content'

const DELIVERABLES = [
  'Workflow map / opportunity score / operating constraints',
  'Working prototype / system architecture / evaluation plan',
  'Production integration / controls / operator handover',
  'Monitoring / evaluation / adoption / next workflow',
] as const

export function Approach() {
  return (
    <>
      <PageShell
        kicker="Approach"
        title="How the work actually gets into production."
      >
        <p className="mb-20 max-w-2xl text-[18px] leading-relaxed sm:text-[23px]">
          Forward Deployed Engineering means we sit with operational teams,
          ship into live systems, and stay long enough for the software to earn
          its place. Success is measured in production — not in a strategy pack.
        </p>

        <ol className="relative mb-24 grid gap-px bg-black/15 md:grid-cols-4">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="group min-h-80 bg-white p-6 transition-colors hover:bg-black hover:text-white sm:p-7"
            >
              <p className="mb-14 text-[12px] text-black/40 group-hover:text-white/40">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h2 className="mb-4 text-[24px] sm:text-[28px]">{step.title}</h2>
              <p className="text-[15px] leading-relaxed text-black/65 group-hover:text-white/65">
                {step.body}
              </p>
              <p className="mt-8 border-t border-black/15 pt-4 text-[11px] uppercase leading-relaxed tracking-[0.1em] text-black/40 group-hover:border-white/15 group-hover:text-white/45">
                {DELIVERABLES[index]}
              </p>
            </li>
          ))}
        </ol>

        <div className="grid gap-px bg-white/20 md:grid-cols-3">
          <div className="bg-black p-6 text-white sm:p-8 md:col-span-2">
            <p className="mb-10 text-[12px] uppercase tracking-[0.14em] text-white/45">
              Architecture follows the operation
            </p>
            <p className="max-w-2xl text-[22px] leading-[1.4] sm:text-[30px]">
              Deployment and data architecture are designed around each
              client&apos;s security, privacy and operational requirements.
            </p>
          </div>
          <div className="bg-[#ef6c35] p-6 text-black sm:p-8">
            <p className="mb-10 text-[12px] uppercase tracking-[0.14em] text-black/50">
              Supported where required
            </p>
            <p className="text-[18px] leading-relaxed sm:text-[21px]">
              Private cloud, customer-managed environments and local deployment.
              Access control, human approval and observable system actions.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-y-1">
          <TextPill to="/solutions">Explore solutions</TextPill>
          <TextPill to="/contact">Show us a workflow</TextPill>
          <EmailPill />
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
