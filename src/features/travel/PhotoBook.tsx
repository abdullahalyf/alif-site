"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@/components/arrows";
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { trips as defaultTrips, travelContent as c } from "@/content/travel";
import type { Trip } from "@/content/schemas/travel";
import { formatTripDate, frameRotation } from "./book";
import { BOOK_EDGE_TOLERANCE, connectBook } from "./book-scroll";
import { project } from "./map/geo";
import { prefersReducedMotion, useReducedMotion } from "@/lib/use-reduced-motion";
import { RouteMap } from "./map/RouteMap";
import "./travel.css";

export function PhotoBook({ trips = defaultTrips }: { trips?: Trip[] }) {
  const id = useId();
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const atmosphere = useRef<HTMLDivElement>(null);
  const blend = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const numbers = useRef<HTMLSpanElement>(null);
  const controller = useRef<ReturnType<typeof connectBook>>(null);
  const position = useRef(0);
  const initialSelection = { current: 0, atStart: true, atEnd: trips.length === 1 };
  const selection = useRef(initialSelection);
  const reduced = useReducedMotion();
  const [{ current, atStart, atEnd }, setSelection] = useState(initialSelection);

  useEffect(() => {
    const element = root.current;
    const view = viewport.current;
    const area = stage.current;
    const pages = track.current;
    const tint = atmosphere.current;
    const overlay = blend.current;
    const route = element?.querySelector<SVGPathElement>(".route-visited");
    const bar = fill.current;
    const counter = numbers.current;
    if (!element || !view || !area || !pages || !tint || !overlay || !route || !bar || !counter) return;

    const points = trips.map(project);
    const lengths = [0];
    for (let index = 1; index < points.length; index++) {
      lengths.push(lengths[index - 1] + Math.hypot(points[index].x - points[index - 1].x, points[index].y - points[index - 1].y));
    }

    const skipMotion = prefersReducedMotion();
    let tintedSegment = -1;
    let displayedTenths = -1;
    element.dataset.layout = "free";
    const hashIndex = trips.findIndex(trip => location.hash === `#trip-${trip.slug}`);
    const book = connectBook(area, view, pages, trips.length, skipMotion, hashIndex < 0 ? position.current : hashIndex, value => {
      position.current = value;
      const lower = Math.floor(value);
      const upper = Math.min(lower + 1, trips.length - 1);
      const fraction = value - lower;
      const length = lengths[lower] + (lengths[upper] - lengths[lower]) * fraction;
      bar.style.transform = `scaleX(${(value + 1) / trips.length})`;
      const nearest = Math.round(value);
      const tenths = skipMotion ? (nearest + 1) * 10 : Math.round((value + 1) * 10);
      if (tenths !== displayedTenths) {
        const whole = String(Math.floor(tenths / 10)).padStart(2, "0");
        counter.textContent = tenths % 10 ? `${whole}.${tenths % 10}` : whole;
        displayedTenths = tenths;
      }
      if (lower !== tintedSegment) {
        tint.style.setProperty("--journey-tint", trips[lower].color);
        overlay.style.setProperty("--journey-tint", trips[upper].color);
        tintedSegment = lower;
      }
      overlay.style.opacity = String(fraction);
      route.style.strokeDashoffset = String(skipMotion ? 0 : 1 - length / (lengths.at(-1) || 1));

      const atStart = value <= BOOK_EDGE_TOLERANCE;
      const atEnd = trips.length - 1 - value <= BOOK_EDGE_TOLERANCE;
      const selected = selection.current;
      if (nearest !== selected.current || atStart !== selected.atStart || atEnd !== selected.atEnd) {
        const next = { current: nearest, atStart, atEnd };
        selection.current = next;
        setSelection(next);
      }
    });
    controller.current = book;

    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => { element.dataset.inView = String(entry.isIntersecting); });
    observer?.observe(element);
    return () => {
      controller.current = null;
      book.destroy();
      observer?.disconnect();
      delete element.dataset.layout;
      delete element.dataset.inView;
    };
  }, [trips, reduced]);

  function keyboard(event: KeyboardEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("a,button,input,textarea,select")) return;
    const book = controller.current;
    if (!book) return;
    switch (event.key) {
      case "ArrowRight": book.step(1); break;
      case "ArrowLeft": book.step(-1); break;
      case "Home": book.navigate(0); break;
      case "End": book.navigate(trips.length - 1); break;
      default: return;
    }
    event.preventDefault();
  }
  if (!trips.length) return null;
  return <section ref={root} className="travel-book" aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`}>{c.bookTitle}</h2>
    <div ref={stage} className="travel-book-stage">
      <div ref={atmosphere} className="journey-atmosphere" aria-hidden="true" style={{ "--journey-tint": trips[0].color } as CSSProperties}>
        <div ref={blend} className="journey-atmosphere__tint" />
        <div className="journey-paper-grain" />
      </div>
      <RouteMap trips={trips} current={current} onNavigate={index => {
        controller.current?.navigate(index);
        viewport.current?.focus({ preventScroll: true });
        viewport.current?.scrollIntoView({ block: "start", behavior: "instant" });
      }} />
      <p id={`${id}-hint`} className="travel-book-hint"><span className="book-hint-list">{c.listHint}</span><span className="book-hint-snap">{c.swipeHint}</span><span className="book-hint-desktop">{c.desktopHint}</span></p>
      <div ref={viewport} className="travel-book-viewport" tabIndex={0} role="region" aria-label={c.bookLabel} aria-describedby={`${id}-hint`} onKeyDown={keyboard} onDragStart={event => event.preventDefault()} onFocus={event => {
        const page = (event.target as HTMLElement).closest<HTMLElement>("[data-book-page]");
        if (page && event.target.matches(":focus-visible")) controller.current?.focus(Number(page.dataset.bookPage));
      }}>
        <div ref={track} className="travel-book-track">
          {trips.map((trip, index) => <article className="travel-book-page" data-book-page={index} id={`trip-${trip.slug}`} key={trip.slug} aria-labelledby={`${id}-${trip.slug}`}>
            <div className={`travel-photo-grid travel-photo-grid--${trip.photos.length}`}>
              {trip.photos.map((photo, photoIndex) => {
                const rotation = frameRotation(trip.slug, photoIndex);
                return <figure className="travel-frame" key={photo.src} data-rotation={rotation} style={{ "--frame-tilt": `${rotation}deg` } as CSSProperties}>
                  <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 900px) 30vw, 80vw" unoptimized={photo.src.startsWith("https://")} loading={index === 0 ? "eager" : "lazy"} />
                  <figcaption>{photo.caption}</figcaption>
                </figure>;
              })}
            </div>
            <div className="travel-book-text">
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
        <button type="button" onClick={() => controller.current?.step(-1)} disabled={atStart} aria-label={c.previous}><ArrowLeft /></button>
        <div className="travel-book-progress" role="progressbar" aria-label={c.progress} aria-valuemin={1} aria-valuemax={trips.length} aria-valuenow={current + 1}><span ref={fill} style={{ transform: `scaleX(${1 / trips.length})` }} /></div>
        <span className="travel-book-counter-display" aria-hidden="true">
          <span ref={numbers} className="travel-book-counter-number">01</span>
          / {String(trips.length).padStart(2, "0")}
        </span>
        <span className="travel-book-counter sr-only" aria-live="polite" aria-atomic="true">{String(current + 1).padStart(2, "0")} / {String(trips.length).padStart(2, "0")}</span>
        <button type="button" onClick={() => controller.current?.step(1)} disabled={atEnd} aria-label={c.next}><ArrowRight /></button>
      </div>
    </div>
  </section>;
}
