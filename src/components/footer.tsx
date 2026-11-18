import { footerGroups, shell, site } from "@/content/site";
import { ButtonLink } from "./button";

export async function Footer() {
  "use cache";
  return (
    <footer id={shell.contactId} className="footer">
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
        </div>
      </div>
    </footer>
  );
}
