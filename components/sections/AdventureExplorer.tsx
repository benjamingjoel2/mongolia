"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Adventure, Region } from "@/data/types";
import { difficultyLabels } from "@/data/taxonomy";
import {
  applyFilters,
  buildFilterGroups,
  countActive,
  emptyFilters,
  filtersFromSearch,
  filtersToSearch,
  sortAdventures,
  type FilterKey,
  type FilterState,
  type SortKey,
} from "@/lib/filters";
import { planHref } from "@/config/site";
import { cn } from "@/lib/cn";
import { Check } from "@/components/ui/icons";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { StoryMosaic, type MosaicItem } from "./StoryMosaic";

const sorts: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "days-asc", label: "Shortest first" },
  { value: "days-desc", label: "Longest first" },
];

/**
 * Listing with the six filters. Triggers are styled like the header nav; each opens a
 * tile row of options that slides down, echoing the reference's slide-out switcher.
 * State syncs to the URL (?region=gobi&season=summer) so filtered views are shareable.
 */
export function AdventureExplorer({ adventures, regions }: { adventures: Adventure[]; regions: Region[] }) {
  const groups = useMemo(() => buildFilterGroups(regions, adventures), [regions, adventures]);
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [openKey, setOpenKey] = useState<FilterKey | null>(null);
  const [ready, setReady] = useState(false);
  const panelId = useId();

  // Read filters from the URL on load and on back/forward.
  useEffect(() => {
    const read = () => {
      setFilters(filtersFromSearch(window.location.search, groups));
      const s = new URLSearchParams(window.location.search).get("sort") as SortKey | null;
      setSort(sorts.some((x) => x.value === s) ? (s as SortKey) : "recommended");
      setReady(true);
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, [groups]);

  useEffect(() => {
    if (!ready) return;
    const next = `${window.location.pathname}${filtersToSearch(filters, sort)}`;
    if (next !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(window.history.state, "", next);
    }
  }, [filters, sort, ready]);

  const regionName = useMemo(() => new Map(regions.map((r) => [r.slug, r.shortName])), [regions]);
  const results = useMemo(() => sortAdventures(applyFilters(adventures, filters), sort), [adventures, filters, sort]);
  const active = countActive(filters);

  const toggle = (key: FilterKey, value: string) =>
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }));

  const items: MosaicItem[] = results.map((a) => ({
    id: a.slug,
    title: a.title,
    shortTitle: a.shortTitle,
    image: a.hero,
    href: `/adventures/${a.slug}`,
    tags: [a.regions.map((r) => regionName.get(r)).join(" · "), `${a.days} days`],
    meta: `${a.days} days · ${difficultyLabels[a.difficulty].label}`,
    priceFromUSD: a.priceFromUSD,
  }));

  const openGroup = groups.find((g) => g.key === openKey);

  return (
    <div>
      {/* Filter bar */}
      <div className="sticky top-14 z-30 -mx-[var(--gutter)] border-y border-charcoal/10 bg-offwhite/95 backdrop-blur-md">
        <div className="gutter flex items-center gap-1 overflow-x-auto no-scrollbar">
          <span className="text-nav mr-2 hidden shrink-0 text-charcoal/70 md:inline">Filter</span>
          {groups.map((g) => {
            const n = filters[g.key].length;
            const isOpen = openKey === g.key;
            return (
              <button
                key={g.key}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenKey(isOpen ? null : g.key)}
                className={cn(
                  "text-nav relative flex h-14 shrink-0 items-center gap-2 px-3 transition-colors md:px-4",
                  isOpen ? "text-felt" : "hover:text-felt",
                )}
              >
                {g.label}
                {n > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-blob bg-charcoal px-1 text-[11px] text-offwhite">
                    {n}
                  </span>
                )}
                <svg aria-hidden viewBox="0 0 10 6" className={cn("w-2.5 transition-transform duration-300", isOpen && "rotate-180")}>
                  <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                {isOpen && (
                  <motion.span layoutId="filter-underline" className="absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-felt md:inset-x-4" />
                )}
              </button>
            );
          })}
          <div className="ml-auto flex shrink-0 items-center gap-4 pl-4">
            <label className="flex items-center gap-2 text-[14px]">
              <span className="sr-only md:not-sr-only">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-9 rounded-full border border-charcoal/20 bg-transparent px-3 text-[14px]"
              >
                {sorts.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {openGroup && (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-charcoal/10"
            >
              <fieldset className="gutter flex flex-wrap gap-2 py-4 md:py-5">
                <legend className="sr-only">{openGroup.label}</legend>
                {openGroup.options.map((o, i) => {
                  const on = filters[openGroup.key].includes(o.value);
                  return (
                    <motion.button
                      key={o.value}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(openGroup.key, o.value)}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "inline-flex h-10 items-center gap-2 rounded-blob-pill border px-4 text-[15px] transition-colors duration-300 md:h-11 md:text-[16px]",
                        on ? "border-charcoal bg-charcoal text-offwhite" : "border-charcoal/25 hover:border-charcoal",
                      )}
                    >
                      {on && <Check className="size-4" />}
                      {o.label}
                    </motion.button>
                  );
                })}
              </fieldset>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Result summary */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 py-8 md:py-12">
        <h2 className="text-h2" aria-live="polite">
          {results.length} {results.length === 1 ? "adventure" : "adventures"}
        </h2>
        {active > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {groups.flatMap((g) =>
              filters[g.key].map((v) => (
                <button
                  key={`${g.key}-${v}`}
                  type="button"
                  onClick={() => toggle(g.key, v)}
                  className="inline-flex h-8 items-center gap-2 rounded-full bg-sand px-3 text-[13px] hover:bg-gobi-tint"
                  aria-label={`Remove filter ${g.options.find((o) => o.value === v)?.label}`}
                >
                  {g.options.find((o) => o.value === v)?.label}
                  <span aria-hidden>×</span>
                </button>
              )),
            )}
            <button
              type="button"
              onClick={() => setFilters(emptyFilters())}
              className="ml-2 text-[14px] underline underline-offset-4 hover:text-felt"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {results.length > 0 ? (
        <StoryMosaic key={results.map((r) => r.slug).join("|")} items={items} numbered syncUrl={false} />
      ) : (
        <div className="py-20 text-center">
          <p className="text-h2 mx-auto max-w-[20ch]">Nothing fits that exact mix, yet.</p>
          <p className="text-body-lg mx-auto mt-6 max-w-[40ch] text-charcoal/75">
            Every trip can be tailored. Loosen a filter, or tell us what you have in mind and your specialist will build it.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-10">
            <button type="button" onClick={() => setFilters(emptyFilters())} className="text-link group inline-flex items-baseline gap-2">
              <span className="text-felt">→</span> Clear filters
            </button>
            <ArrowLink href={planHref} arrowClassName="text-felt">
              Plan a tailor-made adventure
            </ArrowLink>
          </div>
        </div>
      )}
    </div>
  );
}
