"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Trip } from "@/content/schemas/travel";
import { getGsap } from "@/lib/gsap";
import { prefersReducedMotion, useReducedMotion } from "@/lib/use-reduced-motion";

export function JourneyAtmosphere({ trip, previous }: { trip: Trip; previous: Trip }) {
  const root = useRef<HTMLDivElement>(null);
  const incoming = useRef<HTMLDivElement>(null);
  const outgoing = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = root.current, front = incoming.current, back = outgoing.current;
    if (!element || !front || !back) return;
    if (prefersReducedMotion() || trip.slug === previous.slug) {
      element.style.backgroundColor = trip.color;
      front.style.opacity = "0.1"; back.style.opacity = "0";
      return;
    }
    const animation = getGsap().timeline()
      .fromTo(element, { backgroundColor: previous.color }, { backgroundColor: trip.color, duration: 0.8 }, 0)
      .fromTo(front, { opacity: 0 }, { opacity: 0.1, duration: 0.8 }, 0)
      .fromTo(back, { opacity: 0.1 }, { opacity: 0, duration: 0.8 }, 0);
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => { animation.paused(!entry.isIntersecting); });
    if (observer) { animation.pause(); observer.observe(element); }
    return () => { observer?.disconnect(); animation.kill(); };
  }, [trip, previous, reduced]);
  return <div ref={root} className="journey-atmosphere" aria-hidden="true" style={{ backgroundColor: trip.color }}>
    <div className="journey-ambient-photo journey-ambient-outgoing" ref={outgoing}><Image src={previous.photos[0].src} alt="" width={previous.photos[0].width} height={previous.photos[0].height} sizes="320px" unoptimized={previous.photos[0].src.startsWith("https://")} loading="lazy" /></div>
    <div className="journey-ambient-photo journey-ambient-incoming" ref={incoming}><Image src={trip.photos[0].src} alt="" width={trip.photos[0].width} height={trip.photos[0].height} sizes="320px" unoptimized={trip.photos[0].src.startsWith("https://")} loading="lazy" /></div>
    <div className="journey-paper-grain" />
  </div>;
}
