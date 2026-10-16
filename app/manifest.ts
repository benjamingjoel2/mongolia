import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F4EE",
    theme_color: "#1C1D1F",
    icons: [{ src: "/apple-icon", sizes: "180x180", type: "image/png" }],
  };
}
