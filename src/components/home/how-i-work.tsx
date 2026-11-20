import { ArrowUpRight } from "@/components/arrows";
import Link from "next/link";
import { navHref, site, workContent } from "@/content/site";
import { SectionLabel } from "@/components/section-label";
import { BackgroundShift } from "@/components/motion";

export function HowIWork() {
  return <BackgroundShift className="night-section">
    <section className="section-space" aria-labelledby="how-title">
      <div className="container">
        <div className="split-section split-section--sticky">
          <div className="prose night-intro">
            <SectionLabel>{workContent.approachLabel}</SectionLabel>
            <h2 id="how-title">{workContent.approachTitle}</h2>
            <p className="night-intro__text">{workContent.approachIntro}</p>
            <Link className="text-link" href={navHref("/approach")}>{workContent.approachLink}<ArrowUpRight /></Link>
          </div>
          <ol className="night-steps">{site.approach.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
        </div>
      </div>
    </section>
  </BackgroundShift>;
}
