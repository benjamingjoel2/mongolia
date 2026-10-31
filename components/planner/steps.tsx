"use client";

import type { Activity, ComfortLevel, MonthNumber } from "@/data/types";
import { activityLabels, comfortLabels, monthNames } from "@/data/taxonomy";
import { site } from "@/config/site";
import { Emphasis } from "@/components/ui/DisplayHeading";
import { useLocale } from "@/lib/i18n/client";
import { monthShortName } from "@/lib/i18n/config";
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
import { useT } from "@/lib/i18n/client";
import { msg } from "@/lib/i18n/core";

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
  rating >= 5 ? msg("Peak season") : rating === 4 ? msg("Great") : rating === 3 ? msg("Shoulder") : rating === 2 ? msg("Quiet, cold") : msg("Deep winter");

/* ---------- 1. When ---------- */

export function StepWhen({ values, set, errors, monthHints }: StepProps<"when"> & { monthHints: MonthHint[] }) {
  const t = useT();
  const locale = useLocale();
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <Question title={t("Which month would you like to travel?")} hint={t("June to September is the main season. Winter trips suit experienced travellers.")} error={errors.month} errorId="err-month">
        <div role="radiogroup" aria-label={t("Travel month")} className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {(Object.keys(monthNames).map(Number) as MonthNumber[]).map((m) => (
            <OptionCard
              key={m}
              name="month"
              selected={values.month === m}
              onSelect={() => set({ month: m })}
              title={monthShortName(m, locale)}
              hint={t(seasonHint(monthHints.find((h) => h.month === m)?.rating ?? 3))}
            />
          ))}
        </div>
      </Question>

      <Question title={t("Are your dates flexible?")} error={errors.flexible} errorId="err-flexible">
        <div role="radiogroup" aria-label={t("Flexible dates")} className="grid max-w-xl grid-cols-2 gap-2">
          <OptionCard name="flexible" selected={values.flexible === "yes"} onSelect={() => set({ flexible: "yes" })} title={t("Yes, flexible")} hint={t("We'll suggest the best window")} />
          <OptionCard name="flexible" selected={values.flexible === "no"} onSelect={() => set({ flexible: "no" })} title={t("No, fixed dates")} hint={t("Tell us more in the notes")} />
        </div>
      </Question>

      <Question as="div" title={t("How many days in Mongolia?")} hint={t("Between 5 and 30 days. Most first trips are 10 to 14.")} error={errors.days} errorId="err-days">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
          <Stepper label={t("Days")} decLabel={t("Fewer days")} incLabel={t("More days")} value={values.days} min={5} max={30} onChange={(days) => set({ days })} suffix={t("days")} />
          <input
            type="range"
            min={5}
            max={30}
            value={values.days}
            onChange={(e) => set({ days: Number(e.target.value) })}
            aria-label={t("Number of days")}
            className="w-full max-w-md accent-felt"
          />
        </div>
      </Question>

      <Question title={t("Would you like to travel around a festival?")} hint={t("Festival dates move each year; we confirm them when we plan.")} error={errors.festival} errorId="err-festival">
        <div role="radiogroup" aria-label={t("Festival")} className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {festivalChoices.map((f) => (
            <OptionCard key={f.value} name="festival" selected={values.festival === f.value} onSelect={() => set({ festival: f.value })} title={t(f.label)} hint={t(f.hint)} />
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
  const t = useT();
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <Question title={t("Where would you like to go?")} hint={t("Choose as many as you like.")} error={errors.regions} errorId="err-regions">
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

      <Question title={t("What would you love to do?")} hint={t("Pick the experiences that excite you most.")}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {(Object.keys(activityLabels) as Activity[]).map((a) => (
            <ImageCard
              key={a}
              title={t(activityLabels[a])}
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
            <Emphasis text={t("*Help me* choose")} />
          </span>
          <span className={cn("mt-2 block text-[15px] md:text-[16px]", values.helpMeChoose ? "text-charcoal/75" : "text-offwhite/65")}>
            {t("Not sure yet? Your specialist will suggest regions and experiences from your answers.")}
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
  const t = useT();
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <Question title={t("Small group or private?")} error={errors.style} errorId="err-style">
        <div role="radiogroup" aria-label={t("Trip style")} className="grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-2">
          <OptionCard name="style" selected={values.style === "group"} onSelect={() => set({ style: "group" })} title={t("Small group")} hint={t("Set departures, up to 10 travellers, great value")} />
          <OptionCard name="style" selected={values.style === "private"} onSelect={() => set({ style: "private" })} title={t("Private")} hint={t("Your own guide, driver and dates, built around you")} />
        </div>
      </Question>

      <Question title={t("How comfortable would you like your camps?")} error={errors.comfort} errorId="err-comfort">
        <div role="radiogroup" aria-label={t("Comfort level")} className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {(Object.keys(comfortLabels) as ComfortLevel[]).map((c) => (
            <OptionCard key={c} name="comfort" selected={values.comfort === c} onSelect={() => set({ comfort: c })} title={t(comfortLabels[c].label)} hint={t(comfortLabels[c].description)} />
          ))}
        </div>
      </Question>

      <Question title={t("How much riding experience do you have?")} hint={t("Mongolian horses are small, sure-footed and spirited.")} error={errors.riding} errorId="err-riding">
        <div role="radiogroup" aria-label={t("Riding experience")} className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {ridingChoices.map((r) => (
            <OptionCard key={r.value} name="riding" selected={values.riding === r.value} onSelect={() => set({ riding: r.value })} title={t(r.label)} hint={t(r.hint)} />
          ))}
        </div>
      </Question>

      <Question title={t("And your fitness level?")} error={errors.fitness} errorId="err-fitness">
        <div role="radiogroup" aria-label={t("Fitness level")} className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
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
  const t = useT();
  const budgetLabel = (b: (typeof budgetChoices)[number]) => {
    if (b.value === "unsure") return t("Not sure yet");
    if (b.min === 0) return t("Under {price}", { price: formatPrice(b.max!, code) });
    if (b.max === null) return t("{price} or more", { price: formatPrice(b.min!, code) });
    return t("{min} to {max}", { min: formatPrice(b.min!, code), max: formatPrice(b.max, code) });
  };

  const setChildren = (n: number) => {
    const ages = values.childAges.slice(0, n);
    while (ages.length < n) ages.push("");
    set({ children: n, childAges: ages });
  };

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <div className="grid gap-10 md:grid-cols-2">
        <Question as="div" title={t("Adults")} error={errors.adults} errorId="err-adults">
          <Stepper label={t("Adults")} decLabel={t("Fewer adults")} incLabel={t("More adults")} value={values.adults} min={1} max={20} onChange={(adults) => set({ adults })} />
        </Question>
        <Question as="div" title={t("Children")} hint={t("Under 18 on the day you travel.")} error={errors.children} errorId="err-children">
          <Stepper label={t("Children")} decLabel={t("Fewer children")} incLabel={t("More children")} value={values.children} min={0} max={10} onChange={setChildren} />
        </Question>
      </div>

      {values.children > 0 && (
        <div>
          <p className="mb-4 text-[17px] md:text-[19px]">{t("Children's ages")}</p>
          <div className="flex flex-wrap gap-3">
            {values.childAges.map((age, i) => (
              <label key={i} className="flex flex-col gap-1 text-[13px] text-offwhite/70">
                {t("Child {n}", { n: i + 1 })}
                <select
                  value={age}
                  onChange={(e) => {
                    const ages = [...values.childAges];
                    ages[i] = e.target.value === "" ? "" : Number(e.target.value);
                    set({ childAges: ages });
                  }}
                  className="h-12 min-w-[6.5rem] rounded-full border border-offwhite/35 bg-charcoal px-4 text-[17px] text-offwhite focus:border-gobi"
                >
                  <option value="">{t("Age")}</option>
                  {Array.from({ length: 18 }, (_, a) => (
                    <option key={a} value={a}>
                      {a === 0 ? t("Under 1") : a}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <FieldError id="err-childAges" message={errors.childAges} />
        </div>
      )}

      <Question title={t("Any dietary needs?")} hint={t("Mongolian food is meat and dairy rich. With notice, every diet can be catered for.")}>
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
                {t(d)}
              </button>
            );
          })}
        </div>
        <TextField
          className="mt-6 max-w-2xl"
          label={t("Anything else we should know? (allergies, intolerances)")}
          value={values.dietaryNotes}
          onChange={(e) => set({ dietaryNotes: e.target.value })}
          placeholder={t("Optional")}
        />
      </Question>

      <Question title={t("Budget per person")} hint={t("Excluding international flights. Shown in {code}.", { code })} error={errors.budget} errorId="err-budget">
        <div role="radiogroup" aria-label={t("Budget per person")} className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
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
  const t = useT();
  return (
    <div className="flex flex-col gap-10 md:gap-14">
      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <TextField label={t("Your name")} name="name" autoComplete="name" value={values.name} onChange={(e) => set({ name: e.target.value })} error={errors.name} />
        <TextField label={t("Email")} name="email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={(e) => set({ email: e.target.value })} error={errors.email} />
      </div>

      <div>
        <span className="block text-[14px] text-offwhite/70 md:text-[15px]">{t("Phone, with country code")}</span>
        <div className="mt-2 flex gap-3">
          <label className="sr-only" htmlFor="dialCode">
            {t("Country code")}
          </label>
          <select
            id="dialCode"
            value={values.dialCode}
            onChange={(e) => set({ dialCode: e.target.value })}
            className="h-[52px] shrink-0 rounded-full border border-offwhite/35 bg-charcoal px-4 text-[16px] text-offwhite focus:border-gobi"
          >
            {dialCodes.map((d) => (
              <option key={d.code} value={d.code}>
                {t(d.label)}
              </option>
            ))}
          </select>
          <TextField
            className="-mt-2 grow"
            label=""
            aria-label={t("Phone number")}
            name="phone"
            type="tel"
            autoComplete="tel-national"
            inputMode="tel"
            value={values.phone}
            onChange={(e) => set({ phone: e.target.value })}
            error={errors.phone}
            placeholder={t("Number")}
          />
        </div>
      </div>

      <Question title={t("How should we reach you?")} hint={t("Choose all that suit you.")} error={errors.contactMethods} errorId="err-contactMethods">
        <div className="grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-3">
          {contactChoices.map((m) => (
            <OptionCard
              key={m}
              multi
              selected={values.contactMethods.includes(m)}
              onSelect={() => set({ contactMethods: toggle(values.contactMethods, m) })}
              title={t(m)}
            />
          ))}
        </div>
      </Question>

      <TextField
        textarea
        label={t("Notes for your specialist")}
        value={values.notes}
        onChange={(e) => set({ notes: e.target.value })}
        placeholder={t("Dream moments, fixed dates, celebrations, accessibility needs…")}
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
            {t("I agree that {name} may use these details to reply to my enquiry and plan my trip. We never share your details for marketing.", { name: site.name })}
          </span>
        </label>
        <FieldError id="err-consent" message={errors.consent} />
      </div>
    </div>
  );
}
