"use client";

import Link from "@/components/i18n/Link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { stepKeys, stepLabels, stepSchemas } from "@/lib/planner";
import { contact as contactInfo } from "@/config/site";
import { cn } from "@/lib/cn";
import { BlobActionButton } from "@/components/ui/BlobButton";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Emphasis } from "@/components/ui/DisplayHeading";
import {
  StepContact,
  StepStyle,
  StepWhen,
  StepWhere,
  StepWho,
  initialValues,
  type Errors,
  type MonthHint,
  type PlannerValues,
  type RegionOption,
} from "./steps";
import { msg } from "@/lib/i18n/core";
import { useT } from "@/lib/i18n/client";

const STORAGE_KEY = "sns.planner.v1";

const titles = [
  msg("*When* are you dreaming of?"),
  msg("*Where* to, and what for?"),
  msg("Your travel *style*"),
  msg("*Who's* coming along?"),
  msg("How do we *reach* you?"),
];

interface Saved {
  step: number;
  maxStep: number;
  values: PlannerValues;
}

function loadSaved(): Saved | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Saved;
    return {
      step: Math.min(Math.max(parsed.step ?? 0, 0), 4),
      maxStep: Math.min(Math.max(parsed.maxStep ?? 0, 0), 4),
      values: {
        when: { ...initialValues.when, ...parsed.values?.when },
        where: { ...initialValues.where, ...parsed.values?.where },
        style: { ...initialValues.style, ...parsed.values?.style },
        who: { ...initialValues.who, ...parsed.values?.who },
        contact: { ...initialValues.contact, ...parsed.values?.contact, consent: false },
      },
    };
  } catch {
    return null;
  }
}

/** Seed from links like /plan-my-adventure?festival=naadam&adventure=altai-mountains-trek&region=gobi */
function fromQuery(
  values: PlannerValues,
  t: (s: string, v?: Record<string, string>) => string,
  adventureTitles: Record<string, string>,
): { values: PlannerValues; source?: string } {
  const p = new URLSearchParams(window.location.search);
  const festival = p.get("festival");
  const region = p.get("region");
  const adventure = p.get("adventure");
  const next = structuredClone(values);
  if (festival && ["naadam", "golden-eagle-festival", "tsagaan-sar"].includes(festival)) {
    next.when.festival = festival;
    next.when.month = festival === "naadam" ? 7 : festival === "golden-eagle-festival" ? 10 : 2;
  }
  if (region && !next.where.regions.includes(region)) next.where.regions.push(region);
  const departure = p.get("departure");
  if (adventure && !next.contact.notes) {
    const name = adventureTitles[adventure] ?? adventure.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
    next.contact.notes = departure
      ? t("I'm interested in: {name} (departure starting {date}).", { name, date: departure })
      : t("I'm interested in: {name}.", { name });
  }
  return { values: next, source: adventure ? `adventure:${adventure}` : festival ? `festival:${festival}` : undefined };
}

const noop = () => () => {};

/** Renders the planner only after hydration so saved progress can seed the initial state. */
export function Planner(props: PlannerProps) {
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const t = useT();
  if (!hydrated)
    return (
      <div className="min-h-[70vh] pt-[calc(3.5rem+2px+2.5rem)] md:pt-[calc(3.5rem+2px+4rem)]" aria-busy="true">
        <h2 className="text-h1 mb-10 max-w-[16ch] md:mb-16">
          <Emphasis text={t(titles[0])} />
        </h2>
      </div>
    );
  return <PlannerInner {...props} />;
}

type PlannerProps = {
  regions: RegionOption[];
  monthHints: MonthHint[];
  adventureTitles?: Record<string, string>;
  inModal?: boolean;
  onClose?: () => void;
};

function PlannerInner({ regions, monthHints, adventureTitles = {}, inModal, onClose }: PlannerProps) {
  const t = useT();
  const [initial] = useState(() => {
    const saved = loadSaved();
    const seeded = fromQuery(saved?.values ?? initialValues, t, adventureTitles);
    return { step: saved?.step ?? 0, maxStep: saved?.maxStep ?? 0, values: seeded.values, source: seeded.source, restored: Boolean(saved) };
  });
  const [step, setStep] = useState(initial.step);
  const [maxStep, setMaxStep] = useState(initial.maxStep);
  const [values, setValues] = useState<PlannerValues>(initial.values);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  const [reference, setReference] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const top = useRef<HTMLDivElement>(null);

  // Autosave progress on this device.
  useEffect(() => {
    if (status === "done") return;
    const t = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, maxStep, values } satisfies Saved));
      } catch {}
    }, 250);
    return () => window.clearTimeout(t);
  }, [step, maxStep, values, status]);

  const key = stepKeys[step];

  const patch = useCallback(
    <K extends keyof PlannerValues>(k: K) =>
      (p: Partial<PlannerValues[K]>) => {
        setValues((v) => ({ ...v, [k]: { ...v[k], ...p } }));
        setErrors((e) => {
          const next = { ...e };
          for (const field of Object.keys(p)) delete next[field];
          if (k === "where") delete next.regions;
          return next;
        });
      },
    [],
  );

  const scrollTop = () => {
    const el = top.current;
    if (!el) return;
    const scroller = inModal ? el.closest("[data-planner-scroll]") : null;
    if (scroller) scroller.scrollTo({ top: 0, behavior: "smooth" });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  const validate = (i: number): boolean => {
    const result = stepSchemas[i].safeParse(values[stepKeys[i]]);
    if (result.success) {
      setErrors({});
      return true;
    }
    const errs: Errors = {};
    for (const issue of result.error.issues) {
      const field = String(issue.path[0] ?? "form");
      if (!errs[field]) errs[field] = issue.message;
    }
    setErrors(errs);
    // Move focus to the first problem so keyboard and screen-reader users land on it.
    requestAnimationFrame(() => {
      const first = document.querySelector<HTMLElement>("[role=alert]");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      const field = first?.closest("fieldset, div")?.querySelector<HTMLElement>("input, select, textarea, button");
      field?.focus({ preventScroll: true });
    });
    return false;
  };

  const go = (to: number) => {
    setDirection(to > step ? 1 : -1);
    setStep(to);
    setErrors({});
    scrollTop();
  };

  const next = () => {
    if (!validate(step)) return;
    if (step < 4) {
      const to = step + 1;
      setMaxStep((m) => Math.max(m, to));
      go(to);
    } else {
      void submit();
    }
  };

  const submit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: initial.source ?? (inModal ? "planner-modal" : "planner-page") }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; reference?: string };
      if (!res.ok || !data.ok) throw new Error("Request failed");
      setReference(data.reference ?? null);
      setStatus("done");
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {}
      scrollTop();
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(initialValues);
    setStep(0);
    setMaxStep(0);
    setErrors({});
    setStatus("idle");
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  if (status === "done") {
    return <Confirmation name={values.contact.name} reference={reference} values={values} regions={regions} inModal={inModal} onClose={onClose} />;
  }

  return (
    <div ref={top} className="flex flex-col">
      {/* Progress: step labels with the moving blob, plus a progress line */}
      <nav aria-label={t("Planner steps")} className={cn("sticky z-10", inModal ? "top-0" : "top-14", " -mx-[var(--gutter)] bg-charcoal/95 px-[var(--gutter)] backdrop-blur-md")}>
        <LayoutGroup id="planner-steps">
          <ol className="hidden items-stretch gap-1 md:flex">
            {stepLabels.map((label, i) => {
              const current = i === step;
              const reachable = i <= maxStep;
              return (
                <li key={label} className="relative">
                  {current && (
                    <motion.span layoutId="planner-blob" className="absolute -inset-x-1 top-0 h-[calc(100%+10px)] text-offwhite" transition={{ type: "spring", stiffness: 380, damping: 34 }}>
                      <svg aria-hidden viewBox="0 0 100 44" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                        <path d="M0 0H100L96.2 31.5C95.5 37.6 91.4 41.2 85.8 41.5L13.6 44C8.1 44.2 4.6 40.4 3.9 34.8Z" fill="currentColor" />
                      </svg>
                    </motion.span>
                  )}
                  <button
                    type="button"
                    disabled={!reachable}
                    aria-current={current ? "step" : undefined}
                    onClick={() => reachable && go(i)}
                    className={cn(
                      "text-nav relative flex h-14 items-center gap-2 px-4 transition-colors",
                      current ? "text-charcoal" : reachable ? "text-offwhite hover:text-gobi" : "text-offwhite/35",
                    )}
                  >
                    <span className="tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
                    {t(label)}
                  </button>
                </li>
              );
            })}
          </ol>
        </LayoutGroup>
        <div className="flex h-12 items-center justify-between text-[14px] md:hidden">
          <span>
            {t("Step {n} of 5", { n: String(step + 1) })} · <span className="font-medium">{t(stepLabels[step])}</span>
          </span>
          {step > 0 && (
            <button type="button" className="underline underline-offset-4" onClick={() => go(step - 1)}>
              {t("Back")}
            </button>
          )}
        </div>
        <div className="relative h-[2px] w-full bg-offwhite/15" aria-hidden>
          <motion.span className="absolute inset-y-0 left-0 bg-gobi" animate={{ width: `${((step + 1) / 5) * 100}%` }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} />
        </div>
      </nav>

      <div className="pb-10 pt-10 md:pt-16">
        {initial.restored && step === initial.step && (
          <p className="mb-6 inline-flex flex-wrap items-center gap-3 rounded-full bg-offwhite/10 px-4 py-2 text-[14px]">
            {t("Welcome back, we saved your answers on this device.")}
            <button type="button" onClick={reset} className="underline underline-offset-4 hover:text-gobi">
              {t("Start again")}
            </button>
          </p>
        )}
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.section
            key={step}
            aria-labelledby="planner-step-title"
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 id="planner-step-title" className="text-h1 mb-10 max-w-[16ch] md:mb-16" tabIndex={-1}>
              <Emphasis text={t(titles[step])} />
            </h2>
            {key === "when" && <StepWhen values={values.when} set={patch("when")} errors={errors} monthHints={monthHints} />}
            {key === "where" && <StepWhere values={values.where} set={patch("where")} errors={errors} regions={regions} />}
            {key === "style" && <StepStyle values={values.style} set={patch("style")} errors={errors} />}
            {key === "who" && <StepWho values={values.who} set={patch("who")} errors={errors} />}
            {key === "contact" && <StepContact values={values.contact} set={patch("contact")} errors={errors} />}
          </motion.section>
        </AnimatePresence>
      </div>

      {status === "error" && (
        <p role="alert" className="mb-6 rounded-2xl bg-felt px-5 py-4 text-[16px]">
          {t("Sorry, your plan didn't send. Please try again, or email us at")}{" "}
          <a className="underline" href={`mailto:${contactInfo.email}`}>
            {contactInfo.email}
          </a>
          .
        </p>
      )}

      {/* Actions */}
      <div
        className={cn(
          "sticky z-10 -mx-[var(--gutter)] flex items-center justify-between gap-4 border-t border-offwhite/15 bg-charcoal/95 px-[var(--gutter)] py-4 backdrop-blur-md",
          inModal ? "bottom-0" : "bottom-[var(--bar-h)] xl:bottom-0",
        )}
      >
        <div className="flex items-center gap-6">
          {step > 0 ? (
            <button type="button" onClick={() => go(step - 1)} className="text-link group inline-flex items-baseline gap-2">
              <span aria-hidden className="text-gobi transition-transform group-hover:-translate-x-1">←</span> {t("Back")}
            </button>
          ) : (
            <span className="hidden text-[13px] text-offwhite/55 sm:inline">{t("Takes about 3 minutes")}</span>
          )}
          <span className="hidden text-[13px] text-offwhite/55 md:inline">{t("Progress saved on this device")}</span>
        </div>
        <BlobActionButton size="lg" onClick={next} disabled={status === "sending"} className="disabled:opacity-60">
          {step < 4 ? t("Continue") : status === "sending" ? t("Sending…") : t("Send my plan")}
          <span aria-hidden>→</span>
        </BlobActionButton>
      </div>
    </div>
  );
}

function Confirmation({
  name,
  reference,
  values,
  regions,
  inModal,
  onClose,
}: {
  name: string;
  reference: string | null;
  values: PlannerValues;
  regions: RegionOption[];
  inModal?: boolean;
  onClose?: () => void;
}) {
  const t = useT();
  const first = name.trim().split(/\s+/)[0] || t("traveller");
  const regionNames = values.where.regions.map((r) => regions.find((x) => x.slug === r)?.name).filter(Boolean);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="py-10 md:py-16"
      role="status"
    >
      <p className="text-micro uppercase tracking-[0.04em] text-gobi">{t("Plan received")}{reference ? ` · ${t("Ref {ref}", { ref: reference })}` : ""}</p>
      <h2 className="text-story mt-6 max-w-[14ch]">
        <Emphasis text={t("*Thank you*, {name}.", { name: first })} />
      </h2>
      <p className="text-lead mt-8 max-w-[34ch] text-offwhite/85">
        {regionNames.length
          ? t("Your specialist will read every answer and reply within two working days with first ideas for {regions}.", { regions: regionNames.join(", ") })
          : t("Your specialist will read every answer and reply within two working days with first ideas.")}
      </p>
      <div aria-hidden className="ornament-line mt-14 max-w-xl opacity-80" />
      <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
        {[
          ["01", t("We read your plan"), t("A real person, your specialist, reviews your dates, interests and budget.")],
          ["02", t("First ideas"), t("A suggested route, camps and a price, with honest notes on drives and comfort.")],
          ["03", t("Shape it together"), t("Change anything until it feels right. Nothing is booked until you say so.")],
        ].map(([n, t, d]) => (
          <li key={n}>
            <span className="text-micro tabular-nums text-offwhite/60">{n}</span>
            <p className="mt-2 text-[22px] font-medium tracking-[-0.03em]">{t}</p>
            <p className="mt-2 text-[16px] leading-snug text-offwhite/70">{d}</p>
          </li>
        ))}
      </ol>
      <div className="mt-14 flex flex-col gap-4 md:flex-row md:gap-10">
        <ArrowLink href={`mailto:${contactInfo.email}`} external arrowClassName="text-gobi">
          {t("Email us")}
        </ArrowLink>
        <ArrowLink href="/adventures" arrowClassName="text-gobi">
          {t("Browse adventures")}
        </ArrowLink>
        {inModal ? (
          <button type="button" onClick={onClose} className="text-link inline-flex items-baseline gap-2 text-left">
            <span className="text-gobi">→</span> {t("Close")}
          </button>
        ) : (
          <Link href="/" className="text-link inline-flex items-baseline gap-2">
            <span className="text-gobi">→</span> {t("Back to home")}
          </Link>
        )}
      </div>
    </motion.div>
  );
}
