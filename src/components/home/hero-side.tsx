"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { getGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { PhotoReveal } from "@/components/motion";
import { StatusCard } from "./status-card";
import { SystemDiagram } from "./system-diagram";

/**
 * The hero's right column: a large photo with the status card floating over
 * its bottom-left corner and the system diagram over its top-right.
 *
 * The card and the diagram float in shortly after the headline appears. The
 * photo itself is revealed by `PhotoReveal`, which sharpens it on scroll.
 */
export function HeroSide() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const root = rootRef.current;
    if (!root) return;

    const floats = Array.from(root.querySelectorAll<HTMLElement>("[data-float]"));
    if (!floats.length) return;

    const gsap = getGsap();
    const tween = gsap.from(floats, {
      y: 28,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.35,
      clearProps: "transform,opacity",
    });

    return () => {
      tween.kill();
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="hero-side">
      <PhotoReveal className="hero-side__photo-wrap">
        <Image
          {...site.heroSide}
          alt={site.heroSide.alt}
          sizes="(max-width: 768px) 100vw, 40vw"
          className="hero-side__photo"
        />
      </PhotoReveal>
      <SystemDiagram
        className="hero-side__diagram"
        steps={site.systemDiagram.steps}
        label={site.systemDiagram.label}
        float
      />
      <StatusCard className="hero-side__card" float />
    </div>
  );
}
