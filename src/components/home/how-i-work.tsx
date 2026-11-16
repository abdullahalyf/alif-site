import { ArrowUpRight } from "@/components/arrows";
import Link from "next/link";
import { shell, site, workContent } from "@/content/site";
import { SectionLabel } from "@/components/section-label";
import { BackgroundShift, Reveal } from "@/components/motion";

export function HowIWork() {
  return <BackgroundShift className="night-section">
    <section className="section-space" aria-labelledby="how-title">
      <div className="container">
        <SectionLabel>{workContent.approachLabel}</SectionLabel>
        <div className="split-section">
          <div className="prose"><Reveal><h2 id="how-title">{workContent.approachTitle}</h2></Reveal><Reveal><Link className="text-link" href={shell.nav[1].href}>{workContent.approachLink}<ArrowUpRight /></Link></Reveal></div>
          <ol className="night-steps">{site.approach.map((step) => <li key={step.title}><Reveal><h3>{step.title}</h3></Reveal><Reveal><p>{step.text}</p></Reveal></li>)}</ol>
        </div>
      </div>
    </section>
  </BackgroundShift>;
}
