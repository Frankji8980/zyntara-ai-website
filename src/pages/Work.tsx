import { Footer } from '../components/Footer'
import { EmailPill, PageShell, TextPill } from '../components/PageShell'
import { FEATURED_WORK } from '../lib/content'

export function Work() {
  return (
    <>
      <PageShell kicker="Work" title={FEATURED_WORK.title}>
        <p className="mb-2 text-[15px] uppercase tracking-wide text-black/55">
          {FEATURED_WORK.industry}
        </p>
        <p
          className="mb-8 max-w-xl"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
          }}
        >
          {FEATURED_WORK.summary}
        </p>
        <p className="mb-10 text-[20px] sm:text-[24px]">
          {FEATURED_WORK.result}
        </p>
        <p className="mb-16 max-w-xl text-[16px] leading-relaxed text-black/75 sm:text-[18px]">
          One operational picture across materials, suppliers and production
          planning — so procurement and the floor are looking at the same
          numbers. We only publish work we can stand behind. More cases when
          they are cleared to share.
        </p>
        <div className="flex flex-wrap gap-y-1">
          <TextPill to="/industries">Manufacturing &amp; Industrial</TextPill>
          <TextPill to="/contact">Show us a workflow</TextPill>
          <EmailPill />
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
