let observer: IntersectionObserver | undefined;
const pending = new Map<Element, () => void>();

export function whenNearViewport(element: Element, start: () => (() => void) | undefined) {
  if (typeof IntersectionObserver === "undefined") return start();

  observer ??= new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      const activate = pending.get(entry.target);
      pending.delete(entry.target);
      activate?.();
    }
  }, { rootMargin: "160px 0px" });

  let cleanup: (() => void) | undefined;
  pending.set(element, () => { cleanup = start(); });
  observer.observe(element);
  return () => {
    if (pending.delete(element)) observer?.unobserve(element);
    cleanup?.();
  };
}
