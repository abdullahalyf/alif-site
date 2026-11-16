"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

let registered = false;

function registerPlugins() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/**
 * Registers the GSAP plugins once per browser session.
 * Safe to call from any client component.
 */
export function getGsap() {
  registerPlugins();
  return gsap;
}

/**
 * Registers GSAP plugins and wires ScrollTrigger to a Lenis instance so
 * scroll-linked animations stay in sync with smooth scrolling.
 *
 * Returns a cleanup function that removes the Lenis listeners and kills the
 * ScrollTriggers created while it was active.
 */
export function syncWithLenis(lenis: Lenis): () => void {
  registerPlugins();

  const onScroll = () => ScrollTrigger.update();

  const raf = (time: number) => lenis.raf(time * 1000);

  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  lenis.on("scroll", onScroll);

  ScrollTrigger.refresh();

  return () => {
    lenis.off("scroll", onScroll);
    gsap.ticker.remove(raf);
    gsap.ticker.lagSmoothing(500, 33);
    ScrollTrigger.killAll();
  };
}
