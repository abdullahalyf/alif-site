import Image from "next/image";
import type { Site } from "@/content/schema";

export function StoryChapter({ chapter, index }: { chapter: Site["story"][number]; index: number }) {
  return <section className={`story-chapter story-chapter--${index % 3}`} aria-labelledby={`chapter-${index}`}>
    <figure>
      <div className="story-photo">{chapter.image ? <Image {...chapter.image} sizes="(max-width: 768px) 100vw, 50vw" /> : <div className="image-placeholder" aria-hidden="true" />}</div>
      <figcaption><span className="label">{chapter.label}</span><span>{chapter.title}</span></figcaption>
    </figure>
    <div className="prose"><h3 id={`chapter-${index}`}>{chapter.title}</h3><p>{chapter.text}</p></div>
  </section>;
}
