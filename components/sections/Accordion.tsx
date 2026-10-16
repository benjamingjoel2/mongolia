"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Plus } from "@/components/ui/icons";

export interface AccordionItem {
  id: string;
  /** Left column label, e.g. "Day 3" or a topic. */
  kicker?: string;
  title: string;
  /** Visible summary line under the title (drive time, stay…). */
  summary?: React.ReactNode;
  badge?: React.ReactNode;
  content: React.ReactNode;
}

/** Rows that expand in place like the reference's prize cards, used for itineraries and FAQs. */
export function Accordion({ items, allowExpandAll = false, defaultOpen = [] }: { items: AccordionItem[]; allowExpandAll?: boolean; defaultOpen?: string[] }) {
  const [open, setOpen] = useState<Set<string>>(() => new Set(defaultOpen));
  const all = open.size === items.length;
  const toggle = (id: string) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <div>
      {allowExpandAll && (
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(all ? new Set() : new Set(items.map((i) => i.id)))}
            className="text-[15px] underline underline-offset-4 hover:text-felt"
          >
            {all ? "Collapse all" : "Expand all"}
          </button>
        </div>
      )}
      <ul className="border-t border-current/15">
        {items.map((item) => (
          <Row key={item.id} item={item} open={open.has(item.id)} onToggle={() => toggle(item.id)} />
        ))}
      </ul>
    </div>
  );
}

function Row({ item, open, onToggle }: { item: AccordionItem; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <li id={item.id} className="scroll-mt-32 border-b border-current/15">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className={cn(
          "group grid w-full grid-cols-[1fr_auto] items-start gap-4 py-6 text-left md:gap-8 md:py-8",
          item.kicker && "md:grid-cols-[minmax(7rem,14%)_1fr_auto]",
        )}
      >
        {item.kicker && <span className="text-micro col-span-2 uppercase tracking-[0.03em] text-felt md:col-span-1 md:pt-2">{item.kicker}</span>}
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-3">
            <span className="text-[22px] font-medium leading-tight tracking-[-0.03em] transition-colors group-hover:text-felt md:text-[clamp(1.5rem,2.4vw,2.4rem)]">
              {item.title}
            </span>
            {item.badge}
          </span>
          {item.summary && <span className="mt-2 block text-[15px] opacity-70 md:text-[16px]">{item.summary}</span>}
        </span>
        <span
          aria-hidden
          className={cn(
            "grid size-10 place-items-center rounded-blob border border-current transition-[transform,background-color,color] duration-[var(--dur)] ease-ref md:size-12",
            open ? "rotate-45 border-felt bg-felt text-offwhite" : "group-hover:border-felt",
          )}
        >
          <Plus className="size-4 md:size-5" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className={cn("pb-8 md:pb-10", item.kicker && "md:grid md:grid-cols-[minmax(7rem,14%)_1fr_auto] md:gap-8")}>
              {item.kicker && <div className="hidden md:block" />}
              <div className="max-w-[60rem]">{item.content}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
