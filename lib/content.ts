import { adventures } from "@/data/adventures";
import { regions } from "@/data/regions";
import { experiences } from "@/data/experiences";
import { festivals } from "@/data/festivals";
import { stays } from "@/data/stays";
import type {
  AdventureSlug,
  ExperienceSlug,
  FestivalSlug,
  RegionSlug,
  StaySlug,
} from "@/data/types";

const bySlug = <T extends { slug: string }>(list: T[]) => new Map(list.map((x) => [x.slug, x]));

const adventureMap = bySlug(adventures);
const regionMap = bySlug(regions);
const experienceMap = bySlug(experiences);
const festivalMap = bySlug(festivals);
const stayMap = bySlug(stays);

export const getAdventure = (slug: string) => adventureMap.get(slug as AdventureSlug);
export const getRegion = (slug: string) => regionMap.get(slug as RegionSlug);
export const getExperience = (slug: string) => experienceMap.get(slug as ExperienceSlug);
export const getFestival = (slug: string) => festivalMap.get(slug as FestivalSlug);
export const getStay = (slug: string) => stayMap.get(slug as StaySlug);

/** Resolve a list of slugs, silently skipping unknown ones. */
export function pick<T>(get: (s: string) => T | undefined, slugs: readonly string[]): T[] {
  return slugs.map(get).filter((x): x is T => Boolean(x));
}

export const adventuresInRegion = (slug: RegionSlug) => adventures.filter((a) => a.regions.includes(slug));
export const adventuresWithExperience = (slug: ExperienceSlug) =>
  adventures.filter((a) => a.experiences.includes(slug));
export const experiencesInRegion = (slug: RegionSlug) => experiences.filter((e) => e.regions.includes(slug));

export { adventures, regions, experiences, festivals, stays };
