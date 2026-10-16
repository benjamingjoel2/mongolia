import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { FromPrice } from "@/components/ui/Price";
import { planHref, site } from "@/config/site";

/** Phase 1 shell: exercises header themes, type scale and currency. Replaced by the full homepage in phase 2. */
export default function Home() {
  return (
    <>
      <section data-theme="dark" className="relative flex min-h-dvh flex-col justify-between bg-charcoal pt-[calc(var(--header-h)+8vh)] pb-24 text-offwhite">
        <h1 className="text-display gutter">
          <span className="block pl-[9vw]">Steppe</span>
          <span className="block">&amp; Sky</span>
        </h1>
        <div className="gutter md:ml-[59%] md:max-w-[30rem] md:px-0">
          <p className="text-lead">{site.promise}</p>
          <ArrowLink href={planHref} className="mt-8 md:mt-12">
            Plan my adventure
          </ArrowLink>
        </div>
      </section>
      <section data-theme="light" className="gutter py-32 text-center">
        <DisplayHeading text="*Adventures* under the eternal blue sky" className="mx-auto max-w-[15ch]" />
        <p className="text-lead mt-10">
          <FromPrice usd={3450} />
        </p>
      </section>
      <section data-theme="light" className="bg-sand gutter py-32">
        <DisplayHeading text="Now it's *your* trip" />
      </section>
    </>
  );
}
