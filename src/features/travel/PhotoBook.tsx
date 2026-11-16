"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { getGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useSmoothScroll } from "@/components/motion";
import { trips as defaultTrips, travelContent as c } from "@/content/travel";
import type { Trip } from "@/content/schemas/travel";
import { DESKTOP_BOOK_QUERY, formatTripDate, frameRotation, pageIndex } from "./book";
import "./travel.css";

type PinNavigation = { target: (index: number) => number; update: () => void };

export function PhotoBook({ trips = defaultTrips }: { trips?: Trip[] }) {
  const id = useId();
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pin = useRef<PinNavigation | null>(null);
  const active = useRef(0);
  const [current, setCurrent] = useState(0);
  const reducedMotion = useReducedMotion();
  const lenis = useSmoothScroll();

  function updateCurrent(index: number, progress = (index + 1) / trips.length) {
    active.current = index;
    setCurrent(index);
    root.current?.style.setProperty("--book-progress", String(progress));
  }

  useEffect(() => {
    const element = root.current;
    const view = viewport.current;
    const row = track.current;
    const pinned = stage.current;
    if (!element || !view || !row || !pinned || !trips.length) return;
    const media = window.matchMedia(DESKTOP_BOOK_QUERY);
    let context: ReturnType<ReturnType<typeof getGsap>["context"]> | undefined;
    let frame = 0;

    const configure = () => {
      context?.revert();
      context = undefined;
      pin.current = null;
      element.dataset.layout = "snap";
      view.scrollLeft = 0;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => updateCurrent(0));
      if (reducedMotion || !media.matches || trips.length < 2) return;

      element.dataset.layout = "pinned";
      const distance = () => Math.max(0, row.scrollWidth - view.clientWidth);
      if (!distance()) { element.dataset.layout = "snap"; return; }
      const gsap = getGsap();
      context = gsap.context(() => {
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: pinned,
          start: "top 96px",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (trips.length - 1));
            updateCurrent(index, (1 + self.progress * (trips.length - 1)) / trips.length);
          },
        } });
        timeline.to(row, { x: () => -distance(), ease: "none", duration: 1 }, 0);
        Array.from(row.children).forEach((page, index) => {
          if (!index) return;
          const position = (index - 0.85) / (trips.length - 1);
          const duration = 0.55 / (trips.length - 1);
          timeline.fromTo(page.querySelectorAll("img"), { filter: "blur(8px) saturate(0.5)" }, { filter: "blur(0px) saturate(1)", duration, ease: "none" }, position);
          for (const frame of page.querySelectorAll<HTMLElement>("[data-rotation]")) {
            timeline.fromTo(frame, { rotation: 0 }, { rotation: Number(frame.dataset.rotation), duration, ease: "none" }, position);
          }
          timeline.fromTo(page.querySelectorAll("[data-book-caption] > *"), { y: 18 }, { y: 0, duration: duration / 2, stagger: duration / 10, ease: "none" }, position);
        });
        const trigger = timeline.scrollTrigger;
        if (trigger) pin.current = {
          target: (index) => trigger.start + (trigger.end - trigger.start) * index / (trips.length - 1),
          update: () => trigger.update(),
        };
      }, pinned);
    };
    configure();
    media.addEventListener("change", configure);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", configure);
      context?.revert();
      pin.current = null;
      delete element.dataset.layout;
      element.style.removeProperty("--book-progress");
    };
    // The collection is content data; a changed collection resets its scroll scene.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, trips]);

  function navigate(index: number) {
    const next = pageIndex(index, trips.length);
    if (pin.current) {
      const destination = pin.current.target(next);
      if (lenis) lenis.scrollTo(destination, { immediate: true });
      else window.scrollTo({ top: destination, behavior: "instant" });
      pin.current.update();
    } else {
      const page = track.current?.children[next] as HTMLElement | undefined;
      viewport.current?.scrollTo({ left: page?.offsetLeft ?? 0, behavior: "instant" });
    }
    updateCurrent(next);
  }
  function keyboard(event: KeyboardEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("a,button,input,textarea,select")) return;
    const index = event.key === "ArrowRight" ? active.current + 1 : event.key === "ArrowLeft" ? active.current - 1 : event.key === "Home" ? 0 : event.key === "End" ? trips.length - 1 : undefined;
    if (index === undefined) return;
    event.preventDefault();
    navigate(index);
  }
  function scroll() {
    if (pin.current || !viewport.current || !track.current) return;
    const position = viewport.current.scrollLeft;
    const pages = Array.from(track.current.children) as HTMLElement[];
    const nearest = pages.reduce((best, page, index) => Math.abs(page.offsetLeft - position) < Math.abs(pages[best].offsetLeft - position) ? index : best, 0);
    updateCurrent(nearest);
  }
  if (!trips.length) return null;
  return <section ref={root} className="travel-book" aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`}>{c.bookTitle}</h2>
    <div ref={stage} className="travel-book-stage">
      <p id={`${id}-hint`} className="travel-book-hint"><span className="book-hint-list">{c.listHint}</span><span className="book-hint-snap">{c.swipeHint}</span><span className="book-hint-pinned">{c.desktopHint}</span></p>
      <div ref={viewport} className="travel-book-viewport" tabIndex={0} role="region" aria-label={c.bookLabel} aria-describedby={`${id}-hint`} onKeyDown={keyboard} onScroll={scroll}>
        <div ref={track} className="travel-book-track">
          {trips.map((trip, index) => <article className="travel-book-page" key={trip.slug} aria-labelledby={`${id}-${trip.slug}`}>
            <div className={`travel-photo-grid travel-photo-grid--${trip.photos.length}`}>
              {trip.photos.map((photo, photoIndex) => {
                const rotation = frameRotation(trip.slug, photoIndex);
                return <figure className="travel-frame" key={photo.src} data-rotation={rotation} style={{ "--frame-tilt": `${rotation}deg` } as CSSProperties}>
                  <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 900px) 30vw, 80vw" unoptimized loading={index === 0 ? "eager" : "lazy"} />
                  <figcaption>{photo.caption}</figcaption>
                </figure>;
              })}
            </div>
            <div className="travel-book-text" data-book-caption>
              <p className="travel-label">{trip.place} · <time dateTime={trip.date}>{formatTripDate(trip.date)}</time></p>
              <h3 id={`${id}-${trip.slug}`}>{trip.title}</h3>
              <p>{trip.story}</p>
              {trip.people && <p className="travel-people"><span>{c.peopleLabel}</span>{trip.people}</p>}
              <ul className="travel-tags">{trip.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </div>
          </article>)}
        </div>
      </div>
      <div className="travel-book-controls">
        <button type="button" onClick={() => navigate(active.current - 1)} disabled={current === 0} aria-label={c.previous}>←</button>
        <div className="travel-book-progress" role="progressbar" aria-label={c.progress} aria-valuemin={1} aria-valuemax={trips.length} aria-valuenow={current + 1}><span /></div>
        <span className="travel-book-counter" aria-live="polite" aria-atomic="true">{String(current + 1).padStart(2, "0")} / {String(trips.length).padStart(2, "0")}</span>
        <button type="button" onClick={() => navigate(active.current + 1)} disabled={current === trips.length - 1} aria-label={c.next}>→</button>
      </div>
    </div>
  </section>;
}
