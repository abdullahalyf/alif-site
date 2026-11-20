"use client";

import { useEffect, useState } from "react";
import { greetingIntro } from "@/content/site";
import { prefersReducedMotion, useReducedMotion } from "@/lib/use-reduced-motion";

export const introStorageKey = "alif-intro-played-at";
const RELOAD_WINDOW = 10_000;
const WORD_INTERVAL = 112;
const EXIT_DURATION = 230;
const EXIT_START = (greetingIntro.length - 1) * WORD_INTERVAL;
export const INTRO_DURATION = EXIT_START + EXIT_DURATION;
let enteredHome = false;

function shouldPlayIntro() {
  const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  const homeReload = !enteredHome && navigation?.type === "reload" && new URL(navigation.name).pathname === location.pathname;
  enteredHome = true;
  try {
    const now = Date.now();
    if (homeReload && now - Number(sessionStorage.getItem(introStorageKey)) < RELOAD_WINDOW) return false;
    sessionStorage.setItem(introStorageKey, String(now));
  } catch {}
  return true;
}

export function IntroOverlay() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let dismiss: ReturnType<typeof setTimeout> | undefined;
    const frame = requestAnimationFrame(() => {
      if (!shouldPlayIntro()) return;
      setVisible(true);
      dismiss = setTimeout(() => setVisible(false), INTRO_DURATION);
    });
    const skip = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") setVisible(false);
    };
    window.addEventListener("keydown", skip);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(dismiss);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  if (reduced || !visible) return null;

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
