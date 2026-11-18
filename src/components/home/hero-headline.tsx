"use client";

import { Fragment, useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { prefersReducedMotion, useReducedMotion } from "@/lib/use-reduced-motion";

export function HeroHeadline({ title }: { title: string }) {
  const heading = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion() || !heading.current) return;
    const element = heading.current;
    const gsap = getGsap();
    const context = gsap.context(() => {
      gsap.from(element.querySelectorAll(".hero-word > span"), {
        yPercent: 110,
        duration: 0.72,
        delay: 0.42,
        stagger: 0.065,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: element, start: "top 90%", once: true },
      });
    }, element);
    return () => context.revert();
  }, [reducedMotion]);

  return <h1 id="hero-title" ref={heading}>
    {title.split(/\s+/).map((word, index) => <Fragment key={index}>
      {index > 0 && " "}<span className="hero-word"><span>{word}</span></span>
    </Fragment>)}
  </h1>;
}
