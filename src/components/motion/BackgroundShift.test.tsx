import { cleanup, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { mockMatchMedia } from "@/lib/test-match-media";
import { BackgroundShift } from "./BackgroundShift";

afterEach(() => {
  cleanup();
  document.documentElement.style.removeProperty("--page-bg");
  document.documentElement.style.removeProperty("--page-fg");
});

describe("BackgroundShift", () => {
  it("renders its children", () => {
    mockMatchMedia(false);
    render(
      <BackgroundShift>
        <p>Section</p>
      </BackgroundShift>,
    );

    expect(screen.getByText("Section")).toBeInTheDocument();
  });

  it("does nothing under reduced motion", () => {
    mockMatchMedia(true);
    render(
      <BackgroundShift>
        <p>Section</p>
      </BackgroundShift>,
    );

    expect(document.documentElement.style.getPropertyValue("--page-bg")).toBe("");
    expect(screen.getByText("Section").getAttribute("style")).toBeNull();
  });

  it("writes the page colours to the document root", () => {
    mockMatchMedia(false);
    render(
      <BackgroundShift>
        <p>Section</p>
      </BackgroundShift>,
    );

    const style = document.documentElement.style;
    expect(style.getPropertyValue("--page-bg")).toBe("var(--cream)");
    expect(style.getPropertyValue("--page-fg")).toBe("var(--ink)");
  });

  it("renders visible content on the server, with no inline colour overrides", () => {
    mockMatchMedia(false);
    const html = renderToStaticMarkup(
      <BackgroundShift>
        <p>Section</p>
      </BackgroundShift>,
    );

    expect(html).toContain("Section");
    expect(html).not.toContain("--page-bg");
  });

  it("cleans up the page colours on unmount", () => {
    mockMatchMedia(false);
    const { unmount } = render(
      <BackgroundShift>
        <p>Section</p>
      </BackgroundShift>,
    );

    unmount();

    expect(document.documentElement.style.getPropertyValue("--page-bg")).toBe("");
    expect(document.documentElement.style.getPropertyValue("--page-fg")).toBe("");
  });
});
