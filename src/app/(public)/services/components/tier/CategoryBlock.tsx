"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Info, Star } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";
import ServiceImagePlaceholder from "../ServiceImagePlaceholder";
import type { TierCategory } from "../../data/tiers";

export default function CategoryBlock({ category, position }: { category: TierCategory; position: number }) {
  const isReversed = position % 2 === 1;

  const labelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const sectionRef = useGsap<HTMLDivElement>(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: isReversed ? 20 : -20 },
        { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: sectionRef.current, start: "top 78%" } }
      );
      const items = contentRef.current?.querySelectorAll(".reveal-item");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: contentRef.current, start: "top 78%" },
          }
        );
      }
      const strips = stripRef.current?.querySelectorAll(".strip-card");
      if (strips) {
        gsap.fromTo(
          strips,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: stripRef.current, start: "top 88%" },
          }
        );
      }
    });
    return () => mm.revert();
  }, []);

  const dark = category.flagship;
  const inkColor = dark ? "#F7F7F4" : "var(--color-ink)";
  const mutedColor = dark ? "rgba(247,247,244,0.72)" : "var(--color-ink-muted)";
  const faintColor = dark ? "rgba(247,247,244,0.5)" : "var(--color-ink-faint)";
  const cardBg = dark ? "rgba(247,247,244,0.06)" : "var(--color-surface-alt)";
  const cardBorder = dark ? "rgba(247,247,244,0.14)" : "var(--color-border)";

  return (
    <div
      ref={sectionRef}
      className={`relative py-20 px-6 ${dark ? "rounded-sm mx-6 my-6" : ""}`}
      style={{ background: dark ? "var(--color-green)" : "transparent" }}
    >
      <div className="max-w-7xl mx-auto">
        {category.flagship && (
          <div
            className="reveal-item inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-[10px] tracking-[0.3em] uppercase font-semibold"
            style={{ background: "var(--color-brass)", color: "#1C1C1A" }}
          >
            <Star size={11} fill="#1C1C1A" /> Flagship Program
          </div>
        )}

        <div ref={labelRef} className="flex items-center gap-4 mb-10 opacity-0">
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: dark ? "var(--color-brass)" : "var(--color-brass)" }}>
            Category {category.index}
          </span>
          <span className="block h-px flex-1 max-w-[80px]" style={{ background: dark ? "rgba(247,247,244,0.3)" : "var(--color-border-strong)" }} />
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-start ${isReversed && !dark ? "lg:[&>*:first-child]:order-2" : ""}`}>
          {/* Image */}
          <div ref={imageRef} className="opacity-0 lg:sticky lg:top-32">
            {dark ? (
              <div
                className="relative overflow-hidden rounded-sm flex flex-col items-center justify-center gap-3"
                style={{ aspectRatio: "4/3", background: "rgba(247,247,244,0.06)", border: "1px dashed rgba(247,247,244,0.25)" }}
              >
                <span className="text-[10px] tracking-[0.25em] uppercase text-center px-6" style={{ color: "rgba(247,247,244,0.55)" }}>
                  {category.heading} — Image
                </span>
              </div>
            ) : (
              <ServiceImagePlaceholder label={`${category.heading} — Image`} aspect="4/3" />
            )}
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <h3
              className="reveal-item font-bold mb-8 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)", color: inkColor, letterSpacing: "-0.01em" }}
            >
              {category.heading}
            </h3>

            {/* Scope */}
            <div className="reveal-item mb-8">
              <div className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: dark ? "var(--color-brass)" : "var(--color-green)" }}>
                What's Included
              </div>
              <ul className="space-y-2.5">
                {category.scope.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check size={15} className="mt-0.5 flex-shrink-0" style={{ color: dark ? "var(--color-brass)" : "var(--color-green)" }} />
                    <span style={{ color: mutedColor, fontSize: "0.94rem", lineHeight: "1.6" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Approach */}
            <div className="reveal-item mb-8">
              <div className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: dark ? "var(--color-brass)" : "var(--color-green)" }}>
                Our Approach
              </div>
              <ul className="space-y-2.5">
                {category.approach.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: dark ? "rgba(247,247,244,0.5)" : "var(--color-ink-faint)" }} />
                    <span style={{ color: mutedColor, fontSize: "0.94rem", lineHeight: "1.6" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Advantages + What this involves */}
            <div className="reveal-item grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <div className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: faintColor }}>
                  Advantages
                </div>
                <ul className="space-y-2">
                  {category.advantages.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: mutedColor, lineHeight: "1.6" }}>
                      <Check size={13} className="mt-1 flex-shrink-0" style={{ color: dark ? "var(--color-brass)" : "var(--color-green)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: faintColor }}>
                  What This Involves
                </div>
                <ul className="space-y-2">
                  {category.involves.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: mutedColor, lineHeight: "1.6" }}>
                      <Info size={13} className="mt-1 flex-shrink-0" style={{ color: faintColor }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Success / Avoid / Protect strip */}
        <div ref={stripRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {[
            { label: "What Success Looks Like", value: category.successLooksLike },
            { label: "What We Actively Avoid", value: category.weAvoid },
            { label: "How We Protect You", value: category.howWeProtectYou },
          ].map((strip) => (
            <div
              key={strip.label}
              className="strip-card p-5 rounded-sm"
              style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
            >
              <div className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: dark ? "var(--color-brass)" : "var(--color-brass)" }}>
                {strip.label}
              </div>
              <p style={{ color: mutedColor, fontSize: "0.85rem", lineHeight: "1.6" }}>{strip.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}