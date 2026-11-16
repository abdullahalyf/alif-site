"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type StaggerInProps = {
  children: React.ReactNode;
  /** Seconds between each child's entrance. */
  stagger?: number;
  /** How far each child slides in, in pixels. */
  distance?: number;
  /** ScrollTrigger start position. */
  start?: string;
  className?: string;
};

/**
 * Slides a group of children in from the right, one after another, when the
 * group enters the viewport (DESIGN.md animation 6).
 *
 * The children are fully visible in the server-rendered markup — the start
 * state is applied by JS only. Under `prefers-reduced-motion: reduce` nothing
 * animates and the children stay in place.
 */
export function StaggerIn({
  children,
  stagger = 0.09,
  distance = 48,
  start = "top 85%",
  className,
}: StaggerInProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const root = rootRef.current;
    if (!root) return;

    const targets = Array.from(root.children);
    if (!targets.length) return;

    const gsap = getGsap();
    const tween = gsap.from(targets, {
      x: distance,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger,
      clearProps: "transform,opacity",
      scrollTrigger: { trigger: root, start, once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reducedMotion, stagger, distance, start]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
