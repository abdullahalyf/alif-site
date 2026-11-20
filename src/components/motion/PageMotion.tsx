"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
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
    let observer: IntersectionObserver | undefined;
    // Let the content in the initial viewport paint at its final state.
    const activate = () => {
      if (observer) return;
      observer = new IntersectionObserver((entries) => {
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting) continue;
          observer?.unobserve(target);
          const kind = target.matches("h1, h2, h3") ? "heading"
            : target.matches(".section-label") ? "line"
              : target.matches("img") ? "image" : "rise";
          target.setAttribute("data-motion-enter", kind);
          played.add(target);
        }
      }, { rootMargin: "0px 0px -20px" });
      main.querySelectorAll(candidates).forEach((element) => {
        if (element.closest(excluded) || element.getBoundingClientRect().top < window.innerHeight) return;
        observer?.observe(element);
      });
    };
    const frame = requestAnimationFrame(activate);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      played.forEach((element) => element.removeAttribute("data-motion-enter"));
    };
  }, [path, reduced]);

  return null;
}
