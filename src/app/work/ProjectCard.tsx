"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/arrows";
import { useLightbox, type LightboxImage, type LightboxLabels } from "@/components/lightbox/useLightbox";

type Props = {
  href: string;
  title: string;
  meta: string;
  role: string;
  summary: string;
  featuredLabel?: string;
  tags: string[];
  images: LightboxImage[];
  cta: string;
  labels: LightboxLabels & { open: string };
  featured: boolean;
};

export function ProjectCard({ href, title, meta, role, summary, featuredLabel, tags, images, cta, labels, featured }: Props) {
  const { show, dialog } = useLightbox(images, title, labels);
  return <article className="work-card" data-featured={featured || undefined}>
    {images.length > 0 && <div className="work-card__media" data-count={images.length}>
      {images.map((image, index) => <button key={image.src} type="button" aria-label={`${labels.open}: ${title}, ${index + 1} / ${images.length}`} onClick={() => show(index)}>
        <Image src={image.src} width={image.width} height={image.height} alt="" sizes={index === 0 && (featured || images.length < 3) ? "(max-width: 768px) 92vw, 46vw" : "(max-width: 768px) 46vw, 20vw"} loading={featured && index === 0 ? "eager" : "lazy"} fetchPriority={featured && index === 0 ? "high" : undefined} />
      </button>)}
    </div>}
    <div className="work-card__copy">
      {featuredLabel && <p className="label work-featured-label">{featuredLabel}</p>}
      <p className="label">{meta}</p>
      <h2><Link className="work-card__link" href={href}>{title}</Link></h2>
      <p className="work-card__role">{role}</p>
      <p>{summary}</p>
      {tags.length > 0 && <ul className="work-card__tags">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
      <span className="work-card__cta" aria-hidden="true">{cta}<ArrowUpRight /></span>
    </div>
    {dialog}
  </article>;
}
