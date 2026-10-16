"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { currencies, currencyOrder } from "@/config/site";
import { cn } from "@/lib/cn";
import { setCurrency, useCurrency } from "./CurrencyStore";

/**
 * Currency switcher in the place of the reference's language switcher:
 * a compact trigger that slides a row of tiles in from the right edge.
 */
export function CurrencySwitcher({ className }: { className?: string }) {
  const code = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // Transient UI: close if the surrounding route is hidden by Activity.
  useLayoutEffect(() => () => setOpen(false), []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Currency: ${currencies[code].label}. Change currency`}
        onClick={() => setOpen((o) => !o)}
        className="text-nav inline-flex h-9 items-center gap-1.5 rounded-full px-2 transition-opacity hover:opacity-70"
      >
        <span aria-hidden className="text-[1.15em] leading-none">
          {currencies[code].symbol}
        </span>
        <span>{code}</span>
        <svg aria-hidden viewBox="0 0 10 6" className={cn("w-2.5 transition-transform duration-300", open && "rotate-180")}>
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={panelId}
            role="listbox"
            aria-label="Choose currency"
            className="fixed right-0 top-[var(--panel-top,64px)] z-[70] flex w-full sm:w-auto"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              closed: { transition: { staggerChildren: 0.03 } },
            }}
          >
            {currencyOrder.map((c) => {
              const active = c === code;
              return (
                <motion.li
                  key={c}
                  className="flex-1 sm:flex-none"
                  variants={{
                    open: { x: 0, opacity: 1 },
                    closed: { x: "120%", opacity: 0 },
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setCurrency(c);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex h-[72px] w-full flex-col items-start justify-between p-3 text-left transition-colors duration-300 sm:h-[86px] sm:w-[118px] md:w-[140px] md:p-4",
                      active ? "bg-felt text-offwhite" : "bg-charcoal text-offwhite hover:bg-charcoal-soft",
                    )}
                  >
                    <span className="text-[18px] font-medium leading-none tracking-[-0.04em] md:text-[22px]">{c}</span>
                    <span className="text-[12px] leading-tight opacity-75">
                      {currencies[c].symbol}
                      <span className="hidden sm:inline"> {currencies[c].label}</span>
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
