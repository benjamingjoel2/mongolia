"use client";

import { formatPrice } from "@/lib/currency";
import { useCurrency } from "@/components/layout/CurrencyStore";
import { useT } from "@/lib/i18n/client";
import { msg } from "@/lib/i18n/core";

const FROM_PP = msg("From {price} pp");
const FROM_PER_PERSON = msg("From {price} per person");

/** Renders a USD base price in the visitor's selected currency. */
export function Price({ usd, className }: { usd: number; className?: string }) {
  const code = useCurrency();
  return (
    <span className={className} data-currency={code}>
      {formatPrice(usd, code)}
    </span>
  );
}

/** "From {price} per person" in the current language. */
export function FromPrice({ usd, className, short = false }: { usd: number; className?: string; short?: boolean }) {
  const t = useT();
  const [before, after] = t(short ? FROM_PP : FROM_PER_PERSON).split("{price}");
  return (
    <span className={className}>
      {before}
      <Price usd={usd} />
      {after}
    </span>
  );
}

/** "From {price}" in the current language. */
export function FromOnly({ usd, className }: { usd: number; className?: string }) {
  const t = useT();
  const [before, after] = t("From {price}").split("{price}");
  return (
    <span className={className}>
      {before}
      <Price usd={usd} />
      {after}
    </span>
  );
}
