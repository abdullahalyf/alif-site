"use client";

import { useRef, type ReactNode } from "react";
import { workContent } from "@/content/site";
import { Button } from "@/components/button";

export function WorkCarousel({ children }: { children: ReactNode }) {
  const row = useRef<HTMLUListElement>(null);
  function move(direction: number) {
    const element = row.current;
    if (element) element.scrollLeft += direction * (element.firstElementChild?.getBoundingClientRect().width || element.clientWidth);
  }
  return <>
    <div className="carousel-controls">
      <Button variant="secondary" onClick={() => move(-1)} aria-label={workContent.previous} aria-controls="selected-projects"><span aria-hidden="true">←</span></Button>
      <Button variant="secondary" onClick={() => move(1)} aria-label={workContent.next} aria-controls="selected-projects"><span aria-hidden="true">→</span></Button>
    </div>
    <noscript><style>{`.carousel-controls { display: none; }`}</style></noscript>
    <ul ref={row} id="selected-projects" className="project-carousel" tabIndex={0} aria-label={workContent.carouselLabel}>{children}</ul>
  </>;
}
