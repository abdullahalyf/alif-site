import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockMatchMedia } from "@/lib/test-match-media";
import { INTRO_DURATION, IntroOverlay } from "./IntroOverlay";

const STORAGE_KEY = "alif-intro-seen";

beforeEach(() => {
  sessionStorage.clear();
});

afterEach(() => {
  cleanup();
  sessionStorage.clear();
});

describe("IntroOverlay", () => {
  it("stays within the 1.4s budget", () => {
    expect(INTRO_DURATION).toBeLessThanOrEqual(1.4);
  });

  it("renders the word when it plays", async () => {
    mockMatchMedia(false);
    render(<IntroOverlay word="Alif" />);

    await waitFor(() => {
      expect(screen.getByText("Alif")).toBeInTheDocument();
    });
  });

  it("marks the session as seen", async () => {
    mockMatchMedia(false);
    render(<IntroOverlay word="Alif" />);

    await waitFor(() => {
      expect(sessionStorage.getItem(STORAGE_KEY)).toBe("1");
    });
  });

  it("does not play again in the same session", async () => {
    mockMatchMedia(false);
    sessionStorage.setItem(STORAGE_KEY, "1");

    render(<IntroOverlay word="Alif" />);

    await waitFor(() => {
      expect(screen.queryByText("Alif")).not.toBeInTheDocument();
    });
  });

  it("is skipped entirely under reduced motion", async () => {
    mockMatchMedia(true);
    render(<IntroOverlay word="Alif" />);

    await waitFor(() => {
      expect(screen.queryByText("Alif")).not.toBeInTheDocument();
    });
    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("waits for hydration before showing the overlay", async () => {
    mockMatchMedia(false);
    render(<IntroOverlay word="Alif" />);

    // The overlay is created after hydration, never in the server markup.
    expect(document.querySelector("[data-intro]")).toBeNull();

    await waitFor(() => {
      expect(document.querySelector("[data-intro]")).not.toBeNull();
    });
  });

  it("renders no overlay markup on the server", () => {
    mockMatchMedia(false);
    // jsdom always has a `window`; hide it so the component sees a server render.
    const server = vi
      .stubGlobal("window", undefined)
      .stubGlobal("sessionStorage", undefined);

    try {
      const html = renderToStaticMarkup(<IntroOverlay word="Alif" />);

      expect(html).not.toContain("Alif");
      expect(html).not.toContain("intro-overlay");
    } finally {
      server.unstubAllGlobals();
    }
  });

  it("does not block the page content underneath", async () => {
    mockMatchMedia(false);
    render(
      <div>
        <p>Page content</p>
        <IntroOverlay word="Alif" />
      </div>,
    );

    await waitFor(() => {
      expect(screen.getByText("Alif")).toBeInTheDocument();
    });
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });
});
