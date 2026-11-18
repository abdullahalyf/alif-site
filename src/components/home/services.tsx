import { ArrowUpRight } from "@/components/arrows";
import { homeContent, site } from "@/content/site";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/motion";

export function Services() {
  return <section className="tint-sand section-space" aria-labelledby="services-title">
    <div className="container">
      <SectionLabel>{homeContent.servicesLabel}</SectionLabel>
      <Reveal><h2 id="services-title" className="section-title">{homeContent.servicesTitle}</h2></Reveal>
      <ul className="service-list">{site.services.map((service, index) => <li key={service}><span className="label" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><Reveal><h3>{service}</h3></Reveal><ArrowUpRight /></li>)}</ul>
    </div>
  </section>;
}
