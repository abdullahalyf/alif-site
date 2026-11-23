"use client";

import { useEffect } from "react";

const EDITABLE = "input, textarea, select, [contenteditable=''], [contenteditable='true']";

function isEditable(target: EventTarget | null): boolean {
  const element = target instanceof Element ? target : target instanceof Node ? target.parentElement : null;
  return Boolean(element?.closest(EDITABLE));
}

export function CopyGuard() {
  useEffect(() => {
    const block = (event: Event) => {
      if (!isEditable(event.target)) event.preventDefault();
    };
    const blockImageMenu = (event: Event) => {
      if (event.target instanceof HTMLImageElement) event.preventDefault();
    };
    const events = ["copy", "cut", "selectstart", "dragstart"] as const;
    for (const name of events) document.addEventListener(name, block);
    document.addEventListener("contextmenu", blockImageMenu);
    return () => {
      for (const name of events) document.removeEventListener(name, block);
      document.removeEventListener("contextmenu", blockImageMenu);
    };
  }, []);

  return null;
}
