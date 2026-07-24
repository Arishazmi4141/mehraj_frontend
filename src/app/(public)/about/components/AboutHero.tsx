"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";

export default function AboutHero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);
  const stripeGreenRef = useRef<HTMLDivElement>(null);
  const stripeBrassRef = useRef<HTMLDivElement>(null);

  const containerRef = useGsap<HTMLDivElement>((ctx) => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.set(
        [breadcrumbRef.current, subRef.current, scrollIndicatorRef.current, stripeGreenRef.current, stripeBrassRef.current],
        { opacity: 1, scaleX: 1, y: 0 }
      );
      const words = headingRef.current?.querySelectorAll(".word-reveal");
      if (words) gsap.set(words, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Signature racing pinstripe — draws in from center, green leads, brass trails
    tl.fromTo(
      stripeGreenRef.current,
      { scaleX: 0, transformOrigin: "center" },
      { scaleX: 1, duration: 1.1, ease: "power3.inOut" }
    ).fromTo(
      stripeBrassRef.current,
      { scaleX: 0, transformOrigin: "center" },
      { scaleX: 1, duration: 1.1, ease: "power3.inOut" },
      "<0.08"
    );

    // 2. Soft ambient tint layers
    tl.fromTo(glowRef.current, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1.6 }, 0.15)
      .fromTo(glowRef2.current, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 2 }, 0.35);

    // 3. Meta sequence
    tl.fromTo(breadcrumbRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8 }, 0.5)
      .fromTo(".about-eyebrow", { opacity: 0, y: 10, letterSpacing: "0.25em" }, { opacity: 1, y: 0, letterSpacing: "0.35em", duration: 0.8 }, 0.6);

    // 4. Word-reveal heading
    const words = headingRef.current?.querySelectorAll(".word-reveal");
    if (words?.length) {
      tl.fromTo(
        Array.from(words),
        { yPercent: 100, opacity: 0, rotateX: -20 },
        { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.12, ease: "power4.out" },
        0.6
      );
    }

    // 5. Paragraph + scroll cue
    tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 0.9)
      .fromTo(scrollIndicatorRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.8 }, 1.2);

    // Continuous gentle drift on ambient tint
    gsap.to(glowRef.current, {
      x: 24,
      y: -16,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const scrollTick = scrollIndicatorRef.current?.querySelector(".scroll-tick");
    if (scrollTick) {
      gsap.to(scrollTick, {
        y: 20,
        opacity: 0,
        duration: 1.8,
        repeat: -1,
        ease: "power2.inOut",
      });
    }
  }, []);

  const headingWords = ["Precision.", "Passion.", "Premium."];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Ambient tint layers — warm, not neon */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 45%, var(--color-green-soft) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div
        ref={glowRef2}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          background: "radial-gradient(ellipse 45% 40% at 50% 65%, var(--color-brass-soft) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Signature pinstripe — racing livery reference, sits above the fold */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 w-40 flex flex-col gap-[3px] z-0" aria-hidden="true">
        <div ref={stripeGreenRef} className="h-[3px] w-full scale-x-0" style={{ background: "var(--color-green)" }} />
        <div ref={stripeBrassRef} className="h-[1.5px] w-full scale-x-0" style={{ background: "var(--color-brass)" }} />
      </div>

      {/* Breadcrumb */}
      <div
        ref={breadcrumbRef}
        className="absolute top-44 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.4em] opacity-0 z-10"
        style={{ color: "var(--color-ink-faint)" }}
      >
        <Link href="/" className="transition-colors duration-300" style={{ color: "var(--color-ink-faint)" }}>
          Home
        </Link>
        <ChevronRight size={9} style={{ color: "var(--color-brass)" }} />
        <span style={{ color: "var(--color-green)" }}>Corporate Profile</span>
      </div>

      {/* Core content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto mt-28">
        <div className="about-eyebrow eyebrow justify-center mb-10 opacity-0">
          <span>PAS Identity Module</span>
        </div>

        <h1
          ref={headingRef}
          className="font-display font-light leading-[1.2] tracking-[0.02em] mb-12"
          style={{
            fontSize: "clamp(2.5rem, 6.5vw, 5.2rem)",
            perspective: "1200px",
            color: "var(--color-ink)",
          }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-[0.4em] gap-y-3">
            {headingWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden py-1">
                <span
                  className="word-reveal inline-block opacity-0 will-change-transform"
                  style={{
                    color: i === 1 ? "var(--color-green)" : "var(--color-ink)",
                    fontWeight: i === 1 ? 500 : 300,
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </div>
        </h1>

        <p
          ref={subRef}
          className="mx-auto max-w-2xl font-body font-light leading-[1.9] opacity-0"
          style={{
            fontSize: "clamp(0.85rem, 1.6vw, 0.95rem)",
            letterSpacing: "0.02em",
            color: "var(--color-ink-muted)",
          }}
        >
          Executing an elite technical matrix of independent luxury automotive tailoring &mdash; formulated upon advanced computational mechanics, track diagnostics, and custom components handling.
        </p>
      </div>

      {/* Scroll cue */}
      <div ref={scrollIndicatorRef} className="absolute bottom-12 flex flex-col items-center gap-3 opacity-0" aria-hidden="true">
        <span className="font-body text-[8px] font-semibold tracking-[0.5em] uppercase" style={{ color: "var(--color-ink-faint)" }}>
          Scroll
        </span>
        <div className="relative h-10 w-[1px]" style={{ background: "var(--color-border-strong)" }}>
          <div className="scroll-tick absolute top-13 left-0 h-3 w-[1px]" style={{ background: "var(--color-green)" }} />
        </div>
      </div>
    </section>
  );
}