import Image from "next/image";
import { navHref, shell, site } from "@/content/site";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/motion";
import { HeroHeadline } from "./hero-headline";
import { HeroPhotoPanel } from "./hero-photo-panel";
import { HeroSide } from "./hero-side";

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="container hero-layout">
      <div className="hero-copy">
        <Reveal>
          <p className="tagline"><Image {...site.avatar} width={32} height={32} sizes="32px" alt="" />{site.tagline}</p>
        </Reveal>
        <HeroHeadline title={site.role} />
        <Reveal><p className="hero-intro">{site.intro}</p></Reveal>
        <Reveal>
          <div className="button-row">
            <ButtonLink href={shell.email.href}>{shell.email.label}</ButtonLink>
            <ButtonLink href={navHref("/work")} variant="secondary">{shell.workLabel}</ButtonLink>
          </div>
        </Reveal>
        <Reveal><p className="location"><span aria-hidden="true" />{site.location}</p></Reveal>
      </div>
      <HeroSide />
    </div>
    <HeroPhotoPanel>
      <Image {...site.heroPhoto} alt={site.heroPhoto.alt} sizes="(max-width: 96rem) 100vw, 96rem" loading="lazy" className="hero-photo" />
    </HeroPhotoPanel>
  </section>;
}
