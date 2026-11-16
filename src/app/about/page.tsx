import { Highlights, AboutDetails } from "@/components/demo/sections";
import Image from "next/image";
import { aboutContent, shell, site, seo } from "@/content/site";
import { pageMetadata } from "@/seo/metadata";
import { SectionLabel } from "@/components/section-label";
import { StoryChapter } from "@/components/story-chapter";
import { PhotoReveal, Reveal } from "@/components/motion";

export const metadata = pageMetadata(seo.pages.about.title, seo.pages.about.description, seo.pages.about.path);

export default function About() {
  return <>
    <section className="container section-space" aria-labelledby="about-title">
      <SectionLabel>{site.name}</SectionLabel>
      <Reveal><h1 id="about-title" className="section-title">{shell.aboutTitle}</h1></Reveal>
      <div className="about-intro">
        <PhotoReveal className="about-photo-wrap">
          <Image {...site.aboutPhoto} alt={site.aboutPhoto.alt} sizes="(max-width: 768px) 100vw, 50vw" preload />
        </PhotoReveal>
        <div className="prose">{site.about.map((text) => <Reveal key={text}><p>{text}</p></Reveal>)}</div>
      </div>
    </section>
    <Highlights /><AboutDetails />
    <section className="container section-space" aria-labelledby="story-title">
      <SectionLabel>{aboutContent.storyLabel}</SectionLabel>
      <Reveal><h2 id="story-title" className="section-title">{aboutContent.storyTitle}</h2></Reveal>
      <div className="story-chapters">{site.story.map((chapter, index) => <StoryChapter chapter={chapter} index={index} key={chapter.title} />)}</div>
    </section>
  </>;
}
