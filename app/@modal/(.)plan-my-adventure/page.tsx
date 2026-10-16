import { PlannerModal } from "@/components/planner/PlannerModal";
import { plannerProps } from "@/lib/plannerProps";

/** Intercepted route: "Plan my adventure" links open the planner as a modal over the current page. */
export default function PlanModal() {
  return <PlannerModal {...plannerProps()} />;
}
