import { PlannerModal } from "@/components/planner/PlannerModal";
import { plannerProps } from "@/lib/plannerProps";
import { initLocale } from "@/lib/i18n/server";

/** Intercepted route: "Plan my adventure" links open the planner as a modal over the current page. */
export default async function PlanModal() {
  await initLocale();
  return <PlannerModal {...plannerProps()} />;
}
