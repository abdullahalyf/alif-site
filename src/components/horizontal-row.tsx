"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "./arrows";
import { Button } from "./button";
import { horizontalContent } from "@/content/site";
import { StaggerIn } from "./motion/StaggerIn";

export function HorizontalRow({ children, className, label, labelledBy, progressLabel = horizontalContent.progress, as = "div" }: {
  children: ReactNode;
  className: string;
  label?: string;
  labelledBy?: string;
  progressLabel?: string;
  as?: "div" | "ul";
}) {
  const id = useId();
  const group = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLElement>(null);
  const scrubber = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const area = row.current;
    const root = group.current;
    const range = scrubber.current;
    if (!area || !root || !range) return;

    function sync() {
      if (!area || !root || !range) return;
      const max = area.scrollWidth - area.clientWidth;
      root.toggleAttribute("data-can-go-back", area.scrollLeft > 2);
      root.toggleAttribute("data-can-go-forward", area.scrollLeft < max - 2);
      range.hidden = max <= 2;
      range.value = max > 2 ? String(area.scrollLeft / max * 100) : "0";
    }

    const resize = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(sync);
    resize?.observe(area);
    area.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => {
      resize?.disconnect();
      area.removeEventListener("scroll", sync);
    };
  }, []);

  function move(direction: number) {
    const area = row.current;
    if (!area) return;
    const first = area.firstElementChild;
    const second = first?.nextElementSibling;
    const distance = first && second
      ? second.getBoundingClientRect().left - first.getBoundingClientRect().left
      : area.clientWidth;
    area.scrollLeft += direction * distance;
  }

  return <div className="horizontal-row" ref={group}>
    <div className="horizontal-row__frame">
      <StaggerIn as={as} id={id} listRef={row} className={className} data-horizontal-scroll
        tabIndex={0} role={as === "div" ? "region" : undefined} aria-label={label} aria-labelledby={labelledBy}>
        {children}
      </StaggerIn>
    </div>
    <div className="horizontal-row__controls">
      <input ref={scrubber} className="horizontal-row__progress" type="range" min={0} max={100}
        defaultValue={0} aria-label={progressLabel} aria-controls={id} hidden onInput={(event) => {
          const area = row.current;
          if (area) area.scrollLeft = event.currentTarget.valueAsNumber / 100 * (area.scrollWidth - area.clientWidth);
        }} />
      <Button className="horizontal-row__back" variant="secondary" onClick={() => move(-1)} aria-label={horizontalContent.previous} aria-controls={id}><ArrowLeft /></Button>
      <Button className="horizontal-row__forward" variant="secondary" onClick={() => move(1)} aria-label={horizontalContent.next} aria-controls={id}><ArrowRight /></Button>
    </div>
  </div>;
}
