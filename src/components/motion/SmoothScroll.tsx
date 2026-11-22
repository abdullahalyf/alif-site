"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { connectNativeHorizontalAreas } from "@/lib/horizontal-wheel";
import { syncWithLenis } from "@/lib/gsap";
import { useReducedMotion, prefersReducedMotion } from "@/lib/use-reduced-motion";
import { SmoothScrollContext } from "./smooth-scroll-context";

/** Last scroll position of every page visited in this tab, so each page keeps its own place. */
const scrollMemory = new Map<string, number>();

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
  const pathname = usePathname();
  const currentPath = useRef(pathname);
  const leaving = useRef(false);

  useEffect(() => {
    const positions = scrollMemory;
    const remember = () => {
      if (!leaving.current && location.pathname === currentPath.current) positions.set(currentPath.current, window.scrollY);
    };
    const toTopOnSamePage = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname !== location.pathname) {
        positions.set(location.pathname, window.scrollY);
        leaving.current = true;
        return;
      }
      if (url.hash) return;
      event.preventDefault();
      const lenis = instanceRef.current;
      if (lenis) lenis.scrollTo(0, { duration: 0.9 });
      else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "instant" : "smooth" });
    };
    window.addEventListener("scroll", remember, { passive: true });
    document.addEventListener("click", toTopOnSamePage, true);
    return () => {
      window.removeEventListener("scroll", remember);
      document.removeEventListener("click", toTopOnSamePage, true);
    };
  }, []);

  useEffect(() => {
    if (currentPath.current === pathname) return;
    currentPath.current = pathname;
    leaving.current = false;
    if (location.hash) return;
    const target = scrollMemory.get(pathname) ?? 0;
    const restore = () => {
      instanceRef.current?.scrollTo(target, { immediate: true, force: true });
      window.scrollTo({ top: target, left: 0, behavior: "instant" });
    };
    restore();
    const frame = requestAnimationFrame(restore);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

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
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;

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
