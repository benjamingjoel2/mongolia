import Link from "@/components/i18n/Link";
import { contact, footerNav, legalNav, planHref, site } from "@/config/site";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BlobButton } from "@/components/ui/BlobButton";
import { Emphasis } from "@/components/ui/DisplayHeading";
import { Year } from "@/components/ui/Year";
import { t } from "@/lib/i18n/server";

/**
 * Footer in the reference's minimal style: rows of "→" links with red arrows,
 * extended with contact details and a closing tagline.
 */
export function Footer() {
  return (
    <footer data-theme="light" className="bg-offwhite text-charcoal pb-[calc(var(--bar-h)+12px)] xl:pb-0">
      <div className="gutter pt-20 md:pt-32">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="text-h1 max-w-[12ch] text-balance">
            <Emphasis text={t("Nothing between you and the *sky*.")} />
          </p>
          <BlobButton href={planHref} size="lg" className="self-start md:self-end">
            {t("Plan my adventure")}
          </BlobButton>
        </div>

        <div aria-hidden className="ornament-line mt-14 opacity-80 md:mt-20" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-4 md:py-16">
          {footerNav.map((col, i) => (
            <ul key={i} className="flex flex-col gap-3">
              {col.map((item) => (
                <li key={item.href}>
                  <ArrowLink href={item.href} arrowClassName="text-felt" className="text-[16px] md:text-[18px]">
                    {t(item.label)}
                  </ArrowLink>
                </li>
              ))}
            </ul>
          ))}
          <address className="col-span-2 flex flex-col gap-3 not-italic md:col-span-1">
            <ArrowLink href={`mailto:${contact.email}`} external arrowClassName="text-felt" className="text-[16px] md:text-[18px]">
              {contact.email}
            </ArrowLink>
            <span className="text-[14px] text-charcoal/70">{t(contact.address)}</span>
          </address>
        </div>

        <div className="flex flex-col gap-3 border-t border-charcoal/15 py-5 text-[13px] md:flex-row md:items-center md:justify-between md:text-[14px]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>
              © <Year /> {site.name}
            </span>
            {legalNav.map((l) => (
              <Link key={l.href} href={l.href} className="underline-offset-4 hover:underline">
                {t(l.label)}
              </Link>
            ))}
          </div>
          <span className="text-charcoal/70">{t("Planned with local families, guides and drivers across Mongolia")}</span>
        </div>
      </div>
    </footer>
  );
}
