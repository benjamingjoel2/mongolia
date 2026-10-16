"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export type Surface = "dark" | "light";

/**
 * Reports the theme of the page section currently under a horizontal probe line
 * (sections declare `data-theme="dark" | "light"`). Chrome elements mark themselves
 * with `data-chrome` so they are ignored.
 */
export function useSurfaceTheme(probeY: number | "bottom" = 28): Surface {
  const [surface, setSurface] = useState<Surface>("light");
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const y = probeY === "bottom" ? window.innerHeight - 24 : probeY;
      const stack = document.elementsFromPoint(window.innerWidth / 2, y);
      const hit = stack.find((el) => !el.closest("[data-chrome]"));
      const themed = hit?.closest<HTMLElement>("[data-theme]");
      setSurface(themed?.dataset.theme === "dark" ? "dark" : "light");
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    // Run after paint so the new route's DOM is in place.
    const t = window.setTimeout(check, 50);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname, probeY]);

  return surface;
}

export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return scrolled;
}
