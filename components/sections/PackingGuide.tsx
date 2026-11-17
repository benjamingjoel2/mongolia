"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PackingCategory, Season } from "@/data/types";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { msg } from "@/lib/i18n/core";
import { useT } from "@/lib/i18n/client";

const modes: { value: "summer" | "winter"; label: string; seasons: Season[] }[] = [
  { value: "summer", label: msg("Summer trips (May to Sep)"), seasons: ["spring", "summer", "autumn"] },
  { value: "winter", label: msg("Winter trips (Nov to Mar)"), seasons: ["winter"] },
];

/** Packing lists with a season switch styled like the filter chips. */
export function PackingGuide({ categories }: { categories: PackingCategory[] }) {
  const t = useT();
  const [mode, setMode] = useState<"summer" | "winter">("summer");
  const seasons = modes.find((m) => m.value === mode)!.seasons;
  const visible = categories.filter((c) => c.seasons.some((s) => seasons.includes(s)));

  return (
    <div>
      <div role="radiogroup" aria-label={t("Season")} className="mb-12 flex flex-wrap gap-2 md:mb-16">
        {modes.map((m) => (
          <button
            key={m.value}
            type="button"
            role="radio"
            aria-checked={mode === m.value}
            onClick={() => setMode(m.value)}
            className={cn(
              "h-12 rounded-blob-pill border px-6 text-[16px] transition-colors",
              mode === m.value ? "border-charcoal bg-charcoal text-offwhite" : "border-charcoal/25 hover:border-charcoal",
            )}
          >
            {t(m.label)}
          </button>
        ))}
      </div>
      <motion.ul layout className="grid gap-[15px] sm:grid-cols-2 lg:grid-cols-4 md:gap-[1.95vw]">
        <AnimatePresence mode="popLayout">
          {visible.map((c, i) => (
            <motion.li
              key={c.slug}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col overflow-hidden rounded-[18px] bg-offwhite"
            >
              <div className="relative aspect-[16/10] bg-steppe-tint">
                <Photo image={c.image} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw" quality={60} />
                <span className="absolute left-4 top-4 text-micro rounded-full bg-offwhite px-3 py-1 tabular-nums text-charcoal">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex grow flex-col p-5 md:p-6">
                <h3 className="text-[24px] font-medium leading-tight tracking-[-0.03em]">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-snug text-charcoal/70">{c.why}</p>
                <ul className="mt-5 flex flex-col gap-2 border-t border-charcoal/10 pt-5 text-[15px] leading-snug">
                  {c.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-1 size-3.5 shrink-0 rounded-[4px] border border-charcoal/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
