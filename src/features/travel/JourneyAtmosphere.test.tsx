import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { trips } from "@/content/travel";
import { JourneyAtmosphere } from "./JourneyAtmosphere";

const mocks = vi.hoisted(() => ({ reduced: false, gsap: vi.fn(), pause: vi.fn(), paused: vi.fn(), kill: vi.fn(), disconnect: vi.fn(), visibility: null as null | ((entries: { isIntersecting: boolean }[]) => void) }));
vi.mock("@/lib/gsap", () => ({ getGsap: mocks.gsap }));
vi.mock("@/lib/use-reduced-motion", () => ({ useReducedMotion: () => mocks.reduced, prefersReducedMotion: () => mocks.reduced }));
beforeEach(() => {
  vi.clearAllMocks(); mocks.reduced = false;
  mocks.gsap.mockReturnValue({ timeline: () => ({ fromTo: vi.fn().mockReturnThis(), pause: mocks.pause, paused: mocks.paused, kill: mocks.kill }) });
  vi.stubGlobal("IntersectionObserver", class { constructor(callback: typeof mocks.visibility) { mocks.visibility = callback; } observe() {} disconnect() { mocks.disconnect(); } });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
it("never starts an ambient animation under reduced motion and switches to the exact tint", () => {
  mocks.reduced = true;
  const { container } = render(<JourneyAtmosphere trip={trips[1]} previous={trips[0]} />);
  expect(mocks.gsap).not.toHaveBeenCalled();
  expect(container.firstChild).toHaveStyle({ backgroundColor: trips[1].color });
  expect(container.querySelector(".journey-ambient-incoming")).toHaveStyle({ opacity: "0.1" });
  expect(container.querySelector(".journey-ambient-outgoing")).toHaveStyle({ opacity: "0" });
});
it("pauses off-screen crossfades and releases animations and observers on unmount", () => {
  const { unmount } = render(<JourneyAtmosphere trip={trips[1]} previous={trips[0]} />);
  expect(mocks.pause).toHaveBeenCalledOnce();
  mocks.visibility!([{ isIntersecting: true }]); expect(mocks.paused).toHaveBeenLastCalledWith(false);
  mocks.visibility!([{ isIntersecting: false }]); expect(mocks.paused).toHaveBeenLastCalledWith(true);
  unmount(); expect(mocks.kill).toHaveBeenCalledOnce(); expect(mocks.disconnect).toHaveBeenCalledOnce();
});
