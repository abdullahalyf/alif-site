"use client";

import { shell } from "@/content/site";
import { openSearch } from "./search-context";

/**
 * The search button in the header.
 *
 * It shows a magnifier and the keyboard shortcut, so it is obvious that
 * search can be opened without touching the mouse.
 */
export function SearchTrigger({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={`search-trigger ${className}`.trim()}
      onClick={openSearch}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m16.5 16.5 4 4" />
      </svg>
      {/* The word is hidden visually on a phone but stays in the accessibility
          tree, so the button keeps a name there. It is not `aria-hidden`:
          the accessible name has to contain the visible text. */}
      <span className="search-trigger__label">{shell.searchLabel}</span>
      <kbd className="search-trigger__hint">{shell.searchHint}</kbd>
    </button>
  );
}
