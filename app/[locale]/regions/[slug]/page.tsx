import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getRegions, getRegion, adventuresInRegion, experiencesInRegion, slugs } from "@/lib/content";
import { initLocale, t, getLocale } from "@/lib/i18n/server";
import { monthShortName } from "@/lib/i18n/config";
import { monthNames } from "@/data/taxonomy";
import type { MonthNumber } from "@/data/types";
import { adventureCard, experienceCard } from "@/lib/cards";
import { Hero } from "@/components/sections/Hero";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { ExpandCards } from "@/components/sections/ExpandCards";
import { JoinCarousel } from "@/components/sections/JoinCarousel";
import { MongoliaMap } from "@/components/sections/MongoliaMap";
import { CtaBand } from "@/components/sections/CtaBand";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return slugs.regions.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  await initLocale();
  const r = getRegion((await params).slug);
  if (!r) return {};
  return pageMeta({ title: r.seo.title, description: r.seo.description, path: `/regions/${r.slug}`, image: r.hero });
}

export default async function RegionPage({ params }: Params) {
  await initLocale();
  const locale = getLocale();
  const regions = getRegions();
  const r = getRegion((await params).slug);
  if (!r) notFound();
  const advs = adventuresInRegion(r.slug);
  const exps = experiencesInRegion(r.slug);

  return (
    <>
      <Hero size="page" image={r.hero} eyebrow={r.shortName} title={r.name} lead={r.tagline}>
        <ArrowLink href={`/plan-my-adventure?region=${r.slug}`} arrowClassName="text-gobi">
          {t("Plan a trip here")}
        </ArrowLink>
      </Hero>

      <StoryBlock label={r.shortName} text={r.story}>
        <p className="text-body-lg max-w-[50ch] text-charcoal/80">{r.summary}</p>
      </StoryBlock>

      <section data-theme="light" className="gutter pb-20 md:pb-[8vw]">
        <DisplayHeading text={t("Places *to know*")} className="mb-12 md:mb-[6vw]" />
        <ExpandCards
          layout={r.places.length === 3 ? "podium" : "stack"}
          cards={r.places.map((p, i) => ({ id: `${r.slug}-${i}`, eyebrow: r.shortName, title: p.name, body: p.description, image: p.image }))}
        />
      </section>

      <section data-theme="light" className="gutter bg-sand py-20 md:py-[8vw]">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-h2 mb-8">{t("Highlights")}</h2>
            <ol className="flex flex-col">
              {r.highlights.map((h, i) => (
                <li key={h} className="flex items-baseline gap-4 border-t border-charcoal/15 py-4">
                  <span className="text-micro tabular-nums text-felt">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[19px] leading-snug tracking-[-0.02em] md:text-[22px]">{h}</span>
                </li>
              ))}
            </ol>
            <h2 className="text-h2 mb-6 mt-14">{t("Best months")}</h2>
            <ul className="grid grid-cols-6 gap-1.5 md:grid-cols-12" aria-label={t("Months of the year, best months highlighted")}>
              {(Object.keys(monthNames).map(Number) as MonthNumber[]).map((m) => {
                const best = r.bestMonths.includes(m);
                return (
                  <li
                    key={m}
                    className={`grid h-12 place-items-center rounded-[10px] text-[14px] font-medium ${best ? "bg-steppe-deep text-offwhite" : "bg-offwhite/70 text-charcoal/70"}`}
                  >
                    <span aria-hidden>{monthShortName(m, locale)}</span>
                    <span className="sr-only">{best ? t("{month}, recommended", { month: t(monthNames[m]) }) : t(monthNames[m])}</span>
                  </li>
                );
              })}
            </ul>
            <h2 className="text-h2 mb-6 mt-14">{t("Getting there")}</h2>
            <p className="text-body-lg max-w-[50ch]">{r.gettingThere}</p>
          </div>
          <MongoliaMap
            markers={regions.map((x) => ({ id: x.slug, label: x.shortName, x: x.map.x, y: x.map.y, href: `/regions/${x.slug}`, active: x.slug === r.slug }))}
            label={t("Map showing {name}", { name: r.name })}
          />
        </div>
      </section>

      {advs.length > 0 && (
        <section data-theme="light" className="pb-16 pt-14 md:pb-[4vw] md:pt-[6vw]">
          <div className="gutter">
            <DisplayHeading text={t("Adventures in *{name}*", { name: locale === "en" ? r.shortName.replace(/^The /, "the ") : r.shortName })} />
          </div>
          <div className="mt-10 md:mt-[5vw]">
            <JoinCarousel label={t("Adventures in {name}", { name: r.name })} cards={advs.map(adventureCard)} />
          </div>
        </section>
      )}

      {exps.length > 0 && (
        <section data-theme="light" className="bg-sand pb-16 pt-14 md:pb-[4vw] md:pt-[6vw]">
          <div className="gutter">
            <DisplayHeading text={t("Things *to do* here")} />
          </div>
          <div className="mt-10 md:mt-[5vw]">
            <JoinCarousel label={t("Experiences in {name}", { name: r.name })} cards={exps.map(experienceCard)} />
          </div>
        </section>
      )}

      <CtaBand href={`/plan-my-adventure?region=${r.slug}`} title={t("*{name}*, your way", { name: r.shortName })} />
    </>
  );
}
