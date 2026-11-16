"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap";
import { useHydrated } from "@/lib/use-hydrated";
import { useReducedMotion, prefersReducedMotion } from "@/lib/use-reduced-motion";

const STORAGE_KEY = "alif-intro-seen";

/** Total length of the intro, in seconds. Must stay under 1.4s. */
export const INTRO_DURATION = 1.3;

type IntroOverlayProps = {
  /** The word shown in the intro. */
  word: string;
  /** Overlay background colour. */
  background?: string;
  /** Word colour. */
  color?: string;
};

/**
 * Whether the intro should play right now.
 *
 * On the server nothing is shown, so the overlay never appears in the initial
 * HTML. On the client the intro runs once per browser session
 * (`sessionStorage`), and never under `prefers-reduced-motion: reduce`.
 */
function shouldPlayIntro(): boolean {
  if (typeof window === "undefined") return false;

  try {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return false;
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Storage unavailable — play the intro anyway.
  }

  return true;
}

/**
 * RAW-style intro overlay: a cream screen with the name in huge serif fades and
 * scales in, then slides up to reveal the page (DESIGN.md animation 2).
 *
 * The overlay is created by JavaScript only, so the page underneath is fully
 * visible without it. It plays once per browser session (`sessionStorage`) and
 * never longer than {@link INTRO_DURATION} seconds. Under
 * `prefers-reduced-motion: reduce` it is skipped entirely.
 */
export function IntroOverlay({
  word,
  background = "var(--cream)",
  color = "var(--ink)",
}: IntroOverlayProps) {
  const reducedMotion = useReducedMotion();
  const hydrated = useHydrated();
  const rootRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    // Read the preference here rather than from the render: the hook returns
    // the server snapshot until React swaps it for the real value.
    if (prefersReducedMotion()) return;
    if (!shouldPlayIntro()) return;

    // Start on the next frame so the overlay never flashes during hydration.
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [hydrated, reducedMotion]);

  useEffect(() => {
    if (!visible) return;

    const overlay = rootRef.current;
    const word = wordRef.current;
    if (!overlay || !word) return;

    const gsap = getGsap();
    const timeline = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    timeline
      .fromTo(
        word,
        // The word is un-covered by a clip rather than faded: the text stays at
        // full contrast the whole time, so it never dips below the threshold
        // while the overlay is on screen.
        { clipPath: "inset(0 0 100% 0)", scale: 0.92 },
        { clipPath: "inset(0 0 0% 0)", scale: 1, duration: 0.55, ease: "power2.out" },
      )
      .to(overlay, {
        yPercent: -100,
        duration: 0.65,
        ease: "power3.inOut",
      });

    return () => {
      timeline.kill();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="intro-overlay"
      aria-hidden="true"
      style={{ background, color }}
      data-intro="playing"
    >
      <span ref={wordRef} className="intro-word">
        {word}
      </span>
    </div>
  );
}
