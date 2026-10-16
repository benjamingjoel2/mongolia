import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "felt" | "charcoal" | "offwhite" | "gobi";

const variants: Record<Variant, string> = {
  felt: "bg-felt text-offwhite hover:bg-felt-deep",
  charcoal: "bg-charcoal text-offwhite hover:bg-charcoal-soft",
  offwhite: "bg-offwhite text-charcoal hover:bg-sand",
  gobi: "bg-gobi text-charcoal hover:bg-[#cf9733]",
};

type Common = { variant?: Variant; className?: string; children: React.ReactNode; size?: "sm" | "md" | "lg" };

const sizes = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-[15px] md:h-12 md:px-6 md:text-[16px]",
  lg: "h-14 px-7 text-[17px] md:h-16 md:px-9 md:text-[20px]",
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium tracking-[-0.03em] rounded-blob-pill transition-[background-color,transform,border-radius] duration-[var(--dur)] ease-ref hover:[border-radius:780px_999px_800px_920px/920px_800px_999px_780px] active:scale-[0.97]";

/** The reference's irregular red button, as a pill for text labels. */
export function BlobButton({
  href,
  variant = "felt",
  size = "md",
  className,
  children,
  ...rest
}: Common & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link href={href} className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

export function BlobActionButton({
  variant = "felt",
  size = "md",
  className,
  children,
  ...rest
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

/** Round blob icon button (scroll-down arrow, carousel arrow). */
export function BlobIconButton({
  label,
  className,
  children,
  variant = "felt",
  ...rest
}: { label: string; variant?: Variant; className?: string; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "grid size-[52px] place-items-center rounded-blob transition-[border-radius,transform,background-color] duration-[var(--dur)] ease-ref hover:scale-105 hover:[border-radius:56%_44%_58%_42%/46%_56%_44%_54%] md:h-[56px] md:w-[60px]",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
