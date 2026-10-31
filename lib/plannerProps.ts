import { regions } from "@/data/regions";
import { months } from "@/data/months";
import { adventures } from "@/data/adventures";
import { tr } from "@/lib/i18n/server";
import type { MonthHint, RegionOption } from "@/components/planner/steps";

/** Planner props, translated on the server so the browser gets only what it shows. */
export function plannerProps(): { regions: RegionOption[]; monthHints: MonthHint[]; adventureTitles: Record<string, string> } {
  return {
    regions: tr(regions).map((r) => ({ slug: r.slug, name: r.shortName, tagline: r.tagline, image: r.hero })),
    monthHints: months.map((m) => ({ month: m.month, rating: m.rating })),
    adventureTitles: Object.fromEntries(tr(adventures).map((a) => [a.slug, a.title])),
  };
}
