import { images } from "@/lib/images";
import { Hero } from "@/components/sections/Hero";
import { ArrowLink } from "@/components/ui/ArrowLink";

export default function NotFound() {
  return (
    <Hero size="page" image={images.steppeBigSky} title="*Lost* on the steppe" lead="That page has wandered off. Even our drivers take a wrong track now and then." priority={false}>
      <div className="flex flex-col gap-4 md:flex-row md:gap-10">
        <ArrowLink href="/" arrowClassName="text-gobi">Back to home</ArrowLink>
        <ArrowLink href="/adventures" arrowClassName="text-gobi">All adventures</ArrowLink>
      </div>
    </Hero>
  );
}
