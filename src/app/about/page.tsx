import Image from "next/image";
import { aboutContent, shell, site, seo } from "@/content/site";
import { pageMetadata } from "@/seo/metadata";
import { SectionLabel } from "@/components/section-label";
import { StoryChapter } from "@/components/story-chapter";

export const metadata = pageMetadata(seo.pages.about.title, seo.pages.about.description, seo.pages.about.path);

export default function About() {
  return <>
    <section className="container section-space" aria-labelledby="about-title">
      <SectionLabel>{site.name}</SectionLabel>
      <h1 id="about-title" className="section-title">{shell.aboutTitle}</h1>
      <div className="about-intro">
        <Image {...site.aboutPhoto} alt={site.aboutPhoto.alt} sizes="(max-width: 768px) 100vw, 50vw" preload />
        <div className="prose">{site.about.map((text) => <p key={text}>{text}</p>)}</div>
      </div>
    </section>
    <section className="container section-space" aria-labelledby="story-title">
      <SectionLabel>{aboutContent.storyLabel}</SectionLabel>
      <h2 id="story-title" className="section-title">{aboutContent.storyTitle}</h2>
      <div className="story-chapters">{site.story.map((chapter, index) => <StoryChapter chapter={chapter} index={index} key={chapter.title} />)}</div>
    </section>
  </>;
}
