"use client";

/**
 * next/image loader for Unsplash's imgix CDN: resizing and AVIF/WebP negotiation happen
 * at Unsplash's edge, so pages don't wait on (or pay for) server-side optimisation.
 * Local /public images pass through untouched.
 */
export default function unsplashLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 70));
  return url.toString();
}
