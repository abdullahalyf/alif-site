"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef } from "react";
import { syncWithLenis } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const SmoothScrollContext = createContext<React.RefObject<Lenis | null> | null>(null);

/**
 * The active Lenis instance, or `null` when smooth scrolling is off.
 * Read it during event handlers or effects, not during render.
 */
export function useSmoothScroll(): Lenis | null {
  const instance = useContext(SmoothScrollContext);
  return instance?.current ?? null;
}

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

  useEffect(() => {
    if (reducedMotion) return;

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
