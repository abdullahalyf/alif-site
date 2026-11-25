import { AboutDetails } from "@/components/demo/sections";
import Image from "next/image";
import { ButtonLink } from "@/components/button";
import { aboutContent, site, seo } from "@/content/site";
import { pageMetadata } from "@/seo/metadata";
import { SectionLabel } from "@/components/section-label";
import { StoryChapter } from "@/components/story-chapter";
import { AboutSubnav } from "@/components/work-subnav";
import { TravelTeaser } from "@/features/travel/TravelTeaser";
import { AboutJourney } from "@/components/about/about-journey";
import { Moments, NowAndLinks, OutsideWork } from "@/components/about/about-extras";

export const metadata = pageMetadata(seo.pages.about.title, seo.pages.about.description, seo.pages.about.path);

export default function About() {
  return <>
    <section className="container section-space about-opening" aria-labelledby="about-title">
      <AboutSubnav current="/about" />
      <SectionLabel>{aboutContent.label}</SectionLabel>
      <div className="about-top">
        <figure className="about-top__photo">
          <Image {...site.aboutPhoto} alt={site.aboutPhoto.alt} sizes="(max-width: 47.999rem) calc(100vw - 3rem), 34rem" quality={80} loading="eager" fetchPriority="high" />
        </figure>
        <div className="about-top__copy">
          <h1 id="about-title" className="about-name">{aboutContent.heading}</h1>
          <p className="about-top__brief">{aboutContent.brief}</p>
          <div className="button-row">
            <ButtonLink href={aboutContent.email.href}>{aboutContent.email.label}</ButtonLink>
            <ButtonLink variant="secondary" href={aboutContent.resume.href}>{aboutContent.resume.label}</ButtonLink>
          </div>
        </div>
      </div>
    </section>
    <AboutJourney />
    <AboutDetails />
    {(aboutContent.missionVision.mission || aboutContent.missionVision.vision) && <section className="container section-space" aria-labelledby="mission-title">
      <SectionLabel>{aboutContent.missionVision.label}</SectionLabel>
      <h2 id="mission-title" className="sr-only">{aboutContent.missionVision.label}</h2>
      <dl className="about-facts">
        {aboutContent.missionVision.mission && <div><dt className="label">{aboutContent.missionVision.missionLabel}</dt><dd>{aboutContent.missionVision.mission}</dd></div>}
        {aboutContent.missionVision.vision && <div><dt className="label">{aboutContent.missionVision.visionLabel}</dt><dd>{aboutContent.missionVision.vision}</dd></div>}
      </dl>
    </section>}
    <section className="tint-b section-space" aria-labelledby="story-title">
      <div className="container">
        <SectionLabel>{aboutContent.storyLabel}</SectionLabel>
        <h2 id="story-title" className="section-title">{aboutContent.storyTitle}</h2>
        <div className="story-chapters">{site.story.map((chapter, index) => <StoryChapter chapter={chapter} index={index} key={chapter.title} />)}</div>
      </div>
    </section>
    <OutsideWork />
    <TravelTeaser />
    <Moments />
    <NowAndLinks />
  </>;
}
