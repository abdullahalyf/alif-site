import { demoContent } from "@/content/site";
import "@/components/demo/demo.css";
import Image from "next/image";
import type { ImageAsset } from "@/content/schema";

export function ProjectMedia({ image, sizes = "(max-width: 768px) 85vw, 40vw", eager = false }: { image?: ImageAsset | null; sizes?: string; eager?: boolean }) {
  const demo = image?.demo;
  return <figure><div className="project-media">{image ? <Image src={image.src} width={image.width} height={image.height} alt={image.alt} sizes={sizes} loading={eager ? "eager" : undefined} fetchPriority={eager ? "high" : undefined} /> : <div className="image-placeholder" aria-hidden="true" />}</div>{demo && <figcaption className="demo-caption">{demoContent.imageNotice}</figcaption>}</figure>;
}
