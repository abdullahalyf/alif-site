import Link from "next/link";
import { servicesContent as c } from "@/content/services";
import { pageMetadata } from "@/seo/metadata";
import { Reveal, StaggerIn } from "@/components/motion";
import "./services.css";
export const metadata = pageMetadata(c.title, c.intro, "/services");
export default function ServicesPage() {
  return (
    <div className="container page-shell services-page">
      <header>
        <Reveal><h1>{c.title}</h1></Reveal>
        <Reveal><p className="lead">{c.intro}</p></Reveal>
      </header>
      <section aria-label={c.deliverablesLabel}>
        {c.blocks.map((block) => (
          <article className="service-block" key={block.title}>
            <Reveal><h2>{block.title}</h2></Reveal>
            <Reveal>
              <div>
                <p>{block.description}</p>
                <h3>{c.deliverablesLabel}</h3>
                <ul>
                  {block.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p>
                  <strong>{c.timelineLabel}: </strong>
                  {block.timeline}
                </p>
              </div>
            </Reveal>
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
