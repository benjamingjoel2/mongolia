"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { mainNav, planHref } from "@/config/site";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { BlobTab } from "@/components/ui/Blob";
import { BlobButton } from "@/components/ui/BlobButton";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { useScrolled, useSurfaceTheme } from "./useSurfaceTheme";

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const spring = { type: "spring", stiffness: 380, damping: 34, mass: 0.9 } as const;

/**
 * Fixed header modelled on the reference: logo left, centred uppercase nav with a
 * morphing blob tab that hangs from the top edge, utilities right. Transparent at the
 * top of the page (text follows the section underneath), a charcoal bar once scrolled.
 */
export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled(24);
  const surface = useSurfaceTheme(28);
  const [hovered, setHovered] = useState<string | null>(null);

  const solid = scrolled;
  const onDark = solid || surface === "dark";
  const activeHref = mainNav.find((n) => isActive(pathname, n.href))?.href ?? null;
  const blobHref = hovered ?? activeHref;

  return (
    <header
      data-chrome
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--dur-fast)] ease-ref",
        onDark ? "text-offwhite" : "text-charcoal",
      )}
      style={{ ["--panel-top" as string]: solid ? "56px" : "var(--header-h)" }}
    >
      {/* Charcoal bar that appears once the page scrolls. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-14 bg-charcoal transition-transform duration-[var(--dur)] ease-ref",
          solid ? "translate-y-0" : "-translate-y-full",
        )}
      />

      <div
        className={cn(
          "relative flex items-center justify-between gap-4 px-[15px] transition-[height] duration-[var(--dur)] ease-ref md:px-7",
          solid ? "h-14" : "h-[var(--header-h)]",
        )}
      >
        <Logo className="relative z-10 shrink-0 [&>span:last-child]:hidden xs:[&>span:last-child]:inline" />

        {/* Desktop nav, centred like the reference. */}
        <nav aria-label="Main" className="absolute left-1/2 top-0 hidden -translate-x-1/2 xl:block">
          <LayoutGroup id="desktop-nav">
            <ul className="flex items-start" onMouseLeave={() => setHovered(null)}>
              {mainNav.map((item) => {
                const showBlob = blobHref === item.href;
                const current = activeHref === item.href;
                return (
                  <li key={item.href} className="relative">
                    <AnimatePresence>
                      {showBlob && (
                        <motion.span
                          layoutId="nav-blob"
                          className={cn(
                            "absolute -inset-x-1.5 top-0 h-[70px]",
                            solid || !onDark ? "text-charcoal" : "text-offwhite",
                          )}
                          initial={{ opacity: 0, y: -16 }}
                          animate={{ opacity: 1, y: 0, rotate: mainNav.indexOf(item) % 2 ? 1.2 : -1.2 }}
                          exit={{ opacity: 0, y: -16 }}
                          transition={spring}
                        >
                          <BlobTab />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      onMouseEnter={() => setHovered(item.href)}
                      onFocus={() => setHovered(item.href)}
                      onBlur={() => setHovered(null)}
                      className={cn(
                        "text-nav relative flex h-14 items-center whitespace-nowrap px-[0.95rem] transition-colors duration-300 2xl:px-[1.35rem]",
                        showBlob && !solid && (onDark ? "text-charcoal" : "text-offwhite"),
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </LayoutGroup>
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-2 md:gap-4">
          <CurrencySwitcher />
          <BlobButton
            href={planHref}
            size="sm"
            variant="felt"
            className="md:h-10 md:px-5 md:text-[15px]"
          >
            Plan my adventure
          </BlobButton>
        </div>
      </div>
    </header>
  );
}
