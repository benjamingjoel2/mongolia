import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { translate } from "@/lib/i18n/core";
import { dictionaries } from "@/lib/i18n/dictionaries";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };
const translator = async (params: Props["params"]) => {
  const { locale: l } = await params;
  const locale: Locale = isLocale(l) ? l : "en";
  return (s: string) => translate(locale, dictionaries[locale], s);
};

export async function generateImageMetadata({ params }: Props) {
  const t = await translator(params);
  return [{ id: "default", alt: `${site.name}: ${t(site.tagline)}`, size, contentType }];
}

/** Default share image: the hero wordmark on charcoal with the felt-red mark. */
export default async function OpengraphImage({ params }: Props) {
  const t = await translator(params);
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
          <div style={{ fontSize: 30 }}>{t("Mongolia adventure travel")}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.86, letterSpacing: -6 }}>
          <div style={{ fontSize: 190, paddingLeft: 110 }}>STEPPE</div>
          <div style={{ fontSize: 190 }}>&amp; SKY</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 32 }}>
          <div style={{ fontStyle: "italic" }}>{t(site.tagline)}</div>
          <div style={{ width: 220, height: 8, background: "#D9A441", borderRadius: 8 }} />
        </div>
      </div>
    ),
    size,
  );
}
