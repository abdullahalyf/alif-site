"use client";

import { useEffect, useId, useRef } from "react";
import type { Diagram } from "@/content/schemas/diagrams";
import { pageContent } from "@/content/site";
import { diagramContent as c } from "@/content/diagrams";
import { layoutDiagram } from "./layout";
import { whenNearViewport } from "@/lib/when-near-viewport";
import { getGsap } from "@/lib/gsap";
import { useReducedMotion, prefersReducedMotion } from "@/lib/use-reduced-motion";

/** Renders the legend heading at the level the surrounding page needs. */
function LegendHeading({
  level,
  children,
}: {
  level: "h2" | "h3";
  children: React.ReactNode;
}) {
  return level === "h2" ? <h2>{children}</h2> : <h3>{children}</h3>;
}

export function ArchitectureDiagram({
  diagram,
  legendHeading = "h2",
}: {
  diagram: Diagram;
  /**
   * The heading level for the two legend headings in the caption.
   *
   * The diagram is used in two places: on its own page, where the diagram
   * title is the `h1`, and inside a case study, where "System design" is
   * already an `h2`. The legend has to sit one level below whichever it is
   * sitting in, or the heading order breaks.
   */
  legendHeading?: "h2" | "h3";
}) {
  const id = useId().replaceAll(":", "");
  const nodes = layoutDiagram(diagram);
  const width = Math.max(...nodes.map((node) => node.x)) + 250;
  const height = Math.max(...nodes.map((node) => node.y)) + 130;
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Read the preference here rather than from the render: the hook returns
    // the server snapshot until React swaps it for the real value, and an
    // effect would otherwise start an animation the user asked not to see.
    if (prefersReducedMotion()) return;

    const root = rootRef.current;
    if (!root) return;

    return whenNearViewport(root, () => {
      const gsap = getGsap();
      const boxes = root.querySelectorAll<SVGGElement>(".diagram-node");
      const edges = root.querySelectorAll<SVGPathElement>(".diagram-edge");
      if (!boxes.length && !edges.length) return;

      // Each edge is drawn in by pulling its dash back to nothing, so the line
      // appears to grow from one node to the next. The dash has to match the
      // real length of the path, so it is measured rather than guessed.
      const lengths = Array.from(edges, (edge) => edge.getTotalLength());
      edges.forEach((edge, index) => {
        edge.style.strokeDasharray = `${lengths[index]}`;
        edge.style.strokeDashoffset = `${lengths[index]}`;
      });

      const edgeTween = gsap.to(edges, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.12,
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });

      // The boxes scale up into place, slightly after the edge that feeds them.
      const boxTween = gsap.from(boxes, {
        scale: 0.86,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.6)",
        stagger: 0.09,
        transformOrigin: "center center",
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });

      return () => {
        edgeTween.scrollTrigger?.kill();
        edgeTween.kill();
        boxTween.scrollTrigger?.kill();
        boxTween.kill();
        // Undo the start states, so a tween that never ran cannot leave a
        // diagram invisible or with undrawn edges.
        gsap.set(edges, { clearProps: "strokeDashoffset,strokeDasharray" });
        gsap.set(boxes, { clearProps: "transform,opacity" });
      };
    });
  }, [reducedMotion]);

  return (
    <figure className="architecture-diagram" ref={rootRef}>
      <p className="diagram-scroll-hint">{pageContent.diagramScroll}</p>
      <div className="diagram-frame">
        <div
          className="diagram-scroll"
          data-horizontal-scroll
          tabIndex={0}
          role="region"
          aria-label={diagram.title}
        >
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-labelledby={`${id}-title ${id}-desc`}
          >
            <title id={`${id}-title`}>{diagram.title}</title>
            <desc id={`${id}-desc`}>{diagram.description}</desc>
            <defs>
              <marker
                id={`${id}-arrow`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
              </marker>
            </defs>
            {diagram.edges.map((edge, index) => {
              const a = nodes.find((node) => node.id === edge.from)!;
              const b = nodes.find((node) => node.id === edge.to)!;
              return (
                <g key={index}>
                  <path
                    className="diagram-edge"
                    d={`M${a.x + 220},${a.y + 45} C${a.x + 270},${a.y + 45} ${b.x - 50},${b.y + 45} ${b.x},${b.y + 45}`}
                    fill="none"
                    stroke="currentColor"
                    markerEnd={`url(#${id}-arrow)`}
                  />
                  <text
                    x={(a.x + 220 + b.x) / 2}
                    y={(a.y + b.y) / 2 + 25}
                    textAnchor="middle"
                    fontSize="11"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}
            {nodes.map((node) => (
              <g
                key={node.id}
                className={`diagram-node diagram-node--${node.kind}`}
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width="220"
                  height="90"
                  rx={node.kind === "db" ? 20 : 8}
                />
                <text
                  x={node.x + 110}
                  y={node.y + 50}
                  textAnchor="middle"
                  fontSize="14"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
      <figcaption>
        <p>{diagram.description}</p>
        <LegendHeading level={legendHeading}>{c.nodes}</LegendHeading>
        <ul>
          {diagram.nodes.map((node) => (
            <li key={node.id}>{node.label}</li>
          ))}
        </ul>
        <LegendHeading level={legendHeading}>{c.connections}</LegendHeading>
        <ul>
          {diagram.edges.map((edge, index) => (
            <li key={index}>
              {diagram.nodes.find((node) => node.id === edge.from)!.label} →{" "}
              {diagram.nodes.find((node) => node.id === edge.to)!.label}:{" "}
              {edge.label}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
