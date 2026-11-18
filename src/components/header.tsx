"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { footerGroups, shell } from "@/content/site";
import { Button } from "./button";
import { BrandMark } from "./brand-mark";
import { openSearch } from "@/features/search/search-context";
import { SearchTrigger } from "@/features/search/SearchTrigger";

const COMPACT_THRESHOLD = 40;

export function Header() {
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  useEffect(() => {
    const element = header.current;
    if (!element) return;
    let previous = Math.max(0, window.scrollY);
    element.toggleAttribute("data-compact", previous > COMPACT_THRESHOLD);
    const sync = () => {
      const offset = Math.max(0, window.scrollY);
      const delta = offset - previous;
      if (offset <= 4) element.removeAttribute("data-compact");
      else if (delta <= -4) element.removeAttribute("data-compact");
      else if (delta >= 4 && offset > COMPACT_THRESHOLD) element.setAttribute("data-compact", "");
      if (Math.abs(delta) >= 4 || offset <= 4) previous = offset;
    };
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  function close() {
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  /**
   * The menu closes on the route change that follows a tap.
   *
   * The tap itself closes it, but a route change can also arrive on its own
   * — the browser's back button, for instance — and the overlay must not
   * survive it. Comparing the route the menu was opened at with the current
   * one catches both cases.
   */
  const routeChanged = openedAt !== null && openedAt !== pathname;

  useEffect(() => {
    if (!routeChanged) return;
    // Closing the dialog fires `onClose`, which is what clears the state.
    dialog.current?.close();
  }, [routeChanged]);

  function linkItem(link: { href: string; label: string }) {
    const props = {
      href: link.href,
      "aria-current": pathname === link.href ? "page" as const : undefined,
      onClick: () => { if (open) close(); },
    };
    return link.href.startsWith("/") && !link.href.endsWith(".xml")
      ? <Link key={link.href} {...props}>{link.label}</Link>
      : <a key={link.href} {...props}>{link.label}</a>;
  }

  return (
    <header ref={header} className="header">
      <div className="container header-inner">
        <BrandMark />
        <nav className="desktop-nav" aria-label={shell.navigation}>{shell.nav.map(linkItem)}</nav>
        <div className="header-actions">
          <SearchTrigger />
          <button ref={trigger} className="menu-trigger button button--secondary" aria-expanded={open} aria-controls="site-menu" aria-haspopup="dialog" onClick={() => { dialog.current?.showModal(); setOpen(true); setOpenedAt(pathname); }}>
            {shell.menu}
          </button>
        </div>
        <dialog
          ref={dialog}
          id="site-menu"
          className="site-menu"
          aria-label={shell.menu}
          data-lenis-prevent
          onCancel={(event) => { event.preventDefault(); close(); }}
          onClose={() => { setOpen(false); setOpenedAt(null); }}
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const items = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button, input");
            const first = items[0];
            const last = items[items.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }}
        >
          <div className="container site-menu__content">
            <div className="site-menu__top">
              <form role="search" onSubmit={(event) => {
                event.preventDefault();
                const query = new FormData(event.currentTarget).get("query");
                event.currentTarget.reset();
                close();
                openSearch(typeof query === "string" ? query : "");
              }}>
                <input type="search" name="query" aria-label={shell.searchLabel} placeholder={shell.searchLabel} />
                <Button type="submit" variant="secondary">{shell.searchLabel}</Button>
              </form>
              <Button variant="secondary" onClick={close}>{shell.closeMenu}</Button>
            </div>
            <nav className="site-menu__groups" aria-label={shell.navigation}>
              {footerGroups.map((group, index) => <div key={group.label} style={{ "--menu-group": index } as CSSProperties}>
                <h2 className="label">{group.label}</h2>
                <ul>
                  {group.links.map((link, item) => <li key={link.href} style={{ "--menu-item": item } as CSSProperties}>{linkItem(link)}</li>)}
                </ul>
              </div>)}
            </nav>
            <div className="site-menu__contact">{linkItem(shell.contact)}</div>
          </div>
        </dialog>
        <noscript><nav className="fallback-nav" aria-label={shell.navigation}>{shell.nav.map(linkItem)}{footerGroups.flatMap((group) => group.links).filter((link) => !shell.nav.some((item) => item.href === link.href)).map(linkItem)}</nav><style>{`.header-actions { display: none; }`}</style></noscript>
      </div>
    </header>
  );
}
