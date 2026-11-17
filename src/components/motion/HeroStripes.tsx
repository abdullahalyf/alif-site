"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { useReducedMotion, prefersReducedMotion } from "@/lib/use-reduced-motion";

type HeroStripesProps = {
  /** Stroke colour of the diagonal lines. Defaults to the `--line` hairline token. */
  color?: string;
  /** How many diagonal lines to draw. */
  count?: number;
  /** Stroke width of each line, in pixels. */
  strokeWidth?: number;
  /** Vertical extent of the stripe field, in pixels. */
  height?: number;
  /** How far the lines drift while scrolling, in pixels. */
  drift?: number;
  className?: string;
};

const VIEWBOX_WIDTH = 1200;

/**
 * Length of a diagonal line in the viewBox: it spans `height` vertically and
 * the same distance horizontally, so the hypotenuse is `height * sqrt(2)`.
 * Computed rather than measured so the draw-in does not depend on SVG
 * geometry APIs being available.
 */
function lineLength(height: number) {
  return Math.ceil(height * Math.SQRT2) + strokePadding(height);
}

function strokePadding(height: number) {
  return Math.ceil(height);
}

/**
 * Thin diagonal lines that draw in on load and then drift slowly as the page
 * scrolls (DESIGN.md animation 5).
 *
 * The lines are plain SVG in the server-rendered markup — visible without
 * JavaScript. The draw-in is applied by JS only, and under
 * `prefers-reduced-motion: reduce` the lines are simply drawn already.
 */
export function HeroStripes({
  color = "var(--line)",
  count = 4,
  strokeWidth = 1,
  height = 160,
  drift = 60,
  className,
}: HeroStripesProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const dashLength = lineLength(height);

  useEffect(() => {
    // Read the preference here rather than from the render: the hook returns the
    // server snapshot until React swaps it for the real value.
    if (prefersReducedMotion()) return;

    const root = rootRef.current;
    if (!root) return;

    const lines = Array.from(root.querySelectorAll<SVGLineElement>("line"));
    if (!lines.length) return;

    const gsap = getGsap();

    const draw = gsap.fromTo(
      lines,
      { strokeDashoffset: dashLength },
      {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: "power2.out",
        stagger: 0.09,
      },
    );

    const parallax = gsap.to(lines, {
      y: drift,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      draw.scrollTrigger?.kill();
      parallax.scrollTrigger?.kill();
      draw.kill();
      parallax.kill();
    };
  }, [reducedMotion, drift, dashLength]);

  return (
    <div ref={rootRef} className={className} aria-hidden="true">
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${height}`}
        preserveAspectRatio="none"
        width="100%"
        height={height}
        focusable="false"
      >
        {Array.from({ length: count }, (_, index) => {
          const step = VIEWBOX_WIDTH / count;
          const x = step * index + step / 2;
          return (
            <line
              key={index}
              x1={x}
              y1={-height}
              x2={x - height}
              y2={height * 2}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={dashLength}
            />
          );
        })}
      </svg>
    </div>
  );
}
