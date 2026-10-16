import Image from "next/image";
import type { Img } from "@/lib/images";
import { cn } from "@/lib/cn";

/**
 * Cover-fit photo filling its (relatively positioned) parent.
 * `sizes` should describe the rendered width so next/image serves the right file.
 */
export function Photo({
  image,
  sizes,
  className,
  priority,
  quality = 75,
  alt,
}: {
  image: Img;
  sizes: string;
  className?: string;
  priority?: boolean;
  quality?: 60 | 75 | 85;
  alt?: string;
}) {
  return (
    <Image
      src={image.src}
      alt={alt ?? image.alt}
      fill
      sizes={sizes}
      quality={quality}
      preload={priority}
      fetchPriority={priority ? "high" : undefined}
      className={cn("object-cover", className)}
    />
  );
}
