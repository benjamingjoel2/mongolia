export const locales = ["en", "fr", "de", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, { short: string; name: string }> = {
  en: { short: "EN", name: "English" },
  fr: { short: "FR", name: "Français" },
  de: { short: "DE", name: "Deutsch" },
  es: { short: "ES", name: "Español" },
};
export const htmlLang: Record<Locale, string> = { en: "en-GB", fr: "fr", de: "de", es: "es" };
export const ogLocale: Record<Locale, string> = { en: "en_GB", fr: "fr_FR", de: "de_DE", es: "es_ES" };
/** BCP 47 tag for Intl date and number formatting. */
export const intlLocale: Record<Locale, string> = { en: "en-GB", fr: "fr-FR", de: "de-DE", es: "es-ES" };

export const isLocale = (x: unknown): x is Locale => typeof x === "string" && (locales as readonly string[]).includes(x);

/** Prefix an internal path with the locale (English stays at the root). */
export function localizePath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//") || path.startsWith("/api/")) return path;
  if (locale === defaultLocale) return path;
  if (path === "/") return `/${locale}`;
  if (/^\/[?#]/.test(path)) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

/** Split a browser pathname into its locale and the locale-free path. */
export function splitPath(pathname: string): { locale: Locale; path: string } {
  const m = pathname.match(/^\/(fr|de|es|en)(?=\/|$)(.*)$/);
  if (m) return { locale: m[1] as Locale, path: m[2] || "/" };
  return { locale: defaultLocale, path: pathname || "/" };
}

const EN_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** Abbreviated month name (1 = January) in the given language. */
export function monthShortName(m: number, locale: Locale): string {
  if (locale === "en") return EN_SHORT[m - 1];
  const s = new Intl.DateTimeFormat(intlLocale[locale], { month: "short", timeZone: "UTC" }).format(new Date(Date.UTC(2026, m - 1, 15)));
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Date formatted for the given language, e.g. "12 July 2027" / "12 juillet 2027". */
export function formatDate(iso: string, locale: Locale, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(intlLocale[locale], { ...opts, timeZone: "UTC" });
}
