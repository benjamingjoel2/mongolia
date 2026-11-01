import Link from "@/components/i18n/Link";
import { images } from "@/lib/images";
import { legalDocs, legalUpdated, type LegalDoc } from "@/data/legal";
import { getLocale, t } from "@/lib/i18n/server";
import { Hero } from "@/components/sections/Hero";

/** Privacy Policy, Booking Terms and Cookie Policy share this layout: page hero, then readable prose. */
/** Renders "[text](/path)" inside legal text as links. */
function linkify(text: string) {
  return text.split(/(\[[^\]]+\]\(\/[^)]*\))/g).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\((\/[^)]*)\)$/);
    return m ? <Link key={i} href={m[2]} className="underline underline-offset-4 hover:text-felt">{m[1]}</Link> : part;
  });
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const locale = getLocale();
  const docs = legalDocs[locale] ?? legalDocs.en;
  return (
    <>
      <Hero size="page" image={images.steppeBigSky} horizon={60} eyebrow={t("Legal")} title={doc.title} lead={doc.description} />
      <section data-theme="light" className="gutter py-16 md:py-[7vw]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-24">
          <nav aria-label={t("Legal")} className="lg:sticky lg:top-24 lg:self-start">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 lg:flex-col">
              {docs.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/${d.slug}`}
                    aria-current={d.slug === doc.slug ? "page" : undefined}
                    className={`text-[17px] underline-offset-4 hover:underline ${d.slug === doc.slug ? "text-felt" : "text-charcoal"}`}
                  >
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <article className="max-w-[70ch]">
            <p className="text-[15px] text-charcoal/70">{t("Last updated {date}", { date: legalUpdated[locale] ?? legalUpdated.en })}</p>
            {doc.sections.map((s) => (
              <section key={s.h} className="mt-10">
                <h2 className="text-[24px] font-medium tracking-[-0.03em] md:text-[28px]">{s.h}</h2>
                {s.p.map((p) => (
                  <p key={p} className="mt-4 text-[17px] leading-relaxed text-charcoal/85">
                    {linkify(p)}
                  </p>
                ))}
                {s.table && (
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full border-collapse text-left text-[15px] leading-snug text-charcoal/85">
                      <thead>
                        <tr>
                          {s.table.head.map((c) => (
                            <th key={c} scope="col" className="border-b border-charcoal/30 py-3 pr-4 align-top font-medium text-charcoal">{c}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((r) => (
                          <tr key={r[0]}>
                            {r.map((c, i) =>
                              i === 0 ? (
                                <th key={i} scope="row" className="border-b border-charcoal/15 py-3 pr-4 align-top font-mono text-[14px] font-normal text-charcoal">{c}</th>
                              ) : (
                                <td key={i} className="border-b border-charcoal/15 py-3 pr-4 align-top">{c}</td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
