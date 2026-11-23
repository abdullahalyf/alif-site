"use client";

import { useEffect, useRef, type ComponentProps, type ElementType } from "react";
import { whenScrollRevealed } from "@/lib/when-scroll-revealed";
import { useReducedMotion, prefersReducedMotion } from "@/lib/use-reduced-motion";

type StaggerInProps = {
  children: React.ReactNode;
  /** Seconds between each child's entrance. */
  stagger?: number;
  /** How far each child slides in, in pixels. */
  distance?: number;
  /** Element to render. Use `li` when the group is a list. */
  as?: ElementType;
  /** Ref to the rendered element, for scrolling or measuring. */
  listRef?: React.RefObject<HTMLElement | null>;
  className?: string;
} & Omit<ComponentProps<"div">, "children" | "className" | "ref">;

export function StaggerIn({
  children,
  stagger = 0.09,
  distance = 20,
  as: Component = "div",
  listRef,
  className,
  ...rest
}: StaggerInProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    let animations: Animation[] = [];
    const stop = whenScrollRevealed(root, () => {
      animations = Array.from(root.children, (child, index) =>
        child.animate([{ translate: `${distance}px 0` }, { translate: "none" }], {
          duration: 260,
          delay: Math.min(index * stagger * 1000, 120),
          easing: "cubic-bezier(0.2, 0.65, 0.3, 1)",
        })
      );
    });
    return () => {
      stop?.();
      animations.forEach((animation) => animation.cancel());
    };
  }, [reducedMotion, stagger, distance]);

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
