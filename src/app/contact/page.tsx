import Link from "next/link";
import { contactContent as c } from "@/content/contact";
import { availability, contactNext, resumeLink } from "@/content/site";
import { BriefForm } from "@/features/contact/BriefForm";
import { SocialIcon } from "@/components/social-icon";
import { pageMetadata } from "@/seo/metadata";
import { Reveal } from "@/components/motion";
import "./contact.css";

export const metadata = pageMetadata(c.title, c.intro, "/contact");

const glyphs: Record<string, string> = {
  email: "M3 5h18v14H3zm0 1 9 7 9-7",
  whatsapp: "M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8zM9 9c0 3 3 6 6 6l1-1.5-2-1-1 .8c-1-.5-1.8-1.3-2.3-2.3l.8-1-1-2z",
  location: "M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
};

function CardIcon({ id, label }: { id: string; label: string }) {
  if (id === "github" || id === "linkedin") return <SocialIcon name={label} />;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d={glyphs[id]} /></svg>;
}

export default function ContactPage() {
  return (
    <div className="container page-shell contact-page">
      <header className="contact-head">
        <Reveal><p className="contact-status"><span aria-hidden="true" />{c.availability}</p></Reveal>
        <Reveal><h1>{c.heading}</h1></Reveal>
        <Reveal><p className="lead">{c.intro}</p></Reveal>
      </header>
      <section aria-label={c.channelsLabel}>
        <ul className="contact-cards">
          {c.cards.map((card) => {
            const body = (
              <>
                <span className="contact-card__icon"><CardIcon id={card.id} label={card.label} /></span>
                <span className="contact-card__label">{card.label}</span>
                <span className="contact-card__value">{card.value}</span>
                <span className="contact-card__note">{card.note}</span>
              </>
            );
            return (
              <li key={card.id}>
                {card.href
                  ? <a className="contact-card" href={card.href} {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{body}</a>
                  : <div className="contact-card contact-card--static">{body}</div>}
              </li>
            );
          })}
        </ul>
      </section>
      <div className="contact-columns">
        <section aria-labelledby="brief-title" className="contact-brief">
          <h2 id="brief-title">{c.formTitle}</h2>
          <p>{c.formIntro}</p>
          <noscript>
            <style>{`.brief-form { display: none; }`}</style>
          </noscript>
          <BriefForm />
          <p><a href={c.cards[0].href}>{c.fallback}</a></p>
        </section>
        <aside className="contact-aside">
          <section className="contact-next tint-a" aria-labelledby="contact-next-title">
            <h2 id="contact-next-title">{contactNext.title}</h2>
            <ol>{contactNext.steps.map((step) => <li key={step}>{step}</li>)}</ol>
            <p>{c.response}</p>
          </section>
          <section aria-labelledby="offers-title">
            <h2 id="offers-title" className="contact-aside__title">{availability.offersLabel}</h2>
            <ul className="contact-offers">{availability.offers.map((offer) => <li key={offer}>{offer}</li>)}</ul>
          </section>
          <p className="contact-cv">{c.cvPrompt} <Link href={resumeLink.href}>{c.cvLabel}</Link></p>
        </aside>
      </div>
    </div>
  );
}
