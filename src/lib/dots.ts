export type Dot = { x: number; y: number; vx: number; vy: number; bx: number; by: number; size: number; weight: number };
export type Pointer = { x: number; y: number } | null;

export const MOBILE_MAX_WIDTH = 768;
export const LINK_DISTANCE = 140;
export const ATTRACT_RADIUS = 160;

const AREA_PER_DOT = 13000;
const BASE_SPEED = 27;
const PROMINENT_SHARE = 0.22;
const ATTRACT_ACCEL = 200;
const ATTRACT_DEADZONE = 28;
const RELAX_RATE = 1.6;
const MAX_SPEED = 200;

export function dotCount(width: number, height: number): number {
  const raw = (width * height) / AREA_PER_DOT;
  if (width < MOBILE_MAX_WIDTH) return clamp(Math.round(raw * 0.6), 30, 55);
  return clamp(Math.round(raw), 60, 120);
}

export function createDots(count: number, width: number, height: number, random: () => number = Math.random): Dot[] {
  return Array.from({ length: count }, () => {
    const angle = random() * Math.PI * 2;
    const speed = BASE_SPEED * (0.4 + random() * 0.6);
    const bx = Math.cos(angle) * speed;
    const by = Math.sin(angle) * speed;
    const prominent = random() < PROMINENT_SHARE;
    return {
      x: random() * width, y: random() * height, vx: bx, vy: by, bx, by,
      size: prominent ? 2.4 + random() * 0.8 : 1.1 + random() * 0.5,
      weight: prominent ? 1 : 0.35 + random() * 0.25,
    };
  });
}

export function resizeDots(dots: Dot[], fromWidth: number, fromHeight: number, toWidth: number, toHeight: number, random: () => number = Math.random): Dot[] {
  const target = dotCount(toWidth, toHeight);
  const sx = fromWidth > 0 ? toWidth / fromWidth : 1;
  const sy = fromHeight > 0 ? toHeight / fromHeight : 1;
  const kept = dots.slice(0, target).map((dot) => ({ ...dot, x: dot.x * sx, y: dot.y * sy }));
  return kept.concat(createDots(target - kept.length, toWidth, toHeight, random));
}

export function stepDots(dots: Dot[], dt: number, width: number, height: number, pointer: Pointer): void {
  const step = Math.min(dt, 0.05);
  const relax = Math.min(1, RELAX_RATE * step);
  for (const dot of dots) {
    dot.vx += (dot.bx - dot.vx) * relax;
    dot.vy += (dot.by - dot.vy) * relax;

    if (pointer) {
      const dx = pointer.x - dot.x;
      const dy = pointer.y - dot.y;
      const distance = Math.hypot(dx, dy);
      if (distance < ATTRACT_RADIUS && distance > ATTRACT_DEADZONE) {
        const pull = (1 - distance / ATTRACT_RADIUS) * ATTRACT_ACCEL * step;
        dot.vx += (dx / distance) * pull;
        dot.vy += (dy / distance) * pull;
      }
    }

    const speed = Math.hypot(dot.vx, dot.vy);
    if (speed > MAX_SPEED) {
      dot.vx = (dot.vx / speed) * MAX_SPEED;
      dot.vy = (dot.vy / speed) * MAX_SPEED;
    }

    dot.x = wrap(dot.x + dot.vx * step, width);
    dot.y = wrap(dot.y + dot.vy * step, height);
  }
}

export function linkAlpha(distance: number, maxDistance: number = LINK_DISTANCE): number {
  if (distance >= maxDistance) return 0;
  return 1 - distance / maxDistance;
}

function wrap(value: number, size: number): number {
  if (size <= 0) return 0;
  if (value < 0) return value + size;
  if (value > size) return value - size;
  return value;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
