import { cleanup, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { mockMatchMedia } from "@/lib/test-match-media";
import { Reveal } from "./Reveal";

afterEach(() => {
  cleanup();
});

describe("Reveal", () => {
  it("renders its children", () => {
    mockMatchMedia(false);
    render(
      <Reveal>
        <p>Headline</p>
      </Reveal>,
    );
    expect(screen.getByText("Headline")).toBeInTheDocument();
  });

  it("does nothing under reduced motion", () => {
    mockMatchMedia(true);
    render(
      <Reveal>
        <p>Headline</p>
      </Reveal>,
    );

    expect(screen.getByText("Headline").getAttribute("style")).toBeNull();
  });

  it("renders visible content on the server, with no inline hiding styles", () => {
    mockMatchMedia(false);
    const html = renderToStaticMarkup(
      <Reveal>
        <p>Headline</p>
      </Reveal>,
    );

    expect(html).toContain("Headline");
    expect(html).not.toContain("opacity: 0");
    expect(html).not.toContain("opacity:0");
  });

  it("renders visible content on the server under reduced motion", () => {
    mockMatchMedia(true);
    const html = renderToStaticMarkup(
      <Reveal>
        <p>Headline</p>
      </Reveal>,
    );

    expect(html).toContain("Headline");
    expect(html).not.toContain("opacity: 0");
    expect(html).not.toContain("opacity:0");
  });
});
