import Image from "next/image";
import { ArrowUpRight } from "@/components/arrows";
import Link from "next/link";
import { homeContent, navHref, site } from "@/content/site";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/motion";

export function AboutTeaser() {
  return <section className="tint-a section-space" aria-labelledby="about-teaser-title">
    <div className="container">
      <SectionLabel>{homeContent.aboutLabel}</SectionLabel>
      <div className="split-section">
        <div className="about-teaser__lead">
          <Reveal><h2 id="about-teaser-title">{homeContent.aboutTitle}</h2></Reveal>
          <figure className="about-teaser__photo">
            <Image {...homeContent.aboutPhoto} alt={homeContent.aboutPhoto.alt} sizes="(max-width: 47.999rem) 92vw, 40vw" quality={72} loading="lazy" />
            <figcaption><q>{homeContent.aboutPhotoQuote.text}</q> <cite>{homeContent.aboutPhotoQuote.by}</cite></figcaption>
          </figure>
        </div>
        <div className="prose"><Reveal><p>{site.about[0]}</p></Reveal><Reveal><p className="label">{homeContent.currentlyLabel}</p><p>{homeContent.currently} · <Link href="/now">{homeContent.currentlyLink}</Link></p></Reveal><Reveal><Link className="text-link" href={navHref("/about")}>{homeContent.aboutLink}<ArrowUpRight /></Link></Reveal></div>
      </div>
    </div>
  </section>;
}
