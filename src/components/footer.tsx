import { footerGroups, shell, site, writingContent } from "@/content/site";
import { ButtonLink } from "./button";
import { BackgroundDots } from "./BackgroundDots";

export async function Footer() {
  "use cache";
  return (
    <footer id={shell.contactId} className="footer">
      <BackgroundDots variant="night" />
      <div className="container footer-inner">
        <h2>{shell.footerTitle}</h2>
        <div className="button-row">
          <ButtonLink href={shell.email.href}>{shell.email.label}</ButtonLink>
          <ButtonLink href={site.whatsapp.href} variant="secondary">{shell.whatsappLabel}</ButtonLink>
        </div>
        <a href={shell.email.href}>{site.email}</a>
        <nav className="footer-links" aria-label={shell.footerNavigation}>
          {footerGroups.map(group => <div className="footer-links__group" key={group.label}>
            <h3>{group.label}</h3>
            <ul>
              {group.links.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}
            </ul>
          </div>)}
        </nav>
        <div className="footer-meta">
          <p>{site.location}</p>
          <p>{shell.copyright(new Date().getUTCFullYear())}</p>
          <a className="footer-rss" href={writingContent.rssPath} aria-label={writingContent.rssLabel}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><circle cx="5" cy="19" r="2" fill="currentColor" /><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
