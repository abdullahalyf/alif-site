"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Whether the component has hydrated on the client.
 *
 * Returns `false` while rendering on the server and during hydration, and
 * `true` afterwards. Use it to defer anything that must not appear in the
 * server-rendered HTML — overlays, portals, widgets.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
