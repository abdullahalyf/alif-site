import Image from "next/image";
import { demoContent } from "@/content/site";
import type { Site } from "@/content/schema";

export function StoryPhoto({ chapter }: { chapter: Site["story"][number] }) {
  return (
    <div className="story-photo-frame">
      {chapter.image ? (
        <Image
          src={chapter.image.src}
          width={chapter.image.width}
          height={chapter.image.height}
          alt={chapter.image.alt}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className="image-placeholder" aria-hidden="true" />
      )}
    </div>
  );
}

/** The caption under a story photograph, including the demo notice. */
export function StoryCaption({ chapter }: { chapter: Site["story"][number] }) {
  return (
    <figcaption>
      <span className="label">{chapter.label}</span>
      <span>{chapter.title}</span>
      {chapter.image?.demo && (
        <span className="demo-caption">{demoContent.imageNotice}</span>
      )}
    </figcaption>
  );
}
