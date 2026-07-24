"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Eye, Shield } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

const MVV = [
  {
    icon: Target,
    label: "Mission",
    heading: "Our Mission",
    body: "LMS is more than a service provider — we fuel the ambitions of our customers with extensive, future-proof services. Our clients are assets, and we treat them accordingly: with transparency, dedication, and complete accountability.",
  },
  {
    icon: Eye,
    label: "Vision",
    heading: "Our Vision",
    body: "To be London's most trusted automotive partner — a one-stop solution where every vehicle leaves in better condition than it arrived, and every client leaves with complete peace of mind.",
  },
  {
    icon: Shield,
    label: "Values",
    heading: "Our Values",
    body: "Exceptional service with complete dedication. We pledge to go above and beyond — honesty in every diagnosis, precision in every repair, and lifetime trust in every relationship we build.",
  },
];

export default function MissionVision() {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const lineRefs = useRef<HTMLDivElement[]>([]);

  const sectionRef = useGsap<HTMLElement>((ctx) => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.96, rotateX: 8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.9,
            delay: i * 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    });

    ctx.add(() => mm.revert());
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const el = cardsRef.current[i];
    const line = lineRefs.current[i];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: x * 10,
      rotateX: -y * 10,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
      boxShadow: `0 30px 70px rgba(28,28,26,0.1), ${-x * 14}px ${18 - y * 14}px 40px rgba(28,28,26,0.06)`,
    });
    gsap.to(line, { scaleX: 1, duration: 0.4, ease: "power2.out" });
  };

  const handleMouseEnter = (i: number) => {
    const el = cardsRef.current[i];
    if (!el) return;
    gsap.to(el, { borderColor: "rgba(31,74,56,0.35)", duration: 0.4, ease: "power2.out" });
  };

  const handleMouseLeave = (i: number) => {
    const el = cardsRef.current[i];
    const line = lineRefs.current[i];
    if (!el) return;
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      borderColor: "var(--color-border)",
      boxShadow: "0 20px 45px rgba(28,28,26,0.06)",
      duration: 0.6,
      ease: "expo.out",
    });
    gsap.to(line, { scaleX: 0, duration: 0.4, ease: "power2.out" });
  };

  return (
    <section ref={sectionRef} className="relative py-32 px-6" style={{ background: "var(--color-surface-alt)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 20% 50%, var(--color-green-soft) 0%, transparent 50%)" }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="eyebrow justify-center mb-6">
            <span>Purpose</span>
            <span aria-hidden className="block h-px w-8" style={{ background: "var(--color-green)" }} />
          </div>
          <h2
            className="font-bold"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "var(--color-ink)",
              letterSpacing: "-0.02em",
            }}
          >
            A Mission With a Vision
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MVV.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
                className="relative p-8 rounded-sm cursor-default"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  transformStyle: "preserve-3d",
                  boxShadow: "0 20px 45px rgba(28,28,26,0.06)",
                  willChange: "transform",
                }}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-sm mb-6"
                  style={{ background: "var(--color-green-soft-2)", border: "1px solid rgba(31,74,56,0.18)" }}
                >
                  <Icon size={22} style={{ color: "var(--color-green)" }} />
                </div>

                <div className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--color-brass)" }}>
                  {item.label}
                </div>

                <h3
                  className="font-semibold mb-4"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--color-ink)", letterSpacing: "-0.01em" }}
                >
                  {item.heading}
                </h3>

                <p style={{ color: "var(--color-ink-muted)", lineHeight: "1.75", fontSize: "0.95rem" }}>
                  {item.body}
                </p>

                <div
                  ref={(el) => {
                    if (el) lineRefs.current[i] = el;
                  }}
                  className="absolute bottom-0 left-8 right-8 h-px"
                  style={{
                    background: "linear-gradient(to right, transparent, var(--color-green), transparent)",
                    transform: "scaleX(0)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}