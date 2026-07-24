"use client";

import { useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";
import ServiceImagePlaceholder from "./ServiceImagePlaceholder";

export default function ServicesHero() {
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const stripeGreenRef = useRef<HTMLDivElement>(null);
  const stripeBrassRef = useRef<HTMLDivElement>(null);

  const containerRef = useGsap<HTMLDivElement>(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.set(
        [breadcrumbRef.current, headingRef.current, subRef.current, imageRef.current, stripeGreenRef.current, stripeBrassRef.current],
        { opacity: 1, y: 0, scaleX: 1 }
      );
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(stripeGreenRef.current, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 1, ease: "power3.inOut" })
      .fromTo(stripeBrassRef.current, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 1, ease: "power3.inOut" }, "<0.08")
      .fromTo(breadcrumbRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, 0.3)
      .fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 0.4)
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 0.65)
      .fromTo(imageRef.current, { opacity: 0, y: 40, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "expo.out" }, 0.5);
  }, []);

  return (
    <section ref={containerRef} className="relative pt-40 pb-24 px-6 overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 30% 20%, var(--color-green-soft) 0%, transparent 65%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={breadcrumbRef} className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.4em] mb-8 opacity-0" style={{ color: "var(--color-ink-faint)" }}>
          <Link href="/" style={{ color: "var(--color-ink-faint)" }}>Home</Link>
          <ChevronRight size={9} style={{ color: "var(--color-brass)" }} />
          <span style={{ color: "var(--color-green)" }}>Services</span>
        </div>

        <div className="flex flex-col gap-1 mb-10 w-24" aria-hidden="true">
          <div ref={stripeGreenRef} className="h-[3px] w-full scale-x-0" style={{ background: "var(--color-green)" }} />
          <div ref={stripeBrassRef} className="h-[1.5px] w-full scale-x-0" style={{ background: "var(--color-brass)" }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-end">
          <div>
            <h1
              ref={headingRef}
              className="font-display font-light leading-[1.15] mb-8 opacity-0"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)", color: "var(--color-ink)", letterSpacing: "-0.01em" }}
            >
              Three tiers.
              <br />
              <span style={{ color: "var(--color-green)", fontWeight: 500 }}>One engineering standard.</span>
            </h1>
            <p
              ref={subRef}
              className="max-w-lg font-body font-light leading-[1.9] opacity-0"
              style={{ fontSize: "1rem", color: "var(--color-ink-muted)" }}
            >
              Every service we offer sits inside a structured tier — from full vehicle transformation to the diagnostic work that earns your trust in the first place. Explore each one below.
            </p>
          </div>

          <div ref={imageRef} className="opacity-0">
            <ServiceImagePlaceholder label="Services Hero Image" aspect="4/3" />
          </div>
        </div>
      </div>
    </section>
  );
}