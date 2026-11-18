"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { useReducedMotion, prefersReducedMotion } from "@/lib/use-reduced-motion";

export function BackgroundShift({ children, className }: { children: React.ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !root.current || !panel.current) return;
    const target = panel.current;
    const context = getGsap().context(() => {
      getGsap().fromTo(target, { scaleX: 0.965, y: 20, borderRadius: 24 }, {
        scaleX: 1,
        y: 0,
        borderRadius: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 90%", end: "top 35%", scrub: true },
      });
    }, root.current);

    return () => context.revert();
  }, [reducedMotion]);

  return <div ref={root} className={className}>
    <div ref={panel} className="night-section__panel" aria-hidden="true" />
    {children}
  </div>;
}
