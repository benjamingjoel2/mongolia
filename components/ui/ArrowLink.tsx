import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  arrowClassName?: string;
  external?: boolean;
};

/** "→ Label" link, the reference's primary text-link pattern. The arrow nudges right on hover. */
export function ArrowLink({ href, children, className, arrowClassName, external }: Props) {
  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          "inline-block transition-transform duration-[var(--dur-fast)] ease-ref group-hover:translate-x-1.5",
          arrowClassName,
        )}
      >
        →
      </span>
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-[var(--dur)] ease-ref group-hover:bg-[length:100%_1px]">
        {children}
      </span>
    </>
  );
  const cls = cn("group inline-flex items-baseline gap-[0.45em] text-link", className);
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
