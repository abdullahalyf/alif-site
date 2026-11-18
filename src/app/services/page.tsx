import Link from "next/link";
import { servicesContent as c } from "@/content/services";
import { pageMetadata } from "@/seo/metadata";
import { Reveal, StaggerIn } from "@/components/motion";
import "./services.css";
export const metadata = pageMetadata(c.title, c.intro, "/services");
const serviceIcons = {
  architecture: "M9 3h6v5H9zM3 16h6v5H3zm12 0h6v5h-6zM12 8v4m-6 4v-4h12v4",
  operations: "M3 4h18v16H3zm0 5h18m-12 0v11m3-7h6m-6 3h4",
  offline: "M3 8c5-5 13-5 18 0M6 11c3-3 9-3 12 0m-9 3c2-2 4-2 6 0m-3 5h.01M3 3l18 18",
  access: "M6 10h12v11H6zm2 0V7a4 4 0 0 1 8 0v3m-4 4v3",
};

export default function ServicesPage() {
  return (
    <div className="container page-shell services-page">
      <header>
        <Reveal><h1>{c.title}</h1></Reveal>
        <Reveal><p className="lead">{c.intro}</p></Reveal>
      </header>
      <section className="service-blocks" aria-label={c.deliverablesLabel}>
        {c.blocks.map((block) => (
          <article className="service-block" key={block.title}>
            <h2>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d={serviceIcons[block.icon]} />
              </svg>
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
