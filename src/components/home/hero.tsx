import Image from "next/image";
import { heroPhotos, navHref, shell, site } from "@/content/site";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/motion";
import { HeroHeadline } from "./hero-headline";
import { HeroPhotoPanel } from "./hero-photo-panel";
import { HeroSide } from "./hero-side";

const photoCardSizes = "(max-width: 48rem) 64vw, (max-width: 80rem) 26vw, 22rem";

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
    <HeroPhotoPanel
      label={heroPhotos.label}
      floatingPhoto={<Image {...heroPhotos.images[0]} alt="" sizes={photoCardSizes} draggable={false} />}
      photoStrip={heroPhotos.images.map((photo) => <li key={photo.src}>
        <Image {...photo} alt={photo.alt} sizes={photoCardSizes} draggable={false} />
      </li>)}
    >
      <Image {...site.heroPhoto} alt={site.heroPhoto.alt} sizes="(max-width: 78rem) calc(100vw - 3rem), 76rem" loading="lazy" className="hero-photo" />
    </HeroPhotoPanel>
  </section>;
}
