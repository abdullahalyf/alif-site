import { PhotoReveal } from "@/components/motion";
import { demoContent } from "@/content/site";
import "@/components/demo/demo.css";
import Image from "next/image";
import type { ImageAsset } from "@/content/schema";

export function ProjectMedia({ image, sizes = "(max-width: 768px) 85vw, 40vw" }: { image?: ImageAsset | null; sizes?: string }) {
  return <figure><PhotoReveal className="project-media">{image ? <Image {...image} unoptimized={image.src.startsWith("https://picsum.photos/")} alt={image.alt} sizes={sizes} /> : <div className="image-placeholder" aria-hidden="true" />}</PhotoReveal>{image?.src.startsWith("https://picsum.photos/") && <figcaption className="demo-caption">{demoContent.imageNotice}</figcaption>}</figure>;
}
