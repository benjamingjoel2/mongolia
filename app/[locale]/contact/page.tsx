import type { Metadata } from "next";
import { initLocale, t } from "@/lib/i18n/server";
import { pageMeta } from "@/lib/seo";
import { contact, planHref } from "@/config/site";
import { images } from "@/lib/images";
import { Hero } from "@/components/sections/Hero";
import { ContactForm } from "@/components/sections/ContactForm";
import { DisplayHeading, Emphasis } from "@/components/ui/DisplayHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BlobButton } from "@/components/ui/BlobButton";

export async function generateMetadata(): Promise<Metadata> {
  await initLocale();
  return pageMeta({
    title: t("Contact"),
    description: t("Email Steppe & Sky in Ulaanbaatar, or use the five-step planner to start your Mongolia adventure."),
    path: "/contact",
  });
}

export default async function ContactPage() {
  await initLocale();
  return (
    <>
      <Hero size="page" image={images.ulaanbaatarSkyline} horizon={75} eyebrow={t("Ulaanbaatar, Mongolia")} title={t("Say *sain baina uu*")} lead={t("Hello in Mongolian. We reply to every message within two working days, usually much sooner.")} />
      <section data-theme="light" className="gutter py-20 md:py-[8vw]">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <DisplayHeading text={t("*Talk* to us")} className="mb-10" />
            <ul className="flex flex-col gap-6">
              <li>
                <ArrowLink href={`mailto:${contact.email}`} external arrowClassName="text-felt" className="text-[22px] md:text-[30px]">
                  {contact.email}
                </ArrowLink>
              </li>
            </ul>
            <p className="mt-8 text-[16px] text-charcoal/70">{t(contact.address)}</p>
            <div className="mt-14 rounded-[22px] bg-charcoal p-8 text-offwhite md:p-10">
              <p className="text-h2">
                <Emphasis text={t("*Ready* to plan?")} />
              </p>
              <p className="mt-4 max-w-[36ch] text-[17px] text-offwhite/75">{t("The planner takes about three minutes and gives your specialist everything they need.")}</p>
              <BlobButton href={planHref} className="mt-8">
                {t("Plan my adventure")}
              </BlobButton>
            </div>
          </div>
          <div>
            <h2 className="text-h2 mb-10">{t("Or send a quick message")}</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
