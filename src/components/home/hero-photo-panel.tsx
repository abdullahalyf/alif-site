"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { HeroStripes } from "@/components/motion/HeroStripes";
import { whenNearViewportWithGsap } from "@/lib/when-near-viewport-with-gsap";
import { prefersReducedMotion, useReducedMotion } from "@/lib/use-reduced-motion";

export function HeroPhotoPanel({
  children,
  floatingPhoto,
  photoStrip,
  label,
}: {
  children: ReactNode;
  floatingPhoto: ReactNode;
  photoStrip: ReactNode;
  label: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const floating = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLUListElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const wrapper = root.current;
    const frame = panel.current;
    const card = floating.current;
    const row = strip.current;
    const photo = frame?.querySelector(".hero-photo");
    const first = row?.firstElementChild;
    if (!wrapper || !frame || !card || !row || !photo || !first) return;

    return whenNearViewportWithGsap(frame, (gsap) => {
      const motion = gsap.matchMedia(wrapper);
      motion.add({ wide: "(min-width: 48rem)", narrow: "(max-width: 47.999rem)" }, ({ conditions }) => {
        const wide = conditions?.wide;
        gsap.fromTo(photo,
          { filter: wide ? "blur(10px) saturate(0.5)" : "blur(4px) saturate(0.8)", opacity: wide ? 0.85 : 0.92, y: wide ? 20 : 10 },
          {
            filter: "blur(0px) saturate(1)", opacity: 1, y: 0, ease: "none",
            scrollTrigger: { trigger: frame, start: "top 96%", end: "top 66%", scrub: true },
          },
        );

        const dock = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: row,
            start: wide ? "top 98%" : "top 96%",
            end: wide ? "top 48%" : "top 67%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        const offsetX = (element: Element) => element.getBoundingClientRect().left - wrapper.getBoundingClientRect().left;
        const offsetY = (element: Element) => element.getBoundingClientRect().top - wrapper.getBoundingClientRect().top;

        // The visual copy can travel outside the strip's clipping boundary. At
        // the end it hands off to the real first item, which scrolls with the row.
        dock.fromTo(card, {
          x: () => offsetX(frame) + frame.clientWidth * (wide ? 0.76 : 0.58) - card.offsetWidth * 0.5,
          y: () => offsetY(frame) + frame.clientHeight * (wide ? 0.69 : 0.73) - card.offsetHeight * 0.45,
          scale: wide ? 0.62 : 0.72,
          opacity: 1,
        }, {
          x: () => offsetX(first) + row.scrollLeft,
          y: () => offsetY(first),
          scale: 1,
          duration: 1,
        }, 0);
        dock.fromTo(first, { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.92);
        dock.to(card, { opacity: 0, duration: 0.08 }, 0.92);
        dock.fromTo(Array.from(row.children).slice(1).map((item) => item.firstElementChild),
          { x: wide ? 35 : 16 },
          { x: 0, duration: 0.38, stagger: 0.08 },
          0.44,
        );
      });

      return () => motion.revert();
    });
  }, [reducedMotion]);

  return <div ref={root} className="hero-photo-story">
    <div className="container hero-panel" ref={panel}>
      <div className="hero-panel__frame">
        <div className="hero-panel__image">{children}</div>
        <HeroStripes className="hero-stripes" color="var(--bg)" drift={36} />
      </div>
    </div>
    <div ref={floating} className="hero-photo-story__floating" aria-hidden="true">{floatingPhoto}</div>
    <div className="container hero-photo-story__gallery">
      <ul
        ref={strip}
        className="hero-photo-story__strip" data-horizontal-scroll
        tabIndex={0}
        aria-label={label}
        onScroll={(event) => root.current?.toggleAttribute("data-row-scrolled", event.currentTarget.scrollLeft > 1)}
      >
        {photoStrip}
      </ul>
    </div>
  </div>;
}
