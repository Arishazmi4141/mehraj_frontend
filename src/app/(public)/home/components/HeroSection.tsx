"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

/**
 * Design tokens for MehRāj (light theme) — pulled from :root CSS variables
 * var(--color-ink)         Royal Charcoal   — headings, primary text
 * var(--color-bg)          Ivory Silk       — base background
 * var(--color-brass)       Antique Bronze   — dividers, secondary accent
 * var(--color-green)       Imperial Gold    — primary accent (CTAs, active states)
 * var(--color-green-deep)  Imperial Gold, deep — CTA fill
 * Wine #5C2A32 kept as a one-off jewel accent for this hero only (no CSS var defined for it yet)
 *
 * NOTE: swap the two <img> src values below for real product photography
 * (e.g. /products/hero-main.jpg, /products/hero-accent.jpg). Until then the
 * gradient fallback keeps the panels looking intentional, not broken.
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
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const panelAccentRef = useRef<HTMLDivElement>(null);
  const panelMainRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!containerRef.current || prefersReduced) return;

    let ctx: gsap.Context | undefined;

    const cancelWait = waitUntilVisible(containerRef.current, () => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.fromTo(eyebrowRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.8 });
        tl.fromTo(
          monogramRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1 },
          "-=0.4"
        );
        tl.fromTo(
          ruleRef.current,
          { width: 0, opacity: 0 },
          { width: "3rem", opacity: 1, duration: 0.8 },
          "-=0.6"
        );
        tl.fromTo(
          wordmarkRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.1 },
          "-=0.4"
        );
        tl.fromTo(
          taglineRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6"
        );
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6"
        );
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        );
        tl.fromTo(
          panelAccentRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 1.1 },
          "-=1.1"
        );
        tl.fromTo(
          panelMainRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.1 },
          "-=0.9"
        );
        tl.fromTo(
          tagRef.current,
          { opacity: 0, scale: 0.9, y: 10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7 },
          "-=0.4"
        );
        tl.fromTo(
          tickerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
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
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[var(--color-bg)] text-[var(--color-ink)]"
      id="hero"
    >
      {/* Subtle woven-fabric texture line grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-ink) 1px, transparent 1px), linear-gradient(to bottom, var(--color-ink) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 grid flex-1 grid-cols-1 items-center gap-16 px-6 pt-28 sm:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-20 lg:pt-24">
        {/* Left: identity + copy */}
        <div className="flex flex-col items-start text-left">
          <span
            ref={eyebrowRef}
            className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-[#5C2A32] opacity-0"
          >
            Atelier · Est. Rajkot
          </span>

          <div className="mt-8 flex items-center gap-4">
            <div
              ref={monogramRef}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border"
              style={{ borderColor: "color-mix(in srgb, var(--color-brass) 50%, transparent)" }}
            >
              <span className="font-serif text-xl italic text-[#5C2A32]">M</span>
            </div>
            <div ref={ruleRef} className="h-px w-0 bg-[var(--color-brass)]" aria-hidden="true" />
          </div>

          <h1
            ref={wordmarkRef}
            className="mt-6 font-serif text-[3rem] font-light leading-[1.02] tracking-[0.02em] text-[var(--color-ink)] sm:text-[4rem] lg:text-[5.25rem]"
          >
            Meh<span className="italic text-[#5C2A32]">Rāj</span>
          </h1>

          <p
            ref={taglineRef}
            className="mt-6 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-[var(--color-brass)]"
          >
            Not Cut From The Common Cloth
          </p>

          <p
            ref={descRef}
            className="mt-6 max-w-md font-sans text-[15px] leading-relaxed"
            style={{ color: "color-mix(in srgb, var(--color-ink) 70%, transparent)" }}
          >
            Heirloom textiles and hand-finished tailoring, cut for the modern
            silhouette. Every piece made to order in-house.
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/collections"
              className="inline-flex items-center rounded-sm px-8 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ background: "var(--color-green-deep)", color: "var(--color-surface)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-green)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-green-deep)")}
            >
              Explore The Edit
            </Link>
            <Link
              href="/lookbook"
              className="inline-flex items-center rounded-sm border px-8 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
              style={{ borderColor: "color-mix(in srgb, var(--color-ink) 30%, transparent)", color: "var(--color-ink)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "color-mix(in srgb, var(--color-ink) 30%, transparent)")}
            >
              View Lookbook
            </Link>
          </div>
        </div>

        {/* Right: product mosaic */}
        <div className="relative mx-auto h-[420px] w-full max-w-md sm:h-[480px] lg:mx-0 lg:h-[620px] lg:max-w-none">
          {/* Accent panel */}
          <div
            ref={panelAccentRef}
            className="absolute right-0 top-0 h-[42%] w-[58%] overflow-hidden rounded-sm shadow-xl opacity-0"
          >
            <div className="h-full w-full bg-gradient-to-br from-[#5C2A32] via-[#5C2A32]/90 to-[var(--color-ink)]">
              <img
                src="/products/hero-accent.jpg"
                alt="Wine silk stole, close detail"
                className="h-full w-full object-cover mix-blend-luminosity opacity-90"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </div>

          {/* Main panel */}
          <div
            ref={panelMainRef}
            className="absolute bottom-0 left-0 h-[72%] w-[68%] overflow-hidden rounded-sm shadow-2xl opacity-0"
          >
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, color-mix(in srgb, var(--color-brass) 40%, transparent), var(--color-bg), color-mix(in srgb, var(--color-green) 30%, transparent))",
              }}
            >
              <img
                src="/products/hero-main.jpg"
                alt="Charcoal linen kurta on model"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </div>

          {/* Floating product tag */}
          <div
            ref={tagRef}
            className="absolute bottom-6 left-[52%] w-[15rem] -translate-x-1/2 rounded-sm border bg-[var(--color-bg)] px-5 py-4 opacity-0 shadow-lg lg:left-[62%]"
            style={{ borderColor: "color-mix(in srgb, var(--color-brass) 40%, transparent)" }}
          >
            <p className="font-serif text-[15px] italic leading-tight text-[var(--color-ink)]">
              The Zardozi Sherwani
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--color-brass)]">
                Festive Edit
              </span>
              <span className="font-sans text-[13px] font-semibold text-[var(--color-green)]">
                ₹24,500
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category ticker */}
      <div
        ref={tickerRef}
        className="relative z-10 mt-16 overflow-hidden border-y py-3 opacity-0"
        style={{ borderColor: "color-mix(in srgb, var(--color-ink) 10%, transparent)" }}
      >
        <div className="ticker-track flex w-max gap-16 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-16" aria-hidden={i === 1}>
              {["New Arrivals", "Festive Edit", "Atelier Exclusives", "Made To Order", "Winter Wovens"].map(
                (label) => (
                  <span
                    key={label}
                    className="font-sans text-[11px] font-medium uppercase tracking-[0.35em]"
                    style={{ color: "color-mix(in srgb, var(--color-ink) 50%, transparent)" }}
                  >
                    {label}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ticker-track {
          animation: ticker-scroll 28s linear infinite;
        }
        @keyframes ticker-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}