import type { Metadata } from "next";
import { contact, planHref, whatsappHref } from "@/config/site";
import { images } from "@/lib/images";
import { Hero } from "@/components/sections/Hero";
import { ContactForm } from "@/components/sections/ContactForm";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BlobButton } from "@/components/ui/BlobButton";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email, WhatsApp or call Steppe & Sky in Ulaanbaatar, or use the five-step planner to start your Mongolia adventure.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Hero size="page" image={images.ulaanbaatarSkyline} horizon={75} eyebrow={contact.address} title="Say *sain baina uu*" lead="Hello in Mongolian. We reply to every message within two working days, usually much sooner." />
      <section data-theme="light" className="gutter py-20 md:py-[8vw]">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <DisplayHeading text="*Talk* to us" className="mb-10" />
            <ul className="flex flex-col gap-6">
              <li>
                <ArrowLink href={`mailto:${contact.email}`} external arrowClassName="text-felt" className="text-[22px] md:text-[30px]">
                  {contact.email}
                </ArrowLink>
              </li>
              <li>
                <ArrowLink href={whatsappHref} external arrowClassName="text-felt" className="text-[22px] md:text-[30px]">
                  WhatsApp {contact.phone}
                </ArrowLink>
              </li>
              <li>
                <ArrowLink href={contact.phoneHref} external arrowClassName="text-felt" className="text-[22px] md:text-[30px]">
                  Call {contact.phone}
                </ArrowLink>
              </li>
            </ul>
            <p className="mt-8 text-[16px] text-charcoal/70">{contact.hours}</p>
            <p className="mt-2 text-[16px] text-charcoal/70">{contact.address} (placeholder address)</p>
            <div className="mt-14 rounded-[22px] bg-charcoal p-8 text-offwhite md:p-10">
              <p className="text-h2">
                <em className="italic">Ready</em> to plan?
              </p>
              <p className="mt-4 max-w-[36ch] text-[17px] text-offwhite/75">The planner takes about three minutes and gives your specialist everything they need.</p>
              <BlobButton href={planHref} className="mt-8">
                Plan my adventure
              </BlobButton>
            </div>
          </div>
          <div>
            <h2 className="text-h2 mb-10">Or send a quick message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
      <section id="privacy" data-theme="light" className="gutter scroll-mt-14 border-t border-charcoal/10 py-16">
        <h2 className="text-[22px] font-medium tracking-[-0.03em]">Privacy (placeholder)</h2>
        <p className="mt-4 max-w-[70ch] text-[15px] leading-relaxed text-charcoal/70">
          We use the details you send only to reply to you and plan your trip. We do not sell or share them for marketing.
          A full privacy policy will be published here before launch.
        </p>
      </section>
    </>
  );
}
