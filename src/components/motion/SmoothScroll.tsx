"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { connectNativeHorizontalAreas } from "@/lib/horizontal-wheel";
import { syncWithLenis } from "@/lib/gsap";
import { useReducedMotion, prefersReducedMotion } from "@/lib/use-reduced-motion";
import { SmoothScrollContext } from "./smooth-scroll-context";

/**
 * Enables site-wide smooth scrolling with Lenis and keeps GSAP ScrollTrigger
 * in sync with it.
 *
 * Renders its children untouched, so the page is fully readable without JS.
 * Under `prefers-reduced-motion: reduce` no Lenis instance is created and no
 * scroll handling is installed.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const instanceRef = useRef<Lenis | null>(null);

  // The client is live once this component has mounted and its effects have
  // run. The marker lets a test wait for that moment instead of guessing with
  // a timeout.
  useEffect(() => {
    document.documentElement.dataset.hydrated = "true";
    return () => {
      delete document.documentElement.dataset.hydrated;
    };
  }, []);

  useEffect(connectNativeHorizontalAreas, []);

  useEffect(() => {
    // Read the preference here rather than from the render: the hook returns the
    // server snapshot until React swaps it for the real value.
    if (prefersReducedMotion()) return;

    const instance = new Lenis({ autoRaf: false });
    instanceRef.current = instance;

    const cleanup = syncWithLenis(instance);

    return () => {
      cleanup();
      instance.destroy();
      instanceRef.current = null;
    };
  }, [reducedMotion]);

  return (
    <SmoothScrollContext.Provider value={instanceRef}>{children}</SmoothScrollContext.Provider>
  );
}
