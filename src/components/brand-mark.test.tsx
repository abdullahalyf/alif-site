import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BrandMark } from "./brand-mark";
import { site } from "@/content/site";

const pathname = { value: "/work" };
const scrollTo = vi.fn();

vi.mock("next/navigation", () => ({ usePathname: () => pathname.value }));
vi.mock("@/components/motion", () => ({
  useSmoothScroll: () => ({ scrollTo }),
}));

beforeEach(() => {
  pathname.value = "/work";
  scrollTo.mockClear();
  vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("BrandMark", () => {
  it("shows the monogram initial and the wordmark", () => {
    render(<BrandMark />);

    expect(screen.getByText(site.logoInitial)).toBeInTheDocument();
    expect(screen.getByText(site.logoText)).toBeInTheDocument();
  });

  it("links home", () => {
    render(<BrandMark />);

    expect(screen.getByRole("link", { name: site.logoText })).toHaveAttribute("href", "/");
  });

  it("navigates home normally on other pages", () => {
    render(<BrandMark />);

    const link = screen.getByRole("link", { name: site.logoText });
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    link.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("smooth-scrolls to the top on the home page", () => {
    pathname.value = "/";
    render(<BrandMark />);

    const link = screen.getByRole("link", { name: site.logoText });
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    link.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(scrollTo).toHaveBeenCalledWith(0, expect.objectContaining({ duration: expect.any(Number) }));
  });
});
