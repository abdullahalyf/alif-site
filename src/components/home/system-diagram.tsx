"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { useReducedMotion, prefersReducedMotion } from "@/lib/use-reduced-motion";

type SystemDiagramProps = {
  /** Box labels, left to right. */
  steps: string[];
  /** Accessible label for the diagram. */
  label: string;
  /** Marks the diagram as a floating element that animates in. */
  float?: boolean;
  className?: string;
};

const BOX_WIDTH = 74;
const BOX_HEIGHT = 40;
const BOX_Y = 16;
const GAP = 18;
/** Padding so the box strokes and the longest label are not clipped. */
const PAD = 6;
/** Width of the diagram: four boxes, the gaps between them and side padding. */
const VIEWBOX_WIDTH = 4 * BOX_WIDTH + 3 * GAP + 2 * PAD;
const VIEWBOX_HEIGHT = BOX_Y + BOX_HEIGHT + 18;

/**
 * A small architecture diagram: POS → Sync → Cloud DB → Dashboard, with dots
 * travelling along the lines between the boxes.
 *
 * The diagram is plain SVG in the server-rendered markup, so it is fully
 * visible without JavaScript. Under `prefers-reduced-motion: reduce` the dots
 * stay put — the diagram is static. Otherwise the dots travel and the whole
 * diagram pauses while it is off-screen.
 */
export function SystemDiagram({ steps, label, float = false, className }: SystemDiagramProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Read the preference here rather than from the render: the hook returns the
    // server snapshot until React swaps it for the real value.
    if (prefersReducedMotion()) return;

    const root = rootRef.current;
    if (!root) return;

    const dots = Array.from(root.querySelectorAll<SVGCircleElement>("circle[data-travel]"));
    if (!dots.length) return;

    const gsap = getGsap();
    const tweens: gsap.core.Tween[] = [];

    for (const dot of dots) {
      const from = Number(dot.dataset.travelFrom);
      const to = Number(dot.dataset.travelTo);
      if (Number.isNaN(from) || Number.isNaN(to)) continue;

      const tween = gsap.fromTo(
        dot,
        { attr: { cx: from, cy: BOX_Y + BOX_HEIGHT / 2 }, opacity: 0 },
        {
          attr: { cx: to, cy: BOX_Y + BOX_HEIGHT / 2 },
          opacity: 1,
          duration: 2.4,
          ease: "none",
          repeat: -1,
          repeatDelay: 0.4,
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause play pause",
          },
        },
      );
      tweens.push(tween);
    }

    return () => {
      for (const tween of tweens) {
        tween.scrollTrigger?.kill();
        tween.kill();
      }
      // Undo the start state, so a tween that never ran cannot leave the dots
      // hidden.
      gsap.set(dots, { opacity: 1 });
    };
  }, [reducedMotion, steps]);

  const boxes = steps.map((text, index) => ({
    text,
    x: PAD + index * (BOX_WIDTH + GAP),
  }));

  const connectors = boxes.slice(0, -1).map((box, index) => {
    const from = box.x + BOX_WIDTH;
    const to = boxes[index + 1].x;
    const y = BOX_Y + BOX_HEIGHT / 2;
    return { id: `sync-${index}`, from, to, y };
  });

  return (
    <div ref={rootRef} className={className} role="img" aria-label={label} data-float={float ? "true" : undefined}>
      <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} width="100%" height="100%" focusable="false">
        {connectors.map((connector) => (
          <g key={connector.id}>
            <line
              x1={connector.from}
              y1={connector.y}
              x2={connector.to}
              y2={connector.y}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.5"
            />
            <circle
              data-travel="true"
              data-travel-from={connector.from}
              data-travel-to={connector.to}
              r="2.5"
              cx={connector.from}
              cy={connector.y}
              fill="currentColor"
            />
          </g>
        ))}
        {boxes.map((box) => (
          <g key={box.text}>
            <rect
              x={box.x}
              y={BOX_Y}
              width={BOX_WIDTH}
              height={BOX_HEIGHT}
              rx="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.65"
            />
            <text
              x={box.x + BOX_WIDTH / 2}
              y={BOX_Y + BOX_HEIGHT / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="13"
              fill="currentColor"
            >
              {box.text}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
