import type { Adventure, Experience, Region } from "@/data/types";
import type { CarouselCard } from "@/components/sections/JoinCarousel";
import type { MosaicItem } from "@/components/sections/StoryMosaic";
import { difficultyLabels } from "@/data/taxonomy";

/** Adventure → carousel card ("Join" track style). */
export function adventureCard(a: Adventure): CarouselCard {
  return {
    id: a.slug,
    title: a.title,
    stat: `${a.days} days · ${difficultyLabels[a.difficulty].label}`,
    href: `/adventures/${a.slug}`,
    image: a.hero,
  };
}

export function experienceCard(e: Experience): CarouselCard {
  return { id: e.slug, title: e.title, stat: e.summary, href: `/experiences/${e.slug}`, image: e.hero };
}

export function regionTile(r: Region): MosaicItem {
  return { id: r.slug, title: r.name, shortTitle: r.shortName, image: r.hero, href: `/regions/${r.slug}`, meta: r.tagline };
}
