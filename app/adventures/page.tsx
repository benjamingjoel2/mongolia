import type { Metadata } from "next";
import { adventures, regions } from "@/lib/content";
import { images } from "@/lib/images";
import { planHref } from "@/config/site";
import { Hero } from "@/components/sections/Hero";
import { AdventureExplorer } from "@/components/sections/AdventureExplorer";
import { JoinCarousel } from "@/components/sections/JoinCarousel";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";

export const metadata: Metadata = {
  title: "Mongolia adventures: small-group and private trips",
  description:
    "Horse treks in the Orkhon, camel treks in the Gobi, eagle festivals in the Altai and Naadam in July. Filter Mongolia adventures by region, activity, length, difficulty, season and style.",
  alternates: { canonical: "/adventures" },
};

export default function AdventuresPage() {
  return (
    <>
      <Hero
        size="page"
        image={images.steppeRiverGers}
        horizon={70}
        eyebrow={`${adventures.length} adventures · group or private`}
        title="*All* adventures"
        lead="Every route is a starting point. Your specialist shapes the days, the camps and the pace around you."
      >
        <ArrowLink href={planHref} arrowClassName="text-gobi">
          Plan a tailor-made adventure
        </ArrowLink>
      </Hero>

      <section data-theme="light" className="gutter pb-24 md:pb-[8vw]">
        <AdventureExplorer adventures={adventures} regions={regions} />
      </section>

      <section data-theme="light" className="bg-sand pb-16 pt-14 md:pb-[4vw] md:pt-[6vw]">
        <div className="gutter">
          <DisplayHeading text="*Can't* decide?" />
        </div>
        <div className="mt-10 md:mt-[5vw]">
          <JoinCarousel
            label="Help choosing an adventure"
            cards={[
              {
                id: "plan",
                title: "*Tell* us what you love, we'll draw the route…",
                stat: "Five quick steps, no obligation",
                href: planHref,
                tone: "felt",
              },
              { id: "when", title: "*Pick* the month first…", stat: "Month-by-month guide", href: "/when-to-go", image: images.altaiGoldenPlain },
              { id: "regions", title: "*Start* with a region…", stat: "6 regions", href: "/regions", image: images.lakeTaiga },
              { id: "festivals", title: "*Build* it around a festival…", stat: "Naadam, eagles, Tsagaan Sar", href: "/festivals", image: images.eagleHuntersGroup },
              { id: "journal", title: "*Read* Gobi vs the Altai…", stat: "Journal", href: "/journal/gobi-vs-altai-first-trip", image: images.duneClimber },
            ]}
          />
        </div>
      </section>
    </>
  );
}
