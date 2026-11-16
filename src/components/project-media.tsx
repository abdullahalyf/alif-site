import Image from "next/image";
import type { ImageAsset } from "@/content/schema";

export function ProjectMedia({ image, sizes = "(max-width: 768px) 85vw, 40vw" }: { image?: ImageAsset | null; sizes?: string }) {
  return <div className="project-media">{image ? <Image {...image} alt={image.alt} sizes={sizes} /> : <div className="image-placeholder" aria-hidden="true" />}</div>;
}
