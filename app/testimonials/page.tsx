import type { Metadata } from "next";
import { testimonials, getAdventure } from "@/lib/content";
import { images } from "@/lib/images";
import { Hero } from "@/components/sections/Hero";
import { QuoteCycler } from "@/components/sections/QuoteCycler";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArrowLink } from "@/components/ui/ArrowLink";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What travellers say about their Steppe & Sky adventures in Mongolia.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  const quotes = testimonials.map((t) => ({
    id: t.id,
    quote: t.quote,
    name: t.name,
    detail: `${t.country} · ${getAdventure(t.adventure)?.shortTitle ?? ""}`,
    placeholder: t.placeholder,
  }));
  return (
    <>
      <Hero
        size="page"
        image={images.gerCampDusk}
        horizon={66}
        eyebrow="In their words"
        title="*Stories* from the steppe"
        lead="Placeholder testimonials for layout only. Real reviews will replace these once travellers have been with us."
      />
      <section data-theme="dark" className="gutter bg-charcoal py-20 text-offwhite md:py-[8vw]">
        <div className="md:pl-[26.5vw]">
          <QuoteCycler quotes={quotes} />
        </div>
      </section>
      <section data-theme="light" className="gutter py-20 md:py-[8vw]">
        <ul className="grid gap-[15px] md:grid-cols-3 md:gap-[1.95vw]">
          {testimonials.map((t, i) => {
            const a = getAdventure(t.adventure);
            return (
              <li key={t.id} className={`flex flex-col rounded-[22px] bg-sand p-6 md:p-8 ${i % 3 === 1 ? "md:mt-[5vw]" : ""}`}>
                <span className="self-start rounded-full border border-charcoal/30 px-3 py-1 text-[11px] uppercase tracking-[0.04em] text-charcoal/70">
                  Placeholder testimonial
                </span>
                <blockquote className="mt-6 grow text-[21px] font-medium leading-[1.15] tracking-[-0.03em] md:text-[24px]">“{t.quote}”</blockquote>
                <p className="mt-6 text-[15px]">
                  <span className="font-medium">{t.name}</span> · {t.country}
                </p>
                {a && (
                  <ArrowLink href={`/adventures/${a.slug}`} arrowClassName="text-felt" className="mt-3 text-[16px]">
                    {a.title}
                  </ArrowLink>
                )}
              </li>
            );
          })}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
