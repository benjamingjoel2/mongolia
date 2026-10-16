import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default share image: the hero wordmark on charcoal with the felt-red mark. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(180deg, #2F6FB5 0%, #1C1D1F 62%)",
          color: "#F7F4EE",
          padding: "56px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 999, background: "#B3261E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
            S&amp;S
          </div>
          <div style={{ fontSize: 30 }}>Mongolia adventure travel</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.86, letterSpacing: -6 }}>
          <div style={{ fontSize: 190, paddingLeft: 110 }}>STEPPE</div>
          <div style={{ fontSize: 190 }}>&amp; SKY</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 32 }}>
          <div style={{ fontStyle: "italic" }}>{site.tagline}</div>
          <div style={{ width: 220, height: 8, background: "#D9A441", borderRadius: 8 }} />
        </div>
      </div>
    ),
    size,
  );
}
