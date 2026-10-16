"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface Quote {
  id: string;
  quote: string;
  name: string;
  detail: string;
  placeholder?: boolean;
}

/** Big-type testimonials in the reference's story-overlay style, cycling one at a time. */
export function QuoteCycler({ quotes, interval = 8000 }: { quotes: Quote[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce || quotes.length < 2) return;
    const t = window.setTimeout(() => setI((n) => (n + 1) % quotes.length), interval);
    return () => window.clearTimeout(t);
  }, [i, paused, reduce, quotes.length, interval]);

  const q = quotes[i];
  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative min-h-[22rem] md:min-h-[34rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.figure
            key={q.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="text-[clamp(1.75rem,4.6vw,5rem)] font-medium leading-[1.02] tracking-[-0.035em] text-pretty">
              “{q.quote}”
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[16px] md:mt-12 md:text-[18px]">
              <span className="font-medium">{q.name}</span>
              <span className="opacity-75">{q.detail}</span>
              {q.placeholder && (
                <span className="rounded-full border border-current px-3 py-1 text-[12px] uppercase tracking-[0.04em] opacity-80">
                  Placeholder testimonial
                </span>
              )}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-10 flex gap-2" role="tablist" aria-label="Choose testimonial">
        {quotes.map((x, n) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={n === i}
            aria-label={`Testimonial ${n + 1} of ${quotes.length}`}
            onClick={() => setI(n)}
            className={cn(
              "h-[3px] rounded-full transition-all duration-[var(--dur)] ease-ref",
              n === i ? "w-12 bg-current" : "w-6 bg-current/30 hover:bg-current/60",
            )}
          />
        ))}
      </div>
    </div>
  );
}
