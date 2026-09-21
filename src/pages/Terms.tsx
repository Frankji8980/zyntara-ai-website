import { Footer } from '../components/Footer'
import { PageShell } from '../components/PageShell'
import { EMAIL } from '../lib/content'

export function Terms() {
  return (
    <>
      <PageShell kicker="Legal · Draft for review" title="Website terms">
        <div className="max-w-2xl space-y-10 text-[16px] leading-relaxed text-black/80 sm:text-[18px]">
          <p>
            These draft terms apply to use of the Zyntara AI website and should
            be reviewed before publication as final legal terms.
          </p>
          <section>
            <h2 className="mb-3 text-[22px] text-black">General information</h2>
            <p>
              Website content describes Zyntara AI&apos;s services, selected
              engineering work and general approaches to AI and software
              delivery. It is not a binding proposal, warranty or commitment
              to a particular outcome, price or delivery date.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-[22px] text-black">No professional advice</h2>
            <p>
              Content and AI-generated responses are general information only.
              They are not financial, legal, medical or other professional
              advice. Quantitative research examples do not constitute an offer,
              recommendation or promise of investment performance.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-[22px] text-black">AI responses</h2>
            <p>
              The Workflow Assistant can make mistakes. Verify important
              information and contact Zyntara AI before relying on a response
              for a business decision.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-[22px] text-black">Intellectual property</h2>
            <p>
              Unless otherwise stated, website copy, design and original visual
              assets belong to Zyntara AI. Client identities are withheld and
              project descriptions must not be used to infer a client
              relationship.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-[22px] text-black">Contact</h2>
            <p>
              Questions can be sent to{' '}
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
