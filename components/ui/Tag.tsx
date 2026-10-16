import { cn } from "@/lib/cn";

export function Tag({ children, className, tone = "light" }: { children: React.ReactNode; className?: string; tone?: "light" | "dark" | "outline" }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center whitespace-nowrap rounded-full px-3 text-[12px] font-medium tracking-[-0.01em] md:text-[13px]",
        tone === "light" && "bg-offwhite/90 text-charcoal",
        tone === "dark" && "bg-charcoal/80 text-offwhite backdrop-blur-sm",
        tone === "outline" && "border border-current",
        className,
      )}
    >
      {children}
    </span>
  );
}
