import { regions } from "@/data/regions";
import { months } from "@/data/months";
import type { MonthHint, RegionOption } from "@/components/planner/steps";

export function plannerProps(): { regions: RegionOption[]; monthHints: MonthHint[] } {
  return {
    regions: regions.map((r) => ({ slug: r.slug, name: r.shortName, tagline: r.tagline, image: r.hero })),
    monthHints: months.map((m) => ({ month: m.month, rating: m.rating })),
  };
}
