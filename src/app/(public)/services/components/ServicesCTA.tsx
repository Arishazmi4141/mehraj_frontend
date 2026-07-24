"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesCTA() {
  const sectionRef = useGsap<HTMLElement>(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-6" style={{ background: "var(--color-surface-alt)" }}>
      <div
        className="max-w-5xl mx-auto rounded-sm px-10 py-16 text-center relative overflow-hidden"
        style={{ background: "var(--color-green)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(247,247,244,1) 1px, transparent 1px), linear-gradient(90deg, rgba(247,247,244,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <h2
          className="font-bold mb-5 relative z-10"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#F7F7F4", letterSpacing: "-0.02em" }}
        >
          Not sure which tier fits your car?
        </h2>
        <p className="max-w-xl mx-auto mb-9 relative z-10" style={{ color: "rgba(247,247,244,0.75)", lineHeight: "1.75" }}>
          Start with a conversation. We'll walk through what your vehicle actually needs before recommending anything.
        </p>
        <Link
          href="/contact"
          className="relative z-10 inline-flex items-center gap-2 px-8 py-4 rounded-sm text-sm font-semibold tracking-wide uppercase transition-transform duration-300 hover:-translate-y-0.5"
          style={{ background: "var(--color-brass)", color: "#1C1C1A" }}
        >
          Book a Consultation
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}