import { cleanup, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, expect, it, vi } from "vitest";
import { mockMatchMedia } from "@/lib/test-match-media";
import { BackgroundShift } from "./BackgroundShift";

const { fromTo, revert } = vi.hoisted(() => ({ fromTo: vi.fn(), revert: vi.fn() }));
vi.mock("@/lib/gsap", () => ({
  getGsap: () => ({ fromTo, context: (setup: () => void) => { setup(); return { revert }; } }),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

it("animates only the section backdrop and restores it on unmount", () => {
  mockMatchMedia(false);
  const { container, unmount } = render(<BackgroundShift><p>Section</p></BackgroundShift>);
  expect(screen.getByText("Section")).toBeInTheDocument();
  const panel = container.querySelector(".night-section__panel");
  expect(panel).toHaveAttribute("aria-hidden", "true");
  expect(fromTo).toHaveBeenCalledWith(panel, expect.objectContaining({ scaleX: expect.any(Number) }), expect.objectContaining({ scaleX: 1 }));
  unmount();
  expect(revert).toHaveBeenCalled();
});

it("renders a static panel under reduced motion and without hydration", () => {
  mockMatchMedia(true);
  const element = <BackgroundShift><p>Section</p></BackgroundShift>;
  render(element);
  expect(fromTo).not.toHaveBeenCalled();
  const html = renderToStaticMarkup(element);
  expect(html).toContain("night-section__panel");
  expect(html).toContain("<p>Section</p>");
  expect(html).not.toContain('style="');
});
