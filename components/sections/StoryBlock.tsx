import { cn } from "@/lib/cn";
import { Emphasis } from "@/components/ui/DisplayHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The reference's story-overlay typography on a page: a small label, then big type set
 * in the right-hand ~70% column.
 */
export function StoryBlock({
  label,
  text,
  children,
  tone = "light",
  className,
  size = "story",
}: {
  label?: string;
  text: string;
  children?: React.ReactNode;
  tone?: "light" | "dark" | "sand";
  className?: string;
  size?: "story" | "lead";
}) {
  return (
    <section
      data-theme={tone === "dark" ? "dark" : "light"}
      className={cn(
        "gutter py-20 md:py-[9vw]",
        tone === "dark" && "bg-charcoal text-offwhite",
        tone === "sand" && "bg-sand",
        className,
      )}
    >
      <div className="md:pl-[26.5vw]">
        {label && <p className="text-micro mb-8 uppercase tracking-[0.04em] text-felt md:mb-12">{label}</p>}
        <Reveal>
          <p className={cn(size === "story" ? "text-[clamp(2rem,5.6vw,6rem)] font-medium leading-[0.99] tracking-[-0.035em]" : "text-h2", "text-pretty")}>
            <Emphasis text={text} />
          </p>
        </Reveal>
        {children && <div className="mt-10 md:mt-16">{children}</div>}
      </div>
    </section>
  );
}
