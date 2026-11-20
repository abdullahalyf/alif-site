import { AboutDetails } from "@/components/demo/sections";
import Image from "next/image";
import { ButtonLink } from "@/components/button";
import { aboutContent, shell, site, seo } from "@/content/site";
import { pageMetadata } from "@/seo/metadata";
import { SectionLabel } from "@/components/section-label";
import { StoryChapter } from "@/components/story-chapter";
import { TravelTeaser } from "@/features/travel/TravelTeaser";

export const metadata = pageMetadata(seo.pages.about.title, seo.pages.about.description, seo.pages.about.path);

export default function About() {
  return <>
    <section className="container section-space about-opening" aria-labelledby="about-title">
      <SectionLabel>{site.name}</SectionLabel>
      <div className="about-heading">
        <h1 id="about-title" className="section-title">{shell.aboutTitle}</h1>
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
        <div className="about-photo-wrap">
          <Image {...site.aboutPhoto} alt={site.aboutPhoto.alt} sizes="(max-width: 47.999rem) calc(100vw - 3rem), (max-width: 79rem) calc(43vw - 1.25rem), 33rem" quality={68} loading="eager" fetchPriority="high" />
        </div>
        <div className="about-intro__copy">
          {site.about.map((text) => <p key={text}>{text}</p>)}
          <div className="about-signature">
            <p>{aboutContent.signature}</p>
            <ul>{site.socials.map(({ href, label }) => <li key={href}><a className="text-link" href={href}>{label}</a></li>)}</ul>
          </div>
        </div>
      </div>
    </section>
    <AboutDetails />
    <section className="tint-b section-space" aria-labelledby="story-title">
      <div className="container">
        <SectionLabel>{aboutContent.storyLabel}</SectionLabel>
        <h2 id="story-title" className="section-title">{aboutContent.storyTitle}</h2>
        <div className="story-chapters">{site.story.map((chapter, index) => <StoryChapter chapter={chapter} index={index} key={chapter.title} />)}</div>
      </div>
    </section>
    <TravelTeaser />
  </>;
}
