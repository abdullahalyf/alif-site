"use client";
import { useSyncExternalStore } from "react";
const subscribe = () => () => {};
export function useInteractive() { return useSyncExternalStore(subscribe, () => true, () => false); }
