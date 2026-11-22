"use client";

import { useEffect, useRef, type ComponentProps, type ElementType } from "react";
import { whenScrollRevealed } from "@/lib/when-scroll-revealed";
import { useReducedMotion, prefersReducedMotion } from "@/lib/use-reduced-motion";

type RevealProps = {
  children: React.ReactNode;
  /** Staggers the children so a heading reveals line by line. */
  lines?: boolean;
  /** Stagger between children, in seconds. */
  stagger?: number;
  /** Element to render. Use `li` when the group is a list. */
  as?: ElementType;
  className?: string;
} & Omit<ComponentProps<"div">, "children" | "className" | "ref">;

export function Reveal({
  children,
  lines = false,
  stagger = 0.08,
  as: Component = "div",
  className,
  ...rest
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    let animations: Animation[] = [];
    const stop = whenScrollRevealed(root, () => {
      animations = Array.from(root.children, (child, index) =>
        child.animate([{ translate: "0 12px" }, { translate: "none" }], {
          duration: 260,
          delay: Math.min(index * (lines ? stagger : 0) * 1000, 120),
          easing: "cubic-bezier(0.2, 0.65, 0.3, 1)",
        })
      );
    });
    return () => {
      stop?.();
      animations.forEach((animation) => animation.cancel());
    };
  }, [reducedMotion, lines, stagger]);

  return (
    <Component ref={rootRef} className={className} data-motion-managed {...rest}>
      {children}
    </Component>
  );
}
