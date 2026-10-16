"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Close } from "@/components/ui/icons";
import { Planner } from "./Planner";
import type { MonthHint, RegionOption } from "./steps";

export function PlannerModal(props: { regions: RegionOption[]; monthHints: MonthHint[] }) {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => router.back(), [router]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [close]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Plan my adventure"
      data-chrome
      data-theme="dark"
      data-planner-scroll
      className="fixed inset-0 z-[85] overflow-y-auto overscroll-contain bg-charcoal text-offwhite"
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="gutter mx-auto max-w-[1440px]">
        <div className="flex h-16 items-center justify-between md:h-20">
          <p className="text-micro uppercase tracking-[0.04em] text-gobi">Plan my adventure · 5 steps</p>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close planner"
            className="grid size-11 place-items-center rounded-blob bg-offwhite text-charcoal transition-transform duration-[var(--dur)] ease-ref hover:rotate-90 md:size-12"
          >
            <Close className="size-5" />
          </button>
        </div>
        <Planner {...props} inModal onClose={close} />
      </div>
    </motion.div>
  );
}
