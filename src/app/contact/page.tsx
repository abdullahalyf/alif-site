import { contactContent as c } from "@/content/contact";
import { site } from "@/content/site";
import { BriefForm } from "@/features/contact/BriefForm";
import { pageMetadata } from "@/seo/metadata";
import "./contact.css";
export const metadata = pageMetadata(c.title, c.intro, "/contact");
export default function ContactPage() {
  return (
    <div className="container page-shell contact-page">
      <header>
        <h1>{c.title}</h1>
        <p className="lead">{c.intro}</p>
      </header>
      <div className="contact-columns">
        <aside>
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
        </aside>
        <noscript>
          <style>{`.brief-form { display: none; }`}</style>
        </noscript>
        <BriefForm />
      </div>
    </div>
  );
}
