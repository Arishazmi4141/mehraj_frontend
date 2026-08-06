"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";

const INK = "#0A1118";
const INK_MUTED = "rgba(10,17,24,0.65)";
const INK_FAINT = "rgba(10,17,24,0.45)";
const GOLD = "#B89752";
const GOLD_LIGHT = "#D4BC85";
const GOLD_GLOW = "rgba(184,151,82,0.16)";
const BORDER = "rgba(10,17,24,0.1)";

export default function AboutHero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);
  const stripeGoldRef = useRef<HTMLDivElement>(null);
  const stripeGoldLightRef = useRef<HTMLDivElement>(null);

  const containerRef = useGsap<HTMLDivElement>((ctx) => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.set(
        [breadcrumbRef.current, subRef.current, scrollIndicatorRef.current, stripeGoldRef.current, stripeGoldLightRef.current],
        { opacity: 1, scaleX: 1, y: 0 }
      );
      const words = headingRef.current?.querySelectorAll(".word-reveal");
      if (words) gsap.set(words, { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      stripeGoldRef.current,
      { scaleX: 0, transformOrigin: "center" },
      { scaleX: 1, duration: 1.1, ease: "power3.inOut" }
    ).fromTo(
      stripeGoldLightRef.current,
      { scaleX: 0, transformOrigin: "center" },
      { scaleX: 1, duration: 1.1, ease: "power3.inOut" },
      "<0.08"
    );

    tl.fromTo(glowRef.current, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1.6 }, 0.15)
      .fromTo(glowRef2.current, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 2 }, 0.35);

    tl.fromTo(breadcrumbRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8 }, 0.5)
      .fromTo(".about-eyebrow", { opacity: 0, y: 10, letterSpacing: "0.25em" }, { opacity: 1, y: 0, letterSpacing: "0.35em", duration: 0.8 }, 0.6);

    const words = headingRef.current?.querySelectorAll(".word-reveal");
    if (words?.length) {
      tl.fromTo(
        Array.from(words),
        { clipPath: "inset(0 0 100% 0)", yPercent: 60, opacity: 0, rotateX: -25 },
        {
          clipPath: "inset(0 0 0% 0)",
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.3,
          stagger: 0.14,
          ease: "power4.out",
        },
        0.6
      );
    }

    tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 0.9)
      .fromTo(scrollIndicatorRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.8 }, 1.2);

    gsap.to(glowRef.current, { x: 24, y: -16, duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(scrollIndicatorRef.current, { y: 4, duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut" });

    const scrollTick = scrollIndicatorRef.current?.querySelector(".scroll-tick");
    if (scrollTick) {
      gsap.to(scrollTick, { y: 20, opacity: 0, duration: 1.8, repeat: -1, ease: "power2.inOut" });
    }
  }, []);

  const headingWords = ["Precision.", "Passion.", "Premium."];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAFAFA] selection:bg-[#0A1118] selection:text-white"
    >
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{ background: `radial-gradient(ellipse 60% 50% at 50% 45%, ${GOLD_GLOW} 0%, transparent 65%)` }}
        aria-hidden="true"
      />
      <div
        ref={glowRef2}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{ background: "radial-gradient(ellipse 45% 40% at 50% 65%, rgba(184,151,82,0.1) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="absolute top-28 left-1/2 -translate-x-1/2 w-40 flex flex-col gap-[3px] z-0" aria-hidden="true">
        <div ref={stripeGoldRef} className="h-[3px] w-full scale-x-0" style={{ background: GOLD }} />
        <div ref={stripeGoldLightRef} className="h-[1.5px] w-full scale-x-0" style={{ background: GOLD_LIGHT }} />
      </div>

      <div
        ref={breadcrumbRef}
        className="absolute top-44 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.4em] opacity-0 z-10"
        style={{ color: INK_FAINT }}
      >
        <Link href="/" className="transition-colors duration-300 hover:text-[#B89752]" style={{ color: INK_FAINT }}>
          Home
        </Link>
        <ChevronRight size={9} style={{ color: GOLD_LIGHT }} />
        <span style={{ color: GOLD }}>Corporate Profile</span>
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto mt-28">
        <div className="about-eyebrow eyebrow justify-center mb-10 opacity-0">
          <span style={{ color: GOLD }}>MehRaj Identity Module</span>
        </div>

        <h1
          ref={headingRef}
          className="font-display font-light leading-[1.2] tracking-[0.02em] mb-12"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6.5vw, 5.2rem)", perspective: "1200px", color: INK }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-[0.4em] gap-y-3">
            {headingWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden py-1">
                <span
                  className="word-reveal inline-block opacity-0 will-change-transform"
                  style={{ color: i === 1 ? GOLD : INK, fontWeight: i === 1 ? 500 : 300 }}
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
          style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.85rem, 1.6vw, 0.95rem)", letterSpacing: "0.02em", color: INK_MUTED }}
        >
          Executing an elite technical matrix of independent luxury automotive tailoring &mdash; formulated upon advanced computational mechanics, track diagnostics, and custom components handling.
        </p>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 flex flex-col items-center gap-3 opacity-0 cursor-pointer group"
        aria-hidden="true"
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" })}
      >
        <span
          className="font-body text-[8px] font-semibold tracking-[0.5em] uppercase transition-colors duration-300 group-hover:text-[#B89752]"
          style={{ color: INK_FAINT }}
        >
          Scroll
        </span>
        <div className="relative h-10 w-[1px]" style={{ background: BORDER }}>
          <div className="scroll-tick absolute top-13 left-0 h-3 w-[1px]" style={{ background: GOLD }} />
        </div>
      </div>
    </section>
  );
}