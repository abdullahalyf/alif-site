import Image from "next/image";
import type { Site } from "@/content/schema";

type Chapter = Site["story"][number];

export function StoryPhotos({ chapter }: { chapter: Chapter }) {
  const count = Math.min(chapter.images.length, 4);
  return (
    <div className={`story-gallery story-gallery--${count}`}>
      {chapter.images.map((image) => (
        <div className="story-photo-frame" key={image.src}>
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            sizes="(max-width: 768px) 50vw, 30vw"
            loading="eager"
            fetchPriority="low"
          />
        </div>
      ))}
    </div>
  );
}

export function StoryCaption({ chapter }: { chapter: Chapter }) {
  return (
    <figcaption>
      {chapter.quote && <blockquote className="story-quote">
        <p>{chapter.quote.text}</p>
        <footer>{chapter.quote.by}</footer>
      </blockquote>}
      {chapter.credit && <span className="photo-credit">{chapter.credit}</span>}
    </figcaption>
  );
}
