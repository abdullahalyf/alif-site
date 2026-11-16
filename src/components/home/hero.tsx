import Image from "next/image";
import { shell, site } from "@/content/site";
import { ButtonLink } from "@/components/button";

export function Hero() {
  return <section className="container hero" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="tagline"><Image {...site.avatar} width={32} height={32} sizes="32px" alt="" />{site.tagline}</p>
      <h1 id="hero-title">{site.role}</h1>
      <p className="hero-intro">{site.intro}</p>
      <div className="button-row">
        <ButtonLink href={shell.email.href}>{shell.email.label}</ButtonLink>
        <ButtonLink href={shell.nav[0].href} variant="secondary">{shell.workLabel}</ButtonLink>
      </div>
      <p className="location"><span aria-hidden="true" />{site.location}</p>
    </div>
    <div className="hero-panel">
      <Image {...site.heroPhoto} alt={site.heroPhoto.alt} sizes="(max-width: 768px) 100vw, 1216px" preload className="hero-photo" />
      <div className="hero-stripes" aria-hidden="true"><span /><span /><span /><span /></div>
    </div>
  </section>;
}
