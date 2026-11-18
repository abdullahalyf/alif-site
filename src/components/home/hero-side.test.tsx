import { cleanup, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { mockMatchMedia } from "@/lib/test-match-media";
import { site } from "@/content/site";
import { HeroSide } from "./hero-side";

afterEach(() => {
  cleanup();
});

describe("HeroSide", () => {
  it("loads the photo eagerly, as the largest contentful paint", () => {
    mockMatchMedia(false);
    const { container } = render(<HeroSide />);

    const photo = container.querySelector<HTMLImageElement>(".hero-side__photo");
    expect(photo).not.toBeNull();
    // A lazy hero photo leaves an empty box on screen while it trickles in.
    expect(photo?.getAttribute("loading")).toBe("eager");
    expect(photo?.getAttribute("fetchpriority")).toBe("high");
  });

  it("describes the photo for assistive tech", () => {
    mockMatchMedia(false);
    render(<HeroSide />);

    expect(screen.getByAltText(site.heroSide.alt)).toBeInTheDocument();
  });

  it("sizes the photo to the space it actually takes", () => {
    mockMatchMedia(false);
    const { container } = render(<HeroSide />);

    const photo = container.querySelector<HTMLImageElement>(".hero-side__photo");
    // `100vw` would ask for a wider candidate than the photo is ever drawn at.
    expect(photo?.getAttribute("sizes")).toBe("(max-width: 35rem) calc(100vw - 4rem), (max-width: 47.999rem) 31rem, (max-width: 63.999rem) 32rem, min(30rem, calc(39.8vw - 1.25rem))");
  });

  it("renders the card and the diagram over the photo", () => {
    mockMatchMedia(false);
    const { container } = render(<HeroSide />);

    expect(container.querySelector(".hero-side__card")).not.toBeNull();
    expect(container.querySelector(".hero-side__diagram")).not.toBeNull();
  });

  it("renders the photo on the server, with no inline motion styles", () => {
    mockMatchMedia(false);
    const html = renderToStaticMarkup(<HeroSide />);

    expect(html).toContain("hero-side__photo");
    expect(html).not.toContain("opacity: 0");
  });
});
