import { cn } from "@/lib/cn";

type Tag = "h1" | "h2" | "h3" | "p";

/**
 * Headline with the reference's signature italic emphasis.
 * Wrap the emphasised word(s) in asterisks: "*Adventures* under the eternal blue sky".
 */
export function DisplayHeading({
  as: As = "h2",
  text,
  className,
  id,
}: {
  as?: Tag;
  text: string;
  className?: string;
  id?: string;
}) {
  return (
    <As id={id} className={cn("text-h1 text-balance", className)}>
      <Emphasis text={text} />
    </As>
  );
}

export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("*") && p.endsWith("*") ? (
          <em key={i} className="italic">
            {p.slice(1, -1)}
          </em>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}
