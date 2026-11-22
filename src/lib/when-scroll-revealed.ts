const pending = new Map<Element, () => void>();
let observer: IntersectionObserver | undefined;

function observe() {
  observer?.disconnect();
  observer = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting, rootBounds, boundingClientRect } of entries) {
      if (!isIntersecting) continue;
      observer?.unobserve(target);
      const enter = pending.get(target);
      pending.delete(target);
      if (!pending.size) window.removeEventListener("resize", observe);

      // A jump deep into the viewport has already passed the entrance.
      const top = target.getBoundingClientRect().top;
      if (rootBounds && boundingClientRect.top >= rootBounds.bottom - window.innerHeight * 0.15
        && top >= window.innerHeight * 0.77) enter?.();
    }
  }, { rootMargin: `0px 0px -${window.innerHeight * 0.08}px` });
  pending.forEach((_, target) => observer?.observe(target));
}

export function whenScrollRevealed(element: Element, enter: () => void) {
  if (typeof IntersectionObserver === "undefined"
    || element.getBoundingClientRect().top <= window.innerHeight * 1.15) return;

  if (!pending.size) {
    observe();
    window.addEventListener("resize", observe);
  }
  pending.set(element, enter);
  observer?.observe(element);
  return () => {
    if (pending.delete(element)) observer?.unobserve(element);
    if (!pending.size) window.removeEventListener("resize", observe);
  };
}
