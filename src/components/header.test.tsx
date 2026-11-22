import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { Header } from "./header";
import { menuGroups, shell, workNavigation } from "@/content/site";

vi.mock("next/navigation", () => ({ usePathname: () => "/work" }));
beforeEach(() => {
  vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute("open"); };
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it("renders all navigation destinations and marks the current page", () => {
  render(<Header />);
  const nav = screen.getAllByRole("navigation")[0];
  for (const link of shell.nav) expect(within(nav).getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
  expect(within(nav).getByRole("link", { name: shell.workTitle })).toHaveAttribute("aria-current", "page");
});

it("opens the menu, closes on a link, and restores trigger focus", () => {
  render(<Header />);
  const trigger = screen.getByRole("button", { name: shell.menu });
  fireEvent.click(trigger);
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(document.body.style.overflow).toBe("hidden");
  const link = within(screen.getByRole("dialog")).getByRole("link", { name: workNavigation.links[0].label });
  link.addEventListener("click", (event) => event.preventDefault());
  fireEvent.click(link);
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(trigger).toHaveFocus();
  expect(document.body.style.overflow).toBe("");
});

it("closes the dialog with its close button or Escape", () => {
  render(<Header />);
  const trigger = screen.getByRole("button", { name: shell.menu });
  fireEvent.click(trigger);
  fireEvent.click(screen.getByRole("button", { name: shell.closeMenu }));
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(trigger);
  fireEvent(screen.getByRole("dialog"), new Event("cancel", { bubbles: true, cancelable: true }));
  expect(trigger).toHaveAttribute("aria-expanded", "false");
});

it("puts every grouped destination in the menu", () => {
  render(<Header />);
  fireEvent.click(screen.getByRole("button", { name: shell.menu }));
  const dialog = screen.getByRole("dialog");
  for (const link of menuGroups.flatMap((group) => group.links)) {
    expect(within(dialog).getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
  }

});

it("shows a search trigger with the keyboard shortcut", () => {
  render(<Header />);
  const trigger = screen.getByRole("button", { name: new RegExp(shell.searchLabel) });
  expect(trigger).toBeInTheDocument();
  expect(screen.getByText(shell.searchHint)).toBeInTheDocument();
});

it("compacts on descent and expands while scrolling up mid-page", () => {
  const offset = vi.spyOn(window, "scrollY", "get").mockReturnValue(0);
  render(<Header />);
  const header = screen.getByRole("banner");
  expect(header).not.toHaveAttribute("data-compact");
  offset.mockReturnValue(41);
  fireEvent.scroll(window);
  expect(header).toHaveAttribute("data-compact");
  offset.mockReturnValue(240);
  fireEvent.scroll(window);
  expect(header).toHaveAttribute("data-compact");
  offset.mockReturnValue(200);
  fireEvent.scroll(window);
  expect(header).not.toHaveAttribute("data-compact");
  offset.mockRestore();
});
