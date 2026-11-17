import { hashKey } from "./hash";
import type { Locale } from "./config";

export { hashKey };
export type Dict = Record<string, string>;
export type Vars = Record<string, string | number | undefined>;

/** Translate an English source string with a dictionary keyed by hashKey(English). Falls back to English. */
export function translate(locale: Locale, dict: Dict, s: string, vars?: Vars): string {
  let out = locale === "en" ? s : (dict[hashKey(s)] ?? s);
  if (vars) out = out.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k] ?? "") : m));
  return out;
}

/** Marks a string literal as translatable copy without translating it (picked up by scripts/i18n-extract.cjs). */
export const msg = <T extends string>(s: T): T => s;

/**
 * Data keys whose string values are identifiers, codes or paths, never visible copy.
 * Translation skips them and everything beneath them.
 */
export const SKIP_KEYS = new Set([
  "slug", "id", "src", "href", "url", "orientation", "regions", "activities", "difficulty", "seasons", "months",
  "styles", "style", "festival", "festivals", "experiences", "adventures", "staySlug", "region", "comfort", "status",
  "start", "end", "bestRegions", "bestMonths", "topic", "verify", "meals", "date", "value", "code", "locale", "symbol",
  "day", "relatedAdventures", "file", "video", "email", "postalAddress", "url",
]);

/** Every visible English string inside a data value. */
export function copyStrings(value: unknown, out: Set<string> = new Set()): Set<string> {
  if (typeof value === "string") {
    if (/\p{L}{2}/u.test(value)) out.add(value);
  } else if (Array.isArray(value)) {
    for (const x of value) copyStrings(x, out);
  } else if (value && typeof value === "object") {
    for (const [k, x] of Object.entries(value)) if (!SKIP_KEYS.has(k)) copyStrings(x, out);
  }
  return out;
}

/** Deep copy of a data value with every visible string translated. */
export function translateData<T>(value: T, locale: Locale, dict: Dict): T {
  if (locale === "en") return value;
  const walk = (v: unknown): unknown => {
    if (typeof v === "string") return /\p{L}{2}/u.test(v) ? (dict[hashKey(v)] ?? v) : v;
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === "object" && Object.getPrototypeOf(v) === Object.prototype) {
      const o: Record<string, unknown> = {};
      for (const [k, x] of Object.entries(v)) o[k] = SKIP_KEYS.has(k) ? x : walk(x);
      return o;
    }
    return v;
  };
  return walk(value) as T;
}
