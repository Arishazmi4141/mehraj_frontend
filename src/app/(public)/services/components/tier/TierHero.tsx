"use client";

import { useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";
import ServiceImagePlaceholder from "../ServiceImagePlaceholder";
import type { TierData } from "../../data/tiers";

export default function TierHero({ tier }: { tier: TierData }) {
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const stripeGreenRef = useRef<HTMLDivElement>(null);
  const stripeBrassRef = useRef<HTMLDivElement>(null);

  const containerRef = useGsap<HTMLDivElement>(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = [
      breadcrumbRef.current,
      badgeRef.current,
      headingRef.current,
      philosophyRef.current,
      imageRef.current,
      stripeGreenRef.current,
      stripeBrassRef.current,
    ];

    if (prefersReduced) {
      gsap.set(targets, { opacity: 1, y: 0, scaleX: 1 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(stripeGreenRef.current, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 1, ease: "power3.inOut" })
      .fromTo(stripeBrassRef.current, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 1, ease: "power3.inOut" }, "<0.08")
      .fromTo(breadcrumbRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, 0.25)
      .fromTo(badgeRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, 0.35)
      .fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 0.45)
      .fromTo(philosophyRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 0.65)
      .fromTo(imageRef.current, { opacity: 0, y: 40, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "expo.out" }, 0.5);
  }, []);

  return (
    <section ref={containerRef} className="relative pt-40 pb-20 px-6 overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 50% at 25% 20%, var(--color-green-soft) 0%, transparent 65%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={breadcrumbRef} className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.4em] mb-8 opacity-0" style={{ color: "var(--color-ink-faint)" }}>
          <Link href="/" style={{ color: "var(--color-ink-faint)" }}>Home</Link>
          <ChevronRight size={9} style={{ color: "var(--color-brass)" }} />
          <Link href="/services" style={{ color: "var(--color-ink-faint)" }}>Services</Link>
          <ChevronRight size={9} style={{ color: "var(--color-brass)" }} />
          <span style={{ color: "var(--color-green)" }}>{tier.label}</span>
        </div>

        <div className="flex flex-col gap-1 mb-8 w-24" aria-hidden="true">
          <div ref={stripeGreenRef} className="h-[3px] w-full scale-x-0" style={{ background: "var(--color-green)" }} />
          <div ref={stripeBrassRef} className="h-[1.5px] w-full scale-x-0" style={{ background: "var(--color-brass)" }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-end">
          <div>
            <div ref={badgeRef} className="flex items-center gap-4 mb-6 opacity-0">
              <span className="text-4xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-brass)", opacity: 0.55 }}>
                {tier.number}
              </span>
              <span className="eyebrow">
                <span>{tier.eyebrow}</span>
              </span>
            </div>

            <h1
              ref={headingRef}
              className="font-display font-light leading-[1.15] mb-8 opacity-0"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "var(--color-ink)", letterSpacing: "-0.01em" }}
            >
              {tier.name}
            </h1>

            <div ref={philosophyRef} className="opacity-0 max-w-xl" style={{ borderLeft: "2px solid var(--color-green)", paddingLeft: "1.5rem" }}>
              <div className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--color-green)" }}>
                {tier.philosophyHeading}
              </div>
              <p style={{ color: "var(--color-ink-muted)", lineHeight: "1.85", fontSize: "0.98rem" }}>{tier.philosophy}</p>
            </div>
          </div>

          <div ref={imageRef} className="opacity-0">
            <ServiceImagePlaceholder label={tier.heroImageAlt} aspect="4/3" />
          </div>
        </div>
      </div>
    </section>
  );
}