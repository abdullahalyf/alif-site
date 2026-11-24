import { Suspense } from "react";
import Image from "next/image";
import { heroPhotos, homeContent, navHref, shell, site } from "@/content/site";
import { SocialIcon } from "@/components/social-icon";
import { ButtonLink } from "@/components/button";
import { HeroPhotoPanel } from "./hero-photo-panel";
import { HeroSide } from "./hero-side";

const photoCardSizes = "(max-width: 48rem) 64vw, (max-width: 80rem) 26vw, 22rem";

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="container hero-layout">
      <div className="hero-copy">
        <p className="tagline"><Image {...site.avatar} width={32} height={32} sizes="32px" alt="" />{site.tagline}</p>
        <h1 id="hero-title" className="hero-name">{site.name}</h1>
        <p className="hero-role">{site.role}</p>
        <p className="hero-intro">{site.intro}</p>
        <div className="button-row">
          <ButtonLink href={shell.email.href}>{homeContent.heroActions.email}</ButtonLink>
          <ButtonLink href={navHref("/work")} prefetch={false} variant="secondary">{homeContent.heroActions.work}</ButtonLink>
          <a className="button button--secondary" href={homeContent.heroActions.cvHref} download>{homeContent.heroActions.cv}</a>
        </div>
        <ul className="hero-socials" aria-label={homeContent.heroActions.socials}>{site.socials.map((link) => <li key={link.href}><a href={link.href} rel="noopener noreferrer" target="_blank"><SocialIcon name={link.label} />{link.label}</a></li>)}</ul>
        <p className="location"><span aria-hidden="true" />{site.location}</p>
      </div>
      <HeroSide />
    </div>
    <Suspense>
      <HeroPhotoPanel
        label={heroPhotos.label}
        floatingPhoto={heroPhotos.images[0] && <Image {...heroPhotos.images[0]} alt="" sizes={photoCardSizes} loading="lazy" fetchPriority="low" quality={68} draggable={false} />}
        photoStrip={heroPhotos.images.length > 0 && heroPhotos.images.map((photo) => <li key={photo.src}>
          <Image {...photo} alt={photo.alt} sizes={photoCardSizes} loading="lazy" fetchPriority="low" quality={68} draggable={false} />
        </li>)}
      >
        <Image {...site.heroPhoto} alt={site.heroPhoto.alt} sizes="(max-width: 78rem) calc(100vw - 3rem), 76rem" loading="lazy" quality={68} className="hero-photo" />
      </HeroPhotoPanel>
    </Suspense>
  </section>;
}
