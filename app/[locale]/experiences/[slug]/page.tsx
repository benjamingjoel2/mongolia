import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "@/components/i18n/Link";
import { notFound } from "next/navigation";
import { getExperiences, getExperience, getAdventure, getRegion, pick, slugs } from "@/lib/content";
import { initLocale, t } from "@/lib/i18n/server";
import { monthNames } from "@/data/taxonomy";
import { adventureCard, experienceCard } from "@/lib/cards";
import { Hero } from "@/components/sections/Hero";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { JoinCarousel } from "@/components/sections/JoinCarousel";
import { CtaBand } from "@/components/sections/CtaBand";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return slugs.experiences.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  await initLocale();
  const e = getExperience((await params).slug);
  if (!e) return {};
  return pageMeta({ title: e.seo.title, description: e.seo.description, path: `/experiences/${e.slug}`, image: e.hero });
}

export default async function ExperiencePage({ params }: Params) {
  await initLocale();
  const experiences = getExperiences();
  const e = getExperience((await params).slug);
  if (!e) notFound();
  const regionList = pick(getRegion, e.regions);
  const advs = pick(getAdventure, e.adventures);
  const others = experiences.filter((x) => x.slug !== e.slug).slice(0, 6);

  return (
    <>
      <Hero size="page" image={e.hero} eyebrow={t("Experience")} title={e.title} lead={e.summary} />
      <StoryBlock label={t("What it's like")} text={e.story} />

      <section data-theme="light" className="gutter pb-20 md:pb-[8vw]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <aside className="flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
            <div>
              <h2 className="text-micro mb-4 uppercase tracking-[0.04em] text-charcoal/70">{t("Where")}</h2>
              <ul className="flex flex-wrap gap-2">
                {regionList.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/regions/${r.slug}`} className="inline-flex h-10 items-center rounded-blob-pill border border-charcoal/25 px-4 text-[15px] hover:border-charcoal hover:bg-charcoal hover:text-offwhite">
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-micro mb-4 uppercase tracking-[0.04em] text-charcoal/70">{t("When")}</h2>
              <p className="text-[18px] leading-snug">{e.months.map((m) => t(monthNames[m])).join(", ")}</p>
            </div>
            {e.etiquette && e.etiquette.length > 0 && (
              <div className="rounded-[22px] bg-sand p-6 md:p-8">
                <h2 className="mb-4 text-[22px] font-medium tracking-[-0.03em]">{t("With respect")}</h2>
                <ul className="flex flex-col gap-3 text-[16px] leading-snug">
                  {e.etiquette.map((x) => (
                    <li key={x} className="flex gap-3">
                      <span aria-hidden className="text-felt">→</span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
          <div>
            {e.body.map((p, i) => (
              <p key={i} className="text-body-lg mb-6 max-w-[52ch] text-pretty">
                {p}
              </p>
            ))}
            <ul className="mt-12 grid grid-cols-2 gap-[10px] md:gap-[1.95vw]">
              {e.gallery.slice(0, 2).map((g, i) => (
                <li key={g.src} className={i % 2 ? "mt-[10vw] md:mt-[6vw]" : ""}>
                  <Reveal className="relative aspect-[4/5] overflow-hidden bg-steppe-tint">
                    <Photo image={g} sizes="(min-width: 1024px) 30vw, 48vw" />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {advs.length > 0 && (
        <section data-theme="light" className="bg-sand pb-16 pt-14 md:pb-[4vw] md:pt-[6vw]">
          <div className="gutter">
            <DisplayHeading text={t("Adventures *with this*")} />
          </div>
          <div className="mt-10 md:mt-[5vw]">
            <JoinCarousel label={t("Adventures including {name}", { name: e.title })} cards={advs.map(adventureCard)} />
          </div>
        </section>
      )}

      <section data-theme="light" className="pb-16 pt-14 md:pb-[4vw] md:pt-[6vw]">
        <div className="gutter">
          <DisplayHeading text={t("More *experiences*")} />
        </div>
        <div className="mt-10 md:mt-[5vw]">
          <JoinCarousel label={t("More experiences")} cards={others.map(experienceCard)} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
