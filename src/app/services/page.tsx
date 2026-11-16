import Link from "next/link";
import { servicesContent as c } from "@/content/services";
import { pageMetadata } from "@/seo/metadata";
import "./services.css";
export const metadata = pageMetadata(c.title, c.intro, "/services");
export default function ServicesPage() {
  return (
    <div className="container page-shell services-page">
      <header>
        <h1>{c.title}</h1>
        <p className="lead">{c.intro}</p>
      </header>
      <section aria-label={c.deliverablesLabel}>
        {c.blocks.map((block) => (
          <article className="service-block" key={block.title}>
            <h2>{block.title}</h2>
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
          </article>
        ))}
      </section>
      <section>
        <h2>{c.processTitle}</h2>
        <ol className="service-steps">
          {c.steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section>
        <h2>{c.modelsTitle}</h2>
        <div className="engagement-models">
          {c.models.map((model) => (
            <article key={model.title}>
              <h3>{model.title}</h3>
              <p>{model.bestFor}</p>
              <p>{model.price}</p>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2>{c.faqTitle}</h2>
        {c.faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>
      <Link className="button button--primary" href={c.contactPath}>
        {c.cta}
      </Link>
    </div>
  );
}
