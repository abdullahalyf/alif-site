type Listener = () => void;

export type MediaQueryMock = {
  /** Flips the mocked `matches` value and notifies listeners. */
  set: (matches: boolean) => void;
  /** Number of listeners currently registered on the mocked query. */
  listenerCount: () => number;
};

/**
 * Installs a `window.matchMedia` stub for jsdom, which does not implement it.
 * GSAP's ScrollTrigger and the reduced-motion hook both depend on it.
 */
export function mockMatchMedia(initialMatches = false): MediaQueryMock {
  const listeners = new Set<Listener>();
  const query = {
    matches: initialMatches,
    media: "(prefers-reduced-motion: reduce)",
    addEventListener: (_: string, listener: Listener) => {
      listeners.add(listener);
    },
    removeEventListener: (_: string, listener: Listener) => {
      listeners.delete(listener);
    },
  };

  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (media: string) =>
      media === "(prefers-reduced-motion: reduce)"
        ? (query as unknown as MediaQueryList)
        : ({
            matches: false,
            media,
            addEventListener: () => {},
            removeEventListener: () => {},
          } as unknown as MediaQueryList),
  });

  return {
    set(matches: boolean) {
      query.matches = matches;
      for (const listener of listeners) listener();
    },
    listenerCount: () => listeners.size,
  };
}
