import Image from "next/image";
import { shell, site } from "@/content/site";
import { ButtonLink } from "@/components/button";
import { HeroStripes, PhotoReveal, Reveal } from "@/components/motion";
import { HeroSide } from "./hero-side";

export function Hero() {
  return <section className="container hero" aria-labelledby="hero-title">
    <div className="hero-layout">
      <div className="hero-copy">
        <Reveal>
          <p className="tagline"><Image {...site.avatar} width={32} height={32} sizes="32px" alt="" />{site.tagline}</p>
        </Reveal>
        <Reveal><h1 id="hero-title">{site.role}</h1></Reveal>
        <Reveal><p className="hero-intro">{site.intro}</p></Reveal>
        <Reveal>
          <div className="button-row">
            <ButtonLink href={shell.email.href}>{shell.email.label}</ButtonLink>
            <ButtonLink href={shell.nav[0].href} variant="secondary">{shell.workLabel}</ButtonLink>
          </div>
        </Reveal>
        <Reveal><p className="location"><span aria-hidden="true" />{site.location}</p></Reveal>
      </div>
      <HeroSide />
    </div>
    <div className="hero-panel">
      <PhotoReveal className="hero-photo-wrap">
        {/* This panel sits below the hero copy on a phone, so it is not the
            largest contentful paint there. It stays lazy so it does not
            compete with the side photo for bandwidth on load. */}
        <Image {...site.heroPhoto} alt={site.heroPhoto.alt} sizes="(max-width: 768px) 100vw, 1216px" loading="lazy" className="hero-photo" />
      </PhotoReveal>
      <HeroStripes className="hero-stripes" />
    </div>
  </section>;
}
