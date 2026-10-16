import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import { preconnect } from "react-dom";
import { site } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { MobileBar } from "@/components/layout/MobileBar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MotionProvider } from "@/components/layout/MotionProvider";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: Mongolia adventure travel`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#1C1D1F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  preconnect("https://images.unsplash.com", { crossOrigin: "anonymous" });
  return (
    <html lang="en" className={interTight.variable}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-charcoal px-4 py-2 text-offwhite focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileBar />
          <WhatsAppButton />
          {modal}
        </MotionProvider>
      </body>
    </html>
  );
}
