import { pageContent, shell, site, seo } from "@/content/site";
import { pageMetadata } from "@/seo/metadata";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/motion";

export const metadata = pageMetadata(seo.pages.approach.title, seo.pages.approach.description, seo.pages.approach.path);

export default function Approach() {
  return <div className="container section-space">
    <SectionLabel>{site.tagline}</SectionLabel>
    <div className="page-intro"><Reveal><h1>{shell.approachTitle}</h1></Reveal><Reveal><p>{pageContent.approachIntro}</p></Reveal></div>
    <ol className="approach-steps">{site.approach.map((step, index) => <Reveal as="li" key={step.title} lines>
      <span className="step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <div className="prose"><h2>{step.title}</h2><p>{step.text}</p></div>
    </Reveal>)}</ol>
  </div>;
}
