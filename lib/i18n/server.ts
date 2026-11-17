import { cache } from "react";
import { locale as rootLocale } from "next/root-params";
import { isLocale, type Locale } from "./config";
import { translate, translateData, hashKey, type Dict, type Vars } from "./core";
import { dictionaries } from "./dictionaries";
import clientKeys from "@/i18n/client-keys.json";

export { dictionaries };

// Request-scoped locale. Every layout, page and generateMetadata calls initLocale() first,
// so it is set before anything below renders. Outside a request (sitemap, routes) it is English.
const store = cache((): { locale: Locale | null } => ({ locale: null }));

export async function initLocale(): Promise<Locale> {
  const l = await rootLocale();
  const locale = isLocale(l) ? l : "en";
  store().locale = locale;
  return locale;
}

export function getLocale(): Locale {
  try {
    return store().locale ?? "en";
  } catch {
    return "en";
  }
}

/** Translate English copy into the current locale. */
export function t(s: string, vars?: Vars): string {
  const l = getLocale();
  return translate(l, dictionaries[l], s, vars);
}

const memo = new WeakMap<object, Map<Locale, unknown>>();
/** Translated (memoised) copy of typed data in the current locale. */
export function tr<T>(value: T): T {
  const l = getLocale();
  if (l === "en" || value === null || typeof value !== "object") return value;
  let m = memo.get(value as object);
  if (!m) memo.set(value as object, (m = new Map()));
  if (!m.has(l)) m.set(l, translateData(value, l, dictionaries[l]));
  return m.get(l) as T;
}

/** Strings the browser needs: those used inside client components. */
export function clientDict(locale: Locale): Dict {
  if (locale === "en") return {};
  const dict = dictionaries[locale];
  const out: Dict = {};
  for (const k of clientKeys as string[]) if (dict[k]) out[k] = dict[k];
  return out;
}

export { hashKey };
