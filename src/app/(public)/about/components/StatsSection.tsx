"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

const INK = "#0A1118";
const GOLD = "#B89752";
const GOLD_LIGHT = "#D4BC85";
const BORDER = "rgba(10,17,24,0.1)";
const INK_FAINT = "rgba(10,17,24,0.45)";
const SURFACE = "#FFFFFF";

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
          { opacity: 0, rotateY: -90, scale: 0.85, transformPerspective: 800 },
          {
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration: 0.9,
            delay: i * 0.12,
            ease: "expo.out",
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
            ease: "power3.out",
            delay: i * 0.1,
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].val).toString();
            },
            onComplete: () => {
              gsap.fromTo(
                el,
                { textShadow: "0 0 0px rgba(184,151,82,0)" },
                { textShadow: "0 0 14px rgba(184,151,82,0.4)", duration: 0.4, yoyo: true, repeat: 1 }
              );
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
      borderColor: "rgba(184,151,82,0.5)",
      boxShadow: "0 30px 60px rgba(184,151,82,0.14)",
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
      borderColor: BORDER,
      boxShadow: "0 10px 30px rgba(10,17,24,0.05)",
      duration: 0.6,
      ease: "expo.out",
    });
  };

  return (
    <section ref={sectionRef} className="relative py-28 px-6 overflow-hidden bg-[#FAFAFA]">
      <div className="accent-rule absolute top-0 left-0 right-0" style={{ background: BORDER }} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(184,151,82,0.1) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="eyebrow justify-center mb-5">
            <span style={{ color: GOLD }}>By the Numbers</span>
            <span aria-hidden className="block h-px w-8" style={{ background: GOLD }} />
          </div>
          <h2
            className="font-bold"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: INK, letterSpacing: "-0.02em" }}
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
                background: SURFACE,
                border: `1px solid ${BORDER}`,
                boxShadow: "0 10px 30px rgba(10,17,24,0.05)",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              <div
                className="font-bold leading-none mb-3"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: GOLD, letterSpacing: "-0.02em" }}
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

              <div className="text-xs tracking-[0.25em] uppercase" style={{ color: INK_FAINT }}>
                {stat.label}
              </div>

              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/4"
                style={{ background: GOLD_LIGHT, transition: "width 0.4s ease" }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="accent-rule absolute bottom-0 left-0 right-0" style={{ background: BORDER }} />
    </section>
  );
}