import type { Metadata } from "next";
import { initLocale, t, tr } from "@/lib/i18n/server";
import { pageMeta } from "@/lib/seo";
import Link from "@/components/i18n/Link";
import { months as rawMonths } from "@/data/months";
import { monthNames } from "@/data/taxonomy";
import { msg } from "@/lib/i18n/core";
import { getLocale } from "@/lib/i18n/server";
import { monthShortName } from "@/lib/i18n/config";
import { getFestivals, getRegions } from "@/lib/content";
import { images } from "@/lib/images";
import { Hero } from "@/components/sections/Hero";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { CtaBand } from "@/components/sections/CtaBand";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Photo } from "@/components/ui/Photo";
import { ArrowLink } from "@/components/ui/ArrowLink";

export async function generateMetadata(): Promise<Metadata> {
  await initLocale();
  return pageMeta({
    title: t("When to go to Mongolia: a month-by-month guide"),
    description: t("Weather, temperatures, festivals and the best regions for every month in Mongolia. The main season runs roughly June to September; winter trips suit experienced travellers."),
    path: "/when-to-go",
  });
}

const ratingLabel = ["", msg("For the hardy"), msg("Quiet and cold"), msg("Shoulder season"), msg("Great"), msg("Ideal")];
/** Anchor ids stay English (#january) in every language so links keep working. */
const anchor = (m: number) => monthNames[m as keyof typeof monthNames].toLowerCase();

export default async function WhenToGoPage() {
  await initLocale();
  const locale = getLocale();
  const months = tr(rawMonths);
  const festivalName = new Map(getFestivals().map((f) => [f.slug, f.name]));
  const regionName = new Map(getRegions().map((r) => [r.slug, r.shortName]));
  const minT = -30;
  const maxT = 32;
  const pct = (t: number) => ((t - minT) / (maxT - minT)) * 100;

  return (
    <>
      <Hero
        size="page"
        image={images.altaiGoldenPlain}
        horizon={62}
        eyebrow={t("Month by month")}
        title={t("*When* to go")}
        lead={t("Roughly June to September is the main season: long days, green steppe and warm nights. Winter brings crystal skies, frozen lakes and festivals for those who love the cold.")}
      />

      {/* At a glance: temperature bars */}
      <section data-theme="light" className="gutter py-20 md:py-[8vw]">
        <DisplayHeading text={t("The year *at a glance*")} className="mb-4" />
        <p className="mb-12 max-w-[56ch] text-[16px] text-charcoal/70 md:mb-16 md:text-[18px]">
          {t("Typical daytime highs and night lows on the central steppe around Ulaanbaatar. The Gobi runs warmer by day, the mountains and the north colder. Treat these as a guide, not a forecast.")}
        </p>
        <ol className="grid grid-cols-1 gap-1 md:grid-cols-12 md:gap-2">
          {months.map((m) => (
            <li key={m.month} className="grid grid-cols-[3.5rem_1fr_6rem] items-center gap-3 md:flex md:flex-col md:items-stretch md:gap-3">
              <a href={`#${anchor(m.month)}`} className="text-[15px] font-medium hover:text-felt md:order-3 md:text-center">
                {monthShortName(m.month, locale)}
              </a>
              <div className="relative h-6 rounded-full bg-charcoal/[0.06] md:order-1 md:h-56 md:w-full md:rounded-[12px]" aria-hidden>
                <span
                  className="absolute inset-y-1 rounded-full bg-gradient-to-r from-sky via-gobi to-felt md:hidden"
                  style={{
                    left: `${pct(m.nightTempC)}%`,
                    right: `${100 - pct(m.dayTempC[1])}%`,
                  }}
                />
                <span
                  className="absolute inset-x-1.5 hidden rounded-[8px] bg-gradient-to-t from-sky via-gobi to-felt md:block"
                  style={{ bottom: `${pct(m.nightTempC)}%`, top: `${100 - pct(m.dayTempC[1])}%` }}
                />
              </div>
              <span className="text-right text-[13px] tabular-nums text-charcoal/70 md:order-2 md:text-center">
                {m.nightTempC}° / {m.dayTempC[1]}°
              </span>
              <span className="sr-only">
                {t("{month}: nights around {night}°C, days up to {day}°C.", { month: m.name, night: m.nightTempC, day: m.dayTempC[1] })} {t(ratingLabel[m.rating])}.
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-[13px] text-charcoal/70">{t("Night low / day high, °C. Indicative only.")}</p>
      </section>

      {/* Month by month */}
      <section data-theme="light" className="gutter bg-sand py-20 md:py-[8vw]">
        <DisplayHeading text={t("Month *by* month")} className="mb-12 md:mb-16" />
        <ol className="flex flex-col">
          {months.map((m) => (
            <li key={m.month} id={anchor(m.month)} className="grid scroll-mt-20 gap-6 border-t border-charcoal/15 py-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)_minmax(0,1fr)] md:gap-10 md:py-12">
              <div className="flex items-start gap-5">
                <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-[14px] bg-steppe-tint md:w-32">
                  <Photo image={m.image} sizes="128px" quality={60} />
                </div>
                <div>
                  <h3 className="text-h2">{m.name}</h3>
                  <p className="mt-3 flex items-center gap-2 text-[14px]">
                    <span className="flex gap-1" aria-hidden>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span key={n} className={`size-2.5 rounded-full ${n <= m.rating ? "bg-felt" : "bg-charcoal/15"}`} />
                      ))}
                    </span>
                    {t(ratingLabel[m.rating])}
                  </p>
                </div>
              </div>
              <p className="text-body-lg text-pretty">{m.conditions}</p>
              <div className="flex flex-col gap-3 text-[15px]">
                <p>
                  <span className="text-charcoal/70">{t("Days")}</span> {t("{min}° to {max}°C", { min: m.dayTempC[0], max: m.dayTempC[1] })} ·{" "}
                  <span className="text-charcoal/70">{t("Nights")}</span> {m.nightTempC}°C
                </p>
                {m.bestRegions.length > 0 && (
                  <p>
                    <span className="text-charcoal/70">{t("Best for")}</span> {m.bestRegions.map((r) => regionName.get(r)).join(", ")}
                  </p>
                )}
                {m.festivals.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {m.festivals.map((f) => (
                      <li key={f}>
                        <Link href={`/festivals#${f}`} className="inline-flex rounded-full bg-gobi px-3 py-1 text-[13px] font-medium text-charcoal hover:bg-gobi-tint">
                          {festivalName.get(f)} · {t("verify yearly")}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <StoryBlock label={t("Winter")} text={t("Winter trips are *for experienced travellers*: nights can fall below −30°C. The reward is silence, hoar frost, frozen lakes and the warmth of Tsagaan Sar.")}>
        <ArrowLink href="/adventures/winter-mongolia-tsagaan-sar" arrowClassName="text-felt">
          {t("Winter Mongolia: Tsagaan Sar and frozen landscapes")}
        </ArrowLink>
      </StoryBlock>
      <CtaBand />
    </>
  );
}
