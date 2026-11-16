import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SearchTrigger } from "./SearchTrigger";
import { OPEN_SEARCH_EVENT } from "./search-context";
import { shell } from "@/content/site";

afterEach(() => cleanup());

describe("SearchTrigger", () => {
  it("shows the label and the keyboard shortcut", () => {
    render(<SearchTrigger />);

    expect(screen.getByRole("button", { name: new RegExp(shell.searchLabel) })).toBeInTheDocument();
    expect(screen.getByText(shell.searchHint)).toBeInTheDocument();
  });

  it("asks the search dialog to open when clicked", () => {
    const listener = vi.fn();
    document.addEventListener(OPEN_SEARCH_EVENT, listener);
    render(<SearchTrigger />);

    fireEvent.click(screen.getByRole("button"));

    expect(listener).toHaveBeenCalled();
    document.removeEventListener(OPEN_SEARCH_EVENT, listener);
  });

  it("keeps extra class names", () => {
    render(<SearchTrigger className="search-trigger--page" />);

    expect(screen.getByRole("button").className).toContain("search-trigger--page");
  });
});
