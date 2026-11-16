import { getBaseUrl } from "@/seo/base-url";
import { seo, site } from "@/content/site";

export function PersonJsonLd() {
  const person = { "@context": seo.schemaContext, "@type": "Person", name: site.fullName, alternateName: site.name, url: getBaseUrl().href, image: new URL(site.heroPhoto.src, getBaseUrl()).href, jobTitle: site.role, description: site.intro, sameAs: site.socials.map((link) => link.href) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />;
}
