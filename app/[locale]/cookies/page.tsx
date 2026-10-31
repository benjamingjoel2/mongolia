import type { Metadata } from "next";
import { getLegalDoc } from "@/data/legal";
import { LegalPage } from "@/components/sections/LegalPage";
import { initLocale, tr } from "@/lib/i18n/server";
import { pageMeta } from "@/lib/seo";

const doc = getLegalDoc("cookies");

export async function generateMetadata(): Promise<Metadata> {
  await initLocale();
  const d = tr(doc);
  return pageMeta({ title: d.title, description: d.description, path: "/cookies" });
}

export default async function Page() {
  await initLocale();
  return <LegalPage doc={doc} />;
}
