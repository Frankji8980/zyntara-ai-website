import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { EmailPill, PageShell, TextPill } from '../components/PageShell'
import { INDUSTRIES, WORK_ITEMS } from '../lib/content'

export function Industries() {
  return (
    <>
      <PageShell
        kicker="Industries"
        title="AI engineering for the work behind Australian business."
      >
        <p className="mb-20 max-w-3xl text-[18px] leading-relaxed text-black/75 sm:text-[22px]">
          Every industry has different systems, language and obligations. We
          start with the workflow, then build around the way your team already
          works — from a clinic or professional practice to a warehouse or
          production floor.
        </p>

        <div className="space-y-28">
          {INDUSTRIES.map((industry, index) => {
            const relatedWork = WORK_ITEMS.filter((work) =>
              industry.workIds.some((id) => id === work.id),
            )

            return (
              <article
                key={industry.id}
                id={industry.id}
                className="scroll-mt-28 border-t border-black pt-6"
              >
                <div className="mb-10 flex items-center justify-between text-[12px] uppercase tracking-[0.14em] text-black/45">
                  <span>{industry.eyebrow}</span>
                  <span>{String(index + 1).padStart(2, '0')} / 04</span>
                </div>

                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                  <div className={index % 2 ? 'lg:order-2' : ''}>
                    <h2 className="mb-6 max-w-xl text-[32px] leading-[1.08] tracking-tight sm:text-[46px]">
                      {industry.title}
                    </h2>
                    <p className="max-w-xl text-[18px] leading-relaxed sm:text-[21px]">
                      {industry.body}
                    </p>

                    <ul className="mt-10 border-t border-black/15">
                      {industry.workflows.map((workflow, workflowIndex) => (
                        <li
                          key={workflow}
                          className="flex gap-5 border-b border-black/15 py-4 text-[15px] sm:text-[17px]"
                        >
                          <span className="text-black/35">
                            {String(workflowIndex + 1).padStart(2, '0')}
                          </span>
                          {workflow}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <figure
                    className={`relative overflow-hidden bg-black ${
                      index % 2 ? 'lg:order-1' : ''
                    }`}
                  >
                    <img
                      src={industry.image}
                      alt={industry.imageAlt}
                      className="aspect-[4/3] h-full w-full object-cover transition duration-700 hover:scale-[1.015]"
                      loading="lazy"
                    />
                    <figcaption className="absolute right-3 bottom-3 bg-black/75 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-white/65 backdrop-blur-sm">
                      Illustrative operational context
                    </figcaption>
                  </figure>
                </div>

                <div className="mt-12 grid gap-px bg-black/15 sm:grid-cols-2">
                  {relatedWork.map((work) => (
                    <Link
                      key={work.id}
                      to={`/work#${work.id}`}
                      className="group bg-white p-5 transition-colors hover:bg-black hover:text-white sm:p-7"
                    >
                      <p className="mb-8 text-[11px] uppercase tracking-[0.1em] text-black/45 group-hover:text-white/45">
                        {work.number} / {work.stage}
                      </p>
                      <h3 className="mb-3 text-[20px] leading-tight sm:text-[24px]">
                        {work.title}
                      </h3>
                      <p className="text-[14px] leading-relaxed text-black/60 group-hover:text-white/65">
                        {work.flow}
                      </p>
                    </Link>
                  ))}
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-24 border-t border-black pt-10">
          <p className="mb-8 max-w-2xl text-[22px] leading-relaxed sm:text-[30px]">
            Your industry gives us context. Your workflow tells us what to
            build.
          </p>
          <div className="flex flex-wrap gap-y-1">
            <TextPill to="/work">See selected work</TextPill>
            <TextPill to="/contact">Show us a workflow</TextPill>
            <EmailPill />
          </div>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
