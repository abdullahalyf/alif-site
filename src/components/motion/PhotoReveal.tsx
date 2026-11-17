"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { useReducedMotion, prefersReducedMotion } from "@/lib/use-reduced-motion";

const FROM = {
  filter: "blur(12px) saturate(0.4)",
  opacity: 0.6,
  scale: 1.06,
};

const TO = {
  filter: "blur(0px) saturate(1)",
  opacity: 1,
  scale: 1,
};

type PhotoRevealProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Sharpens a photo as it scrolls into view (DESIGN.md animation 3): the image
 * starts blurred and desaturated, then resolves to normal, scrubbed with the
 * scroll position.
 *
 * The server-rendered markup shows the photo untouched — the soft start state
 * is applied by JS only, so the image is fully visible without JavaScript.
 * Under `prefers-reduced-motion: reduce` nothing animates and the photo stays
 * sharp.
 */
export function PhotoReveal({ children, className }: PhotoRevealProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Read the preference here rather than from the render: the hook returns the
    // server snapshot until React swaps it for the real value.
    if (prefersReducedMotion()) return;

    const root = rootRef.current;
    if (!root) return;

    const image = root.querySelector("img");
    if (!image) return;

    const gsap = getGsap();
    const tween = gsap.fromTo(
      image,
      { ...FROM },
      {
        ...TO,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "top 25%",
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      // Undo the start state, so a tween that never ran cannot leave the photo
      // blurred or faded.
      gsap.set(image, { clearProps: "filter,opacity,transform" });
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
