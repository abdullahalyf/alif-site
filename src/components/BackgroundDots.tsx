"use client";

import { useEffect, useRef } from "react";
import { LINK_DISTANCE, linkAlpha, resizeDots, stepDots, type Dot, type Pointer } from "@/lib/dots";
import { REDUCED_MOTION_QUERY } from "@/lib/use-reduced-motion";

const MAX_DPR = 2;

export function BackgroundDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let pointer: Pointer = null;
    let color = "rgb(0 0 0)";
    let frame = 0;
    let last = 0;
    let idle = 0;
    let running = false;

    const readColor = () => {
      color = getComputedStyle(canvas).color;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = color;
      context.strokeStyle = color;
      context.lineWidth = 1;
      for (let i = 0; i < dots.length; i += 1) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j += 1) {
          const b = dots[j];
          const alpha = linkAlpha(Math.hypot(a.x - b.x, a.y - b.y), LINK_DISTANCE);
          if (alpha <= 0) continue;
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
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      if (width && nextWidth === width && Math.abs(nextHeight - height) < 120) return;
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
      const dt = last ? (now - last) / 1000 : 0;
      last = now;
      stepDots(dots, dt, width, height, pointer);
      draw();
      frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer = event.pointerType === "touch" ? null : { x: event.clientX, y: event.clientY };
    };
    const clearPointer = () => {
      pointer = null;
    };

    const play = () => {
      if (running || document.hidden) return;
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

    let started = false;
    const begin = () => {
      started = true;
      readColor();
      resize();
      apply();
    };
    const schedule = window.requestIdleCallback
      ? (callback: () => void) => window.requestIdleCallback(callback, { timeout: 1500 })
      : (callback: () => void) => window.setTimeout(callback, 200);
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;

    idle = schedule(begin);

    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class", "style"] });
    const onResize = () => {
      if (started) resize();
    };
    window.addEventListener("resize", onResize);
    motionQuery.addEventListener("change", apply);
    darkQuery.addEventListener("change", onThemeChange);

    return () => {
      cancel(idle);
      stopMotion();
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      motionQuery.removeEventListener("change", apply);
      darkQuery.removeEventListener("change", onThemeChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="bg-dots" aria-hidden="true" />;
}
