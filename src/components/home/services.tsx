import { ArrowUpRight } from "@/components/arrows";
import { homeContent, site } from "@/content/site";
import { SectionLabel } from "@/components/section-label";

export function Services() {
  return <section className="container section-space" aria-labelledby="services-title">
    <SectionLabel>{homeContent.servicesLabel}</SectionLabel>
    <h2 id="services-title" className="section-title">{homeContent.servicesTitle}</h2>
    <ul className="service-list">{site.services.map((service, index) => <li key={service}><span className="label" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{service}</h3><ArrowUpRight /></li>)}</ul>
  </section>;
}
