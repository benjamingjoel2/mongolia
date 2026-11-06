import Link from "@/components/i18n/Link";
import type { Img } from "@/lib/images";
import { Photo } from "@/components/ui/Photo";
import { Emphasis } from "@/components/ui/DisplayHeading";

export type MosaicTile = { image: Img; label: string; href: string };

/**
 * Homepage hero (H3 mosaic): a left-aligned headline and lead beside a grid of three
 * photos from different corners of the country. Server-rendered, no motion library;
 * the first tile is the preloaded LCP image.
 */
export function HeroMosaic({
  title,
  lead,
  tiles,
  children,
}: {
  title: string;
  lead: React.ReactNode;
  tiles: [MosaicTile, MosaicTile, MosaicTile];
  children?: React.ReactNode;
}) {
  return (
    <section
      data-theme="light"
      className="gutter bg-offwhite pb-12 pt-[calc(var(--header-h)+28px)] md:pb-[5vw] md:pt-[calc(var(--header-h)+3vw)]"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-[4vw]">
        <div className="hero-rise max-w-[36rem] lg:pb-2">
          <h1 className="text-balance text-[clamp(2.5rem,5.6vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.035em]">
            <Emphasis text={title} />
          </h1>
          <p className="mt-6 max-w-[34ch] text-[18px] leading-[1.3] text-charcoal/80 md:mt-8 md:text-[21px]">{lead}</p>
          {children && <div className="mt-8 md:mt-10">{children}</div>}
        </div>

        <ul className="grid grid-cols-2 grid-rows-2 gap-3 md:gap-4 h-[min(100vw,440px)] lg:h-[min(74svh,720px)]">
          {tiles.map((tile, i) => (
            <li key={tile.href} className={i === 0 ? "row-span-2" : undefined}>
              <Link href={tile.href} className="group relative block h-full overflow-hidden rounded-[14px] bg-sand">
                <Photo
                  image={tile.image}
                  sizes={i === 0 ? "(min-width: 1024px) 30vw, 50vw" : "(min-width: 1024px) 28vw, 50vw"}
                  priority={i === 0}
                  quality={60}
                  className="transition-transform duration-[var(--dur)] ease-ref group-hover:scale-[1.03]"
                />
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-charcoal/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-[14px] font-medium text-offwhite md:bottom-4 md:left-4 md:text-[16px]">
                  {tile.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
