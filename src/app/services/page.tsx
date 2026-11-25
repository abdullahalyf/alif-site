import { WorkSubnav } from "@/components/work-subnav";
import Link from "next/link";
import { servicesContent as c, serviceDetails as details } from "@/content/services";
import { estimateContent } from "@/content/estimate";
import { pageMetadata } from "@/seo/metadata";
import { ServiceIcon } from "@/components/service-icon";
import { ServiceGlyph, ServiceHeroVisual } from "./service-visuals";
import "./services.css";

export const metadata = pageMetadata(c.title, c.intro, "/services");

const stepIcons = ["chat", "map", "flag", "checklist", "launch"] as const;
const reasonIcons = ["map", "launch", "checklist", "sync"] as const;

export default function ServicesPage() {
  return (
    <div className="container page-shell services-page">
      <WorkSubnav current="/services" />

      <header className="service-hero">
        <div className="service-hero__copy">
          <p className="label">{c.label}</p>
          <h1>{c.title}</h1>
          <p className="lead">{c.intro}</p>
          <a className="button button--primary" href="#service-options">{c.browseLabel}</a>
        </div>
        <ServiceHeroVisual />
      </header>

      <section className="service-blocks" id="service-options" aria-labelledby="service-grid-title">
        <div className="service-grid-intro">
          <h2 id="service-grid-title">{c.allServicesLabel}</h2>
          <p className="service-range-note">{c.rangeNote}</p>
        </div>
        <ul className="service-grid" role="list">
          {c.blocks.map((block) => (
            <li key={block.id}>
              <article className="service-card" id={block.id}>
                <span className="service-card__icon"><ServiceIcon name={block.id} /></span>
                <h3>{block.title}</h3>
                <p>{block.description}</p>
                <dl>
                  <div><dt>{c.rangeLabel}</dt><dd>{block.range}{block.rangeNote && <small>{block.rangeNote}</small>}</dd></div>
                  <div><dt>{c.timelineLabel}</dt><dd>{block.timeline}</dd></div>
                </dl>
                <Link className="button button--secondary" href={{ pathname: estimateContent.path, query: { service: block.id } }}>
                  {c.estimateLabel}<ServiceGlyph name="arrow" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="service-process" aria-labelledby="service-process-title">
        <h2 id="service-process-title">{c.processTitle}</h2>
        <ol className="service-steps" role="list">
          {c.steps.map((step, index) => (
            <li key={step.title}>
              <div className="service-step-marker"><span>{index + 1}</span><ServiceGlyph name={stepIcons[index]} /></div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="service-reasons" aria-labelledby="service-reasons-title">
        <h2 id="service-reasons-title">{details.whyTitle}</h2>
        <ul role="list">
          {details.reasons.map(({ title, text }, index) => (
            <li key={title}><span className="service-window__icon"><ServiceGlyph name={reasonIcons[index]} /></span><h3>{title}</h3><p>{text}</p></li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="service-models-title">
        <h2 id="service-models-title">{c.modelsTitle}</h2>
        <div className="engagement-models">
          {c.models.map((model) => {
            const recommended = model.title === c.recommendedModel;
            return (
              <article key={model.title} data-recommended={recommended}>
                <h3>{model.title}</h3>
                {recommended && <p className="service-recommended">{c.recommendedLabel}</p>}
                <p>{model.bestFor}</p>
                <dl><dt className="label">{c.priceLabel}</dt><dd>{model.price}</dd></dl>
              </article>
            );
          })}
        </div>
      </section>

      <section className="service-questions" aria-labelledby="service-faq-title">
        <h2 id="service-faq-title">{c.faqTitle}</h2>
        <div className="services-faq">
          {c.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
        <Link className="button button--primary" href={c.contactPath}>{c.cta}</Link>
      </section>
    </div>
  );
}
