"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { whenScrollRevealed } from "@/lib/when-scroll-revealed";
import { prefersReducedMotion, useReducedMotion } from "@/lib/use-reduced-motion";

const candidates = "h1, h2, h3, p, figure img, .project-media img, .about-photo-wrap img, section > article, section > ul > li";
const excluded = "[data-motion-managed], .stagger-in, .hero-photo-story, .night-steps, .tools-marquee, .status-card, .intro-overlay, [role=log], [aria-live], form";

export function PageMotion() {
  const path = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;
    const main = document.querySelector("main");
    if (!main) return;

    const played = new Set<Element>();
    const stops = Array.from(main.querySelectorAll(candidates), (element) => {
      if (element.closest(excluded)) return;
      return whenScrollRevealed(element, () => {
        const kind = element.matches("h1, h2, h3") ? "heading"
          : element.matches(".section-label") ? "line"
            : element.matches("img") ? "image" : "rise";
        element.setAttribute("data-motion-enter", kind);
        played.add(element);
      });
    });
    return () => {
      stops.forEach((stop) => stop?.());
      played.forEach((element) => element.removeAttribute("data-motion-enter"));
    };
  }, [path, reduced]);

  return null;
}
