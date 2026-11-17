import { Reveal } from "@/components/motion";
import { StoryCaption, StoryPhoto } from "@/components/story-photo";
import type { Site } from "@/content/schema";

export function StoryChapter({ chapter, index }: { chapter: Site["story"][number]; index: number }) {
  return <section className={`story-chapter story-chapter--${index % 3}`} aria-labelledby={`chapter-${index}`}>
    <figure>
      <StoryPhoto chapter={chapter} />
      <StoryCaption chapter={chapter} />
    </figure>
    <div className="prose"><Reveal><h3 id={`chapter-${index}`}>{chapter.title}</h3></Reveal><Reveal><p>{chapter.text}</p></Reveal></div>
  </section>;
}
