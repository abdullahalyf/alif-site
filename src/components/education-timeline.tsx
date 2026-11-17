"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { useReducedMotion, prefersReducedMotion } from "@/lib/use-reduced-motion";
import type { Site } from "@/content/schema";

/**
 * The education timeline: a vertical rule down the side that fills in as the
 * timeline scrolls into view.
 *
 * The rule is drawn with a scaled element rather than a scroll-linked
 * height, so it grows once and stays put. Under `prefers-reduced-motion:
 * reduce` it is simply there from the start, and the server-rendered markup
 * already includes the full line, so the page reads fine without JavaScript.
 */
export function EducationTimeline({ items }: { items: Site["education"] }) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Read the preference here rather than from the render: the hook returns
    // the server snapshot until React swaps it for the real value.
    if (prefersReducedMotion()) return;

    const root = rootRef.current;
    const fill = fillRef.current;
    if (!root || !fill) return;

    const gsap = getGsap();
    const tween = gsap.fromTo(
      fill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      // Undo the start state, so a tween that never ran cannot leave the line
      // undrawn.
      gsap.set(fill, { clearProps: "transform" });
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="education-timeline">
      {/* The rule sits behind the entries and grows as they scroll past. */}
      <span className="education-timeline__line" aria-hidden="true">
        <span ref={fillRef} className="education-timeline__fill" />
      </span>
      {items.map((item) => (
        <article key={item.title}>
          <p className="label">{item.years}</p>
          <div>
            <h3>{item.title}</h3>
            <p>{item.org}</p>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
