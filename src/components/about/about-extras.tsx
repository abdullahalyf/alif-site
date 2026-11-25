import Image from "next/image";
import Link from "next/link";
import { aboutPage, site } from "@/content/site";
import { SectionLabel } from "@/components/section-label";
import { ServiceIcon } from "@/components/service-icon";
import { Reveal } from "@/components/motion";
import { PhotoGallery } from "@/features/travel/TripGallery";

export function OutsideWork() {
  const o = aboutPage.outside;
  return <section className="container section-space" aria-labelledby="outside-title">
    <SectionLabel>{o.label}</SectionLabel>
    <Reveal><h2 id="outside-title" className="section-title">{o.title}</h2></Reveal>
    <ul className="outside-grid">{o.items.map((item) => <li key={item.title} className="outside-card">
      <div className="outside-card__photo"><Image {...item.image} alt={item.image.alt} sizes="(max-width: 48rem) 45vw, 18rem" loading="eager" fetchPriority="low" /></div>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </li>)}</ul>
    <p className="photo-credit">{o.credit}</p>
  </section>;
}

export function Moments() {
  const m = aboutPage.moments;
  return <div className="container section-space moments">
    <SectionLabel>{m.label}</SectionLabel>
    <PhotoGallery photos={m.photos} place={m.place} title={m.title} hint={m.hint} className="moments-grid" sectionClassName="moments-section" titleClassName="section-title" sizes="(max-width: 48rem) 50vw, 26rem" eager />
  </div>;
}

export function NowAndLinks() {
  const { now, alsoOnSite } = aboutPage;
  return <div className="container section-space about-now">
    <section aria-labelledby="about-now-title">
      <SectionLabel>{now.label}</SectionLabel>
      <Reveal><h2 id="about-now-title" className="section-title">{now.title}</h2></Reveal>
      <ul className="now-list">{site.now.map((item) => <li key={item}>{item}</li>)}</ul>
      <Link className="text-link" href="/now">{now.more}</Link>
    </section>
    <section aria-labelledby="also-title">
      <h2 id="also-title" className="about-also__title">{alsoOnSite.label}</h2>
      <ul className="also-grid">{alsoOnSite.cards.map((card) => <li key={card.href}>
        <Link href={card.href} className="also-card">
          <span className="home-service__icon"><ServiceIcon name={card.icon} /></span>
          <strong>{card.title}</strong>
          <span>{card.text}</span>
        </Link>
      </li>)}</ul>
    </section>
  </div>;
}
