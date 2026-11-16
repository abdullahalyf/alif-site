"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { shell } from "@/content/site";
import { Button } from "./button";
import { BrandMark } from "./brand-mark";
import { useHideOnScroll } from "@/lib/use-hide-on-scroll";

const HIDE_THRESHOLD = 100;

export function Header() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const hidden = useHideOnScroll(HIDE_THRESHOLD);

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

  function links() {
    return shell.nav.map((link) => (
      <Link key={link.label} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => { if (open) close(); }}>
        {link.label}
      </Link>
    ));
  }

  return (
    <header className={`header ${hidden && !open ? "header--hidden" : ""}`}>
      <div className="container header-inner">
        <BrandMark />
        <nav className="desktop-nav" aria-label={shell.navigation}>{links()}</nav>
        <button ref={trigger} className="menu-trigger button button--secondary" aria-expanded={open} aria-controls="mobile-menu" aria-haspopup="dialog" onClick={() => { dialog.current?.showModal(); setOpen(true); }}>
          {shell.menu}
        </button>
        <dialog ref={dialog} id="mobile-menu" className="mobile-menu" aria-label={shell.navigation} onCancel={(event) => { event.preventDefault(); close(); }} onClose={() => { setOpen(false); }}>
          <Button variant="secondary" onClick={close}>{shell.closeMenu}</Button>
          <nav aria-label={shell.navigation}>{links()}</nav>
        </dialog>
        <noscript><nav className="fallback-nav" aria-label={shell.navigation}>{links()}</nav><style>{`.menu-trigger { display: none; }`}</style></noscript>
      </div>
    </header>
  );
}
