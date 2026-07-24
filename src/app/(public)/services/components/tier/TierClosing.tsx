"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";
import type { TierData } from "../../data/tiers";

gsap.registerPlugin(ScrollTrigger);

export default function TierClosing({ tier }: { tier: TierData }) {
 const sectionRef = useGsap<HTMLElement>(() => {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    if (!sectionRef.current) return; // guard clause

    gsap.fromTo(
      sectionRef.current.querySelector(".closing-content"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
    );
  });
  return () => mm.revert();
}, []);

  return (
    <section ref={sectionRef} className="relative py-28 px-6" style={{ background: "var(--color-bg)" }}>
      <div className="accent-rule absolute top-0 left-0 right-0" />

      <div className="max-w-3xl mx-auto text-center closing-content">
        <div className="eyebrow justify-center mb-6">
          <span>{tier.closingHeading}</span>
        </div>
        <p
          className="mb-16"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)", color: "var(--color-ink)", lineHeight: "1.6", fontWeight: 300 }}
        >
          {tier.closing}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {tier.prev && (
            <Link
              href={`/services/${tier.prev.slug}`}
              className="flex items-center gap-2 px-6 py-3 rounded-sm text-sm font-medium transition-colors duration-300"
              style={{ border: "1px solid var(--color-border)", color: "var(--color-ink-muted)" }}
            >
              <ArrowLeft size={15} /> {tier.prev.label}
            </Link>
          )}
          <Link
            href="/services"
            className="px-6 py-3 rounded-sm text-sm font-semibold tracking-wide uppercase"
            style={{ background: "var(--color-green)", color: "#F7F7F4" }}
          >
            All Services
          </Link>
          {tier.next && (
            <Link
              href={`/services/${tier.next.slug}`}
              className="flex items-center gap-2 px-6 py-3 rounded-sm text-sm font-medium transition-colors duration-300"
              style={{ border: "1px solid var(--color-border)", color: "var(--color-ink-muted)" }}
            >
              {tier.next.label} <ArrowRight size={15} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}