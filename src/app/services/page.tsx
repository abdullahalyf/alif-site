import Link from "next/link";
import { servicesContent as c, serviceDetails as details } from "@/content/services";
import { estimateContent } from "@/content/estimate";
import { pageMetadata } from "@/seo/metadata";
import { ServiceIcon } from "@/components/service-icon";
import { ServiceGlyph, ServiceHeroVisual, ServiceMockup } from "./service-visuals";
import "./services.css";

export const metadata = pageMetadata(c.title, c.intro, "/services");

const stepIcons = ["chat", "map", "flag", "checklist", "launch"] as const;
const reasonIcons = ["map", "launch", "checklist", "sync"] as const;

export default function ServicesPage() {
  const longestTimeline = Math.max(...c.blocks.map(({ maxWeeks }) => maxWeeks));

  return (
    <div className="container page-shell services-page">
      <header className="service-hero">
        <div className="service-hero__copy">
          <p className="label">{c.label}</p>
          <h1>{c.title}</h1>
          <p className="lead">{c.intro}</p>
          <a className="button button--primary" href="#service-options">{c.browseLabel}</a>
        </div>
        <ServiceHeroVisual />
      </header>

      <section className="service-blocks" id="service-options" aria-label={c.browseLabel}>
        <p className="service-demo-note">{c.demoNote}</p>
        {c.blocks.map((block) => (
          <article className="service-block" id={block.icon} key={block.icon}>
            <ServiceMockup name={block.icon} />
            <div className="service-block__copy">
              <h2><ServiceIcon name={block.icon} />{block.title}</h2>
              <p className="service-block__intro">{block.description}</p>
              <div>
                <h3>{details.audienceLabel}</h3>
                <p>{details.byService[block.icon].audience}</p>
              </div>
              <div>
                <h3>{c.deliverablesLabel}</h3>
                <ul className="service-checklist" role="list">
                  {block.deliverables.map((item) => <li key={item}><ServiceGlyph name="check" />{item}</li>)}
                </ul>
              </div>
              <dl className="service-meta">
                <div>
                  <dt className="label">{c.timelineLabel}</dt>
                  <dd>{block.timeline}<span className="service-length" aria-hidden="true"><i style={{ width: `${block.maxWeeks / longestTimeline * 100}%` }} /></span></dd>
                </div>
                <div>
                  <dt className="label">{c.startingLabel}</dt>
                  <dd>{block.startingPrice}</dd>
                </div>
              </dl>
              <Link className="button button--secondary" href={{ pathname: estimateContent.path, query: { service: block.icon } }}>
                {c.estimateLabel}<ServiceGlyph name="arrow" />
              </Link>
            </div>
          </article>
        ))}
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
                <dl><dt className="label">{c.demoPriceLabel}</dt><dd>{model.price}</dd></dl>
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
