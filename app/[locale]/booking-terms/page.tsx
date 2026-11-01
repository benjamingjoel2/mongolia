import type { Metadata } from "next";
import { getLegalDoc } from "@/data/legal";
import { LegalPage } from "@/components/sections/LegalPage";
import { initLocale } from "@/lib/i18n/server";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const d = getLegalDoc("booking-terms", await initLocale());
  return pageMeta({ title: d.title, description: d.description, path: "/booking-terms" });
}

export default async function Page() {
  return <LegalPage doc={getLegalDoc("booking-terms", await initLocale())} />;
}
