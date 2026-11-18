"use client";

import { useEffect, useRef } from "react";
import { HeroStripes } from "@/components/motion/HeroStripes";
import { getGsap } from "@/lib/gsap";
import { prefersReducedMotion, useReducedMotion } from "@/lib/use-reduced-motion";

export function HeroPhotoPanel({ children }: { children: React.ReactNode }) {
  const panel = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion() || !panel.current) return;
    const element = panel.current;
    const frame = element.querySelector(".hero-panel__frame");
    const photo = element.querySelector(".hero-photo");
    if (!frame || !photo) return;
    const motion = getGsap().matchMedia(element);

    motion.add({ wide: "(min-width: 48rem)", narrow: "(max-width: 47.999rem)" }, ({ conditions }) => {
      const wide = conditions?.wide;
      const timeline = getGsap().timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: element, start: "top 92%", end: "top 18%", scrub: true },
      });
      timeline.fromTo(photo,
        { filter: wide ? "blur(16px) saturate(0.38)" : "blur(5px) saturate(0.75)", opacity: wide ? 0.76 : 0.88, scale: wide ? 1.035 : 1 },
        { filter: "blur(0px) saturate(1)", opacity: 1, scale: 1 },
        0,
      );
      if (wide) {
        timeline.fromTo(frame, { scale: 0.83 }, { scale: 1 }, 0);
        timeline.fromTo(element.querySelectorAll(".hero-panel__corner"), { scale: 1 }, { scale: 0 }, 0);
      }
    });

    return () => motion.revert();
  }, [reducedMotion]);

  return <div ref={panel} className="hero-panel">
    <div className="hero-panel__frame">
      {children}
      <HeroStripes className="hero-stripes" color="var(--cream)" drift={72} />
      <div className="hero-panel__corners" aria-hidden="true">
        <span className="hero-panel__corner" /><span className="hero-panel__corner" />
        <span className="hero-panel__corner" /><span className="hero-panel__corner" />
      </div>
    </div>
  </div>;
}
