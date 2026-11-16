"use client";

import { useEffect, useRef, type ComponentProps, type ElementType } from "react";
import { getGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

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
    if (reducedMotion) return;

    const root = rootRef.current;
    if (!root) return;

    const gsap = getGsap();
    const targets = Array.from(root.children);
    if (!targets.length) return;

    const tween = gsap.from(targets, {
      y: 24,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: lines ? stagger : 0,
      clearProps: "transform,opacity",
      scrollTrigger: { trigger: root, start, once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reducedMotion, lines, stagger, start]);

  return (
    <Component ref={rootRef} className={className} {...rest}>
      {children}
    </Component>
  );
}
