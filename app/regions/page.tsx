import type { Metadata } from "next";
import { regions, adventuresInRegion } from "@/lib/content";
import { images } from "@/lib/images";
import { regionTile } from "@/lib/cards";
import { Hero } from "@/components/sections/Hero";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { MongoliaMap } from "@/components/sections/MongoliaMap";
import { StoryMosaic } from "@/components/sections/StoryMosaic";
import { CtaBand } from "@/components/sections/CtaBand";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";

export const metadata: Metadata = {
  title: "Regions of Mongolia",
  description:
    "From Ulaanbaatar and Terelj to the Gobi, Lake Khövsgöl, the Altai and Chinggis Khaan's homeland in Khentii. Six regions of Mongolia and how to explore them.",
  alternates: { canonical: "/regions" },
};

export default function RegionsPage() {
  return (
    <>
      <Hero
        size="page"
        image={images.altaiGreenSnow}
        horizon={58}
        eyebrow="6 regions · one country the size of Western Europe"
        title="*Six* corners of one great sky"
        lead="Desert and taiga, glaciers and grassland. Most first trips combine two regions; your specialist will help you choose."
      />
      <StoryBlock
        label="Getting your bearings"
        text="Mongolia is vast and *gloriously empty*: three million people, more horses than cars, and roads that become tracks within an hour of the capital."
      />
      <section data-theme="light" className="gutter pb-20 md:pb-[8vw]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:items-center lg:gap-16">
          <div>
            <DisplayHeading text="Pick a *region*" />
            <ul className="mt-10 flex flex-col gap-4">
              {regions.map((r) => (
                <li key={r.slug} className="flex items-baseline justify-between gap-4 border-t border-charcoal/15 pt-4">
                  <ArrowLink href={`/regions/${r.slug}`} arrowClassName="text-felt">
                    {r.name}
                  </ArrowLink>
                  <span className="text-[14px] text-charcoal/70">{adventuresInRegion(r.slug).length} adventures</span>
                </li>
              ))}
            </ul>
          </div>
          <MongoliaMap markers={regions.map((r) => ({ id: r.slug, label: r.shortName, x: r.map.x, y: r.map.y, href: `/regions/${r.slug}` }))} />
        </div>
      </section>
      <section data-theme="light" className="gutter pb-24 md:pb-[10vw]">
        <h2 className="sr-only">All regions</h2>
        <StoryMosaic items={regions.map(regionTile)} syncUrl={false} />
      </section>
      <CtaBand title="*Two* regions, one trip?" text="Tell us what draws you and we'll design a route that links them without endless driving." />
    </>
  );
}
