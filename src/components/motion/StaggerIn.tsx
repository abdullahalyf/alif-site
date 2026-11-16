"use client";

import { useEffect, useRef, type ComponentProps, type ElementType } from "react";
import { getGsap } from "@/lib/gsap";
import { useReducedMotion, prefersReducedMotion } from "@/lib/use-reduced-motion";

type StaggerInProps = {
  children: React.ReactNode;
  /** Seconds between each child's entrance. */
  stagger?: number;
  /** How far each child slides in, in pixels. */
  distance?: number;
  /** ScrollTrigger start position. */
  start?: string;
  /** Element to render. Use `li` when the group is a list. */
  as?: ElementType;
  /** Ref to the rendered element, for scrolling or measuring. */
  listRef?: React.RefObject<HTMLElement | null>;
  className?: string;
} & Omit<ComponentProps<"div">, "children" | "className" | "ref">;

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
  as: Component = "div",
  listRef,
  className,
  ...rest
}: StaggerInProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Read the preference here rather than from the render: the hook returns
    // the server snapshot until React swaps it for the real value, and an
    // effect would otherwise start an animation the user asked not to see.
    if (prefersReducedMotion()) return;

    const root = rootRef.current;
    if (!root) return;

    const targets = Array.from(root.children);
    if (!targets.length) return;

    const gsap = getGsap();
    // The cards slide in and are un-covered by a clip rather than fading: the
    // text inside them stays at full opacity the whole time, so its contrast
    // is never reduced mid-animation.
    const tween = gsap.from(targets, {
      x: distance,
      clipPath: "inset(0 100% 0 0)",
      duration: 0.7,
      ease: "power3.out",
      stagger,
      clearProps: "transform,clipPath",
      scrollTrigger: { trigger: root, start, once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      // Undo the entrance start state, so a tween that never ran cannot leave
      // the cards clipped or shifted.
      gsap.set(targets, { clearProps: "transform,clipPath" });
    };
  }, [reducedMotion, stagger, distance, start]);

  const setRefs = (element: HTMLElement | null) => {
    rootRef.current = element;
    if (listRef) listRef.current = element;
  };

  return (
    <Component ref={setRefs} className={className ? `stagger-in ${className}` : "stagger-in"} {...rest}>
      {children}
    </Component>
  );
}
