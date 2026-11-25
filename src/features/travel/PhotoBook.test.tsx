import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { PhotoBook } from "./PhotoBook";
import { TravelTeaser } from "./TravelTeaser";
import { trips, travelStops, travelContent as c } from "@/content/travel";

const mocks = vi.hoisted(() => ({ reduced: false, desktop: false, getGsap: vi.fn(), revert: vi.fn(), timeline: vi.fn() }));
vi.mock("@/lib/gsap", () => ({ getGsap: mocks.getGsap }));
vi.mock("@/lib/use-reduced-motion", () => ({ prefersReducedMotion: () => mocks.reduced, useReducedMotion: () => mocks.reduced }));
vi.mock("@/components/motion", () => ({ useSmoothScroll: () => null }));
beforeEach(() => {
  mocks.reduced = false; mocks.desktop = false; vi.clearAllMocks();
  vi.stubGlobal("matchMedia", () => ({ matches: mocks.desktop, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  vi.stubGlobal("requestAnimationFrame", vi.fn(() => 1));
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  HTMLElement.prototype.scrollTo = vi.fn(function (this: HTMLElement, options?: ScrollToOptions | number) { this.scrollLeft = typeof options === "number" ? options : options?.left ?? 0; });
  HTMLElement.prototype.scrollIntoView = vi.fn();
  Object.defineProperty(SVGElement.prototype, "getTotalLength", { configurable: true, value: vi.fn(() => 100) });
  const timeline = { to: vi.fn().mockReturnThis(), fromTo: vi.fn().mockReturnThis(), pause: vi.fn().mockReturnThis(), paused: vi.fn().mockReturnThis(), kill: vi.fn(), scrollTrigger: { start: 100, end: 8100, update: vi.fn() } };
  mocks.timeline.mockReturnValue(timeline);
  mocks.getGsap.mockReturnValue({ timeline: mocks.timeline, context: (callback: () => void) => { callback(); return { revert: mocks.revert }; } });
});
afterEach(() => {
  cleanup();
  Reflect.deleteProperty(SVGElement.prototype, "getTotalLength");
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it("renders every article, story, caption and lazy-loads all but the first page", () => {
  render(<PhotoBook />);
  const book = screen.getByRole("region", { name: c.bookLabel });
  expect(within(book).getAllByRole("article")).toHaveLength(trips.length);
  for (const trip of trips) {
    expect(within(book).getByRole("heading", { name: trip.title })).toBeInTheDocument();
    expect(within(book).getByText(trip.story)).toBeInTheDocument();
  }
  const images = within(book).getAllByRole("img");
  images.forEach((image, index) => expect(image).toHaveAttribute("loading", index < trips[0].photos.length ? "eager" : "lazy"));
});
it("never initializes a pin under reduced motion even on a desktop pointer", () => {
  mocks.reduced = true; mocks.desktop = true;
  const { container } = render(<PhotoBook />);
  expect(container.querySelector(".travel-book-stage")).toHaveAttribute("data-book-scroll", "native");
  expect(mocks.getGsap).not.toHaveBeenCalled();
});
it("supports arrow keys, Home/End and bounded previous/next controls", () => {
  render(<PhotoBook />);
  const book = screen.getByRole("region", { name: c.bookLabel });
  book.focus();
  fireEvent.keyDown(book, { key: "ArrowRight" });
  expect(screen.getByText("02 / 03")).toBeInTheDocument();
  expect(screen.getByRole("progressbar", { name: c.progress })).toHaveAttribute("aria-valuenow", "2");
  fireEvent.keyDown(book, { key: "End" });
  expect(screen.getByText("03 / 03")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: c.next })).toBeDisabled();
  fireEvent.keyDown(book, { key: "ArrowRight" });
  expect(screen.getByText("03 / 03")).toBeInTheDocument();
  fireEvent.keyDown(book, { key: "Home" });
  fireEvent.keyDown(book, { key: "ArrowLeft" });
  expect(screen.getByText("01 / 03")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: c.previous })).toBeDisabled();
});
it("consumes wheel events only while the book can move, and passes both edges through", () => {
  mocks.desktop = true;
  mocks.reduced = true;
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(8000);
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(1000);
  const { unmount } = render(<PhotoBook />);
  const book = screen.getByRole("region", { name: c.bookLabel });
  const wheel = (deltaY: number) => {
    const event = new WheelEvent("wheel", { deltaY, bubbles: true, cancelable: true });
    book.dispatchEvent(event); return event;
  };
  expect(wheel(-100).defaultPrevented).toBe(false);
  expect(wheel(400).defaultPrevented).toBe(true);
  expect(book.scrollLeft).toBe(400);
  book.scrollLeft = 7000;
  fireEvent.scroll(book);
  expect(wheel(100).defaultPrevented).toBe(false);
  unmount();
  book.scrollLeft = 200;
  expect(wheel(100).defaultPrevented).toBe(false);
});
it("shows every travel stop in the teaser with its photo", () => {
  mocks.reduced = true;
  render(<TravelTeaser />);
  for (const stop of travelStops) expect(screen.getByRole("heading", { name: stop.title })).toBeInTheDocument();
  expect(screen.getAllByRole("img")).toHaveLength(travelStops.length);
  expect(screen.getByRole("link", { name: c.openJournal })).toHaveAttribute("href", c.path);
});

it("turns the book to a selected map pin and marks that location current", () => {
  render(<PhotoBook />);
  const pin = screen.getByRole("link", { name: c.mapPinLabel(trips[2].place) });
  fireEvent.click(pin);
  expect(screen.getByText("03 / 03")).toBeInTheDocument();
  expect(pin).toHaveAttribute("aria-current", "location");
  expect(screen.getByRole("progressbar", { name: c.progress })).toHaveAttribute("aria-valuenow", "3");
});
