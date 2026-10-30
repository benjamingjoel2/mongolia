import type { Metadata } from "next";
import { getLegalDoc } from "@/data/legal";
import { LegalPage } from "@/components/sections/LegalPage";

const doc = getLegalDoc("privacy");

export const metadata: Metadata = {
  title: doc.title,
  description: doc.description,
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return <LegalPage doc={doc} />;
}
