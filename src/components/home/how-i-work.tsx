import { ArrowUpRight } from "@/components/arrows";
import type { CSSProperties } from "react";
import { ServiceIcon } from "@/components/service-icon";
import { ApproachStack } from "./approach-stack";
import Link from "next/link";
import { navHref, site, workContent } from "@/content/site";
import { SectionLabel } from "@/components/section-label";
import { BackgroundShift } from "@/components/motion";

const icons = ["operations", "architecture", "offline", "access"] as const;

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
          <ApproachStack>{site.approach.map((step, index) => <li key={step.title} style={{ "--step-offset": `${index}rem` } as CSSProperties}>
            <article className="night-step">
              <div className="night-step__marker" aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span><ServiceIcon name={icons[index % icons.length]} /></div>
              <h3>{step.title}</h3><p>{step.text}</p>
              <span className="night-step__shade" aria-hidden="true" />
            </article>
          </li>)}</ApproachStack>
        </div>
      </div>
    </section>
  </BackgroundShift>;
}
