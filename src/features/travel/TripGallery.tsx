"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight } from "@/components/arrows";
import { travelContent as c } from "@/content/travel";
import type { Trip } from "@/content/schemas/travel";

export function TripGallery({ trip }: { trip: Trip }) {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const id = useId();
  const open = active !== null;
  const photo = trip.photos[active ?? 0];
  useEffect(() => {
    const modal = dialog.current;
    if (!open || !modal) return;
    opener.current = document.activeElement as HTMLElement;
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    modal.showModal();
    return () => { modal.close(); document.documentElement.style.overflow = overflow; opener.current?.focus(); };
  }, [open]);
  const move = (direction: number) => setActive(index => ((index ?? 0) + direction + trip.photos.length) % trip.photos.length);
  function keyboard(event: KeyboardEvent<HTMLDialogElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") setActive(0);
    else if (event.key === "End") setActive(trip.photos.length - 1);
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
  return <section className="trip-gallery-section" aria-labelledby={`${id}-gallery`}>
    <h2 id={`${id}-gallery`}>{c.galleryTitle}</h2>
    <p className="travel-label">{c.galleryHint}</p>
    <div className="trip-gallery">{trip.photos.map((image, index) => <figure key={image.src}>
      <a href={image.src} aria-label={c.openPhoto(index + 1, trip.place)} onClick={event => { event.preventDefault(); setActive(index); }}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(min-width: 900px) 45vw, 90vw" unoptimized loading="lazy" /></a>
      <figcaption>{image.caption}</figcaption>
    </figure>)}</div>
    <dialog ref={dialog} className="trip-lightbox" aria-labelledby={`${id}-lightbox`} onKeyDown={keyboard} onCancel={event => { event.preventDefault(); setActive(null); }} onClick={event => { if (event.target === event.currentTarget) setActive(null); }}>
      <div className="trip-lightbox-header"><h3 id={`${id}-lightbox`}>{trip.place}</h3><button type="button" onClick={() => setActive(null)} autoFocus>{c.closeGallery}</button></div>
      <div className="trip-lightbox-photo" onPointerDown={swipeStart} onPointerUp={swipeEnd} onPointerCancel={() => { touch.current = null; }}><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="90vw" unoptimized loading="lazy" /></div>
      <p className="trip-lightbox-caption" aria-live="polite">{photo.caption} · {(active ?? 0) + 1} / {trip.photos.length}</p>
      <div className="trip-lightbox-controls"><button type="button" disabled={trip.photos.length < 2} aria-label={c.previousPhoto} onClick={() => move(-1)}><ArrowLeft /></button><p>{c.lightboxHint}</p><button type="button" disabled={trip.photos.length < 2} aria-label={c.nextPhoto} onClick={() => move(1)}><ArrowRight /></button></div>
    </dialog>
  </section>;
}
