import { contactContent as c } from "@/content/contact";
import { contactNext, site } from "@/content/site";
import { BriefForm } from "@/features/contact/BriefForm";
import { pageMetadata } from "@/seo/metadata";
import { Reveal } from "@/components/motion";
import "./contact.css";
export const metadata = pageMetadata(c.title, c.intro, "/contact");
export default function ContactPage() {
  return (
    <div className="container page-shell contact-page">
      <header>
        <Reveal><h1>{c.title}</h1></Reveal>
        <Reveal><p className="lead">{c.intro}</p></Reveal>
      </header>
      <div className="contact-columns">
        <Reveal as="aside">
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>
            <a href={site.whatsapp.href}>{site.whatsapp.display}</a>
          </p>
          <p>{site.location}</p>
          <p>{c.response}</p>
          <p>{c.availability}</p>
          <a href={`mailto:${site.email}`}>{c.fallback}</a>
        </Reveal>
        <noscript>
          <style>{`.brief-form { display: none; }`}</style>
        </noscript>
        <Reveal>
          <BriefForm />
        </Reveal>
      </div>
      <section className="contact-next tint-sage" aria-labelledby="contact-next-title">
        <h2 id="contact-next-title">{contactNext.title}</h2>
        <ol>{contactNext.steps.map((step) => <li key={step}>{step}</li>)}</ol>
      </section>
    </div>
  );
}
