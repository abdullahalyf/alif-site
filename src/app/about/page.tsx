import { AboutDetails } from "@/components/demo/sections";
import Image from "next/image";
import { ButtonLink } from "@/components/button";
import { aboutContent, shell, site, seo } from "@/content/site";
import { pageMetadata } from "@/seo/metadata";
import { SectionLabel } from "@/components/section-label";
import { StoryChapter } from "@/components/story-chapter";
import { PhotoReveal, Reveal } from "@/components/motion";
import { TravelTeaser } from "@/features/travel/TravelTeaser";

export const metadata = pageMetadata(seo.pages.about.title, seo.pages.about.description, seo.pages.about.path);

export default function About() {
  return <>
    <section className="container section-space about-opening" aria-labelledby="about-title">
      <SectionLabel>{site.name}</SectionLabel>
      <div className="about-heading">
        <Reveal><h1 id="about-title" className="section-title">{shell.aboutTitle}</h1></Reveal>
        <div>
          <p className="about-heading__intro">{aboutContent.intro}</p>
          <dl className="about-facts">
            {aboutContent.facts.map(({ label, value }) => <div key={label}><dt className="label">{label}</dt><dd>{value}</dd></div>)}
          </dl>
          <div className="button-row">
            <ButtonLink href={aboutContent.email.href}>{aboutContent.email.label}</ButtonLink>
            <ButtonLink variant="secondary" href={aboutContent.resume.href}>{aboutContent.resume.label}</ButtonLink>
          </div>
        </div>
      </div>
      <div className="about-intro">
        <PhotoReveal className="about-photo-wrap">
          <Image {...site.aboutPhoto} alt={site.aboutPhoto.alt} sizes="(max-width: 768px) 100vw, 50vw" preload />
        </PhotoReveal>
        <div className="about-intro__copy">
          {site.about.map((text) => <Reveal key={text}><p>{text}</p></Reveal>)}
          <div className="about-signature">
            <p>{aboutContent.signature}</p>
            <ul>{site.socials.map(({ href, label }) => <li key={href}><a className="text-link" href={href}>{label}</a></li>)}</ul>
          </div>
        </div>
      </div>
    </section>
    <div className="tint-sage"><AboutDetails /></div>
    <section className="tint-sand section-space" aria-labelledby="story-title">
      <div className="container">
      <SectionLabel>{aboutContent.storyLabel}</SectionLabel>
      <Reveal><h2 id="story-title" className="section-title">{aboutContent.storyTitle}</h2></Reveal>
      <div className="story-chapters">{site.story.map((chapter, index) => <StoryChapter chapter={chapter} index={index} key={chapter.title} />)}</div>
      <TravelTeaser />
      </div>
    </section>
  </>;
}
