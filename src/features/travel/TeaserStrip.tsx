"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function TeaserStrip({ title, progressLabel, children }: {
  title: string;
  progressLabel: string;
  children: ReactNode;
}) {
  const strip = useRef<HTMLDivElement>(null);
  const scrubber = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const area = strip.current;
    const range = scrubber.current;
    if (!area || !range) return;

    function sync() {
      if (!area || !range) return;
      const max = area.scrollWidth - area.clientWidth;
      range.hidden = max <= 0;
      range.value = max > 0 ? String(area.scrollLeft / max * 100) : "0";
    }

    const resize = new ResizeObserver(sync);
    resize.observe(area);
    area.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => {
      resize.disconnect();
      area.removeEventListener("scroll", sync);
    };
  }, []);

  return <>
    <div ref={strip} className="travel-teaser-strip" data-horizontal-scroll tabIndex={0} role="region" aria-label={title}>
      {children}
    </div>
    <input
      ref={scrubber}
      className="travel-teaser-progress"
      type="range"
      min={0}
      max={100}
      defaultValue={0}
      aria-label={progressLabel}
      hidden
      onInput={(event) => {
        const area = strip.current;
        if (area) area.scrollLeft = event.currentTarget.valueAsNumber / 100 * (area.scrollWidth - area.clientWidth);
      }}
    />
  </>;
}
