import { resumeContent as c } from "@/content/resume";
import { site } from "@/content/site";
import { PrintButton } from "./PrintButton";

export function Resume() {
  return (
    <article className="cv" aria-labelledby="cv-name">
      <aside className="cv-side">
        <div className="cv-id">
          <h1 id="cv-name">{c.name}</h1>
          <p className="cv-role">{c.role}</p>
          <p>{c.location}</p>
        </div>
        <nav className="cv-contact" aria-label={c.contactLabel}>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.whatsapp.href} rel="noopener noreferrer" target="_blank">WhatsApp</a>
          {site.socials.map((link) => <a key={link.href} href={link.href} rel="noopener noreferrer" target="_blank">{link.label}</a>)}
        </nav>
        <div className="cv-actions">
          <a className="button button--primary" href={c.download.href} download>{c.download.label}</a>
          <PrintButton />
        </div>
        <ul className="cv-toc" aria-label="Sections">
          {c.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}
        </ul>
      </aside>
      <div className="cv-main">
        <section aria-labelledby="cv-profile" className="cv-section">
          <h2 id="cv-profile">Profile</h2>
          <p className="cv-profile">{c.profile}</p>
        </section>
        {c.sections.map((section) => (
          <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="cv-section">
            <h2 id={`${section.id}-title`}>{section.title}</h2>
            {section.entries?.map((entry) => (
              <div className="cv-entry" key={entry.title}>
                <p className="cv-period">{entry.period}</p>
                <div>
                  <h3>{entry.title}</h3>
                  {entry.org && <p className="cv-org">{entry.org}</p>}
                  {entry.note && <p>{entry.note}</p>}
                  {entry.bullets && <ul>{entry.bullets.map((line) => <li key={line}>{line}</li>)}</ul>}
                  {entry.links && <p className="cv-links">{entry.links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</p>}
                </div>
              </div>
            ))}
            {section.lines && (
              <ul className="cv-lines">
                {section.lines.map((line) => <li key={line.value}>{line.label && <strong>{line.label}: </strong>}{line.value}</li>)}
              </ul>
            )}
          </section>
        ))}
        <p className="cv-note">{c.note}</p>
      </div>
    </article>
  );
}
