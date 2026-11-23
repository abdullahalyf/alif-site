import type { getGsap } from "./gsap";
import { whenNearViewport } from "./when-near-viewport";
import { prefersReducedMotion } from "./use-reduced-motion";

export function whenNearViewportWithGsap(
  element: Element,
  start: (gsap: ReturnType<typeof getGsap>) => (() => void) | undefined,
) {
  if (prefersReducedMotion()) return;
  return whenNearViewport(element, () => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    void import("./gsap").then(({ getGsap }) => {
      if (!cancelled && !prefersReducedMotion()) cleanup = start(getGsap());
    }, () => {
      // Leave the server-rendered content visible if the animation cannot load.
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  });
}
