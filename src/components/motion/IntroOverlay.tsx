"use client";

import { useEffect, useState } from "react";
import { greetingIntro } from "@/content/site";
import { prefersReducedMotion } from "@/lib/use-reduced-motion";
import { INTRO_PENDING_ATTR, introStorageKey } from "@/lib/intro";

export { introStorageKey };
const WORD_INTERVAL = 112;
const EXIT_DURATION = 230;
const EXIT_START = (greetingIntro.length - 1) * WORD_INTERVAL;
export const INTRO_DURATION = EXIT_START + EXIT_DURATION;
function shouldPlayIntro() {
  return document.documentElement.hasAttribute(INTRO_PENDING_ATTR);
}

/** Server-rendered so CSS plays it from first paint; hydration only removes it. */
export function IntroOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const play = !prefersReducedMotion() && shouldPlayIntro();
    const dismiss = setTimeout(() => setVisible(false), play ? Math.max(0, INTRO_DURATION + 150 - performance.now()) : 0);
    const skip = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") setVisible(false);
    };
    window.addEventListener("keydown", skip);
    return () => {
      clearTimeout(dismiss);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  useEffect(() => {
    if (!visible) document.documentElement.removeAttribute(INTRO_PENDING_ATTR);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="intro-overlay" aria-hidden="true" data-intro="playing"
      style={{ animationDelay: `${EXIT_START}ms`, animationDuration: `${EXIT_DURATION}ms` }}
      onClick={() => setVisible(false)}>
      <svg className="intro-words" focusable="false" width="100%" height="100%">
        {greetingIntro.map(({ word, lang }, index) => (
          <text key={word} lang={lang} direction={lang === "ar" ? "rtl" : "ltr"} x="50%" y="50%"
            textAnchor="middle" dominantBaseline="central" className="intro-word"
            style={{ animationDelay: `${index * WORD_INTERVAL}ms`, animationDuration: `${index === greetingIntro.length - 1 ? EXIT_DURATION : WORD_INTERVAL}ms` }}>
            {word}
          </text>
        ))}
      </svg>
    </div>
  );
}
