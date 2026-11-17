"use client";

import { usePathname } from "next/navigation";
import { locales, localeLabels, localizePath, splitPath } from "@/lib/i18n/config";
import { useLocale, useT } from "@/lib/i18n/client";
import { cn } from "@/lib/cn";

/** EN · FR · DE · ES: plain links to the same page in each language (no automatic redirects). */
export function LanguageSelector({ className, linkClassName }: { className?: string; linkClassName?: string }) {
  const current = useLocale();
  const t = useT();
  const { path } = splitPath(usePathname() ?? "/");
  return (
    <nav aria-label={t("Language")} className={className}>
      <ul className="flex items-center gap-0.5">
        {locales.map((l, i) => (
          <li key={l} className="flex items-center gap-0.5">
            {i > 0 && (
              <span aria-hidden className="opacity-50">
                ·
              </span>
            )}
            <a
              href={localizePath(path, l)}
              hrefLang={l}
              lang={l}
              aria-current={l === current ? "true" : undefined}
              aria-label={localeLabels[l].name}
              className={cn(
                "rounded-sm px-1 py-0.5",
                l === current ? "font-medium underline decoration-2 underline-offset-[5px]" : "opacity-75 hover:opacity-100",
                linkClassName,
              )}
            >
              {localeLabels[l].short}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
