"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { intro } from "@/config/site";
import { images, type Img } from "@/lib/images";
import { Photo } from "@/components/ui/Photo";
import { InlineScript } from "@/components/ui/InlineScript";
import { useT } from "@/lib/i18n/client";

const KEY = "sns.introSeen";
const reel: Img[] = [images.steppeLoneGer, images.dunesStorm, images.altaiPinkPeaks, images.tentMilkyWay];

/* Tiny store so the hero can start its entrance when the intro finishes. */
let done = false;
const listeners = new Set<() => void>();
function finish() {
  done = true;
  document.documentElement.dataset.intro = "done";
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {}
  listeners.forEach((l) => l());
}
export function useIntroDone() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => done || document.documentElement.dataset.intro === "done",
    () => false,
  );
}

/**
 * Full-screen opening reel, as on the reference: plays once per session, with
 * "Click to skip" and a progress line. Images cross-fade with a slow push-in;
 * set `intro.video` in /config to use a film instead.
 */
export function IntroReel() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isDone = useIntroDone();
  const t = useT();
  const show = visible && !isDone;

  const close = useCallback(() => {
    setVisible(false);
    finish();
  }, []);

  useEffect(() => {
    if (!intro.enabled || document.documentElement.dataset.intro === "done") {
      finish();
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const step = intro.durationMs / reel.length;
    const tick = window.setInterval(() => setIndex((i) => Math.min(i + 1, reel.length - 1)), step);
    const end = window.setTimeout(close, intro.durationMs);
    const onKey = (e: KeyboardEvent) => {
      if (["Escape", "Enter", " ", "ArrowDown"].includes(e.key)) close();
    };
    window.addEventListener("keydown", onKey);
    ref.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.clearInterval(tick);
      window.clearTimeout(end);
      window.removeEventListener("keydown", onKey);
    };
  }, [close]);

  if (!intro.enabled) return null;

  return (
    <>
      <InlineScript
        html={`try{if(sessionStorage.getItem("${KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.intro="done"}}catch(e){}`}
      />
      <AnimatePresence>
        {show && (
          <motion.div
            ref={ref}
            data-intro-overlay
            data-chrome
            data-theme="dark"
            role="button"
            tabIndex={0}
            aria-label={t("Intro film. Press to skip")}
            onClick={close}
            className="fixed inset-0 z-[90] cursor-pointer overflow-hidden bg-charcoal text-offwhite outline-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {intro.video ? (
              <video className="absolute inset-0 h-full w-full object-cover" src={intro.video} autoPlay muted playsInline onEnded={close} />
            ) : (
              reel.map((image, i) => (
                <motion.div
                  key={image.src}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: i === index ? 1 : 0, scale: i === index ? 1.08 : 1 }}
                  transition={{ opacity: { duration: 1.2 }, scale: { duration: intro.durationMs / reel.length / 1000 + 1.5, ease: "linear" } }}
                >
                  {/* Only the current and next frames are mounted, so the reel never downloads four full-screen photos up front. */}
                  {i <= index + 1 ? <Photo image={image} sizes="100vw" priority={i === 0} quality={60} alt="" /> : null}
                </motion.div>
              ))
            )}
            <div aria-hidden className="absolute inset-0 bg-charcoal/45" />
            <div className="absolute inset-x-0 top-[47%] flex flex-col items-center gap-3">
              <span className="text-[16px] font-medium tracking-[-0.03em] md:text-[18px]">{t("Click to skip")}</span>
              <span className="relative block h-[2px] w-[35px] overflow-hidden bg-offwhite/30">
                <motion.span
                  className="absolute inset-y-0 left-0 bg-offwhite"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: intro.durationMs / 1000, ease: "linear" }}
                />
              </span>
            </div>
            <p className="absolute bottom-6 left-[15px] max-w-[60vw] text-[12px] tracking-[-0.01em] text-offwhite/70 md:left-7 md:text-[13px]">
              {t("Nothing between you and the sky.")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
