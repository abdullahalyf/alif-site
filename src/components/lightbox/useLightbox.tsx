"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "@/components/arrows";
import "@/features/travel/lightbox.css";

export type LightboxImage = { src: string; width: number; height: number; alt: string; caption?: string };
export type LightboxLabels = { close: string; previous: string; next: string; hint: string };

export function useLightbox(images: LightboxImage[], title: string, labels: LightboxLabels): { show: (index: number) => void; dialog: ReactNode } {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const id = useId();
  const open = active !== null;
  const image = images[active ?? 0];

  useEffect(() => {
    const modal = dialog.current;
    if (!open || !modal) return;
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    modal.showModal();
    return () => { modal.close(); document.documentElement.style.overflow = overflow; opener.current?.focus(); };
  }, [open]);

  const move = (direction: number) => setActive((index) => ((index ?? 0) + direction + images.length) % images.length);
  function keyboard(event: KeyboardEvent<HTMLDialogElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") setActive(0);
    else if (event.key === "End") setActive(images.length - 1);
    else move(event.key === "ArrowRight" ? 1 : -1);
  }
  function swipeStart(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") touch.current = { x: event.clientX, y: event.clientY };
  }
  function swipeEnd(event: PointerEvent<HTMLDivElement>) {
    const start = touch.current; touch.current = null;
    if (!start) return;
    const delta = event.clientX - start.x;
    if (Math.abs(delta) > 50 && Math.abs(delta) > Math.abs(event.clientY - start.y)) move(delta < 0 ? 1 : -1);
  }

  return {
    show: (index) => { opener.current = document.activeElement as HTMLElement; setActive(index); },
    dialog: open && <dialog ref={dialog} className="trip-lightbox" aria-labelledby={`${id}-title`} onKeyDown={keyboard} onCancel={(event) => { event.preventDefault(); setActive(null); }} onClick={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
      <div className="trip-lightbox-header"><h3 id={`${id}-title`}>{title}</h3><button type="button" onClick={() => setActive(null)} autoFocus>{labels.close}</button></div>
      <div className="trip-lightbox-photo" onPointerDown={swipeStart} onPointerUp={swipeEnd} onPointerCancel={() => { touch.current = null; }}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="90vw" /></div>
      <p className="trip-lightbox-caption" aria-live="polite">{image.caption ? `${image.caption} · ` : ""}{(active ?? 0) + 1} / {images.length}</p>
      <div className="trip-lightbox-controls"><button type="button" disabled={images.length < 2} aria-label={labels.previous} onClick={() => move(-1)}><ArrowLeft /></button><p>{labels.hint}</p><button type="button" disabled={images.length < 2} aria-label={labels.next} onClick={() => move(1)}><ArrowRight /></button></div>
    </dialog>,
  };
}
