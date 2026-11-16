import { seo } from "@/content/site";
import { pageMetadata } from "@/seo/metadata";
import { shell, site } from "@/content/site";
import { SectionLabel } from "@/components/section-label";

export const metadata = pageMetadata(seo.pages.approach.title, seo.pages.approach.description, seo.pages.approach.path);

export default function Approach() {
  return <div className="container page-shell">
    <SectionLabel>{site.name}</SectionLabel>
    <h1>{shell.approachTitle}</h1>
    <p>{site.intro}</p>
    {site.approach.map((step) => <section className="placeholder-row" key={step.title}><h2>{step.title}</h2><p>{step.text}</p></section>)}
  </div>;
}
