import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#B3261E", color: "#F7F4EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64, letterSpacing: -4 }}>
        S&amp;S
      </div>
    ),
    size,
  );
}
