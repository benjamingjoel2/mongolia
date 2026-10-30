import Link from "next/link";
import { images } from "@/lib/images";
import { legalDocs, legalUpdated, type LegalDoc } from "@/data/legal";
import { Hero } from "@/components/sections/Hero";

/** Privacy Policy, Booking Terms and Cookie Policy share this layout: page hero, then readable prose. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <Hero size="page" image={images.steppeBigSky} horizon={60} eyebrow="Legal" title={doc.title} lead={doc.description} />
      <section data-theme="light" className="gutter py-16 md:py-[7vw]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-24">
          <nav aria-label="Legal" className="lg:sticky lg:top-24 lg:self-start">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 lg:flex-col">
              {legalDocs.map((d) => (
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
            <p className="text-[15px] text-charcoal/70">Last updated {legalUpdated}</p>
            {doc.sections.map((s) => (
              <section key={s.h} className="mt-10">
                <h2 className="text-[24px] font-medium tracking-[-0.03em] md:text-[28px]">{s.h}</h2>
                {s.p.map((p) => (
                  <p key={p} className="mt-4 text-[17px] leading-relaxed text-charcoal/85">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
