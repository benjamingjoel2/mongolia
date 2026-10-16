"use client";

import { formatPrice } from "@/lib/currency";
import { useCurrency } from "@/components/layout/CurrencyStore";

/** Renders a USD base price in the visitor's selected currency. */
export function Price({ usd, className }: { usd: number; className?: string }) {
  const code = useCurrency();
  return (
    <span className={className} data-currency={code}>
      {formatPrice(usd, code)}
    </span>
  );
}

export function FromPrice({ usd, className }: { usd: number; className?: string }) {
  return (
    <span className={className}>
      From <Price usd={usd} /> per person
    </span>
  );
}
