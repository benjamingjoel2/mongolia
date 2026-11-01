import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { preconnect } from "react-dom";
import { site } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { MobileBar } from "@/components/layout/MobileBar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { I18nProvider } from "@/lib/i18n/client";
import { htmlLang, isLocale, locales, ogLocale } from "@/lib/i18n/config";
import { clientDict, initLocale, t } from "@/lib/i18n/server";
import "../globals.css";

// Inter Tight (SIL Open Font License), latin subset, variable weight, self-hosted
// so the build never depends on fetching from Google Fonts.
const interTight = localFont({
  src: [
    { path: "../fonts/InterTight-latin.woff2", weight: "400 500", style: "normal" },
    { path: "../fonts/InterTight-Italic-latin.woff2", weight: "400 500", style: "italic" },
  ],
  variable: "--font-inter-tight",
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export async function generateMetadata(): Promise<Metadata> {
  const locale = await initLocale();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name}: ${t("Mongolia adventure travel")}`,
      template: `%s | ${site.name}`,
    },
    description: t(site.description),
    applicationName: site.name,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale[locale],
      title: `${site.name}: ${t(site.tagline)}`,
      description: t(site.description),
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#1C1D1F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
  modal,
  params,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: l } = await params;
  if (!isLocale(l)) notFound();
  const locale = await initLocale();
  preconnect("https://images.unsplash.com", { crossOrigin: "anonymous" });
  return (
    <html lang={htmlLang[locale]} className={interTight.variable}>
      <body className="min-h-dvh">
        <I18nProvider locale={locale} dict={clientDict(locale)}>
          <a
            href="#main"
            className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-charcoal px-4 py-2 text-offwhite focus:translate-y-0"
          >
            {t("Skip to content")}
          </a>
          <MotionProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <MobileBar />
            {modal}
          </MotionProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
