import Image from "next/image";
import { shell, site } from "@/content/site";
import { ButtonLink } from "@/components/button";
import { HeroStripes, PhotoReveal, Reveal } from "@/components/motion";

export function Hero() {
  return <section className="container hero" aria-labelledby="hero-title">
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
    <div className="hero-panel">
      <PhotoReveal className="hero-photo-wrap">
        <Image {...site.heroPhoto} alt={site.heroPhoto.alt} sizes="(max-width: 768px) 100vw, 1216px" preload className="hero-photo" />
      </PhotoReveal>
      <HeroStripes className="hero-stripes" />
    </div>
  </section>;
}
