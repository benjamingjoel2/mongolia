import { cn } from "@/lib/cn";

/**
 * Organic tab shape that hangs from the top edge (or rises from the bottom when `flip`).
 * Used as the moving nav indicator, echoing the reference's morphing blob tab.
 */
export function BlobTab({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 44"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", flip && "-scale-y-100", className)}
    >
      <path d="M0 0H100L96.2 31.5C95.5 37.6 91.4 41.2 85.8 41.5L13.6 44C8.1 44.2 4.6 40.4 3.9 34.8Z" fill="currentColor" />
    </svg>
  );
}
