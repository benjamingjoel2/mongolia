"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Img } from "@/lib/images";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Plus } from "@/components/ui/icons";
import { useT } from "@/lib/i18n/client";

export interface ExpandCard {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  image: Img;
  link?: { label: string; href: string };
}

/**
 * The reference's prize cards: three tall image cards set out like a podium
 * (centre highest, left lower, right lowest). Each expands in place to reveal body copy.
 * With more than three cards they continue in the same staggered rhythm.
 */
export function ExpandCards({ cards, layout = "podium" }: { cards: ExpandCard[]; layout?: "podium" | "stack" }) {
  return (
    <ul
      className={cn(
        "grid gap-[15px] md:gap-[28px]",
        layout === "podium" ? "md:grid-cols-3 md:items-start" : "md:grid-cols-2",
      )}
    >
      {cards.map((card, i) => (
        <li
          key={card.id}
          className={cn(
            layout === "podium" &&
              [
                "md:mt-[8vw]", // left: second step
                "md:mt-0", // centre: top step
                "md:mt-[18vw]", // right: third step
              ][i % 3],
            layout === "podium" && (i % 2 === 0 ? "ml-[8vw] md:ml-0" : "mr-[8vw] md:mr-0"),
            layout === "stack" && i % 2 === 1 && "md:mt-[10vw]",
          )}
        >
          <Card card={card} />
        </li>
      ))}
    </ul>
  );
}

function Card({ card }: { card: ExpandCard }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const t = useT();
  return (
    <div className="group relative aspect-[4/5] overflow-hidden bg-charcoal text-offwhite md:aspect-[3/4.3]">
      <Photo
        image={card.image}
        sizes="(min-width: 768px) 32vw, 90vw"
        alt=""
        className={cn("transition-transform duration-[1.2s] ease-ref", open ? "scale-110" : "group-hover:scale-[1.05]")}
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 transition-colors duration-[var(--dur)] ease-ref",
          open ? "bg-charcoal/80" : "bg-gradient-to-b from-charcoal/60 via-charcoal/5 to-charcoal/30",
        )}
      />
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="absolute inset-0 flex flex-col items-start p-[15px] text-left md:p-[28px]"
      >
        <span className="text-micro mb-2 md:mb-3">{card.eyebrow}</span>
        <span className="text-[29px] font-medium leading-[0.99] tracking-[-0.035em] text-balance md:text-[clamp(1.75rem,3.47vw,3.75rem)]">
          {card.title}
        </span>
        <span
          aria-hidden
          className={cn(
            "absolute bottom-[15px] right-[15px] grid size-11 place-items-center rounded-blob bg-felt transition-transform duration-[var(--dur)] ease-ref md:bottom-[28px] md:right-[28px] md:size-14",
            open && "rotate-45",
          )}
        >
          <Plus className="size-5 md:size-6" />
        </span>
        <span className="sr-only">{open ? t("Hide details") : t("Show details")}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="pointer-events-none absolute inset-x-0 bottom-0 p-[15px] pr-16 md:p-[28px] md:pr-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-body-lg">{card.body}</p>
            {card.link && (
              <div className="pointer-events-auto mt-5">
                <ArrowLink href={card.link.href} arrowClassName="text-gobi">
                  {card.link.label}
                </ArrowLink>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
