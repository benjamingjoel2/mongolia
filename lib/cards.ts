import type { Adventure, Experience, Region } from "@/data/types";
import type { CarouselCard } from "@/components/sections/JoinCarousel";
import type { MosaicItem } from "@/components/sections/StoryMosaic";
import { difficultyLabels } from "@/data/taxonomy";
import { t } from "@/lib/i18n/server";

/* Server-side card builders: data arrives translated; labels are translated here. */

/** Adventure → carousel card ("Join" track style). */
export function adventureCard(a: Adventure): CarouselCard {
  return {
    id: a.slug,
    title: a.title,
    stat: `${t("{n} days", { n: a.days })} · ${t(difficultyLabels[a.difficulty].label)}`,
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
