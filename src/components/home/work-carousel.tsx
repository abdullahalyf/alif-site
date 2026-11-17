"use client";

import { ArrowLeft, ArrowRight } from "@/components/arrows";
import { useRef, type ReactNode } from "react";
import { workContent } from "@/content/site";
import { Button } from "@/components/button";
import { StaggerIn } from "@/components/motion";

export function WorkCarousel({ children }: { children: ReactNode }) {
  const row = useRef<HTMLUListElement>(null);
  function move(direction: number) {
    const element = row.current;
    if (element) element.scrollLeft += direction * (element.firstElementChild?.getBoundingClientRect().width || element.clientWidth);
  }
  return <>
    <div className="carousel-controls">
      <Button variant="secondary" onClick={() => move(-1)} aria-label={workContent.previous} aria-controls="selected-projects"><ArrowLeft /></Button>
      <Button variant="secondary" onClick={() => move(1)} aria-label={workContent.next} aria-controls="selected-projects"><ArrowRight /></Button>
    </div>
    <noscript><style>{`.carousel-controls { display: none; }`}</style></noscript>
    <StaggerIn
      as="ul"
      id="selected-projects"
      className="project-carousel"
      distance={64}
      start="top 90%"
      listRef={row}
      tabIndex={0}
      aria-label={workContent.carouselLabel}
    >
      {children}
    </StaggerIn>
  </>;
}
