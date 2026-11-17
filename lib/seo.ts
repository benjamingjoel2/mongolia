import type { Metadata } from "next";
import { site } from "@/config/site";
import { sized, type Img } from "@/lib/images";
import { locales, localizePath, ogLocale, type Locale } from "@/lib/i18n/config";
import { getLocale, t } from "@/lib/i18n/server";

/** Canonical and hreflang alternates (en, fr, de, es, x-default = en) for a locale-free path. */
export function alternatesFor(path: string, locale: Locale = getLocale()): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = localizePath(path, l);
  languages["x-default"] = path;
  return { canonical: localizePath(path, locale), languages };
}

/**
 * Page metadata with a complete Open Graph block (child openGraph objects replace the parent's).
 * Call after initLocale(); title and description must already be translated.
 */
export function pageMeta({
  title,
  description,
  path,
  image,
  type = "website",
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: Img;
  type?: "website" | "article";
  absoluteTitle?: boolean;
}): Metadata {
  const locale = getLocale();
  const full = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: alternatesFor(path, locale),
    openGraph: {
      type,
      siteName: site.name,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      url: localizePath(path, locale),
      title: full,
      description,
      images: image
        ? [{ url: sized(image, 1200), width: 1200, height: 800, alt: image.alt }]
        : // The generated share image for this language (app/[locale]/opengraph-image.tsx).
          [{ url: `/${locale}/opengraph-image/default`, width: 1200, height: 630, alt: `${site.name}: ${t(site.tagline)}` }],
    },
    twitter: { card: "summary_large_image", title: full, description },
  };
}
