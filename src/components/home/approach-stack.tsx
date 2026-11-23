"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { whenNearViewportWithGsap } from "@/lib/when-near-viewport-with-gsap";

export function ApproachStack({ children }: { children: ReactNode }) {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const element = list.current;
    if (!element) return;

    return whenNearViewportWithGsap(element, (gsap) => {
      const media = gsap.matchMedia();
      media.add("(min-width: 48rem) and (prefers-reduced-motion: no-preference)", () => {
        const steps = Array.from(element.children);
        for (const [index, step] of steps.entries()) {
          const next = steps[index + 1];
          if (!next) break;
          gsap.to(step.firstElementChild, {
            scale: 0.97,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top 75%", end: "top 32%", scrub: true },
          });
          gsap.to(step.querySelector(".night-step__shade"), {
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
