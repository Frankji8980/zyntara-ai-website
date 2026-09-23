import type { FormEvent } from 'react'
import { Footer } from '../components/Footer'
import { PageShell } from '../components/PageShell'
import { EMAIL } from '../lib/content'

const inputClass =
  'w-full border-b border-white/25 bg-transparent py-3 text-[16px] text-white outline-none transition placeholder:text-white/35 focus:border-white'

export function Contact() {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = [
      `Name: ${data.get('name') || ''}`,
      `Company: ${data.get('company') || ''}`,
      `Work email: ${data.get('email') || ''}`,
      '',
      'Workflow:',
      String(data.get('workflow') || ''),
    ].join('\n')

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      'Workflow discussion',
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <PageShell kicker="Contact" title="Show us a workflow.">
        <div className="grid gap-16 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-10 max-w-xl text-[20px] leading-[1.4] sm:text-[26px]">
              Tell us where work gets stuck — client intake, reporting,
              approvals or a planning cycle. We will help identify a useful
              starting point and the systems it needs to connect.
            </p>
            <p className="mb-8 text-[13px] uppercase tracking-[0.14em] text-black/45">
              Direct contact
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="text-[19px] underline underline-offset-4 sm:text-[24px]"
            >
              {EMAIL}
            </a>
            <div className="mt-14 border-t border-black/15 pt-6 text-[14px] leading-relaxed text-black/55">
              <p>Sydney / Australia</p>
              <p>Australian SMEs / Software / Applied AI</p>
            </div>
          </div>

          <form onSubmit={submit} className="bg-black p-6 text-white sm:p-9">
            <p className="mb-10 text-[12px] uppercase tracking-[0.14em] text-white/45">
              Start with the operation
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="text-[12px] uppercase tracking-[0.1em] text-white/50">
                Name
                <input
                  className={inputClass}
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Your name"
                />
              </label>
              <label className="text-[12px] uppercase tracking-[0.1em] text-white/50">
                Company
                <input
                  className={inputClass}
                  name="company"
                  autoComplete="organization"
                  required
                  placeholder="Company"
                />
              </label>
            </div>
            <label className="mt-6 block text-[12px] uppercase tracking-[0.1em] text-white/50">
              Work email
              <input
                className={inputClass}
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@company.com"
              />
            </label>
            <label className="mt-6 block text-[12px] uppercase tracking-[0.1em] text-white/50">
              What workflow is slowing you down?
              <textarea
                className={`${inputClass} min-h-32 resize-y`}
                name="workflow"
                required
                placeholder="Describe the workflow, systems involved and the outcome you need."
              />
            </label>
            <button
              type="submit"
              className="mt-8 border border-white px-5 py-3 text-[14px] transition hover:bg-white hover:text-black"
            >
              Prepare email →
            </button>
            <p className="mt-5 text-[11px] leading-relaxed text-white/35">
              This opens your email client. Please do not include confidential
              customer data or credentials.
            </p>
          </form>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
