"use client";

import { useCallback, useSyncExternalStore } from "react";

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function getMediaQueryList(): MediaQueryList | null {
  if (typeof window === "undefined" || !window.matchMedia) return null;
  return window.matchMedia(REDUCED_MOTION_QUERY);
}

function subscribe(onChange: () => void) {
  const query = getMediaQueryList();
  if (!query) return () => {};
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Reads `prefers-reduced-motion: reduce` straight from the browser.
 *
 * `useReducedMotion` returns `false` during hydration — the server snapshot —
 * so it is only safe to branch on while rendering. Effects run before React
 * swaps that snapshot for the real value, so anything that *starts* an
 * animation must ask this function instead, or it will start an animation the
 * user asked not to see.
 */
export function prefersReducedMotion(): boolean {
  return getMediaQueryList()?.matches ?? false;
}

/**
 * Tracks `prefers-reduced-motion: reduce`.
 *
 * Returns `false` while rendering on the server, so the markup is identical to
 * the no-JS output. On the client the real value is available on the very
 * first render, so animations are never started before the preference is known.
 */
export function useReducedMotion(): boolean {
  const getSnapshot = useCallback(() => {
    return getMediaQueryList()?.matches ?? false;
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
