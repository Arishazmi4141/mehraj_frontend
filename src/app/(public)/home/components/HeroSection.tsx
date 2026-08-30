"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import TrendingShowcase from "./TrendingShowcase";

/**
 * Design tokens for MehRāj (premium dark theme) — from the logo palette
 * var(--color-ink)         #0A0200  — near-black canvas, base background
 * var(--color-wine)        #3D1214  — deep wine, panels / CTA fill / accents
 * var(--color-brass)       #756961  — warm taupe, dividers, secondary text
 * var(--color-ivory)       #EDE7DF  — off-white, used ONLY for body text
 *                                      readability on the dark canvas
 *                                      (not in your 3-color logo palette,
 *                                      kept as close to ivory/brass as
 *                                      possible so it doesn't read as a
 *                                      4th brand color — swap the hex if
 *                                      you already have an ivory token)
 *
 * Logo: /public/logo-bg.png — two-soldier crest with "MEHRĀJ" wordmark
 * baked into the PNG. It now replaces the old text wordmark entirely,
 * sitting where "MehRāj" used to be, with a soft wine glow behind it
 * for a premium/emblem feel.
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
  const logoGlowRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
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
          logoGlowRef.current,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 1.2 },
          "-=0.4"
        );
        tl.fromTo(
          logoRef.current,
          { opacity: 0, y: 20, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1 },
          "-=0.9"
        );
        tl.fromTo(
          ruleRef.current,
          { width: 0, opacity: 0 },
          { width: "3rem", opacity: 1, duration: 0.8 },
          "-=0.5"
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
      className="relative flex min-h-[95vh] w-full flex-col overflow-hidden"
      style={{ background: "#0A0200", color: "#EDE7DF" }}
      id="hero"
    >
      {/* Subtle woven-fabric texture line grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #756961 1px, transparent 1px), linear-gradient(to bottom, #756961 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      {/* Deep wine vignette so the near-black canvas doesn't feel flat */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 20%, rgba(61,18,20,0.55) 0%, rgba(10,2,0,0) 55%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 grid flex-1 grid-cols-1 items-center gap-10 px-6 pt-16 sm:px-10 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-20 lg:pt-14">
        {/* Left: identity + copy */}
        <div className="flex flex-col items-start text-left">
          <span
            ref={eyebrowRef}
            className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] opacity-0"
            style={{ color: "#B98F8F" }}
          >
            Atelier · Est. Rajkot
          </span>

          {/* Logo crest — replaces the old text wordmark */}
          <div className="relative mt-8">
            <div
              ref={logoGlowRef}
              className="pointer-events-none absolute -inset-10 opacity-0"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(61,18,20,0.65), rgba(61,18,20,0) 72%)",
              }}
              aria-hidden="true"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={logoRef}
              src="/logo-bg.png"
              alt="MehRāj — twin soldier crest"
              className="relative h-28 w-auto object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)] sm:h-32 lg:h-40"
            />
          </div>

          <div ref={ruleRef} className="mt-6 h-px w-0" style={{ background: "#756961" }} aria-hidden="true" />

          <p
            ref={taglineRef}
            className="mt-6 font-sans text-[11px] font-semibold uppercase tracking-[0.4em]"
            style={{ color: "#756961" }}
          >
            Not Cut From The Common Cloth
          </p>

          <p
            ref={descRef}
            className="mt-6 max-w-md font-sans text-[15px] leading-relaxed"
            style={{ color: "rgba(237,231,223,0.72)" }}
          >
            Heirloom textiles and hand-finished tailoring, cut for the modern
            silhouette. Every piece made to order in-house.
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/collections"
              className="inline-flex items-center rounded-sm px-8 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ background: "#3D1214", color: "#EDE7DF" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#54181B")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#3D1214")}
            >
              Explore The Edit
            </Link>
            <Link
              href="/lookbook"
              className="inline-flex items-center rounded-sm border px-8 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ borderColor: "rgba(117,105,97,0.5)", color: "#EDE7DF" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#756961")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(117,105,97,0.5)")}
            >
              BOOK A CONSULTANT
            </Link>
          </div>
        </div>

        {/* Right: product mosaic */}
       <TrendingShowcase />
      </div>

      {/* Category ticker */}
      <div
        ref={tickerRef}
        className="relative z-10 mt-8 overflow-hidden border-y py-3 opacity-0"
        style={{ borderColor: "rgba(117,105,97,0.2)" }}
      >
        <div className="ticker-track flex w-max gap-16 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-16" aria-hidden={i === 1}>
              {["New Arrivals", "Festive Edit", "Atelier Exclusives", "Made To Order", "Winter Wovens"].map(
                (label) => (
                  <span
                    key={label}
                    className="font-sans text-[11px] font-medium uppercase tracking-[0.35em]"
                    style={{ color: "rgba(117,105,97,0.8)" }}
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