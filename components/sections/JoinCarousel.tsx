"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Img } from "@/lib/images";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { Emphasis } from "@/components/ui/DisplayHeading";
import { BlobIconButton } from "@/components/ui/BlobButton";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";

export interface CarouselCard {
  id: string;
  /** Title with *italic* first verb, ending with an ellipsis as on the reference. */
  title: string;
  stat?: string;
  href: string;
  image?: Img;
  /** Solid feature colour instead of a photo (the reference's first orange card). */
  tone?: "felt" | "gobi" | "charcoal";
  body?: string;
}

/**
 * The reference's "Now it's your turn" track: tall cards alternating between a tall
 * top-aligned and a shorter dropped size, scrolled by a red arrow pinned to the right edge.
 */
export function JoinCarousel({ cards, label }: { cards: CarouselCard[]; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 29 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={track}
        aria-label={label}
        className="no-scrollbar gutter flex snap-x snap-mandatory gap-[15px] overflow-x-auto overscroll-x-contain pb-2 scroll-px-[var(--gutter)] md:gap-[29px]"
      >
        {cards.map((card, i) => {
          const tall = i % 2 === 0;
          return (
            <li
              key={card.id}
              className={cn(
                "w-[60vw] shrink-0 snap-start md:w-[34vw] md:max-w-[560px]",
                tall ? "h-[92vw] md:h-[45.3vw] md:max-h-[745px]" : "mt-[16vw] h-[76vw] md:mt-[8.6vw] md:h-[36.7vw] md:max-h-[604px]",
              )}
            >
              <Card card={card} />
            </li>
          );
        })}
        <li aria-hidden className="w-px shrink-0" />
      </ul>

      <div className="pointer-events-none absolute inset-y-0 right-[15px] flex items-center md:right-7">
        <BlobIconButton
          label="Next cards"
          onClick={() => step(1)}
          disabled={!canNext}
          className={cn("pointer-events-auto transition-opacity", !canNext && "opacity-0")}
        >
          <ArrowRight className="size-6" />
        </BlobIconButton>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-[15px] flex items-center md:left-7">
        <BlobIconButton
          label="Previous cards"
          variant="charcoal"
          onClick={() => step(-1)}
          disabled={!canPrev}
          className={cn("pointer-events-auto transition-opacity", !canPrev && "opacity-0")}
        >
          <ArrowLeft className="size-6" />
        </BlobIconButton>
      </div>
    </div>
  );
}

function Card({ card }: { card: CarouselCard }) {
  const solid = card.tone && !card.image;
  return (
    <Link
      href={card.href}
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden p-[15px] md:p-[29px]",
        solid && card.tone === "felt" && "bg-felt text-offwhite",
        solid && card.tone === "gobi" && "bg-gobi text-charcoal",
        solid && card.tone === "charcoal" && "bg-charcoal text-offwhite",
        !solid && "bg-stone text-offwhite",
      )}
    >
      {card.image && (
        <>
          <Photo
            image={card.image}
            sizes="(min-width: 768px) 34vw, 60vw"
            alt=""
            className="transition-transform duration-[1.2s] ease-ref group-hover:scale-[1.06]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-charcoal/65 via-charcoal/10 to-charcoal/55" />
        </>
      )}
      <h3 className="relative text-[28px] font-medium leading-[0.99] tracking-[-0.035em] text-balance md:text-[clamp(1.75rem,3.47vw,3.75rem)]">
        <Emphasis text={card.title} />
      </h3>
      <div className="relative flex items-end justify-between gap-4">
        <div>
          {card.body && <p className="mb-3 hidden max-w-[28ch] text-[16px] leading-snug md:block">{card.body}</p>}
          {card.stat && <p className="text-micro">{card.stat}</p>}
        </div>
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-full border border-current transition-transform duration-[var(--dur)] ease-ref group-hover:translate-x-1 md:size-11"
        >
          <ArrowRight className="size-4 md:size-5" />
        </span>
      </div>
    </Link>
  );
}
