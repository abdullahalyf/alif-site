import Link from "next/link";
import { servicesContent as c } from "@/content/services";
import { pageMetadata } from "@/seo/metadata";
import { Reveal, StaggerIn } from "@/components/motion";
import { ServiceIcon } from "@/components/service-icon";
import "./services.css";
export const metadata = pageMetadata(c.title, c.intro, "/services");
export default function ServicesPage() {
  return (
    <div className="container page-shell services-page">
      <header>
        <Reveal><h1>{c.title}</h1></Reveal>
        <Reveal><p className="lead">{c.intro}</p></Reveal>
      </header>
      <section className="service-blocks" aria-label={c.deliverablesLabel}>
        {c.blocks.map((block) => (
          <article className="service-block" id={block.icon} key={block.title}>
            <h2>
              <ServiceIcon name={block.icon} />
              {block.title}
            </h2>
            <p>{block.description}</p>
            <h3>{c.deliverablesLabel}</h3>
            <ul>{block.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
            <dl className="service-timeline">
              <dt className="label">{c.timelineLabel}</dt><dd>{block.timeline}</dd>
            </dl>
            <Link className="button button--secondary" href={c.estimatePath}>{c.estimateLabel}</Link>
          </article>
        ))}
      </section>
      <section>
        <Reveal><h2>{c.processTitle}</h2></Reveal>
        <StaggerIn as="ol" className="service-steps">
          {c.steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </StaggerIn>
      </section>
      <section>
        <Reveal><h2>{c.modelsTitle}</h2></Reveal>
        <StaggerIn className="engagement-models">
          {c.models.map((model) => (
            <article key={model.title}>
              <h3>{model.title}</h3>
              <p>{model.bestFor}</p>
              <p>{model.price}</p>
            </article>
          ))}
        </StaggerIn>
      </section>
      <section>
        <Reveal><h2>{c.faqTitle}</h2></Reveal>
        <StaggerIn className="services-faq">
          {c.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </StaggerIn>
      </section>
      <Reveal>
        <Link className="button button--primary" href={c.contactPath}>
          {c.cta}
        </Link>
      </Reveal>
    </div>
  );
}
