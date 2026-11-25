import { StoryCaption, StoryPhotos } from "@/components/story-photo";
import type { Site } from "@/content/schema";

export function StoryChapter({ chapter, index }: { chapter: Site["story"][number]; index: number }) {
  return <section className="story-chapter" aria-labelledby={`chapter-${index}`}>
    <div className="prose">
      <p className="label">{chapter.label}</p>
      <h3 id={`chapter-${index}`}>{chapter.title}</h3>
      <p>{chapter.text}</p>
    </div>
    <figure>
      <StoryPhotos chapter={chapter} />
      <StoryCaption chapter={chapter} />
    </figure>
  </section>;
}
