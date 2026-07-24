"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  {
    year: "2018",
    title: "The Beginning",
    desc: "London Motor Sports opened its doors in W12, with a small team and a big commitment to honest, expert automotive care.",
  },
  {
    year: "2019",
    title: "Growing Trust",
    desc: "Expanded our service range to 30+ offerings. Word spread across West London — quality and transparency earned us a loyal client base.",
  },
  {
    year: "2020",
    title: "Resilience",
    desc: "Despite industry-wide challenges, we adapted rapidly — introducing contactless booking and collection services for our community.",
  },
  {
    year: "2022",
    title: "60+ Services",
    desc: "Reached a landmark: over 60 repair and maintenance services, 1,000+ 5-star reviews, and a 98% repeat customer rate.",
  },
  {
    year: "2024",
    title: "London's Leading Garage",
    desc: "Recognised as W12's premier independent garage — a destination for drivers who demand precision, transparency, and premium care.",
  },
];

export default function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const dotRefs = useRef<HTMLDivElement[]>([]);

  const sectionRef = useGsap<HTMLElement>((ctx) => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "bottom 80%", scrub: 1 },
        }
      );

      itemsRef.current.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%" },
            onStart: () => {
              const dot = dotRefs.current[i];
              if (!dot) return;
              gsap.fromTo(
                dot,
                { scale: 0.3, boxShadow: "0 0 0 rgba(31,74,56,0)" },
                { scale: 1, boxShadow: "0 0 16px rgba(31,74,56,0.35)", duration: 0.6, ease: "back.out(2)" }
              );
            },
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
      rotateY: x * 6,
      rotateX: -y * 6,
      transformPerspective: 900,
      borderColor: "rgba(31,74,56,0.3)",
      boxShadow: "0 30px 60px rgba(28,28,26,0.09)",
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
      borderColor: "var(--color-border)",
      boxShadow: "0 15px 35px rgba(28,28,26,0.05)",
      duration: 0.6,
      ease: "expo.out",
    });
  };

  return (
    <section ref={sectionRef} className="relative py-32 px-6" style={{ background: "var(--color-surface-alt)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 80% 50%, var(--color-brass-soft) 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <div className="eyebrow justify-center mb-6">
            <span>Our Journey</span>
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
            Six Years of Excellence
          </h2>
        </div>

        <div className="relative">
          {/* Pinstripe vertical line — green core, brass hairline beside it */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: "var(--color-border-strong)" }}>
            <div
              ref={lineRef}
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, var(--color-green), var(--color-brass))" }}
            />
          </div>

          <div className="flex flex-col gap-16">
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={item.year}
                  ref={(el) => {
                    if (el) itemsRef.current[i] = el;
                  }}
                  className={`relative flex items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div
                    ref={(el) => {
                      if (el) cardRefs.current[i] = el;
                    }}
                    onMouseMove={(e) => handleMouseMove(e, i)}
                    onMouseLeave={() => handleMouseLeave(i)}
                    className="flex-1 p-7 rounded-sm cursor-default"
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      boxShadow: "0 15px 35px rgba(28,28,26,0.05)",
                      transformStyle: "preserve-3d",
                      willChange: "transform",
                    }}
                  >
                    <div className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "var(--color-brass)" }}>
                      {item.year}
                    </div>
                    <h3
                      className="font-semibold mb-3"
                      style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", fontSize: "1.1rem" }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ color: "var(--color-ink-muted)", fontSize: "0.9rem", lineHeight: "1.7" }}>
                      {item.desc}
                    </p>
                  </div>

                  <div className="relative z-10 flex-shrink-0">
                    <div
                      ref={(el) => {
                        if (el) dotRefs.current[i] = el;
                      }}
                      className="w-4 h-4 rounded-full"
                      style={{ background: "var(--color-green)", boxShadow: "0 0 12px rgba(31,74,56,0.3)" }}
                    />
                  </div>

                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}