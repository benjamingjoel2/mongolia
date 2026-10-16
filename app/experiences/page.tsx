import type { Metadata } from "next";
import { experiences, getRegion, pick } from "@/lib/content";
import { images } from "@/lib/images";
import { monthNames } from "@/data/taxonomy";
import { Hero } from "@/components/sections/Hero";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { StoryMosaic, type MosaicItem } from "@/components/sections/StoryMosaic";
import { CtaBand } from "@/components/sections/CtaBand";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export const metadata: Metadata = {
  title: "Experiences: ger stays, horses, eagles and Naadam",
  description:
    "Stay with nomad families, ride Mongolian horses, trek with Bactrian camels, meet eagle hunters, hear throat singing and sleep under the darkest skies in Asia.",
  alternates: { canonical: "/experiences" },
};

export default function ExperiencesPage() {
  const items: MosaicItem[] = experiences.map((e) => ({
    id: e.slug,
    title: e.title,
    image: e.hero,
    story: {
      label: pick(getRegion, e.regions).map((r) => r.shortName).join(" · ") || "Across Mongolia",
      story: e.story,
      facts: [`Best: ${e.months.slice(0, 1).map((m) => monthNames[m]).join("")}${e.months.length > 1 ? ` to ${monthNames[e.months[e.months.length - 1]]}` : ""}`],
      links: [
        { label: "Read more", href: `/experiences/${e.slug}` },
        { label: "Plan my adventure", href: "/plan-my-adventure" },
      ],
    },
  }));
  return (
    <>
      <Hero
        size="page"
        image={images.teaWithHerders}
        horizon={72}
        eyebrow="10 ways to live the steppe"
        title="*Experiences* under the open sky"
        lead="Not shows put on for visitors: everyday nomadic life, shared with respect and on the herders' terms."
      />
      <StoryBlock text="The best moments are often the quiet ones: *milk tea in a stranger's ger*, a horse that finally trusts you, a sky so full of stars it looks unreal." />
      <section data-theme="light" className="gutter pb-24 md:pb-[10vw]">
        <DisplayHeading text="Choose your *moments*" className="mb-12 md:mb-[6vw]" />
        <StoryMosaic items={items} />
      </section>
      <CtaBand />
    </>
  );
}
