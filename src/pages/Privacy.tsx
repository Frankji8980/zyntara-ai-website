import { Footer } from '../components/Footer'
import { PageShell } from '../components/PageShell'
import { EMAIL } from '../lib/content'

export function Privacy() {
  return (
    <>
      <PageShell kicker="Legal · Draft for review" title="Privacy notice">
        <div className="max-w-2xl space-y-10 text-[16px] leading-relaxed text-black/80 sm:text-[18px]">
          <p>
            This draft explains how the Zyntara AI website handles information.
            It should be reviewed before the website is published as a final
            legal notice.
          </p>
          <section>
            <h2 className="mb-3 text-[22px] text-black">Information you provide</h2>
            <p>
              We may receive information you choose to send by email, through
              an enquiry form, or through the Workflow Assistant. Please do not
              submit passwords, API keys, customer records, financial account
              information or other confidential material through the website.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-[22px] text-black">AI assistant</h2>
            <p>
              Messages sent to the Workflow Assistant are processed by our
              hosting infrastructure and an AI service provider to generate a
              response. The current website implementation does not intentionally
              retain conversation content in a Zyntara database. Infrastructure
              providers may process technical logs under their own terms.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-[22px] text-black">How information is used</h2>
            <p>
              Information may be used to respond to enquiries, understand a
              proposed workflow, improve the website and protect the service
              from misuse. We do not sell personal information.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-[22px] text-black">Contact</h2>
            <p>
              For a privacy question or request, email{' '}
              <a className="underline underline-offset-2" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
              .
            </p>
          </section>
          <p className="text-[13px] text-black/45">Last updated: 21 September 2026</p>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
