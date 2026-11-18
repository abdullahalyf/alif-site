"use client";

export function PostProse({ html }: { html: string }) {
  return <div
    className="post-prose"
    dangerouslySetInnerHTML={{ __html: html }}
    onKeyDown={(event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const area = event.target;
      if (!(area instanceof HTMLElement) || area.tagName !== "PRE") return;
      const step = event.key === "ArrowRight" ? 40 : -40;
      const next = Math.max(0, Math.min(area.scrollWidth - area.clientWidth, area.scrollLeft + step));
      if (next === area.scrollLeft) return;
      event.preventDefault();
      area.scrollLeft = next;
    }}
  />;
}
