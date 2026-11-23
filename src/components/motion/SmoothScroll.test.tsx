import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockMatchMedia } from "@/lib/test-match-media";

const lenisMocks = vi.hoisted(() => ({
  constructor: vi.fn(),
  instances: [] as unknown[],
}));

vi.mock("lenis", () => {
  class Lenis {
    raf = vi.fn();
    destroy = vi.fn();
    on = vi.fn();
    off = vi.fn();
    scrollTo = vi.fn();

    constructor(options?: unknown) {
      lenisMocks.constructor(options);
      lenisMocks.instances.push(this);
    }
  }
  return { default: Lenis };
});

vi.mock("@/lib/gsap", () => ({
  getGsap: () => ({ from: vi.fn(), fromTo: vi.fn(), ticker: { add: vi.fn() } }),
  syncWithLenis: vi.fn(() => () => {}),
}));

import { SmoothScroll } from "./SmoothScroll";

beforeEach(() => {
  lenisMocks.constructor.mockClear();
  lenisMocks.instances.length = 0;
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("SmoothScroll", () => {
  it("renders its children", () => {
    mockMatchMedia(false);
    render(
      <SmoothScroll>
        <p>Page content</p>
      </SmoothScroll>,
    );
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("creates a Lenis instance when motion is allowed", async () => {
    mockMatchMedia(false);
    render(
      <SmoothScroll>
        <p>Page content</p>
      </SmoothScroll>,
    );
    await waitFor(() => expect(lenisMocks.constructor).toHaveBeenCalledTimes(1));
  });

  it("does nothing under reduced motion", () => {
    mockMatchMedia(true);
    render(
      <SmoothScroll>
        <p>Page content</p>
      </SmoothScroll>,
    );
    expect(lenisMocks.constructor).not.toHaveBeenCalled();
    expect(lenisMocks.instances).toHaveLength(0);
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });
});
