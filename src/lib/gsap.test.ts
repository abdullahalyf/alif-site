import { afterEach, describe, expect, it, vi } from "vitest";
import { mockMatchMedia } from "./test-match-media";

const gsapMocks = vi.hoisted(() => ({
  registerPlugin: vi.fn(),
  tickerAdd: vi.fn(),
  tickerRemove: vi.fn(),
  lagSmoothing: vi.fn(),
  scrollUpdate: vi.fn(),
  refresh: vi.fn(),
  killAll: vi.fn(),
}));

vi.mock("gsap", () => ({
  gsap: {
    registerPlugin: gsapMocks.registerPlugin,
    ticker: {
      add: gsapMocks.tickerAdd,
      remove: gsapMocks.tickerRemove,
      lagSmoothing: gsapMocks.lagSmoothing,
    },
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    update: gsapMocks.scrollUpdate,
    refresh: gsapMocks.refresh,
    killAll: gsapMocks.killAll,
  },
}));

import { getGsap, syncWithLenis } from "./gsap";

afterEach(() => {
  vi.clearAllMocks();
});

function createLenis() {
  const listeners = new Map<string, () => void>();
  return {
    raf: vi.fn(),
    on: vi.fn((event: string, cb: () => void) => listeners.set(event, cb)),
    off: vi.fn((event: string) => listeners.delete(event)),
    emit: (event: string) => listeners.get(event)?.(),
    listeners,
  };
}

describe("getGsap", () => {
  it("registers ScrollTrigger only once", () => {
    mockMatchMedia(false);
    getGsap();
    getGsap();
    getGsap();
    expect(gsapMocks.registerPlugin).toHaveBeenCalledTimes(1);
  });
});

describe("syncWithLenis", () => {
  it("drives Lenis from the GSAP ticker and keeps ScrollTrigger in sync", () => {
    mockMatchMedia(false);
    const lenis = createLenis();

    syncWithLenis(lenis as never);

    expect(gsapMocks.tickerAdd).toHaveBeenCalledTimes(1);
    expect(lenis.on).toHaveBeenCalledWith("scroll", expect.any(Function));

    gsapMocks.scrollUpdate.mockClear();
    lenis.emit("scroll");
    expect(gsapMocks.scrollUpdate).toHaveBeenCalled();
  });

  it("removes its listeners and kills ScrollTriggers on cleanup", () => {
    mockMatchMedia(false);
    const lenis = createLenis();

    const cleanup = syncWithLenis(lenis as never);
    cleanup();

    expect(lenis.off).toHaveBeenCalledWith("scroll", expect.any(Function));
    expect(gsapMocks.tickerRemove).toHaveBeenCalledTimes(1);
    expect(gsapMocks.killAll).toHaveBeenCalledTimes(1);
  });
});
