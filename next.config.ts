import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
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
