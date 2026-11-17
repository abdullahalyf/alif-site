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

  it("never fades its content, so text contrast is unaffected mid-animation", () => {
    mockMatchMedia(false);
    const html = renderToStaticMarkup(
      <Reveal>
        <p>Headline</p>
      </Reveal>,
    );

    // The entrance uses a clip, not an opacity fade — a fade would blend the
    // text into the background and drop it below the contrast threshold.
    expect(html).not.toContain("opacity: 0");
    expect(html).not.toContain("opacity:0");
  });

  it("renders as a list item when asked", () => {    mockMatchMedia(false);
    const { container } = render(
      <ul>
        <Reveal as="li">
          <p>Headline</p>
        </Reveal>
      </ul>,
    );

    expect(container.querySelector("li > p")).toHaveTextContent("Headline");
  });

  it("passes extra props to the rendered element", () => {
    mockMatchMedia(false);
    render(
      <Reveal id="step-1" data-testid="step">
        <p>Headline</p>
      </Reveal>,
    );

    expect(screen.getByTestId("step")).toHaveAttribute("id", "step-1");
  });
});
