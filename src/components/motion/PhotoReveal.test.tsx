import { cleanup, render, screen } from "@testing-library/react";
import Image from "next/image";
import { afterEach, describe, expect, it } from "vitest";
import { mockMatchMedia } from "@/lib/test-match-media";
import { PhotoReveal } from "./PhotoReveal";

afterEach(() => {
  cleanup();
});

function renderPhoto() {
  render(
    <PhotoReveal>
      <Image
        src="/images/photo.jpg"
        alt="A portrait"
        width={1200}
        height={1500}
      />
    </PhotoReveal>,
  );
  return screen.getByAltText("A portrait") as HTMLImageElement;
}

describe("PhotoReveal", () => {
  it("renders its children", () => {
    mockMatchMedia(false);
    expect(renderPhoto()).toBeInTheDocument();
  });

  it("does nothing under reduced motion", () => {
    mockMatchMedia(true);
    const image = renderPhoto();

    const style = image.getAttribute("style") ?? "";
    expect(style).not.toContain("blur");
    expect(style).not.toContain("saturate");
    expect(style).not.toContain("opacity");
  });

  it("starts the photo soft and sharpens it when motion is allowed", () => {
    mockMatchMedia(false);
    const image = renderPhoto();

    const style = image.getAttribute("style") ?? "";
    expect(style).toContain("blur(0px)");
    expect(style).toContain("saturate(1)");
  });
});
