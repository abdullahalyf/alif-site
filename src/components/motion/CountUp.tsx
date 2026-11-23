"use client";

import { useEffect, useRef } from "react";
import { whenNearViewportWithGsap } from "@/lib/when-near-viewport-with-gsap";
import { useReducedMotion, prefersReducedMotion } from "@/lib/use-reduced-motion";

type CountUpProps = {
  /**
   * The number to count to. A value like `"12+"` keeps its suffix: only the
   * leading digits are animated.
   */
  value: string;
  /** How long the count takes, in seconds. */
  duration?: number;
  className?: string;
};

/**
 * Counts a number up when it scrolls into view.
 *
 * The server-rendered markup already shows the final number, so the figure
 * is never wrong and the page reads fine without JavaScript. Under
 * `prefers-reduced-motion: reduce` nothing animates and the number is left
 * alone.
 */
export function CountUp({ value, duration = 1.2, className }: CountUpProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Read the preference here rather than from the render: the hook returns
    // the server snapshot until React swaps it for the real value, and an
    // effect would otherwise start an animation the user asked not to see.
    if (prefersReducedMotion()) return;

    const root = rootRef.current;
    if (!root) return;

    // Only a plain number can be counted; anything else (a range, a label) is
    // shown as it is.
    const match = /^(\d+)(.*)$/.exec(value.trim());
    if (!match) return;
    const target = Number(match[1]);
    if (!target) return;
    const suffix = match[2];

    return whenNearViewportWithGsap(root, (gsap) => {
      const counter = { value: 0 };
      const tween = gsap.to(counter, {
        value: target,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          root.textContent = `${Math.round(counter.value)}${suffix}`;
        },
        scrollTrigger: { trigger: root, start: "top 90%", once: true },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        // Put the final number back, so a tween that never ran cannot leave a
        // half-counted figure behind.
        root.textContent = value;
      };
    });
  }, [reducedMotion, value, duration]);

  return (
    <span ref={rootRef} className={className}>
      {value}
    </span>
  );
}
