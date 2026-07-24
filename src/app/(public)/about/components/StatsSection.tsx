"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 6, suffix: "+", label: "Years Experience" },
  { value: 60, suffix: "+", label: "Repair Services" },
  { value: 1300, suffix: "+", label: "5-Star Reviews" },
  { value: 98, suffix: "%+", label: "Repeat Customers" },
];

export default function StatsSection() {
  const countRefs = useRef<HTMLSpanElement[]>([]);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const sectionRef = useGsap<HTMLElement>((ctx) => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      cardRefs.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, rotateX: 10, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          }
        );
      });

      STATS.forEach((stat, i) => {
        const el = countRefs.current[i];
        if (!el) return;
        gsap.fromTo(
          { val: 0 },
          { val: stat.value },
          {
            duration: 2,
            ease: "power2.out",
            delay: i * 0.1,
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].val).toString();
            },
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
          }
        );
      });
    });

    ctx.add(() => mm.revert());
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const el = cardRefs.current[i];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: x * 8,
      rotateX: -y * 8,
      y: -6,
      transformPerspective: 700,
      borderColor: "rgba(31,74,56,0.4)",
      boxShadow: "0 30px 60px rgba(28,28,26,0.1)",
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (i: number) => {
    const el = cardRefs.current[i];
    if (!el) return;
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      y: 0,
      borderColor: "var(--color-border)",
      boxShadow: "0 10px 30px rgba(28,28,26,0.05)",
      duration: 0.6,
      ease: "expo.out",
    });
  };

  return (
    <section ref={sectionRef} className="relative py-28 px-6 overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <div className="accent-rule absolute top-0 left-0 right-0" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, var(--color-green-soft) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="eyebrow justify-center mb-5">
            <span>By the Numbers</span>
            <span aria-hidden className="block h-px w-8" style={{ background: "var(--color-green)" }} />
          </div>
          <h2
            className="font-bold"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              color: "var(--color-ink)",
              letterSpacing: "-0.02em",
            }}
          >
            Proof in Every Digit
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="relative text-center p-10 rounded-sm group cursor-default"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "0 10px 30px rgba(28,28,26,0.05)",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              <div
                className="font-bold leading-none mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: "var(--color-green)",
                  letterSpacing: "-0.02em",
                }}
              >
                <span
                  ref={(el) => {
                    if (el) countRefs.current[i] = el;
                  }}
                >
                  {stat.value}
                </span>
                <span>{stat.suffix}</span>
              </div>

              <div className="text-xs tracking-[0.25em] uppercase" style={{ color: "var(--color-ink-faint)" }}>
                {stat.label}
              </div>

              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/4"
                style={{ background: "var(--color-brass)", transition: "width 0.4s ease" }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="accent-rule absolute bottom-0 left-0 right-0" />
    </section>
  );
}