import { adventures as allAdventures } from "@/data/adventures";
import { regions as allRegions } from "@/data/regions";
import { experiences as allExperiences } from "@/data/experiences";
import { festivals as allFestivals } from "@/data/festivals";
import { stays as allStays } from "@/data/stays";
import { tr } from "@/lib/i18n/server";
import type {
  AdventureSlug,
  ExperienceSlug,
  FestivalSlug,
  RegionSlug,
  StaySlug,
} from "@/data/types";

/* Content in the current language (server only). Slugs and other identifiers are never translated. */

export const getAdventures = () => tr(allAdventures);
export const getRegions = () => tr(allRegions);
export const getExperiences = () => tr(allExperiences);
export const getFestivals = () => tr(allFestivals);
export const getStays = () => tr(allStays);

const find = <T extends { slug: string }>(list: T[], slug: string) => list.find((x) => x.slug === slug);

export const getAdventure = (slug: string) => find(getAdventures(), slug as AdventureSlug);
export const getRegion = (slug: string) => find(getRegions(), slug as RegionSlug);
export const getExperience = (slug: string) => find(getExperiences(), slug as ExperienceSlug);
export const getFestival = (slug: string) => find(getFestivals(), slug as FestivalSlug);
export const getStay = (slug: string) => find(getStays(), slug as StaySlug);

/** Resolve a list of slugs, silently skipping unknown ones. */
export function pick<T>(get: (s: string) => T | undefined, slugs: readonly string[]): T[] {
  return slugs.map(get).filter((x): x is T => Boolean(x));
}

export const adventuresInRegion = (slug: RegionSlug) => getAdventures().filter((a) => a.regions.includes(slug));
export const adventuresWithExperience = (slug: ExperienceSlug) =>
  getAdventures().filter((a) => a.experiences.includes(slug));
export const experiencesInRegion = (slug: RegionSlug) => getExperiences().filter((e) => e.regions.includes(slug));

/** Slug lists for generateStaticParams and the sitemap. */
export const slugs = {
  adventures: allAdventures.map((a) => a.slug),
  regions: allRegions.map((r) => r.slug),
  experiences: allExperiences.map((e) => e.slug),
};
