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
          sizes="(max-width: 35rem) calc(100vw - 4rem), (max-width: 47.999rem) 31rem, (max-width: 63.999rem) 32rem, min(30rem, calc(39.8vw - 1.25rem))"
          // On a phone this photo is the largest element on screen, so it is
          // the largest contentful paint: it must load eagerly and be asked
          // for first, or the hero renders as an empty box while the image
          // trickles in.
          quality={68}
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
