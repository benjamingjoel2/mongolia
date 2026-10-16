"use client";

import type { Activity, ComfortLevel, MonthNumber } from "@/data/types";
import { activityLabels, comfortLabels, monthNames } from "@/data/taxonomy";
import { images, type Img } from "@/lib/images";
import {
  budgetChoices,
  contactChoices,
  dialCodes,
  dietaryChoices,
  festivalChoices,
  fitnessChoices,
  ridingChoices,
} from "@/lib/planner";
import { formatPrice } from "@/lib/currency";
import { useCurrency } from "@/components/layout/CurrencyStore";
import { cn } from "@/lib/cn";
import { ImageCard, OptionCard, Question, Stepper, TextField, FieldError } from "./fields";

export interface PlannerValues {
  when: { month: number | ""; flexible: "yes" | "no" | ""; days: number; festival: string };
  where: { regions: string[]; activities: string[]; helpMeChoose: boolean };
  style: { style: string; comfort: string; riding: string; fitness: string };
  who: {
    adults: number;
    children: number;
    childAges: (number | "")[];
    dietary: string[];
    dietaryNotes: string;
    budget: string;
  };
  contact: {
    name: string;
    email: string;
    dialCode: string;
    phone: string;
    contactMethods: string[];
    notes: string;
    consent: boolean;
  };
}

export const initialValues: PlannerValues = {
  when: { month: "", flexible: "", days: 12, festival: "none" },
  where: { regions: [], activities: [], helpMeChoose: false },
  style: { style: "", comfort: "", riding: "", fitness: "" },
  who: { adults: 2, children: 0, childAges: [], dietary: [], dietaryNotes: "", budget: "" },
  contact: { name: "", email: "", dialCode: "+44", phone: "", contactMethods: ["Email"], notes: "", consent: false },
};

export type Errors = Record<string, string>;

export interface RegionOption {
  slug: string;
  name: string;
  tagline: string;
  image: Img;
}

export interface MonthHint {
  month: MonthNumber;
  rating: number;
}

type StepProps<K extends keyof PlannerValues> = {
  values: PlannerValues[K];
  set: (patch: Partial<PlannerValues[K]>) => void;
  errors: Errors;
};

const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

const seasonHint = (rating: number) =>
  rating >= 5 ? "Peak season" : rating === 4 ? "Great" : rating === 3 ? "Shoulder" : rating === 2 ? "Quiet, cold" : "Deep winter";

/* ---------- 1. When ---------- */

export function StepWhen({ values, set, errors, monthHints }: StepProps<"when"> & { monthHints: MonthHint[] }) {
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <Question title="Which month would you like to travel?" hint="June to September is the main season. Winter trips suit experienced travellers." error={errors.month} errorId="err-month">
        <div role="radiogroup" aria-label="Travel month" className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {(Object.keys(monthNames).map(Number) as MonthNumber[]).map((m) => (
            <OptionCard
              key={m}
              name="month"
              selected={values.month === m}
              onSelect={() => set({ month: m })}
              title={monthNames[m].slice(0, 3)}
              hint={seasonHint(monthHints.find((h) => h.month === m)?.rating ?? 3)}
            />
          ))}
        </div>
      </Question>

      <Question title="Are your dates flexible?" error={errors.flexible} errorId="err-flexible">
        <div role="radiogroup" aria-label="Flexible dates" className="grid max-w-xl grid-cols-2 gap-2">
          <OptionCard name="flexible" selected={values.flexible === "yes"} onSelect={() => set({ flexible: "yes" })} title="Yes, flexible" hint="We'll suggest the best window" />
          <OptionCard name="flexible" selected={values.flexible === "no"} onSelect={() => set({ flexible: "no" })} title="No, fixed dates" hint="Tell us more in the notes" />
        </div>
      </Question>

      <Question as="div" title="How many days in Mongolia?" hint="Between 5 and 30 days. Most first trips are 10 to 14." error={errors.days} errorId="err-days">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
          <Stepper label="Days" value={values.days} min={5} max={30} onChange={(days) => set({ days })} suffix="days" />
          <input
            type="range"
            min={5}
            max={30}
            value={values.days}
            onChange={(e) => set({ days: Number(e.target.value) })}
            aria-label="Number of days"
            className="w-full max-w-md accent-felt"
          />
        </div>
      </Question>

      <Question title="Would you like to travel around a festival?" hint="Festival dates move each year; we confirm them when we plan." error={errors.festival} errorId="err-festival">
        <div role="radiogroup" aria-label="Festival" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {festivalChoices.map((f) => (
            <OptionCard key={f.value} name="festival" selected={values.festival === f.value} onSelect={() => set({ festival: f.value })} title={f.label} hint={f.hint} />
          ))}
        </div>
      </Question>
    </div>
  );
}

/* ---------- 2. Where and what ---------- */

const activityImages: Record<Activity, Img> = {
  overland: images.gerSunsetCar,
  "horse-riding": images.horseHerdGreen,
  "camel-trekking": images.camelsDunes,
  hiking: images.altaiLake,
  "eagle-hunting": images.eagleHunterHorseback,
  festival: images.naadamGrounds,
  culture: images.teaWithHerders,
  photography: images.altaiPinkPeaks,
  family: images.steppeRiverGers,
  wildlife: images.wildHorses,
};

export function StepWhere({ values, set, errors, regions }: StepProps<"where"> & { regions: RegionOption[] }) {
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <Question title="Where would you like to go?" hint="Choose as many as you like." error={errors.regions} errorId="err-regions">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {regions.map((r) => (
            <ImageCard
              key={r.slug}
              title={r.name}
              hint={r.tagline}
              image={r.image}
              selected={values.regions.includes(r.slug)}
              onToggle={() => set({ regions: toggle(values.regions, r.slug) })}
            />
          ))}
        </div>
      </Question>

      <Question title="What would you love to do?" hint="Pick the experiences that excite you most.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {(Object.keys(activityLabels) as Activity[]).map((a) => (
            <ImageCard
              key={a}
              title={activityLabels[a]}
              image={activityImages[a]}
              selected={values.activities.includes(a)}
              onToggle={() => set({ activities: toggle(values.activities, a) })}
            />
          ))}
        </div>
      </Question>

      <button
        type="button"
        aria-pressed={values.helpMeChoose}
        onClick={() => set({ helpMeChoose: !values.helpMeChoose })}
        className={cn(
          "flex items-center justify-between gap-6 rounded-[22px] border p-5 text-left transition-colors md:p-7",
          values.helpMeChoose ? "border-gobi bg-gobi text-charcoal" : "border-offwhite/30 hover:border-offwhite",
        )}
      >
        <span>
          <span className="block text-[22px] font-medium leading-tight tracking-[-0.03em] md:text-[28px]">
            <em className="italic">Help me</em> choose
          </span>
          <span className={cn("mt-2 block text-[15px] md:text-[16px]", values.helpMeChoose ? "text-charcoal/75" : "text-offwhite/65")}>
            Not sure yet? Your specialist will suggest regions and experiences from your answers.
          </span>
        </span>
        <span aria-hidden className={cn("grid size-8 shrink-0 place-items-center rounded-full border-2", values.helpMeChoose ? "border-charcoal bg-charcoal text-gobi" : "border-offwhite/60")}>
          {values.helpMeChoose && "✓"}
        </span>
      </button>
    </div>
  );
}

/* ---------- 3. Style ---------- */

export function StepStyle({ values, set, errors }: StepProps<"style">) {
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <Question title="Small group or private?" error={errors.style} errorId="err-style">
        <div role="radiogroup" aria-label="Trip style" className="grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-2">
          <OptionCard name="style" selected={values.style === "group"} onSelect={() => set({ style: "group" })} title="Small group" hint="Set departures, up to 10 travellers, great value" />
          <OptionCard name="style" selected={values.style === "private"} onSelect={() => set({ style: "private" })} title="Private" hint="Your own guide, driver and dates, built around you" />
        </div>
      </Question>

      <Question title="How comfortable would you like your camps?" error={errors.comfort} errorId="err-comfort">
        <div role="radiogroup" aria-label="Comfort level" className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {(Object.keys(comfortLabels) as ComfortLevel[]).map((c) => (
            <OptionCard key={c} name="comfort" selected={values.comfort === c} onSelect={() => set({ comfort: c })} title={comfortLabels[c].label} hint={comfortLabels[c].description} />
          ))}
        </div>
      </Question>

      <Question title="How much riding experience do you have?" hint="Mongolian horses are small, sure-footed and spirited." error={errors.riding} errorId="err-riding">
        <div role="radiogroup" aria-label="Riding experience" className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {ridingChoices.map((r) => (
            <OptionCard key={r.value} name="riding" selected={values.riding === r.value} onSelect={() => set({ riding: r.value })} title={r.label} hint={r.hint} />
          ))}
        </div>
      </Question>

      <Question title="And your fitness level?" error={errors.fitness} errorId="err-fitness">
        <div role="radiogroup" aria-label="Fitness level" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {fitnessChoices.map((f) => (
            <OptionCard key={f.value} name="fitness" selected={values.fitness === f.value} onSelect={() => set({ fitness: f.value })} title={f.label} hint={f.hint} />
          ))}
        </div>
      </Question>
    </div>
  );
}

/* ---------- 4. Who ---------- */

export function StepWho({ values, set, errors }: StepProps<"who">) {
  const code = useCurrency();
  const budgetLabel = (b: (typeof budgetChoices)[number]) => {
    if (b.value === "unsure") return "Not sure yet";
    if (b.min === 0) return `Under ${formatPrice(b.max!, code)}`;
    if (b.max === null) return `${formatPrice(b.min!, code)} or more`;
    return `${formatPrice(b.min!, code)} to ${formatPrice(b.max, code)}`;
  };

  const setChildren = (n: number) => {
    const ages = values.childAges.slice(0, n);
    while (ages.length < n) ages.push("");
    set({ children: n, childAges: ages });
  };

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <div className="grid gap-10 md:grid-cols-2">
        <Question as="div" title="Adults" error={errors.adults} errorId="err-adults">
          <Stepper label="Adults" value={values.adults} min={1} max={20} onChange={(adults) => set({ adults })} />
        </Question>
        <Question as="div" title="Children" hint="Under 18 on the day you travel." error={errors.children} errorId="err-children">
          <Stepper label="Children" value={values.children} min={0} max={10} onChange={setChildren} />
        </Question>
      </div>

      {values.children > 0 && (
        <div>
          <p className="mb-4 text-[17px] md:text-[19px]">Children&apos;s ages</p>
          <div className="flex flex-wrap gap-3">
            {values.childAges.map((age, i) => (
              <label key={i} className="flex flex-col gap-1 text-[13px] text-offwhite/70">
                Child {i + 1}
                <select
                  value={age}
                  onChange={(e) => {
                    const ages = [...values.childAges];
                    ages[i] = e.target.value === "" ? "" : Number(e.target.value);
                    set({ childAges: ages });
                  }}
                  className="h-12 min-w-[6.5rem] rounded-full border border-offwhite/35 bg-charcoal px-4 text-[17px] text-offwhite focus:border-gobi"
                >
                  <option value="">Age</option>
                  {Array.from({ length: 18 }, (_, a) => (
                    <option key={a} value={a}>
                      {a === 0 ? "Under 1" : a}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <FieldError id="err-childAges" message={errors.childAges} />
        </div>
      )}

      <Question title="Any dietary needs?" hint="Mongolian food is meat and dairy rich. With notice, every diet can be catered for.">
        <div className="flex flex-wrap gap-2">
          {dietaryChoices.map((d) => {
            const on = values.dietary.includes(d);
            return (
              <button
                key={d}
                type="button"
                aria-pressed={on}
                onClick={() => set({ dietary: toggle(values.dietary, d) })}
                className={cn(
                  "h-11 rounded-full border px-5 text-[16px] transition-colors",
                  on ? "border-offwhite bg-offwhite text-charcoal" : "border-offwhite/30 hover:border-offwhite",
                )}
              >
                {d}
              </button>
            );
          })}
        </div>
        <TextField
          className="mt-6 max-w-2xl"
          label="Anything else we should know? (allergies, intolerances)"
          value={values.dietaryNotes}
          onChange={(e) => set({ dietaryNotes: e.target.value })}
          placeholder="Optional"
        />
      </Question>

      <Question title="Budget per person" hint={`Excluding international flights. Shown in ${code}.`} error={errors.budget} errorId="err-budget">
        <div role="radiogroup" aria-label="Budget per person" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {budgetChoices.map((b) => (
            <OptionCard key={b.value} name="budget" selected={values.budget === b.value} onSelect={() => set({ budget: b.value })} title={budgetLabel(b)} />
          ))}
        </div>
      </Question>
    </div>
  );
}

/* ---------- 5. Contact ---------- */

export function StepContact({ values, set, errors }: StepProps<"contact">) {
  return (
    <div className="flex flex-col gap-10 md:gap-14">
      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <TextField label="Your name" name="name" autoComplete="name" value={values.name} onChange={(e) => set({ name: e.target.value })} error={errors.name} />
        <TextField label="Email" name="email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={(e) => set({ email: e.target.value })} error={errors.email} />
      </div>

      <div>
        <span className="block text-[14px] text-offwhite/70 md:text-[15px]">Phone, with country code</span>
        <div className="mt-2 flex gap-3">
          <label className="sr-only" htmlFor="dialCode">
            Country code
          </label>
          <select
            id="dialCode"
            value={values.dialCode}
            onChange={(e) => set({ dialCode: e.target.value })}
            className="h-[52px] shrink-0 rounded-full border border-offwhite/35 bg-charcoal px-4 text-[16px] text-offwhite focus:border-gobi"
          >
            {dialCodes.map((d) => (
              <option key={d.code} value={d.code}>
                {d.label}
              </option>
            ))}
          </select>
          <TextField
            className="-mt-2 grow"
            label=""
            aria-label="Phone number"
            name="phone"
            type="tel"
            autoComplete="tel-national"
            inputMode="tel"
            value={values.phone}
            onChange={(e) => set({ phone: e.target.value })}
            error={errors.phone}
            placeholder="Number"
          />
        </div>
      </div>

      <Question title="How should we reach you?" hint="Choose all that suit you." error={errors.contactMethods} errorId="err-contactMethods">
        <div className="grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-3">
          {contactChoices.map((m) => (
            <OptionCard
              key={m}
              multi
              selected={values.contactMethods.includes(m)}
              onSelect={() => set({ contactMethods: toggle(values.contactMethods, m) })}
              title={m}
            />
          ))}
        </div>
      </Question>

      <TextField
        textarea
        label="Notes for your specialist"
        value={values.notes}
        onChange={(e) => set({ notes: e.target.value })}
        placeholder="Dream moments, fixed dates, celebrations, accessibility needs…"
      />

      <div>
        <label className="flex cursor-pointer items-start gap-4 text-[15px] leading-snug md:text-[16px]">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set({ consent: e.target.checked })}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "err-consent" : undefined}
            className="mt-0.5 size-6 shrink-0 accent-felt"
          />
          <span>
            I agree that Steppe &amp; Sky may use these details to reply to my enquiry and plan my trip. We never share
            your details for marketing.
          </span>
        </label>
        <FieldError id="err-consent" message={errors.consent} />
      </div>
    </div>
  );
}
