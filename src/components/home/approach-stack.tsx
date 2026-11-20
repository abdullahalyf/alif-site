"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { getGsap } from "@/lib/gsap";
import { whenNearViewport } from "@/lib/when-near-viewport";

export function ApproachStack({ children }: { children: ReactNode }) {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const element = list.current;
    if (!element) return;

    return whenNearViewport(element, () => {
      const media = getGsap().matchMedia();
      media.add("(min-width: 48rem) and (prefers-reduced-motion: no-preference)", () => {
        const steps = Array.from(element.children);
        for (const [index, step] of steps.entries()) {
          const next = steps[index + 1];
          if (!next) break;
          getGsap().to(step.firstElementChild, {
            scale: 0.97,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top 75%", end: "top 32%", scrub: true },
          });
          getGsap().to(step.querySelector(".night-step__shade"), {
            opacity: 0.13,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top 75%", end: "top 32%", scrub: true },
          });
        }
      });
      return () => media.revert();
    });
  }, []);

  return <ol className="night-steps" ref={list}>{children}</ol>;
}
