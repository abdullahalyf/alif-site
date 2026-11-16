import { cleanup, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { mockMatchMedia } from "@/lib/test-match-media";
import { StaggerIn } from "./StaggerIn";

afterEach(() => {
  cleanup();
});

describe("StaggerIn", () => {
  it("renders its children", () => {
    mockMatchMedia(false);
    render(
      <StaggerIn>
        <p>First</p>
        <p>Second</p>
      </StaggerIn>,
    );

    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("does nothing under reduced motion", () => {
    mockMatchMedia(true);
    render(
      <StaggerIn>
        <p>First</p>
      </StaggerIn>,
    );

    expect(screen.getByText("First").getAttribute("style")).toBeNull();
  });

  it("renders visible content on the server, with no inline hiding styles", () => {
    mockMatchMedia(false);
    const html = renderToStaticMarkup(
      <StaggerIn>
        <p>First</p>
      </StaggerIn>,
    );

    expect(html).toContain("First");
    expect(html).not.toContain("opacity: 0");
    expect(html).not.toContain("opacity:0");
  });
});
