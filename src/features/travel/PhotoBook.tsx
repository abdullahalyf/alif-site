"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@/components/arrows";
import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent, type KeyboardEvent } from "react";
import { trips as defaultTrips, travelContent as c } from "@/content/travel";
import type { Trip } from "@/content/schemas/travel";
import { formatTripDate, frameRotation, pageIndex } from "./book";
import { JourneyAtmosphere } from "./JourneyAtmosphere";
import { getGsap } from "@/lib/gsap";
import { prefersReducedMotion, useReducedMotion } from "@/lib/use-reduced-motion";
import { RouteMap } from "./map/RouteMap";
import "./travel.css";

export function PhotoBook({ trips = defaultTrips }: { trips?: Trip[] }) {
  const id = useId();
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const suppressClickUntil = useRef(0);
  const active = useRef(0);
  const reduced = useReducedMotion();
  const [{ current, previous }, setSelection] = useState({ current: 0, previous: 0 });

  const updateCurrent = useCallback((index: number, progress = (index + 1) / trips.length) => {
    active.current = index;
    setSelection(selection => selection.current === index ? selection : { current: index, previous: selection.current });
    root.current?.style.setProperty("--book-progress", String(progress));
    root.current?.style.setProperty("--route-offset", String(1 - (progress * trips.length - 1) / Math.max(1, trips.length - 1)));
  }, [trips.length]);

  useEffect(() => {
    const element = root.current;
    const view = viewport.current;
    const area = stage.current;
    if (!element || !view || !area) return;
    element.dataset.layout = "snap";
    let settle: ReturnType<typeof setTimeout>;
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || !window.matchMedia("(pointer: fine)").matches) return;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? view.clientWidth : 1;
      const delta = (Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY) * unit;
      const max = view.scrollWidth - view.clientWidth;
      if (!delta || max <= 0 || (delta < 0 && view.scrollLeft <= 1) || (delta > 0 && view.scrollLeft >= max - 1)) return;
      event.preventDefault();
      event.stopPropagation();
      view.dataset.interacting = "true";
      view.scrollLeft = Math.max(0, Math.min(max, view.scrollLeft + delta));
      clearTimeout(settle);
      settle = setTimeout(() => { delete view.dataset.interacting; }, 180);
    };
    area.addEventListener("wheel", wheel, { passive: false });
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => { element.dataset.inView = String(entry.isIntersecting); });
    observer?.observe(element);
    return () => {
      clearTimeout(settle);
      observer?.disconnect();
      delete element.dataset.inView;
      area.removeEventListener("wheel", wheel);
      delete view.dataset.interacting;
      delete element.dataset.layout;
      element.style.removeProperty("--book-progress");
    };
  }, []);

  useEffect(() => {
    const page = track.current?.children[current];
    if (!page || prefersReducedMotion()) return;
    const gsap = getGsap();
    let observer: IntersectionObserver | undefined;
    const context = gsap.context(() => {
      const animation = gsap.timeline()
        .fromTo(page.querySelectorAll("img"), { filter: "blur(6px) saturate(0.5)" }, { filter: "blur(0px) saturate(1)", duration: 0.65 }, 0)
        .fromTo(page.querySelectorAll("[data-book-caption] > *"), { y: 12 }, { y: 0, duration: 0.4, stagger: 0.025 }, 0);
      if (typeof IntersectionObserver !== "undefined") {
        animation.pause();
        observer = new IntersectionObserver(([entry]) => animation.paused(!entry.isIntersecting));
        observer.observe(page);
      }
    }, page);
    return () => { observer?.disconnect(); context.revert(); };
  }, [current, reduced]);

  function navigate(index: number) {
    const next = pageIndex(index, trips.length);
    const page = track.current?.children[next] as HTMLElement | undefined;
    viewport.current?.scrollTo({ left: page?.offsetLeft ?? 0, behavior: "instant" });
    updateCurrent(next);
  }
  function dragStart(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0 || (event.target as HTMLElement).closest("a,button")) return;
    drag.current = { x: event.clientX, left: event.currentTarget.scrollLeft, moved: false };
  }
  function dragMove(event: PointerEvent<HTMLDivElement>) {
    const start = drag.current;
    if (!start) return;
    if (Math.abs(event.clientX - start.x) < 5 && !start.moved) return;
    start.moved = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.interacting = "true";
    event.currentTarget.dataset.dragging = "true";
    event.currentTarget.scrollLeft = start.left - (event.clientX - start.x);
    suppressClickUntil.current = Date.now() + 300;
  }
  function dragEnd(event: PointerEvent<HTMLDivElement>) {
    drag.current = null;
    delete event.currentTarget.dataset.interacting;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function keyboard(event: KeyboardEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("a,button,input,textarea,select")) return;
    const index = event.key === "ArrowRight" ? active.current + 1 : event.key === "ArrowLeft" ? active.current - 1 : event.key === "Home" ? 0 : event.key === "End" ? trips.length - 1 : undefined;
    if (index === undefined) return;
    event.preventDefault();
    navigate(index);
  }
  function scroll() {
    if (!viewport.current || !track.current) return;
    const position = viewport.current.scrollLeft;
    const pages = Array.from(track.current.children) as HTMLElement[];
    const nearest = pages.reduce((best, page, index) => Math.abs(page.offsetLeft - position) < Math.abs(pages[best].offsetLeft - position) ? index : best, 0);
    const max = viewport.current.scrollWidth - viewport.current.clientWidth;
    const fraction = max > 0 ? Math.max(0, Math.min(1, position / max)) : 0;
    updateCurrent(nearest, window.matchMedia("(pointer: fine)").matches ? (1 + fraction * (trips.length - 1)) / trips.length : (nearest + 1) / trips.length);
  }
  if (!trips.length) return null;
  return <section ref={root} className="travel-book" aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`}>{c.bookTitle}</h2>
    <div ref={stage} className="travel-book-stage">
      <JourneyAtmosphere trip={trips[current]} previous={trips[previous]} />
      <RouteMap trips={trips} current={current} onNavigate={index => {
        navigate(index);
        track.current?.children[index]?.querySelector("h3")?.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" });
        viewport.current?.focus({ preventScroll: true });
      }} />
      <p id={`${id}-hint`} className="travel-book-hint"><span className="book-hint-list">{c.listHint}</span><span className="book-hint-snap">{c.swipeHint}</span><span className="book-hint-desktop">{c.desktopHint}</span></p>
      <div ref={viewport} className="travel-book-viewport" tabIndex={0} role="region" aria-label={c.bookLabel} aria-describedby={`${id}-hint`} onKeyDown={keyboard} onScroll={scroll} onPointerDown={dragStart} onPointerMove={dragMove} onPointerUp={dragEnd} onPointerCancel={dragEnd} onLostPointerCapture={dragEnd} onDragStart={(event) => event.preventDefault()} onClickCapture={(event) => { if (Date.now() < suppressClickUntil.current) { event.preventDefault(); event.stopPropagation(); } }}>
        <div ref={track} className="travel-book-track">
          {trips.map((trip, index) => <article className="travel-book-page" id={`trip-${trip.slug}`} key={trip.slug} aria-labelledby={`${id}-${trip.slug}`}>
            <div className={`travel-photo-grid travel-photo-grid--${trip.photos.length}`}>
              {trip.photos.map((photo, photoIndex) => {
                const rotation = frameRotation(trip.slug, photoIndex);
                return <figure className="travel-frame" key={photo.src} data-rotation={rotation} style={{ "--frame-tilt": `${rotation}deg` } as CSSProperties}>
                  <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 900px) 30vw, 80vw" unoptimized={photo.src.startsWith("https://")} loading={index === 0 ? "eager" : "lazy"} />
                  <figcaption>{photo.caption}</figcaption>
                </figure>;
              })}
            </div>
            <div className="travel-book-text" data-book-caption>
              <p className="travel-label">{trip.place} · <time dateTime={trip.date}>{formatTripDate(trip.date)}</time></p>
              <h3 id={`${id}-${trip.slug}`}>{trip.title}</h3>
              <p>{trip.story}</p>
              {trip.people && <p className="travel-people"><span>{c.peopleLabel}</span>{trip.people}</p>}
              <Link className="text-link" href={c.tripHref(trip.slug)}>{c.readTrip}</Link>
              <ul className="travel-tags">{trip.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </div>
          </article>)}
        </div>
      </div>
      <div className="travel-book-controls">
        <button type="button" onClick={() => navigate(active.current - 1)} disabled={current === 0} aria-label={c.previous}><ArrowLeft /></button>
        <div className="travel-book-progress" role="progressbar" aria-label={c.progress} aria-valuemin={1} aria-valuemax={trips.length} aria-valuenow={current + 1}><span /></div>
        <span className="travel-book-counter" aria-live="polite" aria-atomic="true">{String(current + 1).padStart(2, "0")} / {String(trips.length).padStart(2, "0")}</span>
        <button type="button" onClick={() => navigate(active.current + 1)} disabled={current === trips.length - 1} aria-label={c.next}><ArrowRight /></button>
      </div>
    </div>
  </section>;
}
