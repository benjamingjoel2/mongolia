import type { Metadata } from "next";
import { Planner } from "@/components/planner/Planner";
import { plannerProps } from "@/lib/plannerProps";

export const metadata: Metadata = {
  title: "Plan my adventure",
  description:
    "Five quick steps: when, where, your travel style, who's coming and how to reach you. Your Steppe & Sky specialist replies within two working days.",
  alternates: { canonical: "/plan-my-adventure" },
};

export default function PlanPage() {
  return (
    <section data-theme="dark" className="min-h-dvh bg-charcoal text-offwhite">
      <div className="gutter mx-auto max-w-[1440px] pt-[calc(var(--header-h)+24px)] md:pt-[calc(var(--header-h)+40px)]">
        <p className="text-micro mb-6 uppercase tracking-[0.04em] text-gobi">Plan my adventure · 5 steps</p>
        <Planner {...plannerProps()} />
      </div>
    </section>
  );
}
