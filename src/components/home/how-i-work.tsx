import { ArrowUpRight } from "@/components/arrows";
import Link from "next/link";
import { shell, site, workContent } from "@/content/site";
import { SectionLabel } from "@/components/section-label";

export function HowIWork() {
  return <section className="night-section section-space" aria-labelledby="how-title">
    <div className="container">
      <SectionLabel>{workContent.approachLabel}</SectionLabel>
      <div className="split-section">
        <div className="prose"><h2 id="how-title">{workContent.approachTitle}</h2><Link className="text-link" href={shell.nav[1].href}>{workContent.approachLink}<ArrowUpRight /></Link></div>
        <ol className="night-steps">{site.approach.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
      </div>
    </div>
  </section>;
}
