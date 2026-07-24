"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

interface HeroSectionProps {
  videoSrc?:    string;
  posterSrc?:   string;
  heading?:     string;
  subheading?:  string;
  ctaLabel?:    string;
  ctaHref?:     string;
  ctaSecLabel?: string;
  ctaSecHref?:  string;
}

export default function HeroSection({
  videoSrc    = "/videos/hero.mp4",
  posterSrc   = "/hero-poster.jpg",
  heading     = "Experience Premium Car Care & Genuine Parts",
  subheading  = "Expert maintenance, diagnostics, and a curation of elite automotive components for discerning drivers.",
  ctaLabel    = "Explore Services",
  ctaHref     = "/services",
  ctaSecLabel = "View Collection",
  ctaSecHref  = "/shop",
}: HeroSectionProps) {
  const videoRef     = useRef<HTMLVideoElement>(null);
  const eyebrowRef   = useRef<HTMLDivElement>(null);
  const headingRef   = useRef<HTMLHeadingElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const ctaWrapRef   = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const ruleLeftRef  = useRef<HTMLDivElement>(null);
  const ruleRightRef = useRef<HTMLDivElement>(null);
  const ambientRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (videoRef.current) {
      gsap.fromTo(videoRef.current, { opacity: 0 }, { opacity: 1, duration: 2.4, ease: "power2.out", delay: 0.1 });
    }

    const els = [
      eyebrowRef.current, headingRef.current, subRef.current,
      ctaWrapRef.current, statsRef.current, scrollRef.current,
      ruleLeftRef.current, ruleRightRef.current,
    ];

    if (prefersReduced) {
      gsap.set(els, { opacity: 1, y: 0, scaleX: 1 });
      return;
    }

    if (ambientRef.current) {
      gsap.to(ambientRef.current, {
        scale: 1.15, opacity: 0.6, duration: 4,
        ease: "sine.inOut", repeat: -1, yoyo: true,
      });
    }

    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(ruleLeftRef.current, { scaleX: 0, transformOrigin: "right center" }, { scaleX: 1, duration: 0.9, ease: "expo.out" })
      .fromTo(ruleRightRef.current, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.9, ease: "expo.out" }, "<")
      .fromTo(eyebrowRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5");

    const lines = headingRef.current?.querySelectorAll(".hero-line");
    if (lines?.length) {
      tl.fromTo(Array.from(lines), { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.14 }, "-=0.3");
    }

    tl.fromTo(subRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" }, "-=0.4")
      .fromTo(ctaWrapRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }, "-=0.35");

    if (statsRef.current) {
      tl.fromTo(Array.from(statsRef.current.children), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.12 }, "-=0.3");
    }

    tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.15");

    const dot = scrollRef.current?.querySelector(".scroll-dot");
    if (dot) {
      gsap.to(dot, { y: 14, duration: 1.4, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 2 });
    }
  }, []);

  const STATS = [
    { value: "12+",    label: "Years of Excellence" },
    { value: "4,800+", label: "Vehicles Serviced" },
    { value: "98%",    label: "Client Satisfaction" },
  ];

  const [headPart1, headPart2] = heading.includes("&")
    ? heading.split("&").map((s) => s.trim())
    : [heading, ""];

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#111611]" aria-label="Hero">
      {/* Video layer */}
      <div className="absolute inset-0 z-0">
        {/* <video
          ref={videoRef}
          className="h-full w-full object-cover"
          style={{ opacity: 0, filter: "brightness(0.75) saturate(1.05)" }}
          src={videoSrc}
          poster={posterSrc}
          autoPlay muted loop playsInline preload="metadata" aria-hidden
        /> */}
      </div>

      {/* Scrim for text legibility — fades into the light body at the bottom */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#F7F7F4] to-transparent" />
      </div>

      {/* Ambient brass glow */}
      <div
        ref={ambientRef}
        aria-hidden
        className="pointer-events-none absolute z-[2] left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "600px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(201,160,99,0.16) 0%, transparent 70%)",
          filter: "blur(60px)", opacity: 0.5,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-36 pt-32 text-center md:px-12">
        <div className="mb-8 flex items-center gap-6">
          <div ref={ruleLeftRef} aria-hidden className="h-px w-16 md:w-20" style={{ background: "linear-gradient(to left, #C9A063, transparent)", opacity: 0 }} />
          <div ref={eyebrowRef} className="font-body text-[10px] uppercase tracking-[0.36em] text-[#C9A063]" style={{ opacity: 0 }}>
            Premium Automotive
          </div>
          <div ref={ruleRightRef} aria-hidden className="h-px w-16 md:w-20" style={{ background: "linear-gradient(to right, #C9A063, transparent)", opacity: 0 }} />
        </div>

        <h1
          ref={headingRef}
          className="mx-auto max-w-[900px] font-display font-semibold leading-[1.06] tracking-[-0.02em] text-white"
          style={{ fontSize: "clamp(2.3rem, 5.6vw, 4.5rem)" }}
        >
          <span className="hero-line block" style={{ opacity: 0 }}>{headPart1}</span>
          {headPart2 && (
            <span className="hero-line block mt-2" style={{ opacity: 0, color: "#C9A063" }}>
              &amp; {headPart2}
            </span>
          )}
        </h1>

        <div aria-hidden className="mx-auto mt-8 h-px w-12" style={{ background: "linear-gradient(to right, transparent, rgba(201,160,99,0.6), transparent)" }} />

        <p
          ref={subRef}
          className="mx-auto mt-7 max-w-[480px] font-body leading-[1.85] text-white/75"
          style={{ opacity: 0, fontSize: "clamp(0.85rem, 1.5vw, 0.9375rem)" }}
        >
          {subheading}
        </p>

        <div ref={ctaWrapRef} className="mt-11 flex flex-wrap items-center justify-center gap-4" style={{ opacity: 0 }}>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-sm bg-[#C9A063] px-7 py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[#171712] transition-colors duration-300 hover:bg-[#dab077]"
          >
            {ctaLabel}
          </Link>
          <Link
            href={ctaSecHref}
            className="inline-flex items-center gap-2 rounded-sm border border-white/30 px-7 py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-white/10"
          >
            {ctaSecLabel}
          </Link>
        </div>

        <div ref={statsRef} className="mt-20 flex flex-wrap items-center justify-center gap-12 md:gap-24" aria-label="Key statistics">
          {STATS.map((s, i) => (
            <div key={s.label} className="relative flex flex-col items-center gap-2">
              {i > 0 && (
                <div aria-hidden className="absolute -left-6 top-1/2 hidden h-10 w-px -translate-y-1/2 md:block bg-white/15" />
              )}
              <span
                className="font-mono font-semibold leading-none text-[#C9A063]"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)" }}
              >
                {s.value}
              </span>
              <span className="font-body text-[9px] uppercase tracking-[0.24em] text-white/55">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={scrollRef} className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2" style={{ opacity: 0 }} aria-hidden>
        <div className="flex flex-col items-center gap-2">
          <span className="font-body text-[8px] uppercase tracking-[0.4em] text-white/40">Scroll</span>
          <div className="relative h-10 w-px overflow-hidden bg-white/15">
            <div className="scroll-dot absolute top-0 h-5 w-px" style={{ background: "linear-gradient(to bottom, transparent, #C9A063, transparent)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}