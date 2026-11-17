import type { Metadata } from "next";
import { initLocale, t } from "@/lib/i18n/server";
import { pageMeta } from "@/lib/seo";
import { Planner } from "@/components/planner/Planner";
import { plannerProps } from "@/lib/plannerProps";

export async function generateMetadata(): Promise<Metadata> {
  await initLocale();
  return pageMeta({
    title: t("Plan my adventure"),
    description: t("Five quick steps: when, where, your travel style, who's coming and how to reach you. Your Steppe & Sky specialist replies within two working days."),
    path: "/plan-my-adventure",
  });
}

export default async function PlanPage() {
  await initLocale();
  return (
    <section data-theme="dark" className="min-h-dvh bg-charcoal text-offwhite">
      <div className="gutter mx-auto max-w-[1440px] pt-[calc(var(--header-h)+24px)] md:pt-[calc(var(--header-h)+40px)]">
        <h1 className="text-micro mb-6 uppercase tracking-[0.04em] text-gobi">{t("Plan my adventure · 5 steps")}</h1>
        <Planner {...plannerProps()} />
      </div>
    </section>
  );
}
