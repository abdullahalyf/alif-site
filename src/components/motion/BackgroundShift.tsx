"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type BackgroundShiftProps = {
  children: React.ReactNode;
  /** Page background colour while the section is in view. */
  to?: string;
  /** Page background colour while the section is out of view. */
  from?: string;
  /** Page text colour while the section is in view. */
  textTo?: string;
  /** Page text colour while the section is out of view. */
  textFrom?: string;
  className?: string;
};

/**
 * Transitions the page background from cream to night while the wrapped section
 * is in view, and back to cream when it leaves (DESIGN.md animation 7).
 *
 * The colours are written to the `--page-bg` and `--page-fg` custom properties
 * on `:root`, so every element reading them follows along. `globals.css` owns
 * the defaults; this component only overrides them while it is mounted.
 *
 * The server-rendered markup carries no colour overrides — the default cream
 * background stays in place, so the page is fully readable without JavaScript.
 * Under `prefers-reduced-motion: reduce` the transition is skipped and the
 * background stays cream.
 */
export function BackgroundShift({
  children,
  to = "var(--night)",
  from = "var(--cream)",
  textTo = "var(--night-text)",
  textFrom = "var(--ink)",
  className,
}: BackgroundShiftProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const root = rootRef.current;
    if (!root) return;

    const gsap = getGsap();
    const page = document.documentElement;

    const tween = gsap.fromTo(
      page,
      { "--page-bg": from, "--page-fg": textFrom },
      {
        "--page-bg": to,
        "--page-fg": textTo,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 60%",
          end: "top 20%",
          scrub: true,
          onLeave: () => setPageColors(from, textFrom),
          onLeaveBack: () => setPageColors(to, textTo),
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      clearPageColors();
    };
  }, [reducedMotion, to, from, textTo, textFrom]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}

function setPageColors(background: string, foreground: string) {
  if (typeof document === "undefined") return;
  const style = document.documentElement.style;
  style.setProperty("--page-bg", background);
  style.setProperty("--page-fg", foreground);
}

/** Removes the overrides so the page falls back to the values in `globals.css`. */
function clearPageColors() {
  if (typeof document === "undefined") return;
  const style = document.documentElement.style;
  style.removeProperty("--page-bg");
  style.removeProperty("--page-fg");
}
