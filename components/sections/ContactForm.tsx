"use client";

import { useState } from "react";
import { BlobActionButton } from "@/components/ui/BlobButton";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n/client";
import { site } from "@/config/site";

/** Short contact form for quick questions; the planner is the main enquiry route. */
export function ContactForm() {
  const t = useT();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = { name: String(fd.get("name") ?? ""), email: String(fd.get("email") ?? ""), message: String(fd.get("message") ?? ""), consent: fd.get("consent") === "on" };
    const errs: Record<string, string> = {};
    if (data.name.trim().length < 2) errs.name = t("Tell us your name");
    if (!/^\S+@\S+\.\S+$/.test(data.email)) errs.email = t("Enter a valid email address");
    if (data.message.trim().length < 5) errs.message = t("Add a short message");
    if (!data.consent) errs.consent = t("Please agree so we can reply");
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(() => null);
    setStatus(res?.ok ? "done" : "error");
  }

  if (status === "done") {
    return (
      <p role="status" className="text-h2">
        <em className="italic">{t("Thank you.")}</em> {t("We'll reply within two working days.")}
      </p>
    );
  }

  const field = "mt-2 w-full border-b border-charcoal/30 bg-transparent pb-3 pt-1 text-[19px] focus:border-felt focus:outline-none md:text-[22px]";
  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      {(["name", "email"] as const).map((n) => (
        <div key={n}>
          <label htmlFor={`c-${n}`} className="text-[14px] text-charcoal/70">
            {n === "name" ? t("Your name") : t("Email")}
          </label>
          <input id={`c-${n}`} name={n} type={n === "email" ? "email" : "text"} autoComplete={n} aria-invalid={Boolean(errors[n])} aria-describedby={errors[n] ? `c-${n}-e` : undefined} className={field} />
          {errors[n] && <p id={`c-${n}-e`} className="mt-2 text-[14px] text-felt">{errors[n]}</p>}
        </div>
      ))}
      <div>
        <label htmlFor="c-message" className="text-[14px] text-charcoal/70">
          {t("Message")}
        </label>
        <textarea id="c-message" name="message" rows={5} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "c-message-e" : undefined} className={cn(field, "resize-y")} />
        {errors.message && <p id="c-message-e" className="mt-2 text-[14px] text-felt">{errors.message}</p>}
      </div>
      <label className="flex items-start gap-3 text-[15px]">
        <input type="checkbox" name="consent" className="mt-0.5 size-5 accent-felt" aria-invalid={Boolean(errors.consent)} />
        {t("I agree that {name} may use these details to reply to me.", { name: site.name })}
      </label>
      {errors.consent && <p className="-mt-6 text-[14px] text-felt">{errors.consent}</p>}
      {status === "error" && <p role="alert" className="text-[15px] text-felt">{t("Sorry, that didn't send. Please email us instead.")}</p>}
      <BlobActionButton type="submit" size="lg" className="self-start" disabled={status === "sending"}>
        {status === "sending" ? t("Sending…") : t("Send message")}
      </BlobActionButton>
    </form>
  );
}
