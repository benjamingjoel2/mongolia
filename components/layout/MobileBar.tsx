"use client";

import Link from "@/components/i18n/Link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { contact, mainNav, mobileBarNav, planHref, site } from "@/config/site";
import { cn } from "@/lib/cn";
import { BlobTab } from "@/components/ui/Blob";
import { BlobButton } from "@/components/ui/BlobButton";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Close } from "@/components/ui/icons";
import { isActive } from "./Header";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";
import { useT } from "@/lib/i18n/client";
import { splitPath } from "@/lib/i18n/config";

const spring = { type: "spring", stiffness: 380, damping: 34 } as const;

/**
 * Fixed bottom navigation for phones and tablets, as on the reference's mobile layout:
 * a charcoal bar with a blob tab rising from the bottom edge behind the active item.
 */
export function MobileBar() {
  const rawPath = usePathname() ?? "/";
  const pathname = splitPath(rawPath).path;
  const t = useT();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeHref = menuOpen ? "menu" : (mobileBarNav.find((n) => isActive(pathname, n.href))?.href ?? null);

  // Close the sheet on route change.
  const [lastPath, setLastPath] = useState(rawPath);
  if (lastPath !== rawPath) {
    setLastPath(rawPath);
    setMenuOpen(false);
  }

  const closeMenu = useCallback(() => setMenuOpen(false), [setMenuOpen]);

  const items = [...mobileBarNav.map((n) => ({ ...n, key: n.href })), { label: "Menu", href: "menu", key: "menu" }];

  return (
    <>
      <nav
        data-chrome
        aria-label={t("Quick")}
        className="fixed inset-x-0 bottom-0 z-50 h-[var(--bar-h)] bg-charcoal text-offwhite pb-[env(safe-area-inset-bottom)] xl:hidden"
      >
        <LayoutGroup id="mobile-nav">
          <ul className="flex h-full items-stretch justify-between px-2">
            {items.map((item, i) => {
              const active = activeHref === item.key;
              const content = (
                <>
                  <AnimatePresence>
                    {active && (
                      <motion.span
                        layoutId="mobile-blob"
                        aria-hidden
                        className="absolute -inset-x-1 bottom-0 h-[calc(100%+12px)] text-charcoal"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0, rotate: i % 2 ? -1.5 : 1.5 }}
                        exit={{ opacity: 0, y: 14 }}
                        transition={spring}
                      >
                        <BlobTab flip />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span className="relative">{t(item.label)}</span>
                </>
              );
              const cls = "text-nav relative flex h-full items-center px-4";
              return (
                <li key={item.key} className="relative flex">
                  {item.key === "menu" ? (
                    <button
                      type="button"
                      className={cls}
                      aria-expanded={menuOpen}
                      aria-controls="menu-sheet"
                      onClick={() => setMenuOpen((o) => !o)}
                    >
                      {content}
                    </button>
                  ) : (
                    <Link href={item.href} className={cls} aria-current={active ? "page" : undefined}>
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </LayoutGroup>
      </nav>
      <MenuSheet open={menuOpen} onClose={closeMenu} />
    </>
  );
}

function MenuSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = splitPath(usePathname() ?? "/").path;
  const t = useT();
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    firstLink.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-sheet"
          data-chrome
          data-theme="dark"
          role="dialog"
          aria-modal="true"
          aria-label={t("Menu")}
          className="fixed inset-x-0 top-0 bottom-[var(--bar-h)] z-[45] overflow-y-auto bg-charcoal text-offwhite xl:hidden"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          exit={{ clipPath: "inset(100% 0 0 0)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="gutter flex min-h-full flex-col pt-[calc(var(--header-h)+24px)] pb-10">
            <button
              type="button"
              onClick={onClose}
              aria-label={t("Close menu")}
              className="absolute right-[15px] top-[calc(var(--header-h)+8px)] grid size-10 place-items-center"
            >
              <Close className="size-6" />
            </button>
            <motion.ul
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } } }}
            >
              {mainNav.map((item, i) => (
                <motion.li
                  key={item.href}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    ref={i === 0 ? firstLink : undefined}
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "text-h1 inline-flex items-baseline gap-3 py-1",
                      isActive(pathname, item.href) && "italic",
                    )}
                  >
                    <span className="text-micro tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
                    {t(item.label)}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-auto flex flex-col gap-5 pt-10">
              <LanguageSelector className="text-nav" linkClassName="px-1.5 py-1" />
              <BlobButton href={planHref} size="lg" className="self-start">
                {t("Plan my adventure")}
              </BlobButton>
              <div className="flex flex-col gap-3">
                <ArrowLink href={`mailto:${contact.email}`} external arrowClassName="text-gobi">
                  {contact.email}
                </ArrowLink>
              </div>
              <p className="text-micro opacity-60">{t(site.tagline)}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
