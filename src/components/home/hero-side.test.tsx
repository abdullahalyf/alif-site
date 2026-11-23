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

  it("serves the fixed-size JPEG directly", () => {
    mockMatchMedia(false);
    const { container } = render(<HeroSide />);

    const photo = container.querySelector<HTMLImageElement>(".hero-side__photo");
    expect(photo).toHaveAttribute("src", site.heroSide.src);
    expect(photo).toHaveAttribute("width", String(site.heroSide.width));
    expect(photo).toHaveAttribute("height", String(site.heroSide.height));
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
