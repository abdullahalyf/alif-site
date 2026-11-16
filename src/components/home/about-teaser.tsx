import { ArrowUpRight } from "@/components/arrows";
import Link from "next/link";
import { homeContent, shell, site } from "@/content/site";
import { SectionLabel } from "@/components/section-label";

export function AboutTeaser() {
  return <section className="container section-space" aria-labelledby="about-teaser-title">
    <SectionLabel>{homeContent.aboutLabel}</SectionLabel>
    <div className="split-section">
      <h2 id="about-teaser-title">{homeContent.aboutTitle}</h2>
      <div className="prose"><p>{site.about[0]}</p><Link className="text-link" href={shell.nav[2].href}>{homeContent.aboutLink}<ArrowUpRight /></Link></div>
    </div>
  </section>;
}
