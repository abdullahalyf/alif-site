"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef } from "react";
import { site } from "@/content/site";
import { useSmoothScroll } from "@/components/motion/smooth-scroll-context";

/**
 * The brand mark: a serif monogram in a circle beside the wordmark.
 *
 * On the home page it scrolls back to the top through Lenis when smooth
 * scrolling is active, and jumps there otherwise. On every other page it is
 * a plain link home.
 */
export function BrandMark() {
  const pathname = usePathname();
  const lenis = useSmoothScroll();
  const topRef = useRef<HTMLAnchorElement>(null);
  const isHome = pathname === "/";

  const scrollHome = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isHome) return;
      event.preventDefault();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.1 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [isHome, lenis],
  );

  return (
    <Link
      ref={topRef}
      className="brand-mark"
      aria-label={site.logoText}
      href="/"
      prefetch={isHome ? false : undefined}
      onClick={scrollHome}
    >
      <Image className="brand-mark__face" {...site.avatar} width={36} height={36} sizes="36px" alt="" priority />
      {/* The wordmark is the visible label, so it stays in the accessible name.
          The monogram repeats it as a picture and is hidden from assistive tech. */}
      <span className="brand-mark__text">{site.logoText}</span>
    </Link>
  );
}
