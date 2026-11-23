import Image from "next/image";
import { site } from "@/content/site";
import { StatusCard } from "./status-card";
import { SystemDiagram } from "./system-diagram";

/**
 * The hero's right column: a large photo with the status card floating over
 * its bottom-left corner and the system diagram over its top-right.
 *
 * The card and the diagram float in shortly after the headline appears.
 */
export function HeroSide() {
  return (
    <div className="hero-side">
      <div className="hero-side__photo-wrap">
        <Image
          {...site.heroSide}
          alt={site.heroSide.alt}
          unoptimized
          loading="eager"
          fetchPriority="high"
          className="hero-side__photo"
        />
      </div>
      <StatusCard className="hero-side__card" float />
      <SystemDiagram
        className="hero-side__diagram"
        steps={site.systemDiagram.steps}
        label={site.systemDiagram.label}
        float
      />
    </div>
  );
}
