import { ArrowUpRight } from "@/components/arrows";
import Link from "next/link";
import { homeContent, navHref, site } from "@/content/site";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/motion";

export function AboutTeaser() {
  return <section className="container section-space" aria-labelledby="about-teaser-title">
    <SectionLabel>{homeContent.aboutLabel}</SectionLabel>
    <div className="split-section">
      <Reveal><h2 id="about-teaser-title">{homeContent.aboutTitle}</h2></Reveal>
      <div className="prose"><Reveal><p>{site.about[0]}</p></Reveal><Reveal><Link className="text-link" href={navHref("/about")}>{homeContent.aboutLink}<ArrowUpRight /></Link></Reveal></div>
    </div>
  </section>;
}
