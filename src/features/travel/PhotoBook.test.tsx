import type { ReactNode } from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { PhotoBook } from "./PhotoBook";
import { TravelTeaser } from "./TravelTeaser";
import { trips, travelContent as c } from "@/content/travel";

const mocks = vi.hoisted(() => ({ reduced: false, desktop: false, getGsap: vi.fn(), revert: vi.fn(), timeline: vi.fn() }));
vi.mock("@/lib/gsap", () => ({ getGsap: mocks.getGsap }));
vi.mock("@/lib/use-reduced-motion", () => ({ useReducedMotion: () => mocks.reduced }));
vi.mock("@/components/motion", () => ({ useSmoothScroll: () => null, PhotoReveal: ({ children, className }: { children: ReactNode; className?: string }) => <div className={className}>{children}</div> }));
beforeEach(() => {
  mocks.reduced = false; mocks.desktop = false; vi.clearAllMocks();
  vi.stubGlobal("matchMedia", () => ({ matches: mocks.desktop, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  vi.stubGlobal("requestAnimationFrame", vi.fn(() => 1));
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  HTMLElement.prototype.scrollTo = vi.fn();
  const timeline = { to: vi.fn().mockReturnThis(), fromTo: vi.fn().mockReturnThis(), scrollTrigger: { start: 100, end: 8100, update: vi.fn() } };
  mocks.timeline.mockReturnValue(timeline);
  mocks.getGsap.mockReturnValue({ timeline: mocks.timeline, context: (callback: () => void) => { callback(); return { revert: mocks.revert }; } });
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

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
  expect(container.querySelector(".travel-book")).toHaveAttribute("data-layout", "snap");
  expect(mocks.getGsap).not.toHaveBeenCalled();
});
it("supports arrow keys, Home/End and bounded previous/next controls", () => {
  render(<PhotoBook />);
  const book = screen.getByRole("region", { name: c.bookLabel });
  book.focus();
  fireEvent.keyDown(book, { key: "ArrowRight" });
  expect(screen.getByText("02 / 08")).toBeInTheDocument();
  expect(screen.getByRole("progressbar", { name: c.progress })).toHaveAttribute("aria-valuenow", "2");
  fireEvent.keyDown(book, { key: "End" });
  expect(screen.getByText("08 / 08")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: c.next })).toBeDisabled();
  fireEvent.keyDown(book, { key: "ArrowRight" });
  expect(screen.getByText("08 / 08")).toBeInTheDocument();
  fireEvent.keyDown(book, { key: "Home" });
  fireEvent.keyDown(book, { key: "ArrowLeft" });
  expect(screen.getByText("01 / 08")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: c.previous })).toBeDisabled();
});
it("creates a scoped scrubbed pin on eligible desktops and reverts it on unmount", () => {
  mocks.desktop = true;
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(8000);
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(1000);
  const { unmount, container } = render(<PhotoBook />);
  expect(container.querySelector(".travel-book")).toHaveAttribute("data-layout", "pinned");
  expect(mocks.timeline).toHaveBeenCalledWith(expect.objectContaining({ scrollTrigger: expect.objectContaining({ pin: true, scrub: true }) }));
  unmount(); expect(mocks.revert).toHaveBeenCalledOnce();
});
it("provides an unwired teaser for exactly the three latest journeys", () => {
  render(<TravelTeaser />);
  const latest = [...trips].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  for (const trip of latest) expect(screen.getByRole("heading", { name: trip.title })).toBeInTheDocument();
  expect(screen.getAllByRole("img")).toHaveLength(3);
  expect(screen.getByRole("link", { name: c.allTravels })).toHaveAttribute("href", c.path);
});
