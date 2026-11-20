"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type HoverPreviewProps = {
  /** Image shown in the floating preview. */
  src: string;
  /** Alternative text for the preview image. */
  alt: string;
  /** Intrinsic width of the preview image, in pixels. */
  width: number;
  /** Intrinsic height of the preview image, in pixels. */
  height: number;
  /** Rendered width of the preview on screen, in pixels. */
  size?: number;
  /** Offset of the preview from the cursor, in pixels. */
  offset?: number;
  /** The row (or other element) the preview appears when hovering. */
  children: React.ReactNode;
  className?: string;
};

type Position = { x: number; y: number };

/**
 * A floating image that follows the cursor while the pointer is over the
 * wrapped row (DESIGN.md animation 8).
 *
 * The preview only appears on devices with a fine pointer — on touch devices
 * no listeners are installed and nothing is rendered. Under
 * `prefers-reduced-motion: reduce` it still appears, but it sits at the
 * pointer instead of trailing it.
 *
 * The row itself is never hidden: the preview is a separate fixed-position
 * element, so the list stays fully readable without JavaScript.
 */
export function HoverPreview({
  src,
  alt,
  width,
  height,
  size = 320,
  offset = 24,
  children,
  className,
}: HoverPreviewProps) {
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    const row = rowRef.current;
    if (!row) return;

    let overRow = false;
    const move = (event: PointerEvent) => {
      if (!overRow) return;
      const previewHeight = size * height / width;
      setPosition({
        x: Math.max(8, Math.min(event.clientX + offset, window.innerWidth - size - 8)),
        y: Math.max(8, Math.min(event.clientY + offset, window.innerHeight - previewHeight - 8)),
      });
    };

    const enter = (event: PointerEvent) => {
      overRow = true;
      if (typeof event.clientX === "number") move(event);
      setActive(true);
    };
    const leave = () => {
      overRow = false;
      setActive(false);
    };

    row.addEventListener("pointerenter", enter);
    row.addEventListener("pointerleave", leave);
    window.addEventListener("pointermove", move, { passive: true });

    return () => {
      row.removeEventListener("pointerenter", enter);
      row.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointermove", move);
    };
  }, [height, offset, size, width]);

  return (
    <>
      <div ref={rowRef} className={className}>
        {children}
      </div>
      {active && (
        <div
          className="hover-preview"
          aria-hidden="true"
          data-hover-preview="active"
          style={{
            position: "fixed",
            left: position.x,
            top: position.y,
            width: size,
            pointerEvents: "none",
            zIndex: 30,
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={`${size}px`}
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </div>
      )}
    </>
  );
}
