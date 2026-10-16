import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", borderRadius: 999, background: "#B3261E", color: "#F7F4EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, letterSpacing: -2 }}>
        S&amp;S
      </div>
    ),
    size,
  );
}
