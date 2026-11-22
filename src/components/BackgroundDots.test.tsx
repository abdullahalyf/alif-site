import { cleanup, render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { BackgroundDots } from "./BackgroundDots";

afterEach(() => {
  cleanup();
});

describe("BackgroundDots", () => {
  it("renders a decorative canvas that ignores pointer input", () => {
    const html = renderToStaticMarkup(<BackgroundDots />);
    expect(html).toContain("<canvas");
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('class="bg-dots"');
  });

  it("mounts and unmounts without throwing when canvas 2D is unavailable", () => {
    const { container, unmount } = render(<BackgroundDots />);
    expect(container.querySelector("canvas")).toBeInTheDocument();
    expect(() => unmount()).not.toThrow();
  });
});
