"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { getGsap } from "@/lib/gsap";
import { useReducedMotion, prefersReducedMotion } from "@/lib/use-reduced-motion";
import { demoContent } from "@/content/site";
import type { Site } from "@/content/schema";

type StoryPhotoProps = {
  chapter: Site["story"][number];
};

/**
 * A story photograph that drifts slightly as the page scrolls (Atlas-style).
 *
 * The photo sits a little larger than its frame and is moved up and down with
 * the scroll position, so the chapter feels like a spread rather than a row.
 * The server-rendered markup shows the photograph in its resting place — the
 * drift is applied by JS only, so the page reads fine without JavaScript.
 *
 * Under `prefers-reduced-motion: reduce` nothing moves and the photograph
 * stays where it was.
 */
export function StoryPhoto({ chapter }: StoryPhotoProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Read the preference here rather than from the render: the hook returns
    // the server snapshot until React swaps it for the real value.
    if (prefersReducedMotion()) return;

    const root = rootRef.current;
    const frame = frameRef.current;
    if (!root || !frame) return;

    const gsap = getGsap();
    // The drift is scrubbed against the scroll position, so the photo follows
    // the reader rather than playing once. The photograph is twelve percent
    // taller than its frame, so it can travel six percent either way without
    // showing an edge.
    const tween = gsap.to(frame, {
      yPercent: -6,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      // Undo the drift, so a tween that never ran cannot leave the photo
      // pushed up inside its frame.
      gsap.set(frame, { clearProps: "transform" });
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="story-photo-frame">
      <div ref={frameRef} className="story-photo">
        {chapter.image ? (
          <Image
            {...chapter.image}
            unoptimized={chapter.image.src.startsWith("https://picsum.photos/")}
            alt={chapter.image.alt}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="image-placeholder" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

/** The caption under a story photograph, including the demo notice. */
export function StoryCaption({ chapter }: { chapter: Site["story"][number] }) {
  return (
    <figcaption>
      <span className="label">{chapter.label}</span>
      <span>{chapter.title}</span>
      {chapter.image?.src.startsWith("https://picsum.photos/") && (
        <span className="demo-caption">{demoContent.imageNotice}</span>
      )}
    </figcaption>
  );
}
