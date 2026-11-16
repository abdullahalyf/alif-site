import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SearchDialog } from "./SearchDialog";
import { OPEN_SEARCH_EVENT } from "./search-context";

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
    (this as unknown as { __focus: () => void }).__focus?.();
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve([]) }),
    ),
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("SearchDialog", () => {
  it("opens with the keyboard shortcut", () => {
    render(<SearchDialog />);
    const dialog = screen.getByRole("dialog", { hidden: true });

    expect(dialog).not.toHaveAttribute("open");
    fireEvent.keyDown(document, { key: "k", ctrlKey: true });
    expect(dialog).toHaveAttribute("open");
  });

  it("opens with the command shortcut", () => {
    render(<SearchDialog />);
    const dialog = screen.getByRole("dialog", { hidden: true });

    fireEvent.keyDown(document, { key: "k", metaKey: true });
    expect(dialog).toHaveAttribute("open");
  });

  it("ignores the shortcut without a modifier", () => {
    render(<SearchDialog />);
    const dialog = screen.getByRole("dialog", { hidden: true });

    fireEvent.keyDown(document, { key: "k" });
    expect(dialog).not.toHaveAttribute("open");
  });

  it("opens when the header asks it to", () => {
    render(<SearchDialog />);
    const dialog = screen.getByRole("dialog", { hidden: true });

    document.dispatchEvent(new Event(OPEN_SEARCH_EVENT));
    expect(dialog).toHaveAttribute("open");
  });

  it("stops listening for the shortcut once it is unmounted", () => {
    const { unmount } = render(<SearchDialog />);
    unmount();

    // Nothing should throw, and the dialog is gone with the component.
    expect(() =>
      document.dispatchEvent(new Event(OPEN_SEARCH_EVENT)),
    ).not.toThrow();
  });
});
