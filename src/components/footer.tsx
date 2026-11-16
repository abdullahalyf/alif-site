import { shell, site } from "@/content/site";
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
        <div className="footer-meta">
          <div className="social-links">{site.socials.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}</div>
          <p>{site.location}</p>
          <p>{shell.copyright(new Date().getUTCFullYear())}</p>
        </div>
      </div>
    </footer>
  );
}
