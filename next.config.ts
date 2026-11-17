import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      // English lives at the root: /en/... is the same page.
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path((?!opengraph-image).*)", destination: "/:path", permanent: true },
      // Testimonials were removed (none are real yet); old links go to About.
      { source: "/testimonials", destination: "/about", permanent: true },
      { source: "/:locale(fr|de|es)/testimonials", destination: "/:locale/about", permanent: true },
    ];
  },
  images: {
    // Unsplash's CDN resizes and serves AVIF/WebP for us (see lib/imageLoader.ts).
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    qualities: [60, 75, 85],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({
  options: {
    // Strip YAML frontmatter from rendered output; it is read separately by data/posts.ts.
    remarkPlugins: ["remark-frontmatter"],
  },
});

export default withMDX(nextConfig);
