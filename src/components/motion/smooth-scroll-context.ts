"use client";

import { createContext, useContext } from "react";
import type Lenis from "lenis";

/**
 * The active Lenis instance, or `null` when smooth scrolling is off.
 *
 * This module deliberately imports Lenis as a *type* only, so it carries no
 * runtime code. Components that only need to read the instance — the brand
 * mark, for one — can import it without pulling Lenis and GSAP into their
 * own chunk, which would delay hydration of the page they sit on.
 */
export const SmoothScrollContext = createContext<React.RefObject<Lenis | null> | null>(null);

/**
 * The active Lenis instance, or `null` when smooth scrolling is off.
 * Read it during event handlers or effects, not during render.
 */
export function useSmoothScroll(): Lenis | null {
  const instance = useContext(SmoothScrollContext);
  return instance?.current ?? null;
}
