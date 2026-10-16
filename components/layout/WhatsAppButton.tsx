"use client";

import { usePathname } from "next/navigation";
import { whatsappHref } from "@/config/site";
import { ChatIcon } from "@/components/ui/icons";

/** Floating WhatsApp button (wa.me link from /config). Sits above the mobile bottom bar. */
export function WhatsAppButton() {
  // The planner has its own sticky actions in this corner.
  if (usePathname().startsWith("/plan-my-adventure")) return null;
  return (
    <a
      data-chrome
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      className="group fixed right-[15px] bottom-[calc(var(--bar-h)+env(safe-area-inset-bottom)+14px)] z-40 grid size-[54px] place-items-center rounded-blob bg-felt text-offwhite shadow-[0_8px_24px_-8px_rgba(28,29,31,0.45)] transition-[border-radius,transform,background-color] duration-[var(--dur)] ease-ref hover:scale-105 hover:bg-felt-deep hover:[border-radius:56%_44%_58%_42%/46%_56%_44%_54%] md:right-7 xl:bottom-7 xl:size-[60px]"
    >
      <ChatIcon className="size-6 xl:size-7" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-charcoal px-3 py-1.5 text-[13px] text-offwhite opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
        WhatsApp us
      </span>
    </a>
  );
}
