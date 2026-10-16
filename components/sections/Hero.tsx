"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Img } from "@/lib/images";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { Emphasis } from "@/components/ui/DisplayHeading";
import { BlobIconButton } from "@/components/ui/BlobButton";
import { ArrowDown } from "@/components/ui/icons";
import { useIntroDone } from "./IntroReel";

const ease = [0.22, 1, 0.36, 1] as const;

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
  const introDone = useIntroDone();
  const ready = !waitForIntro || introDone;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const planeY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "60%"]);
  const typeOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);
  const leadY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-30%"]);

  const mask = `linear-gradient(to bottom, transparent ${horizon - 3}%, black ${horizon + 2}%)`;

  const plane = (
    <>
      <Photo image={image} sizes="100vw" priority={priority} quality={75} className="scale-110" alt="" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/25 to-charcoal/70" />
    </>
  );

  const enter = (i: number) => ({
    initial: { opacity: 0, y: 60 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 },
    transition: { duration: 1, delay: 0.1 + i * 0.12, ease },
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
          <motion.div {...enter(0)} className="text-micro mb-5 uppercase tracking-[0.02em] text-offwhite/85 md:mb-8">
            {eyebrow}
          </motion.div>
        )}
        {lines ? (
          <h1 className="text-display">
            <motion.span {...enter(0)} className="block pl-[8vw] md:pl-[8.7vw]">
              {lines[0]}
            </motion.span>
            <motion.span {...enter(1)} className="block">
              {lines[1]}
            </motion.span>
          </h1>
        ) : (
          <motion.h1 {...enter(1)} className="text-h1 max-w-[16ch] text-balance md:max-w-[14ch]">
            <Emphasis text={title ?? ""} />
          </motion.h1>
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
          <motion.div {...enter(2)}>
            {lead && <div className="text-lead text-pretty">{lead}</div>}
            {children && <div className="mt-7 md:mt-11">{children}</div>}
          </motion.div>
        </motion.div>
      )}

      {scrollTo && (
        <motion.div
          className={cn(
            "absolute inset-x-0 bottom-[calc(var(--bar-h)+24px)] z-10 justify-center xl:bottom-[5svh]",
            size === "page" ? "hidden md:flex" : "flex",
          )}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
        >
          <BlobIconButton
            label="Scroll to the next section"
            onClick={() => document.getElementById(scrollTo)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })}
          >
            <ArrowDown className="size-6 animate-[nudge_2.4s_ease-in-out_infinite]" />
          </BlobIconButton>
        </motion.div>
      )}

      {image.credit && (
        <span className="absolute bottom-2 right-3 z-10 hidden text-[10px] text-offwhite/50 md:block">Photo: {image.credit}</span>
      )}
    </section>
  );
}
