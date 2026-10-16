import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
  as: As = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "section" | "header" | "footer";
}) {
  return <As className={cn("gutter mx-auto w-full max-w-[1920px]", className)}>{children}</As>;
}
