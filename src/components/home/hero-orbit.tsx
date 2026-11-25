"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";

type Geometry = {
  name: "wide" | "tall";
  box: [number, number];
  arch: string;
  centre: [number, number];
  rx: number;
  ry: number;
  tilt: number;
  dot: number;
  seconds: number;
};

const shapes: Geometry[] = [
  { name: "wide", box: [1600, 900], arch: "M582 900V330A290 290 0 0 1 1162 330V900", centre: [872, 470], rx: 560, ry: 130, tilt: -12, dot: 9, seconds: 16 },
  { name: "tall", box: [800, 1000], arch: "M130 1000V370A330 330 0 0 1 790 370V1000", centre: [460, 520], rx: 520, ry: 120, tilt: -12, dot: 8, seconds: 14 },
];

export function HeroOrbit({ coordinates }: { coordinates: string }) {
  const reducedMotion = useReducedMotion();

  return <>
    {shapes.map(({ name, box, arch, centre, rx, ry, tilt, dot, seconds }) => {
      const pathId = `hero-orbit-${name}`;
      const orbit = `M${-rx} 0a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0`;
      return <svg key={name} className={`hero-orbit hero-orbit--${name}`} viewBox={`0 0 ${box[0]} ${box[1]}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <path className="hero-orbit__arch" d={arch} />
        <g transform={`translate(${centre[0]} ${centre[1]}) rotate(${tilt})`}>
          <path id={pathId} className="hero-orbit__ring" d={orbit} />
          <g className="hero-orbit__dot" transform={reducedMotion ? `translate(${rx} 0)` : undefined}>
            <circle r={dot * 2.2} className="hero-orbit__halo" />
            <circle r={dot} className="hero-orbit__core" />
            {reducedMotion ? null : <animateMotion dur={`${seconds}s`} repeatCount="indefinite" rotate="0"><mpath href={`#${pathId}`} /></animateMotion>}
          </g>
        </g>
      </svg>;
    })}
    <p className="hero-orbit__coordinates" aria-hidden="true">{coordinates}</p>
  </>;
}
