"use client";

import { shell } from "@/content/site";
import { defaultTheme, themeStorageKey } from "@/lib/theme";

let transitionTimer: ReturnType<typeof setTimeout> | undefined;

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const current = root.dataset.theme ?? defaultTheme;
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme-switching", "");
    root.dataset.theme = next;
    clearTimeout(transitionTimer);
    transitionTimer = setTimeout(() => root.removeAttribute("data-theme-switching"), 320);
    try { localStorage.setItem(themeStorageKey, next); } catch {}
  }

  return <button type="button" className="theme-toggle" onClick={toggle}>
    <span className="sr-only theme-toggle__moon">{shell.useDarkTheme}</span>
    <span className="sr-only theme-toggle__sun">{shell.useLightTheme}</span>
    <svg className="theme-toggle__moon" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.7 15.3A9 9 0 0 1 8.7 3.3a9 9 0 1 0 12 12Z" /></svg>
    <svg className="theme-toggle__sun" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="4" /><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2" /></svg>
  </button>;
}
