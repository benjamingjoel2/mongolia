import type { Metadata } from "next";
import { initLocale, t } from "@/lib/i18n/server";
import { pageMeta } from "@/lib/seo";
import { getAdventures, getRegions } from "@/lib/content";
import { images } from "@/lib/images";
import { planHref } from "@/config/site";
import { Hero } from "@/components/sections/Hero";
import { AdventureExplorer } from "@/components/sections/AdventureExplorer";
import { JoinCarousel } from "@/components/sections/JoinCarousel";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";

export async function generateMetadata(): Promise<Metadata> {
  await initLocale();
  return pageMeta({
    title: t("Mongolia adventures: small-group and private trips"),
    description: t("Horse treks in the Orkhon, camel treks in the Gobi, eagle festivals in the Altai and Naadam in July. Filter Mongolia adventures by region, activity, length, difficulty, season and style."),
    path: "/adventures",
  });
}

export default async function AdventuresPage() {
  await initLocale();
  const adventures = getAdventures();
  const regions = getRegions();
  return (
    <>
      <Hero
        size="page"
        image={images.steppeRiverGers}
        horizon={70}
        eyebrow={t("{n} adventures · group or private", { n: adventures.length })}
        title={t("*All* adventures")}
        lead={t("Every route is a starting point. Your specialist shapes the days, the camps and the pace around you.")}
      >
        <ArrowLink href={planHref} arrowClassName="text-gobi">
          {t("Plan a tailor-made adventure")}
        </ArrowLink>
      </Hero>

      <section data-theme="light" className="gutter pb-24 md:pb-[8vw]">
        <AdventureExplorer adventures={adventures} regions={regions} />
      </section>

      <section data-theme="light" className="bg-sand pb-16 pt-14 md:pb-[4vw] md:pt-[6vw]">
        <div className="gutter">
          <DisplayHeading text={t("*Can't* decide?")} />
        </div>
        <div className="mt-10 md:mt-[5vw]">
          <JoinCarousel
            label={t("Help choosing an adventure")}
            cards={[
              {
                id: "plan",
                title: t("*Tell* us what you love, we'll draw the route…"),
                stat: t("Five quick steps, no obligation"),
                href: planHref,
                tone: "felt",
              },
              { id: "when", title: t("*Pick* the month first…"), stat: t("Month-by-month guide"), href: "/when-to-go", image: images.altaiGoldenPlain },
              { id: "regions", title: t("*Start* with a region…"), stat: t("6 regions"), href: "/regions", image: images.lakeTaiga },
              { id: "festivals", title: t("*Build* it around a festival…"), stat: t("Naadam, eagles, Tsagaan Sar"), href: "/festivals", image: images.eagleHuntersGroup },
              { id: "journal", title: t("*Read* Gobi vs the Altai…"), stat: t("Journal"), href: "/journal/gobi-vs-altai-first-trip", image: images.duneClimber },
            ]}
          />
        </div>
      </section>
    </>
  );
}
