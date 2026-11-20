"use client";

import { useEffect, useRef, type ComponentProps, type ElementType } from "react";
import { getGsap } from "@/lib/gsap";
import { whenNearViewport } from "@/lib/when-near-viewport";
import { useReducedMotion, prefersReducedMotion } from "@/lib/use-reduced-motion";

type RevealProps = {
  children: React.ReactNode;
  /** Staggers the children so a heading reveals line by line. */
  lines?: boolean;
  /** Stagger between children, in seconds. */
  stagger?: number;
  /** ScrollTrigger start position. */
  start?: string;
  /** Element to render. Use `li` when the group is a list. */
  as?: ElementType;
  className?: string;
} & Omit<ComponentProps<"div">, "children" | "className" | "ref">;

/**
 * Reveals its content when it scrolls into view: each child rises 24px and
 * fades in, once per element.
 *
 * The server-rendered markup is fully visible — the hidden start state is
 * applied by JS immediately before the animation runs, so the page reads fine
 * without JavaScript. Under `prefers-reduced-motion: reduce` nothing animates
 * and the content stays visible.
 */
export function Reveal({
  children,
  lines = false,
  stagger = 0.08,
  start = "top 85%",
  as: Component = "div",
  className,
  ...rest
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Read the preference here rather than from the render: the hook returns
    // the server snapshot until React swaps it for the real value, and an
    // effect would otherwise start an animation the user asked not to see.
    if (prefersReducedMotion()) return;

    const root = rootRef.current;
    if (!root) return;

    const gsap = getGsap();
    return whenNearViewport(root, () => {
      const targets = Array.from(root.children);
      if (!targets.length) return;

      // The entrance moves and un-covers the content rather than fading it: the
      // text itself stays at full opacity the whole time, so contrast is never
      // reduced mid-animation. `clip-path` is animated instead of `opacity`.
      const tween = gsap.from(targets, {
        y: 24,
        clipPath: "inset(0 0 100% 0)",
        duration: 0.8,
        ease: "power3.out",
        stagger: lines ? stagger : 0,
        clearProps: "transform,clipPath",
        scrollTrigger: { trigger: root, start, once: true },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        // Undo the entrance start state, so a tween that never ran cannot leave
        // the content clipped or shifted.
        gsap.set(targets, { clearProps: "transform,clipPath" });
      };
    });
  }, [reducedMotion, lines, stagger, start]);

  return (
    <Component ref={rootRef} className={className} data-motion-managed {...rest}>
      {children}
    </Component>
  );
}
