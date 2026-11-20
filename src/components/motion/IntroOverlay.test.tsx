import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { mockMatchMedia } from "@/lib/test-match-media";
import { greetingIntro } from "@/content/site";
import { INTRO_DURATION, IntroOverlay } from "./IntroOverlay";

afterEach(() => { cleanup(); sessionStorage.clear(); });

describe("IntroOverlay", () => {
  it("shows the sequence in order and stays within the 1.6s budget", async () => {
    mockMatchMedia(false);
    const { container } = render(<IntroOverlay />);
    await screen.findByText("Hello");
    expect(Array.from(container.querySelectorAll("text"), (element) => element.textContent)).toEqual(greetingIntro.map(({ word }) => word));
    expect(INTRO_DURATION).toBeLessThanOrEqual(1600);
  });

  it.each(["Escape", "click"])("can be skipped with %s", async (method) => {
    mockMatchMedia(false);
    const { container } = render(<IntroOverlay />);
    await screen.findByText("Hello");
    if (method === "Escape") fireEvent.keyDown(window, { key: "Escape" });
    else fireEvent.click(container.querySelector("[data-intro]")!);
    expect(screen.queryByText("Hello")).toBeNull();
  });

  it("skips the overlay under reduced motion and in server markup", async () => {
    mockMatchMedia(true);
    expect(renderToStaticMarkup(<IntroOverlay />)).toBe("");
    render(<IntroOverlay />);
    await waitFor(() => expect(screen.queryByText("Hello")).toBeNull());
  });
});
