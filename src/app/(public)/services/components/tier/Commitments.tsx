"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, X } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";
import type { TierCommitments } from "../../data/tiers";

gsap.registerPlugin(ScrollTrigger);

export default function Commitments({ commitments }: { commitments: TierCommitments }) {
  const sectionRef = useGsap<HTMLElement>(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cols = sectionRef.current?.querySelectorAll(".commit-col");
      if (cols) {
        gsap.fromTo(
          cols,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
        );
      }
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-6" style={{ background: "var(--color-surface-alt)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="eyebrow justify-center mb-5">
            <span>Our Commitments</span>
          </div>
          <h2
            className="font-bold"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--color-ink)", letterSpacing: "-0.02em" }}
          >
            What You Can Expect From Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="commit-col accent-card p-8 rounded-sm opacity-0">
            <div className="flex items-center gap-2 mb-6">
              <Check size={16} style={{ color: "var(--color-green)" }} />
              <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: "var(--color-green)" }}>
                We Will
              </span>
            </div>
            <ul className="space-y-4">
              {commitments.will.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--color-green)" }} />
                  <span style={{ color: "var(--color-ink-muted)", fontSize: "0.95rem", lineHeight: "1.7" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="commit-col accent-card p-8 rounded-sm opacity-0">
            <div className="flex items-center gap-2 mb-6">
              <X size={16} style={{ color: "var(--color-brass)" }} />
              <span className="text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: "var(--color-brass)" }}>
                We Never Will
              </span>
            </div>
            <ul className="space-y-4">
              {commitments.wont.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--color-brass)" }} />
                  <span style={{ color: "var(--color-ink-muted)", fontSize: "0.95rem", lineHeight: "1.7" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}