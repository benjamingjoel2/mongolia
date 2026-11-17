"use client";

import Link from "@/components/i18n/Link";
import { useT } from "@/lib/i18n/client";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

/** Text-based logo placeholder: felt-red circle monogram + wordmark. Replace with the final mark later. */
export function Logo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  const t = useT();
  return (
    <Link
      href="/"
      aria-label={t("{name}, home", { name: site.name })}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span
        aria-hidden
        className="grid size-[38px] place-items-center rounded-full bg-felt text-[13px] font-medium tracking-[-0.06em] text-offwhite ring-2 ring-felt ring-offset-2 ring-offset-transparent transition-transform duration-[var(--dur)] ease-ref group-hover:rotate-[-8deg] md:size-[55px] md:text-[18px]"
      >
        S&amp;S
      </span>
      {showWordmark && (
        <span className="text-[17px] font-medium leading-none tracking-[-0.04em] md:text-[20px]">
          Steppe&nbsp;&amp;&nbsp;Sky
        </span>
      )}
    </Link>
  );
}
