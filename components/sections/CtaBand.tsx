import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { BlobButton } from "@/components/ui/BlobButton";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { contact } from "@/config/site";

/** Closing call to action: big italic headline and the red blob button. */
export function CtaBand({
  title = "*Ready* when you are",
  text = "Tell us your dates and dreams. One specialist plans everything and replies within two working days.",
  href = "/plan-my-adventure",
  button = "Plan my adventure",
}: {
  title?: string;
  text?: string;
  href?: string;
  button?: string;
}) {
  return (
    <section data-theme="dark" className="gutter bg-charcoal py-24 text-offwhite md:py-[9vw]">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <DisplayHeading text={title} className="max-w-[12ch]" />
          <p className="text-lead mt-8 max-w-[34ch] text-offwhite/80">{text}</p>
        </div>
        <div className="flex flex-col items-start gap-5 md:items-end">
          <BlobButton href={href} size="lg">
            {button}
          </BlobButton>
          <ArrowLink href={`mailto:${contact.email}`} external arrowClassName="text-gobi">
            Or email us
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
