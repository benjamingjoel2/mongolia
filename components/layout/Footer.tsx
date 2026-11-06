import Link from "@/components/i18n/Link";
import { contact, footerNav, legalNav, planHref, site } from "@/config/site";
import { BlobButton } from "@/components/ui/BlobButton";
import { Logo } from "@/components/ui/Logo";
import { Year } from "@/components/ui/Year";
import { t } from "@/lib/i18n/server";

const headings = ["Adventures", "When to go", "About"];

/**
 * Compact footer (F1): brand, one line, email and address once, three link columns,
 * then a thin base line with © and the legal links.
 */
export function Footer() {
  return (
    <footer data-theme="light" className="border-t border-charcoal/10 bg-offwhite text-charcoal pb-[calc(var(--bar-h)+12px)] xl:pb-0">
      <div className="gutter pt-14 md:pt-20">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,1fr))] md:gap-8">
          <div className="flex flex-col items-start gap-5">
            <Logo />
            <p className="max-w-[30ch] text-[15px] leading-snug text-charcoal/75 md:text-[16px]">
              {t("Planned with local families, guides and drivers across Mongolia")}
            </p>
            <address className="flex flex-col gap-1.5 text-[14px] not-italic text-charcoal/75 md:text-[15px]">
              <a href={`mailto:${contact.email}`} className="text-charcoal underline-offset-4 hover:underline">
                {contact.email}
              </a>
              <span className="max-w-[34ch]">{t(contact.address)}</span>
            </address>
            <BlobButton href={planHref} size="sm">
              {t("Plan my adventure")}
            </BlobButton>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:contents">
            {footerNav.map((col, i) => (
              <nav key={i} aria-label={t(headings[i] ?? col[0].label)}>
                <ul className="flex flex-col gap-2.5">
                  {col.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-[15px] underline-offset-4 hover:text-felt hover:underline md:text-[16px]">
                        {t(item.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-charcoal/15 py-5 text-[13px] text-charcoal/75 md:mt-16 md:flex-row md:flex-wrap md:items-center md:gap-x-6">
          <span>
            © <Year /> {site.name}
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <Link key={l.href} href={l.href} className="underline-offset-4 hover:underline">
                {t(l.label)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
