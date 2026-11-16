import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HoverPreview } from "./HoverPreview";

type MediaListener = (event: { matches: boolean }) => void;

function mockPointerFine(matches: boolean) {
  const listeners = new Set<MediaListener>();
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (media: string) => ({
      matches: media === "(pointer: fine)" ? matches : false,
      media,
      addEventListener: (_: string, listener: MediaListener) => {
        listeners.add(listener);
      },
      removeEventListener: (_: string, listener: MediaListener) => {
        listeners.delete(listener);
      },
    }),
  });
}

beforeEach(() => {
  mockPointerFine(true);
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function renderPreview() {
  return render(
    <HoverPreview
      src="/images/project.jpg"
      alt="A project screenshot"
      width={1200}
      height={800}
    >
      <span>Traffic accident risk</span>
    </HoverPreview>,
  );
}

function hoverRow() {
  act(() => {
    screen.getByText("Traffic accident risk").dispatchEvent(
      new Event("pointerenter", { bubbles: true }),
    );
  });
}

function unhoverRow() {
  act(() => {
    screen.getByText("Traffic accident risk").dispatchEvent(
      new Event("pointerleave", { bubbles: true }),
    );
  });
}

function pointerMove(clientX: number, clientY: number) {
  act(() => {
    window.dispatchEvent(new PointerEvent("pointermove", { clientX, clientY }));
  });
}

describe("HoverPreview", () => {
  it("always renders the row", () => {
    renderPreview();
    expect(screen.getByText("Traffic accident risk")).toBeInTheDocument();
  });

  it("shows no preview until the row is hovered", () => {
    renderPreview();
    expect(screen.queryByAltText("A project screenshot")).not.toBeInTheDocument();
  });

  it("shows the image once the row is hovered", () => {
    renderPreview();

    hoverRow();

    expect(screen.getByAltText("A project screenshot")).toBeInTheDocument();
  });

  it("follows the pointer", () => {
    renderPreview();

    hoverRow();
    pointerMove(120, 80);

    const preview = screen.getByAltText("A project screenshot").closest("[data-hover-preview]");
    expect(preview?.getAttribute("style")).toContain("left: 144px");
    expect(preview?.getAttribute("style")).toContain("top: 104px");
  });

  it("hides the image again when the row is left", () => {
    renderPreview();

    hoverRow();
    expect(screen.getByAltText("A project screenshot")).toBeInTheDocument();

    unhoverRow();
    expect(screen.queryByAltText("A project screenshot")).not.toBeInTheDocument();
  });

  it("shows no preview on touch devices", () => {
    mockPointerFine(false);
    renderPreview();

    hoverRow();

    expect(screen.queryByAltText("A project screenshot")).not.toBeInTheDocument();
  });

  it("removes its listeners on unmount", () => {
    const remove = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderPreview();

    unmount();

    expect(remove).toHaveBeenCalledWith("pointermove", expect.any(Function));
    remove.mockRestore();
  });
});
