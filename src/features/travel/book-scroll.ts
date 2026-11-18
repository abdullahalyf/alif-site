import { pageIndex } from "./book";

export function connectBook(
  area: HTMLElement,
  viewport: HTMLElement,
  track: HTMLElement,
  count: number,
  reduced: boolean,
  initial: number,
  update: (position: number) => void,
) {
  const finePointer = matchMedia("(pointer: fine)");
  let transformed = false;
  let width = 0;
  let height = 0;
  let position = pageIndex(initial, count);
  let target = position;
  let frame = 0;
  let lastFrame = 0;
  let drag: { id: number; x: number; start: number; time: number; velocity: number } | undefined;
  let suppressClickUntil = 0;

  const limit = (value: number) => pageIndex(value, count);

  function render(value: number) {
    position = limit(value);
    if (transformed) track.style.transform = `translate3d(${-position * width}px, 0, 0)`;
    update(position);
  }

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = 0;
  }

  function tick(now: number) {
    const elapsed = lastFrame ? Math.min(50, now - lastFrame) : 16.7;
    lastFrame = now;
    const remaining = target - position;
    if (Math.abs(remaining * width) < 0.5) {
      render(target);
      stop();
      return;
    }
    render(position + remaining * (1 - Math.exp(-elapsed / 85)));
    frame = requestAnimationFrame(tick);
  }

  function navigate(value: number, immediate = false) {
    target = limit(value);
    if (transformed && width && !immediate) {
      if (!frame) frame = requestAnimationFrame(tick);
      return;
    }
    stop();
    if (!transformed) {
      viewport.scrollTo({ left: target * width, behavior: immediate || reduced ? "instant" : "smooth" });
      if (width && !immediate && !reduced) return;
    }
    render(target);
  }

  function measure() {
    const available = viewport.clientWidth;
    width = transformed || count < 2 ? viewport.getBoundingClientRect().width || available : (viewport.scrollWidth - available) / (count - 1) || available;
    height = viewport.clientHeight;
    if (!transformed) viewport.scrollTo({ left: position * width, behavior: "instant" });
    render(position);
  }

  function syncMode() {
    stop();
    transformed = finePointer.matches && !reduced;
    area.dataset.bookScroll = transformed ? "transform" : "native";
    track.style.removeProperty("transform");
    if (transformed) viewport.scrollLeft = 0;
    measure();
  }

  function wheel(event: WheelEvent) {
    if (event.ctrlKey || !event.cancelable || !finePointer.matches || !width) return;
    const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? (horizontal ? width : height) : 1;
    const delta = (horizontal ? event.deltaX : event.deltaY) * unit / width;
    const edge = delta < 0 ? 0 : count - 1;
    if (!delta || Math.abs(edge - position) * width < 0.5) return;
    event.preventDefault();
    event.stopPropagation();
    navigate(target + delta);
  }

  function scroll() {
    if (transformed || !width) return;
    const value = viewport.scrollLeft / width;
    const nearest = Math.round(value);
    render(Math.abs(value - nearest) * width <= 0.5 ? nearest : value);
    target = position;
  }

  function pointerDown(event: PointerEvent) {
    if (!width || event.pointerType !== "mouse" || event.button !== 0 || (event.target as Element).closest("a,button")) return;
    stop();
    target = position;
    drag = { id: event.pointerId, x: event.clientX, start: position, time: event.timeStamp, velocity: 0 };
  }

  function pointerMove(event: PointerEvent) {
    if (drag?.id !== event.pointerId) return;
    const dx = drag.x - event.clientX;
    if (Math.abs(dx) < 5 && !viewport.hasPointerCapture(event.pointerId)) return;
    if (!viewport.hasPointerCapture(event.pointerId)) viewport.setPointerCapture(event.pointerId);
    viewport.dataset.dragging = "";
    const next = limit(drag.start + dx / width);
    const elapsed = Math.max(1, event.timeStamp - drag.time);
    drag.velocity = (next - position) / elapsed;
    drag.time = event.timeStamp;
    navigate(next, true);
    suppressClickUntil = performance.now() + 300;
  }

  function pointerEnd(event: PointerEvent) {
    if (drag?.id !== event.pointerId) return;
    const velocity = drag.velocity;
    const coast = event.type === "pointerup" && event.timeStamp - drag.time < 80;
    drag = undefined;
    delete viewport.dataset.dragging;
    if (transformed && coast) navigate(position + Math.max(-0.75, Math.min(0.75, velocity * 140)));
  }

  function click(event: MouseEvent) {
    if (event.detail === 0 || performance.now() >= suppressClickUntil) return;
    event.preventDefault();
    event.stopPropagation();
  }

  syncMode();
  const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
  resize?.observe(viewport);
  finePointer.addEventListener("change", syncMode);
  area.addEventListener("wheel", wheel, { passive: false });
  viewport.addEventListener("scroll", scroll, { passive: true });
  viewport.addEventListener("pointerdown", pointerDown);
  viewport.addEventListener("pointermove", pointerMove);
  viewport.addEventListener("pointerup", pointerEnd);
  viewport.addEventListener("pointercancel", pointerEnd);
  viewport.addEventListener("lostpointercapture", pointerEnd);
  viewport.addEventListener("click", click, true);

  return {
    navigate,
    step(direction: number) {
      navigate(direction > 0 ? Math.floor(target + 0.001) + 1 : Math.ceil(target - 0.001) - 1);
    },
    focus(index: number) {
      if (transformed && Math.abs(index - position) > 0.01) navigate(index, true);
    },
    destroy() {
      stop();
      resize?.disconnect();
      finePointer.removeEventListener("change", syncMode);
      area.removeEventListener("wheel", wheel);
      viewport.removeEventListener("scroll", scroll);
      viewport.removeEventListener("pointerdown", pointerDown);
      viewport.removeEventListener("pointermove", pointerMove);
      viewport.removeEventListener("pointerup", pointerEnd);
      viewport.removeEventListener("pointercancel", pointerEnd);
      viewport.removeEventListener("lostpointercapture", pointerEnd);
      viewport.removeEventListener("click", click, true);
      track.style.removeProperty("transform");
      delete area.dataset.bookScroll;
    },
  };
}
