"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { getGsap } from "@/lib/gsap";
import { useReducedMotion, prefersReducedMotion } from "@/lib/use-reduced-motion";
import { StatusCard } from "./status-card";
import { SystemDiagram } from "./system-diagram";

/**
 * The hero's right column: a large photo with the status card floating over
 * its bottom-left corner and the system diagram over its top-right.
 *
 * The card and the diagram float in shortly after the headline appears.
 */
export function HeroSide() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Read the preference here rather than from the render: the hook returns the
    // server snapshot until React swaps it for the real value.
    if (prefersReducedMotion()) return;

    const root = rootRef.current;
    if (!root) return;

    const floats = Array.from(root.querySelectorAll<HTMLElement>("[data-float]"));
    if (!floats.length) return;

    const gsap = getGsap();
    // The card and the diagram rise into place without fading: their text and
    // strokes stay at full opacity, so contrast is unaffected mid-animation.
    const tween = gsap.from(floats, {
      y: 28,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.35,
      clearProps: "transform",
    });

    return () => {
      tween.kill();
      // Undo the entrance start state, so a tween that never ran cannot leave
      // the card and the diagram shifted.
      gsap.set(floats, { clearProps: "transform" });
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="hero-side">
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
