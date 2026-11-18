import { PhotoReveal } from "@/components/motion";
import { demoContent } from "@/content/site";
import "@/components/demo/demo.css";
import Image from "next/image";
import type { ImageAsset } from "@/content/schema";

export function ProjectMedia({ image, sizes = "(max-width: 768px) 85vw, 40vw" }: { image?: ImageAsset | null; sizes?: string }) {
  const demo = image?.demo;
  return <figure><PhotoReveal className="project-media">{image ? <Image src={image.src} width={image.width} height={image.height} alt={image.alt} sizes={sizes} /> : <div className="image-placeholder" aria-hidden="true" />}</PhotoReveal>{demo && <figcaption className="demo-caption">{demoContent.imageNotice}</figcaption>}</figure>;
}
