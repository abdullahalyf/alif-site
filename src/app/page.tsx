import { getBaseUrl } from "@/seo/base-url";
import { seo } from "@/content/site";
import { pageMetadata } from "@/seo/metadata";
import { shell, site } from "@/content/site";
import { ButtonLink } from "@/components/button";
import { SectionLabel } from "@/components/section-label";

export const metadata = pageMetadata(seo.pages.home.title, seo.pages.home.description, seo.pages.home.path);

export default function Home() {
  const person = { "@context": seo.schemaContext, "@type": "Person", name: site.fullName, alternateName: site.name, url: getBaseUrl().href, image: new URL(site.heroPhoto.src, getBaseUrl()).href, jobTitle: site.role, description: site.intro, sameAs: site.socials.map((link) => link.href) };
  return <div className="container page-shell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
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
