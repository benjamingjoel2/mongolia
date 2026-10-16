import { currencies, defaultCurrency, type CurrencyCode } from "@/config/site";

/** Convert a base USD amount into the target currency, rounded to a clean list price. */
export function convertFromUSD(usd: number, code: CurrencyCode): number {
  const c = currencies[code];
  const raw = usd * c.rate;
  return Math.round(raw / c.roundTo) * c.roundTo;
}

export function formatPrice(usd: number, code: CurrencyCode): string {
  const c = currencies[code];
  const value = convertFromUSD(usd, code);
  if (code === "MNT") {
    return `₮${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value)}`;
  }
  if (code === "AUD") {
    return `A$${new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 }).format(value)}`;
  }
  return new Intl.NumberFormat(c.locale, {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(value);
}

export function isCurrencyCode(v: unknown): v is CurrencyCode {
  return typeof v === "string" && v in currencies;
}

export { defaultCurrency };
