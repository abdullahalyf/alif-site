"use client";

import { useEffect } from "react";

/**
 * Opens the search dialog from anywhere on the page.
 *
 * The dialog owns its own `<dialog>` element and opens it with `showModal()`,
 * so the trigger cannot call it directly. Instead the trigger dispatches this
 * event and the dialog listens for it. A DOM event keeps the two decoupled —
 * the trigger can live anywhere in the tree without re-rendering the header
 * every time the dialog opens.
 */
export const OPEN_SEARCH_EVENT = "site:open-search";

export function openSearch(query = "") {
  document.dispatchEvent(new CustomEvent(OPEN_SEARCH_EVENT, { detail: query }));
}

/**
 * Calls `onOpen` whenever the search dialog is asked to open.
 *
 * The listener is attached on the document, so it works from any route and
 * survives client-side navigation.
 */
export function useOpenSearch(onOpen: (query?: string) => void) {
  useEffect(() => {
    const listener = (event: Event) => onOpen((event as CustomEvent<string>).detail);
    document.addEventListener(OPEN_SEARCH_EVENT, listener);
    return () => document.removeEventListener(OPEN_SEARCH_EVENT, listener);
  }, [onOpen]);
}
