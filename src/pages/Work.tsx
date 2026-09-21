import { Footer } from '../components/Footer'
import { EmailPill, PageShell, TextPill } from '../components/PageShell'
import { WORK_ITEMS } from '../lib/content'

export function Work() {
  return (
    <>
      <PageShell
        kicker="Selected work"
        title="Engineering shaped around the operation."
      >
        <p className="mb-20 max-w-2xl text-[18px] leading-relaxed sm:text-[22px]">
          Selected work across manufacturing operations, financial
          intelligence and quantitative research. Client identities are
          withheld; project stages distinguish operational work from research
          and solution architecture.
        </p>

        <div className="space-y-28">
          {WORK_ITEMS.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="scroll-mt-28 border-t border-black pt-6"
            >
              <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="mb-3 text-[13px] uppercase tracking-[0.14em] text-black/50">
                    {item.number} / {item.stage}
                  </p>
                  <h2 className="max-w-2xl text-[30px] leading-[1.08] tracking-tight sm:text-[44px]">
                    {item.title}
                  </h2>
                </div>
                <p className="text-[14px] leading-relaxed text-black/55 sm:max-w-44 sm:text-right">
                  {item.industry}
                  <br />
                  {item.location}
                </p>
              </div>

              <p className="mb-12 max-w-2xl text-[20px] leading-[1.4] sm:text-[26px]">
                {item.summary}
              </p>

              {item.image ? (
                <figure className="relative mb-12 overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="aspect-[16/9] w-full object-cover transition duration-700 hover:scale-[1.015]"
                    loading="lazy"
                  />
                  <figcaption className="absolute right-3 bottom-3 bg-black/80 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-white/65 backdrop-blur-sm">
                    Illustrative operational context
                  </figcaption>
                </figure>
              ) : null}

              <div className="grid gap-10 md:grid-cols-3">
                <div>
                  <p className="mb-3 text-[12px] uppercase tracking-[0.14em] text-black/45">
                    Challenge
                  </p>
                  <p className="text-[15px] leading-relaxed sm:text-[17px]">
                    {item.challenge}
                  </p>
                </div>
                <div>
                  <p className="mb-3 text-[12px] uppercase tracking-[0.14em] text-black/45">
                    System
                  </p>
                  <p className="text-[15px] leading-relaxed sm:text-[17px]">
                    {item.system}
                  </p>
                </div>
                <div>
                  <p className="mb-3 text-[12px] uppercase tracking-[0.14em] text-black/45">
                    Outcome
                  </p>
                  <p className="text-[15px] leading-relaxed sm:text-[17px]">
                    {item.outcome}
                  </p>
                </div>
              </div>

              <div className="mt-10 bg-black px-5 py-6 text-white sm:px-7">
                <p className="mb-5 text-[12px] uppercase tracking-[0.14em] text-white/50">
                  System flow
                </p>
                <p className="text-[16px] leading-relaxed sm:text-[19px]">
                  {item.flow}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.architecture.map((part) => (
                    <span
                      key={part}
                      className="rounded-full border border-white/25 px-3 py-1 text-[12px] text-white/80"
                    >
                      {part}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 border-t border-black/15 pt-10">
          <p className="mb-6 max-w-xl text-[20px] leading-relaxed sm:text-[26px]">
            Bring us the workflow, the systems it touches and the outcome it
            needs to improve.
          </p>
          <div className="flex flex-wrap gap-y-1">
            <TextPill to="/industries">Manufacturing &amp; Industrial</TextPill>
            <TextPill to="/contact">Discuss a deployment</TextPill>
            <EmailPill />
          </div>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
