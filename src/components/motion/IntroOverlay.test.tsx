import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockMatchMedia } from "@/lib/test-match-media";
import { greetingIntro } from "@/content/site";
import { INTRO_DURATION, IntroOverlay } from "./IntroOverlay";

beforeEach(() => { vi.spyOn(performance, "now").mockReturnValue(0); });
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  sessionStorage.clear();
  document.documentElement.removeAttribute("data-intro-pending");
});
const pending = () => document.documentElement.setAttribute("data-intro-pending", "");

describe("IntroOverlay", () => {
  it("shows the sequence in order and stays within the 1.6s budget", async () => {
    mockMatchMedia(false);
    pending();
    const { container } = render(<IntroOverlay />);
    await screen.findByText("Hello");
    expect(Array.from(container.querySelectorAll("text"), (element) => element.textContent)).toEqual(greetingIntro.map(({ word }) => word));
    expect(INTRO_DURATION).toBeLessThanOrEqual(1600);
  });

  it.each(["Escape", "click"])("can be skipped with %s", async (method) => {
    mockMatchMedia(false);
    pending();
    const { container } = render(<IntroOverlay />);
    await screen.findByText("Hello");
    if (method === "Escape") fireEvent.keyDown(window, { key: "Escape" });
    else fireEvent.click(container.querySelector("[data-intro]")!);
    expect(screen.queryByText("Hello")).toBeNull();
  });

  it("does not play when the visit did not start on Home", async () => {
    mockMatchMedia(false);
    render(<IntroOverlay />);
    await waitFor(() => expect(screen.queryByText("Hello")).toBeNull());
  });

  it("ships in server markup so CSS can play it before hydration, and skips under reduced motion", async () => {
    mockMatchMedia(true);
    expect(renderToStaticMarkup(<IntroOverlay />)).toContain("Hello");
    render(<IntroOverlay />);
    await waitFor(() => expect(screen.queryByText("Hello")).toBeNull());
  });
});
