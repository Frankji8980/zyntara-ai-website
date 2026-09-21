import { Footer } from '../components/Footer'
import { EmailPill, PageShell, TextPill } from '../components/PageShell'
import { STEPS } from '../lib/content'

export function Approach() {
  return (
    <>
      <PageShell kicker="Approach" title="How the work actually gets into production.">
        <p className="mb-16 max-w-xl text-[18px] leading-relaxed sm:text-[22px]">
          Forward Deployed Engineering means we sit with operational teams,
          ship into live systems, and stay long enough for the software to
          earn its place. Success is measured in production — not in a
          strategy pack.
        </p>

        <ol className="mb-20 space-y-12">
          {STEPS.map((step, index) => (
            <li key={step.title} className="max-w-xl">
              <p className="mb-2 text-[15px] text-black/50">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h2 className="mb-3 text-[24px] sm:text-[30px]">{step.title}</h2>
              <p className="text-[17px] leading-relaxed sm:text-[19px]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="max-w-xl space-y-6 text-[16px] leading-relaxed sm:text-[18px]">
          <p>
            Deployment and data architecture are designed around each
            client&apos;s security, privacy and operational requirements.
          </p>
          <p>
            Private cloud, customer-managed environments and local deployment
            can be supported where required.
          </p>
          <p>
            Designed with Australian privacy obligations, access control and
            human oversight in mind.
          </p>
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
