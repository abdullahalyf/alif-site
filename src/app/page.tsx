import { shell, site } from "@/content/site";
import { ButtonLink } from "@/components/button";
import { SectionLabel } from "@/components/section-label";

export default function Home() {
  return <div className="container page-shell">
    <SectionLabel>{site.tagline}</SectionLabel>
    <h1>{site.name}</h1>
    <p className="lead">{site.role}</p>
    <p>{site.intro}</p>
    <div className="button-row">
      <ButtonLink href={shell.email.href}>{shell.email.label}</ButtonLink>
      <ButtonLink href={shell.nav[0].href} variant="secondary">{shell.workLabel}</ButtonLink>
    </div>
  </div>;
}
