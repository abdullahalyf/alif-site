import { cleanup, render, waitFor } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { mockMatchMedia } from "@/lib/test-match-media";
import { HeroStripes } from "./HeroStripes";

const { fromTo } = vi.hoisted(() => ({ fromTo: vi.fn(() => ({ kill() {} })) }));
vi.mock("@/lib/gsap", () => ({ getGsap: () => ({ fromTo, to: () => ({ kill() {} }) }) }));

afterEach(() => {
  cleanup();
  fromTo.mockClear();
});

describe("HeroStripes", () => {
  it("draws the requested number of lines", () => {
    mockMatchMedia(false);
    const { container } = render(<HeroStripes count={3} />);
    expect(container.querySelectorAll("line")).toHaveLength(3);
  });

  it("uses the default count of four lines", () => {
    mockMatchMedia(false);
    const { container } = render(<HeroStripes />);
    expect(container.querySelectorAll("line")).toHaveLength(4);
  });

  it("applies the colour and stroke width", () => {
    mockMatchMedia(false);
    const { container } = render(
      <HeroStripes color="#ff0000" strokeWidth={3} />,
    );

    const line = container.querySelector("line");
    expect(line?.getAttribute("stroke")).toBe("#ff0000");
    expect(line?.getAttribute("stroke-width")).toBe("3");
  });

  it("renders visible lines on the server, with no dash offset hiding them", () => {
    mockMatchMedia(false);
    const html = renderToStaticMarkup(<HeroStripes count={2} />);

    expect(html).toContain("<line");
    expect(html).not.toContain("stroke-dashoffset");
  });

  it("sets a dash array so the lines can be drawn in", () => {
    mockMatchMedia(false);
    const { container } = render(<HeroStripes count={2} />);

    const line = container.querySelector("line");
    expect(line?.getAttribute("stroke-dasharray")).toBeTruthy();
  });

  it("does not offset the lines under reduced motion", () => {
    mockMatchMedia(true);
    const { container } = render(<HeroStripes count={2} />);

    const line = container.querySelector("line");
    expect(line?.getAttribute("stroke-dashoffset")).toBeNull();
    expect(line?.getAttribute("style") ?? "").not.toContain("stroke-dashoffset");
  });

  it("starts the lines fully offset so they can be drawn in", async () => {
    mockMatchMedia(false);
    const { container } = render(<HeroStripes count={2} />);

    const line = container.querySelector("line");
    const dashArray = Number(line?.getAttribute("stroke-dasharray"));
    expect(dashArray).toBeGreaterThan(0);
    await waitFor(() => expect(fromTo).toHaveBeenCalledWith(
      expect.arrayContaining([line]), { strokeDashoffset: dashArray }, expect.any(Object),
    ));
  });
});
