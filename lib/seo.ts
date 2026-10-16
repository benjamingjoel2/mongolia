import type { Metadata } from "next";
import { site } from "@/config/site";
import { sized, type Img } from "@/lib/images";

/** Page metadata with a complete Open Graph block (child openGraph objects replace the parent's). */
export function pageMeta({ title, description, path, image, type = "website" }: { title: string; description: string; path: string; image?: Img; type?: "website" | "article" }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: site.name,
      locale: "en_GB",
      url: path,
      title: `${title} | ${site.name}`,
      description,
      ...(image ? { images: [{ url: sized(image, 1200), width: 1200, height: 800, alt: image.alt }] } : {}),
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}
