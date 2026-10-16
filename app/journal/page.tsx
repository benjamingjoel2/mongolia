import type { Metadata } from "next";
import { getPosts } from "@/data/posts";
import { images } from "@/lib/images";
import { Hero } from "@/components/sections/Hero";
import { StoryMosaic } from "@/components/sections/StoryMosaic";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Journal",
  description: "Stories, guides and honest advice for planning a trip to Mongolia, from Naadam to life in a ger.",
  alternates: { canonical: "/journal" },
};

const fmt = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function JournalPage() {
  const posts = getPosts();
  return (
    <>
      <Hero size="page" image={images.milkyWaySteppe} horizon={78} eyebrow="Journal" title="Notes from *the steppe*" lead="Guides, stories and straight talk for planning your trip to Mongolia." />
      <section data-theme="light" className="gutter py-20 md:py-[8vw]">
        <StoryMosaic
          syncUrl={false}
          items={posts.map((p) => ({
            id: p.slug,
            title: p.title,
            image: p.hero,
            href: `/journal/${p.slug}`,
            tags: p.tags.slice(0, 2),
            meta: `${fmt(p.date)} · ${p.readingMinutes} min read`,
          }))}
        />
      </section>
      <CtaBand />
    </>
  );
}
