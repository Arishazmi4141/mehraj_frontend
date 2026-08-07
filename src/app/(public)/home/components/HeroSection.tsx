"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Design tokens for MehRāj (light theme)
 * Charcoal   #1B1B18  — headings, primary text
 * Cream      #F6F2E9  — base background (Ivory Silk)
 * Taupe      #A6906F  — dividers, secondary accent (Antique Bronze)
 * Emerald    #2E4B3F  — jewel accent (Collections / Atelier)
 * Wine       #5C2A32  — jewel accent (Salon / Journal)
 */

function waitUntilVisible(el: HTMLElement, cb: () => void): () => void {
  let rafId = 0;
  const check = () => {
    let node: HTMLElement | null = el;
    while (node) {
      const style = window.getComputedStyle(node);
      if (style.opacity === "0" || style.visibility === "hidden") {
        rafId = requestAnimationFrame(check);
        return;
      }
      node = node.parentElement;
    }
    cb();
  };
  check();
  return () => cancelAnimationFrame(rafId);
}

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!containerRef.current || prefersReduced) return;

    let ctx: gsap.Context | undefined;

    const cancelWait = waitUntilVisible(containerRef.current, () => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.fromTo(
          monogramRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1.4 }
        );
        tl.fromTo(
          ruleRef.current,
          { width: 0, opacity: 0 },
          { width: "3rem", opacity: 1, duration: 0.9 },
          "-=0.7"
        );
        tl.fromTo(
          wordmarkRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.2 },
          "-=0.5"
        );
        tl.fromTo(
          taglineRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.7"
        );
        tl.fromTo(
          cueRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.3"
        );
      }, containerRef);
    });

    return () => {
      cancelWait();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#F6F2E9] text-[#1B1B18]"
      id="hero"
    >
      {/* Subtle woven-fabric texture line grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1B1B18 1px, transparent 1px), linear-gradient(to bottom, #1B1B18 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Monogram */}
        <div
          ref={monogramRef}
          className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#A6906F]/50"
        >
          <span className="font-serif text-2xl italic text-[#5C2A32]">M</span>
        </div>

        {/* Divider rule */}
        <div ref={ruleRef} className="mb-8 h-px w-0 bg-[#A6906F]" aria-hidden="true" />

        {/* Wordmark */}
        <h1
          ref={wordmarkRef}
          className="font-serif text-[3.2rem] font-light leading-[1.02] tracking-[0.02em] text-[#1B1B18] sm:text-[4.5rem] lg:text-[6rem]"
        >
          Meh<span className="italic text-[#5C2A32]">Rāj</span>
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="mt-7 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A6906F]"
        >
          Not Cut From The Common Cloth
        </p>
      </div>

      {/* Scroll cue */}
      <div
        ref={cueRef}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-3 opacity-0"
        aria-hidden="true"
      >
        <span className="font-sans text-[9px] font-medium uppercase tracking-[0.35em] text-[#1B1B18]/50">
          Enter The House
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-[#A6906F] to-transparent" />
      </div>
    </section>
  );
}