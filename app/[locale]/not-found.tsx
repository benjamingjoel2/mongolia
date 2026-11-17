import { images } from "@/lib/images";
import { Hero } from "@/components/sections/Hero";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { initLocale, t } from "@/lib/i18n/server";

export default async function NotFound() {
  await initLocale();
  return (
    <Hero size="page" image={images.steppeBigSky} title={t("*Lost* on the steppe")} lead={t("That page has wandered off. Even our drivers take a wrong track now and then.")} priority={false}>
      <div className="flex flex-col gap-4 md:flex-row md:gap-10">
        <ArrowLink href="/" arrowClassName="text-gobi">{t("Back to home")}</ArrowLink>
        <ArrowLink href="/adventures" arrowClassName="text-gobi">{t("All adventures")}</ArrowLink>
      </div>
    </Hero>
  );
}
