"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { shell } from "@/content/site";
import { Button } from "./button";
import { BrandMark } from "./brand-mark";
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
    const sync = () => element.toggleAttribute("data-compact", window.scrollY > COMPACT_THRESHOLD);
    sync();
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
    const media = window.matchMedia("(min-width: 48rem)");
    const resize = () => { if (media.matches) close(); };
    media.addEventListener("change", resize);
    return () => {
      document.body.style.overflow = previous;
      media.removeEventListener("change", resize);
    };
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

  /**
   * The links that appear in the desktop nav and the mobile menu.
   *
   * They are a plain list so their order can change freely; look them up by
   * path with `navHref` rather than by index.
   */
  function links() {
    return shell.nav.map((link) => (
      <Link key={link.label} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => { if (open) close(); }}>
        {link.label}
      </Link>
    ));
  }

  /**
   * The quieter pages that only appear in the mobile menu, where there is
   * room for them and where a visitor on a phone is more likely to want them.
   */
  function extraLinks() {
    return shell.menuExtra.map((link) => (
      <Link key={link.label} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => { if (open) close(); }}>
        {link.label}
      </Link>
    ));
  }

  return (
    <header ref={header} className="header">
      <div className="container header-inner">
        <BrandMark />
        <nav className="desktop-nav" aria-label={shell.navigation}>{links()}</nav>
        <div className="header-actions">
          <SearchTrigger />
          <button ref={trigger} className="menu-trigger button button--secondary" aria-expanded={open} aria-controls="mobile-menu" aria-haspopup="dialog" onClick={() => { dialog.current?.showModal(); setOpen(true); setOpenedAt(pathname); }}>
            {shell.menu}
          </button>
        </div>
        <dialog ref={dialog} id="mobile-menu" className="mobile-menu" aria-label={shell.navigation} onCancel={(event) => { event.preventDefault(); close(); }} onClose={() => { setOpen(false); setOpenedAt(null); }}>
          <Button variant="secondary" onClick={close}>{shell.closeMenu}</Button>
          <nav aria-label={shell.navigation}>{links()}</nav>
          <nav className="mobile-menu__extra" aria-label={shell.menuExtraLabel}>{extraLinks()}</nav>
        </dialog>
        <noscript><nav className="fallback-nav" aria-label={shell.navigation}>{links()}{extraLinks()}</nav><style>{`.menu-trigger { display: none; }`}</style></noscript>
      </div>
    </header>
  );
}
