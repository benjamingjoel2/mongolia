import type { Metadata } from "next";
import { initLocale, t } from "@/lib/i18n/server";
import { pageMeta } from "@/lib/seo";
import { getFestivals, getAdventure, pick } from "@/lib/content";
import { images } from "@/lib/images";
import { monthNames } from "@/data/taxonomy";
import { adventureCard } from "@/lib/cards";
import { Hero } from "@/components/sections/Hero";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { ExpandCards } from "@/components/sections/ExpandCards";
import { JoinCarousel } from "@/components/sections/JoinCarousel";
import { CtaBand } from "@/components/sections/CtaBand";
import { DisplayHeading, Emphasis } from "@/components/ui/DisplayHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BlobButton } from "@/components/ui/BlobButton";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata(): Promise<Metadata> {
  await initLocale();
  return pageMeta({
    title: t("Mongolian festivals: Naadam, Golden Eagle, Tsagaan Sar"),
    description: t("When and where to see Naadam, the Golden Eagle Festival in Bayan-Ölgii, Tsagaan Sar, the Khövsgöl Ice Festival and the Thousand Camel Festival. Dates vary each year."),
    path: "/festivals",
  });
}

const plannerFestival = (slug: string) =>
  ["naadam", "golden-eagle-festival", "tsagaan-sar"].includes(slug) ? `/plan-my-adventure?festival=${slug}` : "/plan-my-adventure";

export default async function FestivalsPage() {
  await initLocale();
  const festivals = getFestivals();
  const monthList = (ms: number[]) => ms.map((m) => t(monthNames[m as keyof typeof monthNames])).join(" / ");
  return (
    <>
      <Hero
        size="page"
        image={images.eagleHuntersRiver}
        horizon={70}
        eyebrow={t("5 festivals through the year")}
        title={t("*Festivals* worth the journey")}
        lead={t("Wrestlers and archers in July, eagles in October, families gathering for the lunar new year. Dates move every year, so we confirm them as we plan.")}
      />

      <section data-theme="light" className="gutter pb-20 pt-20 md:pb-[8vw] md:pt-[8vw]">
        <DisplayHeading text={t("The festival *calendar*")} className="mb-12 md:mb-[6vw]" />
        <ExpandCards
          cards={festivals.slice(0, 3).map((f) => ({
            id: f.slug,
            eyebrow: monthList(f.months),
            title: f.name,
            body: f.summary,
            image: f.hero,
            link: { label: t("Read more"), href: `#${f.slug}` },
          }))}
        />
        <ul className="mt-16 grid gap-4 md:grid-cols-2">
          {festivals.slice(3).map((f) => (
            <li key={f.slug} className="flex items-baseline justify-between gap-6 border-t border-charcoal/15 pt-5">
              <ArrowLink href={`#${f.slug}`} arrowClassName="text-felt">
                {f.name}
              </ArrowLink>
              <span className="text-[14px] text-charcoal/70">{monthList(f.months)}</span>
            </li>
          ))}
        </ul>
      </section>

      {festivals.map((f, i) => {
        const advs = pick(getAdventure, f.adventures);
        const dark = i % 2 === 0;
        return (
          <section
            key={f.slug}
            id={f.slug}
            data-theme={dark ? "dark" : "light"}
            className={`scroll-mt-14 py-20 md:py-[8vw] ${dark ? "bg-charcoal text-offwhite" : "bg-sand"}`}
          >
            <div className="gutter grid gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal className={`relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:min-h-[44rem] ${i % 2 ? "lg:order-2" : ""}`}>
                <Photo image={f.hero} sizes="(min-width: 1024px) 46vw, 100vw" />
              </Reveal>
              <div className="flex flex-col">
                <p className="text-micro flex flex-wrap items-center gap-3 uppercase tracking-[0.04em]">
                  <span className={dark ? "text-gobi" : "text-felt"}>{f.location}</span>
                  <span className="rounded-full border border-current px-2 py-0.5 text-[11px] opacity-80">{t("Dates vary · verify yearly")}</span>
                </p>
                <h2 className="text-h1 mt-6">{f.name}</h2>
                <p className="mt-4 text-[18px] font-medium md:text-[20px]">{f.when}</p>
                <p className="mt-10 text-[clamp(1.5rem,2.8vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.03em] text-pretty">
                  <Emphasis text={f.story} />
                </p>
                <div className="mt-10 flex flex-col gap-5">
                  {f.body.map((p, n) => (
                    <p key={n} className={`text-[17px] leading-relaxed md:text-[18px] ${dark ? "text-offwhite/80" : "text-charcoal/80"}`}>
                      {p}
                    </p>
                  ))}
                </div>
                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-[20px] font-medium tracking-[-0.03em]">{t("Highlights")}</h3>
                    <ul className="flex flex-col gap-2 text-[16px] leading-snug">
                      {f.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span aria-hidden className={dark ? "text-gobi" : "text-felt"}>→</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-4 text-[20px] font-medium tracking-[-0.03em]">{t("Tips")}</h3>
                    <ul className="flex flex-col gap-2 text-[16px] leading-snug">
                      {f.tips.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span aria-hidden className={dark ? "text-gobi" : "text-felt"}>→</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-12">
                  <BlobButton href={plannerFestival(f.slug)} variant={dark ? "felt" : "charcoal"}>
                    {t("Plan around {name}", { name: f.name })}
                  </BlobButton>
                </div>
              </div>
            </div>
            {advs.length > 0 && (
              <div className="mt-16 md:mt-[6vw]">
                <p className="gutter text-micro mb-6 uppercase tracking-[0.04em] opacity-70">{t("Adventures for {name}", { name: f.name })}</p>
                <JoinCarousel label={t("Adventures for {name}", { name: f.name })} cards={advs.map(adventureCard)} />
              </div>
            )}
          </section>
        );
      })}

      <StoryBlock label={t("A note on dates")} text={t("Festival dates follow local and lunar calendars and *can shift at short notice*. We confirm them every year before you book.")} />
      <CtaBand />
    </>
  );
}
