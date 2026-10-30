import type { Metadata } from "next";
import { faqs } from "@/data/faqs";
import type { FaqTopic } from "@/data/types";
import { images } from "@/lib/images";
import { Hero } from "@/components/sections/Hero";
import { Accordion } from "@/components/sections/Accordion";
import { CtaBand } from "@/components/sections/CtaBand";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export const metadata: Metadata = {
  title: "FAQ: planning a trip to Mongolia",
  description:
    "Visas, flights into Ulaanbaatar, long drives, ger camp comfort, food, riding experience, insurance, weather, connectivity, money, tipping, etiquette, packing and cancellations.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const topics = [...new Set(faqs.map((f) => f.topic))] as FaqTopic[];
  const slug = (t: string) => t.toLowerCase().replace(/[^a-z]+/g, "-");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer.join(" ") } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero
        size="page"
        image={images.gerInterior}
        horizon={80}
        eyebrow={`${faqs.length} questions`}
        title="Good *questions*"
        lead="Straight answers on the practical things. Anything we haven't covered, ask your specialist."
      />
      <section data-theme="light" className="gutter py-20 md:py-[8vw]">
        <nav aria-label="FAQ topics" className="mb-14 flex flex-wrap gap-2">
          {topics.map((t) => (
            <a key={t} href={`#${slug(t)}`} className="inline-flex h-10 items-center rounded-blob-pill border border-charcoal/25 px-4 text-[15px] hover:border-charcoal hover:bg-charcoal hover:text-offwhite">
              {t}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-16 md:gap-24">
          {topics.map((t) => (
            <div key={t} id={slug(t)} className="scroll-mt-20">
              <DisplayHeading as="h2" text={t} className="mb-8 !text-[clamp(1.75rem,3.47vw,3.75rem)]" />
              <Accordion
                items={faqs
                  .filter((f) => f.topic === t)
                  .map((f) => ({
                    id: f.id,
                    title: f.question,
                    badge:
                      f.verify === "official-sources" ? (
                        <span className="rounded-full bg-gobi px-3 py-1 text-[12px] font-medium uppercase tracking-[0.03em] text-charcoal">
                          Verify against official sources
                        </span>
                      ) : undefined,
                    content: (
                      <div className="flex flex-col gap-4">
                        {f.answer.map((p, i) => (
                          <p key={i} className="text-body-lg text-charcoal/85">
                            {p}
                          </p>
                        ))}
                      </div>
                    ),
                  }))}
              />
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="*Still* wondering?" text="Ask your specialist anything, by planner or email. Real answers from someone who has been there." />
    </>
  );
}
