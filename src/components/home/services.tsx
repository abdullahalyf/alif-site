import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/arrows";
import { homeContent, homeServices } from "@/content/site";
import { SectionLabel } from "@/components/section-label";
import { ServiceIcon } from "@/components/service-icon";
import { Reveal, StaggerIn } from "@/components/motion";

export function Services() {
  return <section className="tint-b section-space" aria-labelledby="services-title">
    <div className="container">
      <SectionLabel>{homeContent.servicesLabel}</SectionLabel>
      <Reveal><h2 id="services-title" className="section-title">{homeContent.servicesTitle}</h2></Reveal>
      <StaggerIn as="ul" className="home-services">{homeServices.cards.map((service) => <li key={service.href}>
        <Link href={service.href} className="home-service">
          <span className="home-service__icon"><ServiceIcon name={service.icon} /></span>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <span className="home-service__link">{homeServices.learn}<ArrowRight /></span>
          <span className="home-service__image">
            <Image {...service.image} alt="" sizes="9rem" />
          </span>
        </Link>
      </li>)}</StaggerIn>
    </div>
  </section>;
}
