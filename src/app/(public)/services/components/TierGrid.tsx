"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";
import { TIER_SUMMARIES } from "../data/tiers";
import ServiceImagePlaceholder from "./ServiceImagePlaceholder";

gsap.registerPlugin(ScrollTrigger);

export default function TierGrid() {
  const cardsRef = useRef<HTMLAnchorElement[]>([]);

  const sectionRef = useGsap<HTMLElement>(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    });
    return () => mm.revert();
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>, i: number) => {
    const el = cardsRef.current[i];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: x * 6,
      rotateX: -y * 6,
      transformPerspective: 1000,
      borderColor: "rgba(31,74,56,0.3)",
      boxShadow: "0 30px 60px rgba(28,28,26,0.09)",
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleLeave = (i: number) => {
    const el = cardsRef.current[i];
    if (!el) return;
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      borderColor: "var(--color-border)",
      boxShadow: "0 15px 35px rgba(28,28,26,0.05)",
      duration: 0.6,
      ease: "expo.out",
    });
  };

  return (
    <section ref={sectionRef} className="relative py-24 px-6" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TIER_SUMMARIES.map((tier, i) => (
            <Link
              key={tier.slug}
              href={`/services/${tier.slug}`}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              onMouseMove={(e) => handleMove(e, i)}
              onMouseLeave={() => handleLeave(i)}
              className="group relative flex flex-col rounded-sm overflow-hidden"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "0 15px 35px rgba(28,28,26,0.05)",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              <ServiceImagePlaceholder label={tier.imageAlt} aspect="16/10" className="rounded-none border-0 border-b" />

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-3xl font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-brass)", opacity: 0.5 }}
                  >
                    {tier.number}
                  </span>
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase px-3 py-1 rounded-full"
                    style={{ color: "var(--color-green)", background: "var(--color-green-soft-2)" }}
                  >
                    {tier.label}
                  </span>
                </div>

                <h3
                  className="font-semibold mb-3"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", color: "var(--color-ink)", letterSpacing: "-0.01em" }}
                >
                  {tier.name}
                </h3>

                <p className="mb-8 flex-1" style={{ color: "var(--color-ink-muted)", fontSize: "0.92rem", lineHeight: "1.75" }}>
                  {tier.blurb}
                </p>

                <div
                  className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase pt-5"
                  style={{ color: "var(--color-green)", borderTop: "1px solid var(--color-border)" }}
                >
                  Explore {tier.label}
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}