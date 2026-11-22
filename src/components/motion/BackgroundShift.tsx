"use client";

import { useEffect, useRef } from "react";
import { whenNearViewport } from "@/lib/when-near-viewport";
import { getGsap } from "@/lib/gsap";
import { BackgroundDots } from "@/components/BackgroundDots";
import { useReducedMotion, prefersReducedMotion } from "@/lib/use-reduced-motion";

export function BackgroundShift({ children, className }: { children: React.ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !root.current || !panel.current) return;
    const target = panel.current;
    const wrapper = root.current;
    return whenNearViewport(wrapper, () => {
      const gsap = getGsap();
      const context = gsap.context(() => {
        gsap.fromTo(target, { scaleX: 0.965, y: 20, borderRadius: 24 }, {
          scaleX: 1,
          y: 0,
          borderRadius: 0,
          ease: "none",
          scrollTrigger: { trigger: wrapper, start: "top 90%", end: "top 35%", scrub: true },
        });
      }, wrapper);
      return () => context.revert();
    });
  }, [reducedMotion]);

  return <div ref={root} className={className}>
    <div ref={panel} className="night-section__panel" aria-hidden="true"><BackgroundDots variant="night" /></div>
    {children}
  </div>;
}
