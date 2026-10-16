"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Img } from "@/lib/images";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { Emphasis } from "@/components/ui/DisplayHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Price } from "@/components/ui/Price";
import { Close } from "@/components/ui/icons";

export interface StoryData {
  label: string;
  story: string;
  facts?: string[];
  priceFromUSD?: number;
  links: { label: string; href: string }[];
}

export interface MosaicItem {
  id: string;
  title: string;
  /** Shorter title used on small screens, where tiles are ~180px wide. */
  shortTitle?: string;
  image: Img;
  /** Tile links straight to a page instead of opening the story overlay. */
  href?: string;
  tags?: string[];
  priceFromUSD?: number;
  meta?: string;
  story?: StoryData;
}

/* Tile rhythm measured from the reference (1440px): two columns, alternating full and 70%-wide
   tiles, the right column dropped ~7.5vw, aspect ratios cycling every four rows. */
const LEFT = [
  { w: "100%", ar: 1.01, self: "start" },
  { w: "70%", ar: 0.95, self: "end" },
  { w: "100%", ar: 1.35, self: "start" },
  { w: "70%", ar: 0.71, self: "end" },
] as const;
const RIGHT = [
  { w: "70%", ar: 0.81, self: "start" },
  { w: "100%", ar: 1.16, self: "start" },
  { w: "70%", ar: 0.84, self: "start" },
  { w: "100%", ar: 1.35, self: "start" },
] as const;

export function StoryMosaic({ items, numbered = true, syncUrl = true }: { items: MosaicItem[]; numbered?: boolean; syncUrl?: boolean }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const pushed = useRef(false);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const open = useCallback(
    (id: string, trigger?: HTMLElement | null) => {
      lastTrigger.current = trigger ?? null;
      setOpenId(id);
      if (syncUrl) {
        window.history.pushState(window.history.state, "", `?story=${encodeURIComponent(id)}`);
        pushed.current = true;
      }
    },
    [syncUrl],
  );

  const close = useCallback(() => {
    setOpenId(null);
    if (syncUrl && pushed.current) {
      pushed.current = false;
      window.history.back();
    } else if (syncUrl && window.location.search.includes("story=")) {
      window.history.replaceState(window.history.state, "", window.location.pathname);
    }
    lastTrigger.current?.focus();
  }, [syncUrl]);

  // Deep links (?story=slug) and the browser back button, like the reference's /@handle URLs.
  useEffect(() => {
    if (!syncUrl) return;
    const fromUrl = () => {
      const id = new URLSearchParams(window.location.search).get("story");
      const match = id && items.some((i) => i.id === id && i.story) ? id : null;
      if (!match) pushed.current = false;
      setOpenId(match);
    };
    fromUrl();
    window.addEventListener("popstate", fromUrl);
    return () => window.removeEventListener("popstate", fromUrl);
  }, [items, syncUrl]);

  // Following a link out of the overlay: drop the overlay without rewinding history.
  const dismiss = useCallback(() => {
    pushed.current = false;
    setOpenId(null);
  }, []);

  const left = items.filter((_, i) => i % 2 === 0);
  const right = items.filter((_, i) => i % 2 === 1);
  const active = items.find((i) => i.id === openId);

  const column = (list: MosaicItem[], pattern: typeof LEFT | typeof RIGHT, offset: number) =>
    list.map((item, r) => {
      const p = pattern[r % 4];
      const index = items.indexOf(item);
      return (
        <Tile
          key={item.id}
          item={item}
          number={numbered ? index + 1 : undefined}
          style={{ width: p.w, aspectRatio: String(p.ar), alignSelf: p.self === "end" ? "flex-end" : "flex-start" }}
          delay={(r % 2) * 0.08 + offset}
          onOpen={item.story && !item.href ? (el) => open(item.id, el) : undefined}
        />
      );
    });

  return (
    <>
      <div className="grid grid-cols-2 gap-[10px] md:gap-[1.95vw]">
        <div className="flex flex-col gap-[10px] md:gap-[1.95vw]">{column(left, LEFT, 0)}</div>
        <div className="flex flex-col gap-[10px] pt-[11vw] md:gap-[1.95vw] md:pt-[7.5vw]">{column(right, RIGHT, 0.1)}</div>
      </div>
      <AnimatePresence>{active?.story && <StoryOverlay key={active.id} item={active} onClose={close} onNavigate={dismiss} />}</AnimatePresence>
    </>
  );
}

function Tile({
  item,
  number,
  style,
  delay,
  onOpen,
}: {
  item: MosaicItem;
  number?: number;
  style: React.CSSProperties;
  delay: number;
  onOpen?: (el: HTMLElement) => void;
}) {
  const inner = (
    <>
      <Photo
        image={item.image}
        sizes="(min-width: 768px) 46vw, 48vw"
        alt=""
        className="transition-transform duration-[1.2s] ease-ref group-hover:scale-[1.06]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent transition-opacity duration-[var(--dur)] ease-ref group-hover:opacity-90"
      />
      {item.tags && item.tags.length > 0 && (
        <div className="absolute left-3 top-3 hidden flex-wrap gap-1.5 md:left-[30px] md:top-[30px] md:flex">
          {item.tags.map((t) => (
            <span key={t} className="rounded-full bg-offwhite/90 px-3 py-1 text-[13px] font-medium tracking-[-0.01em] text-charcoal">
              {t}
            </span>
          ))}
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 p-3 text-offwhite md:p-[30px]">
        <h3 className="text-h3 flex items-baseline gap-[0.4em] text-balance">
          {number !== undefined && (
            <span className="text-micro shrink-0 tabular-nums">{String(number).padStart(2, "0")}</span>
          )}
          {item.shortTitle ? (
            <>
              <span className="md:hidden">{item.shortTitle}</span>
              <span className="hidden md:inline">{item.title}</span>
            </>
          ) : (
            <span>{item.title}</span>
          )}
        </h3>
        {(item.meta || item.priceFromUSD) && (
          <p className="text-micro mt-2 flex flex-wrap gap-x-3 gap-y-1 text-offwhite/90 md:mt-4 md:pl-[1.6em]">
            {item.meta && <span className="hidden md:inline">{item.meta}</span>}
            {item.priceFromUSD && (
              <span>
                From <Price usd={item.priceFromUSD} /> pp
              </span>
            )}
          </p>
        )}
      </div>
    </>
  );

  const cls =
    "group relative block w-full overflow-hidden bg-steppe-tint text-left outline-offset-4 [contain:paint]";

  return (
    <motion.div
      style={style}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {item.href ? (
        <Link href={item.href} className={cn(cls, "h-full")}>
          {inner}
        </Link>
      ) : (
        <button
          type="button"
          className={cn(cls, "h-full")}
          onClick={(e) => onOpen?.(e.currentTarget)}
          aria-haspopup="dialog"
          aria-label={`${item.title}: open story`}
        >
          {inner}
        </button>
      )}
    </motion.div>
  );
}

function StoryOverlay({ item, onClose, onNavigate }: { item: MosaicItem; onClose: () => void; onNavigate: () => void }) {
  const story = item.story!;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`story-${item.id}`}
      data-theme="dark"
      data-chrome
      className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-charcoal text-offwhite"
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        aria-hidden
        className="fixed inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Photo image={item.image} sizes="100vw" quality={75} alt="" />
        <div className="absolute inset-0 bg-charcoal/60" />
      </motion.div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close story"
        className="fixed right-[15px] top-[15px] z-10 grid size-11 place-items-center rounded-blob bg-offwhite text-charcoal transition-transform duration-[var(--dur)] ease-ref hover:rotate-90 md:right-7 md:top-6 md:size-14"
      >
        <Close className="size-5 md:size-6" />
      </button>

      <div className="gutter relative min-h-full pb-[calc(var(--bar-h)+48px)] pt-[22px] md:pb-24 md:pl-[30vw] md:pr-[2vw] md:pt-[57px]">
        <motion.p
          className="text-[13.5px] font-medium tracking-[-0.03em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {story.label}
        </motion.p>
        <motion.h2
          id={`story-${item.id}`}
          className="text-story mt-[18vh] text-pretty md:mt-[24vh]"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Emphasis text={story.story} />
        </motion.h2>

        <motion.div
          className="mt-12 flex flex-col gap-8 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {(story.facts || story.priceFromUSD) && (
            <ul className="flex flex-wrap gap-2">
              {story.facts?.map((f) => (
                <li key={f} className="rounded-full border border-offwhite/50 px-4 py-2 text-[14px] md:text-[16px]">
                  {f}
                </li>
              ))}
              {story.priceFromUSD && (
                <li className="rounded-full bg-gobi px-4 py-2 text-[14px] font-medium text-charcoal md:text-[16px]">
                  From <Price usd={story.priceFromUSD} /> per person
                </li>
              )}
            </ul>
          )}
          <div className="flex flex-col gap-4 md:flex-row md:gap-10">
            {story.links.map((l) => (
              <ArrowLink key={l.href} href={l.href} onClick={onNavigate} className="text-[20px] md:text-[23px]" arrowClassName="text-gobi">
                {l.label}
              </ArrowLink>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
