"use client";

import Image from "next/image";
import { useLightbox, type LightboxImage, type LightboxLabels } from "@/components/lightbox/useLightbox";
import { ArrowUpRight } from "@/components/arrows";

type Props = {
  id: string;
  title: string;
  text?: string;
  link?: { label: string; href: string };
  images: LightboxImage[];
  labels: LightboxLabels & { open: string };
  headingLevel?: "h2" | "h3";
};

export function ProjectGallery({ id, title, text, link, images, labels, headingLevel: Heading = "h3" }: Props) {
  const { show, dialog } = useLightbox(images, title, labels);
  return <section className="project-gallery" aria-labelledby={`${id}-title`}>
    <div className="project-gallery__head">
      <Heading id={`${id}-title`}>{title}</Heading>
      {link && <a className="text-link" href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight /></a>}
    </div>
    {text && <p className="project-gallery__text">{text}</p>}
    <ul className="project-gallery__grid">{images.map((image, index) => <li key={image.src}>
      <figure>
        <button type="button" aria-label={`${labels.open}: ${image.caption ?? image.alt}`} onClick={() => show(index)}>
          <Image src={image.src} width={image.width} height={image.height} alt={image.alt} sizes="(max-width: 768px) 92vw, 34vw" loading="lazy" />
        </button>
        {image.caption && <figcaption>{image.caption}</figcaption>}
      </figure>
    </li>)}</ul>
    {dialog}
  </section>;
}
