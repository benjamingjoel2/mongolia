"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Img } from "@/lib/images";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { Emphasis } from "@/components/ui/DisplayHeading";
import { BlobIconButton } from "@/components/ui/BlobButton";
import { ArrowDown } from "@/components/ui/icons";
import { useT } from "@/lib/i18n/client";

type Props = {
  image: Img;
  /** Display variant: two giant uppercase lines (homepage). */
  lines?: [string, string];
  /** Page variant: a single headline with *italic* support. */
  title?: string;
  eyebrow?: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  /** Where the foreground (ground) layer begins, as % from the top of the photo. */
  horizon?: number;
  scrollTo?: string;
  waitForIntro?: boolean;
  size?: "full" | "page";
  priority?: boolean;
};

/**
 * Reference hero: giant type set between layered landscape planes, a lead column at
 * the lower right and a red blob button that scrolls on. The photo's ground is
 * duplicated as a masked foreground plane so the type sinks behind the horizon on scroll.
 */
export function Hero({
  image,
  lines,
  title,
  eyebrow,
  lead,
  children,
  horizon = 64,
  scrollTo,
  waitForIntro = false,
  size = "full",
  priority = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const t = useT();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const planeY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "60%"]);
  const typeOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);
  const leadY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-30%"]);

  const mask = `linear-gradient(to bottom, transparent ${horizon - 3}%, black ${horizon + 2}%)`;

  const plane = (
    <>
      <Photo image={image} sizes="100vw" priority={priority} quality={60} className="scale-110" alt="" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/25 to-charcoal/70" />
    </>
  );

  // CSS entrance (paints before hydration, so it never delays LCP); held while the intro reel plays.
  const enter = (i: number) => ({
    className: cn("hero-rise", waitForIntro && "hero-wait"),
    style: { "--d": `${0.1 + i * 0.12}s` } as React.CSSProperties,
  });

  return (
    <section
      ref={ref}
      data-theme="dark"
      className={cn(
        "relative isolate overflow-hidden bg-charcoal text-offwhite",
        size === "full" ? "h-[100svh] min-h-[560px]" : "min-h-[78svh] md:min-h-[86svh]",
      )}
    >
      {/* Back plane */}
      <motion.div aria-hidden className="absolute inset-0 -z-20" style={{ y: planeY }}>
        {plane}
      </motion.div>

      {/* Type plane */}
      <motion.div
        className={cn(
          "gutter relative -z-10",
          size === "full" ? "pt-[calc(var(--header-h)+14svh)] md:pt-[calc(var(--header-h)+10svh)]" : "pt-[calc(var(--header-h)+16svh)]",
        )}
        style={{ y: typeY, opacity: typeOpacity }}
      >
        {eyebrow && (
          <div {...enter(0)}>
            <div className="text-micro mb-5 uppercase tracking-[0.02em] text-offwhite/85 md:mb-8">{eyebrow}</div>
          </div>
        )}
        {lines ? (
          <h1 className="text-display">
            <span {...enter(0)}>
              <span className="block pl-[8vw] md:pl-[8.7vw]">{lines[0]}</span>
            </span>
            <span {...enter(1)}>
              <span className="block">{lines[1]}</span>
            </span>
          </h1>
        ) : (
          <div {...enter(1)}>
            <h1 className="text-h1 max-w-[16ch] text-balance md:max-w-[14ch]">
              <Emphasis text={title ?? ""} />
            </h1>
          </div>
        )}
      </motion.div>

      {/* Foreground plane (the ground), masked so it sits in front of the type */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{ y: planeY, maskImage: mask, WebkitMaskImage: mask }}
      >
        {plane}
      </motion.div>

      {/* Lead column, lower right as on the reference */}
      {(lead || children) && (
        <motion.div
          className={cn(
            "gutter absolute inset-x-0 z-10 md:left-[59%] md:right-auto md:w-[min(32rem,34vw)] md:px-0",
            size === "full" ? "bottom-[calc(var(--bar-h)+96px)] md:bottom-[15svh]" : "bottom-[calc(var(--bar-h)+40px)] md:bottom-[9svh]",
          )}
          style={{ y: leadY }}
        >
          <div {...enter(2)}>
            {lead && <div className="text-lead text-pretty">{lead}</div>}
            {children && <div className="mt-7 md:mt-11">{children}</div>}
          </div>
        </motion.div>
      )}

      {scrollTo && (
        <div
          className={cn(
            "absolute inset-x-0 bottom-[calc(var(--bar-h)+24px)] z-10 justify-center xl:bottom-[5svh]",
            size === "page" ? "hidden md:flex" : "flex",
          )}
        >
          <div {...enter(4)}>
          <BlobIconButton
            label={t("Scroll to the next section")}
            onClick={() => document.getElementById(scrollTo)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })}
          >
            <ArrowDown className="size-6 animate-[nudge_2.4s_ease-in-out_infinite]" />
          </BlobIconButton>
          </div>
        </div>
      )}

    </section>
  );
}
