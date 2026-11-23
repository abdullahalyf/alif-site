"use client";

import { useEffect, useRef } from "react";
import { LINK_DISTANCE, linkAlpha, resizeDots, stepDots, type Dot, type Pointer } from "@/lib/dots";
import { REDUCED_MOTION_QUERY } from "@/lib/use-reduced-motion";

const MAX_DPR = 2;
const FRAME_INTERVAL = 1000 / 30;

export function BackgroundDots({ variant = "page" }: { variant?: "page" | "night" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window.matchMedia !== "function") return;
    let context: CanvasRenderingContext2D | null = null;
    const container = variant === "night" ? canvas.parentElement : null;

    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let pointer: Pointer = null;
    let color = "rgb(0 0 0)";
    let frame = 0;
    let last = 0;
    let idle: number | undefined;
    let running = false;
    let started = false;
    let visible = variant === "page";

    const readColor = () => {
      color = getComputedStyle(canvas).color;
    };

    const draw = () => {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      context.fillStyle = color;
      context.strokeStyle = color;
      context.lineWidth = 1;
      for (let i = 0; i < dots.length; i += 1) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j += 1) {
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared >= LINK_DISTANCE * LINK_DISTANCE) continue;
          const alpha = linkAlpha(Math.sqrt(distanceSquared), LINK_DISTANCE);
          context.globalAlpha = alpha * 0.4 * Math.max(a.weight, b.weight);
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }
      for (const dot of dots) {
        context.globalAlpha = dot.weight;
        context.beginPath();
        context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    };

    const resize = () => {
      if (!context) return;
      const nextWidth = container ? container.clientWidth : window.innerWidth;
      const nextHeight = container ? container.clientHeight : window.innerHeight;
      if (!nextWidth || !nextHeight) return;
      if (width && nextWidth === width && Math.abs(nextHeight - height) < (container ? 2 : 120)) return;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(nextWidth * dpr);
      canvas.height = Math.round(nextHeight * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = resizeDots(dots, width, height, nextWidth, nextHeight);
      width = nextWidth;
      height = nextHeight;
      if (!running) draw();
    };

    const tick = (now: number) => {
      if (!last || now - last >= FRAME_INTERVAL - 1) {
        const dt = last ? (now - last) / 1000 : 0;
        last = now;
        stepDots(dots, dt, width, height, pointer);
        draw();
      }
      frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        pointer = null;
        return;
      }
      const rect = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const clearPointer = () => {
      pointer = null;
    };

    const play = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(frame);
    };
    const onVisibility = () => (document.hidden ? pause() : play());
    const onThemeChange = () => {
      readColor();
      if (!running) draw();
    };

    const startMotion = () => {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", clearPointer);
      window.addEventListener("blur", clearPointer);
      document.addEventListener("visibilitychange", onVisibility);
      play();
    };
    const stopMotion = () => {
      pause();
      pointer = null;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", clearPointer);
      window.removeEventListener("blur", clearPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };

    const apply = () => {
      stopMotion();
      readColor();
      draw();
      if (!motionQuery.matches) startMotion();
    };

    const begin = () => {
      idle = undefined;
      if (!visible) return;
      context = canvas.getContext("2d");
      if (!context) return;
      started = true;
      readColor();
      resize();
      apply();
    };
    const schedule = window.requestIdleCallback
      ? (callback: () => void) => window.requestIdleCallback(callback, { timeout: 1500 })
      : (callback: () => void) => window.setTimeout(callback, 200);
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const scheduleStart = () => {
      if (!started && visible && idle === undefined && document.readyState === "complete") {
        idle = schedule(begin);
      }
    };
    if (document.readyState === "complete") scheduleStart();
    else window.addEventListener("load", scheduleStart, { once: true });

    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class", "style"] });
    const onResize = () => {
      if (started) resize();
    };
    const sizeObserver = container && typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
    if (container) sizeObserver?.observe(container);
    else window.addEventListener("resize", onResize);
    const visibilityObserver = container && typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (!started) {
          scheduleStart();
        } else if (!visible) pause();
        else if (motionQuery.matches) draw();
        else play();
      })
      : null;
    if (container) visibilityObserver?.observe(container);
    else visible = true;
    if (container && !visibilityObserver) {
      visible = true;
      scheduleStart();
    }
    const onMotionChange = () => { if (started) apply(); };
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("load", scheduleStart);
      if (idle !== undefined) cancel(idle);
      stopMotion();
      themeObserver.disconnect();
      sizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      window.removeEventListener("resize", onResize);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, [variant]);

  return <canvas ref={canvasRef} className={variant === "night" ? "bg-dots bg-dots--night" : "bg-dots"} aria-hidden="true" />;
}
