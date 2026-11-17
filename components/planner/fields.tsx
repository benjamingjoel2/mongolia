"use client";

import { useId } from "react";
import type { Img } from "@/lib/images";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/ui/Photo";
import { Check } from "@/components/ui/icons";
import { useT } from "@/lib/i18n/client";

export function FieldError({ id, message }: { id?: string; message?: string }) {
  const t = useT();
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-3 flex items-center gap-2 text-[15px] text-gobi">
      <span aria-hidden className="grid size-5 place-items-center rounded-full bg-gobi text-[12px] font-bold text-charcoal">
        !
      </span>
      {t(message)}
    </p>
  );
}

export function Question({
  title,
  hint,
  children,
  error,
  errorId,
  as = "fieldset",
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  error?: string;
  errorId?: string;
  as?: "fieldset" | "div";
}) {
  const content = (
    <>
      <span className="block text-[22px] font-medium leading-tight tracking-[-0.03em] md:text-[28px]">{title}</span>
      {hint && <span className="mt-2 block text-[15px] text-offwhite/65 md:text-[16px]">{hint}</span>}
    </>
  );
  return as === "fieldset" ? (
    <fieldset className="min-w-0" aria-describedby={error ? errorId : undefined}>
      <legend className="mb-5 md:mb-6">{content}</legend>
      {children}
      <FieldError id={errorId} message={error} />
    </fieldset>
  ) : (
    <div className="min-w-0">
      <div className="mb-5 md:mb-6">{content}</div>
      {children}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

/** Text option tile; radio (single) or toggle (multi). */
export function OptionCard({
  selected,
  onSelect,
  title,
  hint,
  multi = false,
  className,
  name,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  hint?: string;
  multi?: boolean;
  className?: string;
  name?: string;
}) {
  return (
    <button
      type="button"
      role={multi ? undefined : "radio"}
      aria-checked={multi ? undefined : selected}
      aria-pressed={multi ? selected : undefined}
      data-name={name}
      onClick={onSelect}
      className={cn(
        "group relative flex min-h-[64px] flex-col items-start justify-center rounded-[18px] border px-4 py-3 text-left transition-[background-color,border-color,color] duration-300 md:min-h-[76px] md:px-5",
        selected
          ? "border-offwhite bg-offwhite text-charcoal"
          : "border-offwhite/25 hover:border-offwhite/70",
        className,
      )}
    >
      <span className="pr-7 text-[17px] font-medium leading-tight tracking-[-0.02em] md:text-[19px]">{title}</span>
      {hint && (
        <span className={cn("mt-1 text-[13px] leading-snug md:text-[14px]", selected ? "text-charcoal/70" : "text-offwhite/60")}>
          {hint}
        </span>
      )}
      <span
        aria-hidden
        className={cn(
          "absolute right-3 top-3 grid size-6 place-items-center rounded-full border transition-colors",
          selected ? "border-felt bg-felt text-offwhite" : "border-offwhite/30",
        )}
      >
        {selected && <Check className="size-3.5" />}
      </span>
    </button>
  );
}

/** Image tile for regions and activities (multi-select). */
export function ImageCard({
  selected,
  onToggle,
  title,
  hint,
  image,
}: {
  selected: boolean;
  onToggle: () => void;
  title: string;
  hint?: string;
  image: Img;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={cn(
        "group relative aspect-[4/5] overflow-hidden rounded-[14px] text-left outline-offset-4 transition-shadow duration-300 md:aspect-[3/4]",
        selected ? "ring-[3px] ring-felt ring-offset-[3px] ring-offset-charcoal" : "",
      )}
    >
      <Photo
        image={image}
        sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 46vw"
        quality={60}
        alt=""
        className={cn("transition-transform duration-[1.2s] ease-ref", selected ? "scale-[1.08]" : "group-hover:scale-[1.05]")}
      />
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 bg-gradient-to-t transition-opacity",
          selected ? "from-felt/85 via-felt/20 to-transparent" : "from-charcoal/85 via-charcoal/15 to-transparent",
        )}
      />
      <span className="absolute inset-x-0 bottom-0 p-3 md:p-4">
        <span className="block text-[17px] font-medium leading-tight tracking-[-0.03em] text-offwhite md:text-[20px]">{title}</span>
        {hint && <span className="mt-1 hidden text-[13px] leading-snug text-offwhite/80 sm:block">{hint}</span>}
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute right-3 top-3 grid size-7 place-items-center rounded-full border-2 transition-all",
          selected ? "border-felt bg-felt text-offwhite" : "border-offwhite/80 bg-charcoal/30",
        )}
      >
        {selected && <Check className="size-4" />}
      </span>
    </button>
  );
}

export function Stepper({
  label,
  decLabel,
  incLabel,
  value,
  min,
  max,
  onChange,
  suffix,
}: {
  label: string;
  decLabel: string;
  incLabel: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  const id = useId();
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        aria-label={decLabel}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="grid size-12 place-items-center rounded-full border border-offwhite/40 text-[22px] transition-colors hover:bg-offwhite hover:text-charcoal disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-offwhite"
      >
        −
      </button>
      <output id={id} aria-live="polite" aria-label={label} className="min-w-[3ch] text-center text-[40px] font-medium tabular-nums tracking-[-0.04em] md:text-[52px]">
        {value}
      </output>
      <button
        type="button"
        aria-label={incLabel}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="grid size-12 place-items-center rounded-full border border-offwhite/40 text-[22px] transition-colors hover:bg-offwhite hover:text-charcoal disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-offwhite"
      >
        +
      </button>
      {suffix && <span className="text-[17px] text-offwhite/70">{suffix}</span>}
    </div>
  );
}

export function TextField({
  label,
  error,
  className,
  textarea,
  ...rest
}: {
  label: string;
  error?: string;
  textarea?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const errId = `${id}-err`;
  const cls =
    "mt-2 w-full border-b border-offwhite/35 bg-transparent pb-3 pt-1 text-[19px] tracking-[-0.02em] text-offwhite placeholder:text-offwhite/35 transition-colors focus:border-gobi focus:outline-none md:text-[22px]";
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[14px] text-offwhite/70 md:text-[15px]">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={4}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errId : undefined}
          className={cn(cls, "resize-y")}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errId : undefined}
          className={cls}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      <FieldError id={errId} message={error} />
    </div>
  );
}
