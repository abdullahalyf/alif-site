"use client";

import { useEffect, useState } from "react";

export const HIDE_THRESHOLD = 80;

/**
 * Tracks the scroll direction for a sticky header: `hidden` is `true` once the
 * page has scrolled down past {@link HIDE_THRESHOLD} pixels, and `false` as
 * soon as the user scrolls back up.
 *
 * The value is `false` on the server and on the first client render, so the
 * header is never hidden before the user has actually scrolled.
 */
export function useHideOnScroll(threshold: number = HIDE_THRESHOLD): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let previous = window.scrollY;

    const scroll = () => {
      const current = window.scrollY;
      if (current > threshold && current > previous) {
        setHidden(true);
      } else if (current < previous) {
        setHidden(false);
      }
      previous = current;
    };

    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, [threshold]);

  return hidden;
}
