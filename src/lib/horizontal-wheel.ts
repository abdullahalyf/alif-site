import { prefersReducedMotion } from "./use-reduced-motion";

export function connectHorizontalWheel(
  area: HTMLElement | Document,
  move: (delta: number, event: WheelEvent) => boolean,
  pageSize: (event: WheelEvent, horizontal: boolean) => number,
  acceptHorizontal = false,
) {
  function wheel(event: WheelEvent) {
    if (event.defaultPrevented || event.ctrlKey || !event.cancelable) return;
    const mode = event.deltaMode;
    const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    if (!acceptHorizontal && (horizontal || event.shiftKey)) return;
    const unit = mode === 1 ? 16 : mode === 2 ? pageSize(event, horizontal) : 1;
    const delta = (horizontal ? event.deltaX : event.deltaY) * unit;
    if (!delta || !move(delta, event)) return;
    event.preventDefault();
    event.stopPropagation();
  }

  const listener = wheel as EventListener;
  area.addEventListener("wheel", listener, { passive: false });
  return () => area.removeEventListener("wheel", listener);
}

const nativeAreas = "[data-horizontal-scroll], .post-prose :is(pre, table), .access-decision pre";

export function connectNativeHorizontalAreas() {
  let animation: { area: HTMLElement; target: number; lastFrame: number } | undefined;
  let frame = 0;
  let drag: { area: HTMLElement; id: number; x: number; left: number; moved: boolean } | undefined;
  let suppressClick: HTMLElement | undefined;

  function findArea(event: Event) {
    return event.target instanceof Element ? event.target.closest<HTMLElement>(nativeAreas) : null;
  }

  function stop() {
    cancelAnimationFrame(frame);
    animation = undefined;
  }

  function tick(now: number) {
    if (!animation) return;
    const { area, target, lastFrame } = animation;
    const remaining = target - area.scrollLeft;
    if (!area.isConnected || target > area.scrollWidth - area.clientWidth || Math.abs(remaining) <= 1) {
      if (area.isConnected) area.scrollLeft = target;
      stop();
      return;
    }
    const elapsed = Math.min(50, now - lastFrame);
    const step = remaining * (1 - Math.exp(-elapsed / 85));
    area.scrollLeft += Math.sign(step) * Math.max(1, Math.abs(step));
    animation.lastFrame = now;
    frame = requestAnimationFrame(tick);
  }

  const disconnectWheel = connectHorizontalWheel(document, (delta, event) => {
    const area = findArea(event);
    if (!area || drag?.moved) return false;
    const max = area.scrollWidth - area.clientWidth;
    const left = area.scrollLeft;
    if (max <= 1 || (delta < 0 ? left <= 1 : left >= max - 1)) return false;

    const previous = animation?.area === area ? animation.target : left;
    const target = Math.max(0, Math.min(max, previous + delta));
    if (prefersReducedMotion() || !matchMedia("(pointer: fine)").matches) {
      stop();
      area.scrollLeft = target;
    } else if (animation?.area === area) {
      animation.target = target;
    } else {
      stop();
      animation = { area, target, lastFrame: performance.now() };
      frame = requestAnimationFrame(tick);
    }
    return true;
  }, (event) => findArea(event)?.clientHeight ?? window.innerHeight);

  function pointerDown(event: PointerEvent) {
    const area = findArea(event);
    suppressClick = undefined;
    if (!area) return;
    if (animation?.area === area) stop();
    if (event.button !== 0 || event.pointerType !== "mouse" || area.scrollWidth <= area.clientWidth ||
      (event.target as Element).closest("button, input, select, textarea")) return;
    if (event.clientY >= area.getBoundingClientRect().top + area.clientHeight) return;
    drag = { area, id: event.pointerId, x: event.clientX, left: area.scrollLeft, moved: false };
  }

  function pointerMove(event: PointerEvent) {
    if (!drag || drag.id !== event.pointerId) return;
    const distance = drag.x - event.clientX;
    if (!drag.moved && Math.abs(distance) < 6) return;
    if (!drag.moved) {
      drag.area.setPointerCapture(event.pointerId);
      drag.area.dataset.horizontalDragging = "";
      drag.moved = true;
    }
    drag.area.scrollLeft = drag.left + distance;
    event.preventDefault();
  }

  function pointerEnd(event: PointerEvent) {
    if (drag?.id !== event.pointerId) return;
    delete drag.area.dataset.horizontalDragging;
    if (drag.moved && event.type === "pointerup") suppressClick = drag.area;
    drag = undefined;
  }

  function click(event: MouseEvent) {
    if (!event.detail || !suppressClick?.contains(event.target as Node)) return;
    suppressClick = undefined;
    event.preventDefault();
    event.stopPropagation();
  }

  function dragStart(event: DragEvent) {
    if (drag) event.preventDefault();
  }

  function keyDown(event: KeyboardEvent) {
    if (animation?.area.contains(event.target as Node)) stop();
  }

  document.addEventListener("pointerdown", pointerDown);
  document.addEventListener("pointermove", pointerMove);
  document.addEventListener("pointerup", pointerEnd);
  document.addEventListener("pointercancel", pointerEnd);
  document.addEventListener("lostpointercapture", pointerEnd);
  document.addEventListener("dragstart", dragStart);
  document.addEventListener("click", click, true);
  document.addEventListener("keydown", keyDown);
  return () => {
    stop();
    disconnectWheel();
    document.removeEventListener("pointerdown", pointerDown);
    document.removeEventListener("pointermove", pointerMove);
    document.removeEventListener("pointerup", pointerEnd);
    document.removeEventListener("pointercancel", pointerEnd);
    document.removeEventListener("lostpointercapture", pointerEnd);
    document.removeEventListener("dragstart", dragStart);
    document.removeEventListener("click", click, true);
    document.removeEventListener("keydown", keyDown);
  };
}
