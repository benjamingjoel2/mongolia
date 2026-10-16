import type { Activity, Adventure, Difficulty, RegionSlug, Season, TripStyle } from "@/data/types";
import { activityLabels, difficultyLabels, durationBuckets, seasonLabels, styleLabels, type DurationBucket } from "@/data/taxonomy";

export type FilterKey = "region" | "activity" | "duration" | "difficulty" | "season" | "style";

export type FilterState = Record<FilterKey, string[]>;

export const emptyFilters = (): FilterState => ({
  region: [],
  activity: [],
  duration: [],
  difficulty: [],
  season: [],
  style: [],
});

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterGroup {
  key: FilterKey;
  label: string;
  options: FilterOption[];
}

export function buildFilterGroups(regions: { slug: RegionSlug; shortName: string }[], adventures: Adventure[]): FilterGroup[] {
  const usedActivities = new Set(adventures.flatMap((a) => a.activities));
  return [
    { key: "region", label: "Region", options: regions.map((r) => ({ value: r.slug, label: r.shortName })) },
    {
      key: "activity",
      label: "Activity",
      options: (Object.keys(activityLabels) as Activity[])
        .filter((a) => usedActivities.has(a))
        .map((a) => ({ value: a, label: activityLabels[a] })),
    },
    { key: "duration", label: "Duration", options: durationBuckets.map((d) => ({ value: d.id, label: d.label })) },
    {
      key: "difficulty",
      label: "Difficulty",
      options: (Object.keys(difficultyLabels) as Difficulty[]).map((d) => ({ value: d, label: difficultyLabels[d].label })),
    },
    {
      key: "season",
      label: "Season",
      options: (Object.keys(seasonLabels) as Season[]).map((s) => ({ value: s, label: seasonLabels[s] })),
    },
    {
      key: "style",
      label: "Group or private",
      options: (Object.keys(styleLabels) as TripStyle[]).map((s) => ({ value: s, label: styleLabels[s] })),
    },
  ];
}

const inBucket = (days: number, id: string) => {
  const b = durationBuckets.find((x: DurationBucket) => x.id === id);
  return b ? days >= b.min && days <= b.max : false;
};

/** OR within a group, AND across groups. */
export function applyFilters(list: Adventure[], f: FilterState): Adventure[] {
  return list.filter((a) => {
    if (f.region.length && !a.regions.some((r) => f.region.includes(r))) return false;
    if (f.activity.length && !a.activities.some((x) => f.activity.includes(x))) return false;
    if (f.duration.length && !f.duration.some((id) => inBucket(a.days, id))) return false;
    if (f.difficulty.length && !f.difficulty.includes(a.difficulty)) return false;
    if (f.season.length && !a.seasons.some((s) => f.season.includes(s))) return false;
    if (f.style.length && !a.styles.some((s) => f.style.includes(s))) return false;
    return true;
  });
}

export type SortKey = "recommended" | "price-asc" | "price-desc" | "days-asc" | "days-desc";

export function sortAdventures(list: Adventure[], sort: SortKey): Adventure[] {
  const out = [...list];
  switch (sort) {
    case "price-asc":
      return out.sort((a, b) => a.priceFromUSD - b.priceFromUSD);
    case "price-desc":
      return out.sort((a, b) => b.priceFromUSD - a.priceFromUSD);
    case "days-asc":
      return out.sort((a, b) => a.days - b.days);
    case "days-desc":
      return out.sort((a, b) => b.days - a.days);
    default:
      return out;
  }
}

const KEYS: FilterKey[] = ["region", "activity", "duration", "difficulty", "season", "style"];

export function filtersFromSearch(search: string, groups: FilterGroup[]): FilterState {
  const p = new URLSearchParams(search);
  const f = emptyFilters();
  for (const k of KEYS) {
    const allowed = new Set(groups.find((g) => g.key === k)?.options.map((o) => o.value));
    f[k] = (p.get(k)?.split(",") ?? []).filter((v) => allowed.has(v));
  }
  return f;
}

export function filtersToSearch(f: FilterState, sort: SortKey): string {
  const p = new URLSearchParams();
  for (const k of KEYS) if (f[k].length) p.set(k, f[k].join(","));
  if (sort !== "recommended") p.set("sort", sort);
  const s = p.toString();
  return s ? `?${s.replace(/%2C/g, ",")}` : "";
}

export const countActive = (f: FilterState) => KEYS.reduce((n, k) => n + f[k].length, 0);
