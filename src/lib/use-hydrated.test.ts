import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useHydrated } from "./use-hydrated";

describe("useHydrated", () => {
  it("is true on the client", () => {
    const { result } = renderHook(() => useHydrated());
    expect(result.current).toBe(true);
  });

  it("does not change between renders", () => {
    const { result, rerender } = renderHook(() => useHydrated());
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });
});
