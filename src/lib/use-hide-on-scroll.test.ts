import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HIDE_THRESHOLD, useHideOnScroll } from "./use-hide-on-scroll";

function scrollTo(y: number) {
  act(() => {
    window.scrollY = y;
    window.dispatchEvent(new Event("scroll"));
  });
}

afterEach(() => {
  window.scrollY = 0;
});

describe("useHideOnScroll", () => {
  it("is not hidden at the top of the page", () => {
    const { result } = renderHook(() => useHideOnScroll());
    expect(result.current).toBe(false);
  });

  it("hides when scrolling down past the threshold", () => {
    const { result } = renderHook(() => useHideOnScroll());

    scrollTo(HIDE_THRESHOLD + 40);

    expect(result.current).toBe(true);
  });

  it("does not hide when scrolling down but still above the threshold", () => {
    const { result } = renderHook(() => useHideOnScroll());

    scrollTo(10);

    expect(result.current).toBe(false);
  });

  it("shows again when scrolling up", () => {
    const { result } = renderHook(() => useHideOnScroll());

    scrollTo(HIDE_THRESHOLD + 40);
    expect(result.current).toBe(true);

    scrollTo(HIDE_THRESHOLD + 10);
    expect(result.current).toBe(false);
  });

  it("respects a custom threshold", () => {
    const { result } = renderHook(() => useHideOnScroll(200));

    scrollTo(150);
    expect(result.current).toBe(false);

    scrollTo(250);
    expect(result.current).toBe(true);
  });

  it("removes its scroll listener on unmount", () => {
    const remove = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useHideOnScroll());

    unmount();

    expect(remove).toHaveBeenCalledWith("scroll", expect.any(Function));
    remove.mockRestore();
  });

  it("stops reacting to scroll once unmounted", () => {
    const { result, unmount } = renderHook(() => useHideOnScroll());

    unmount();
    scrollTo(HIDE_THRESHOLD + 40);

    expect(result.current).toBe(false);
  });
});
