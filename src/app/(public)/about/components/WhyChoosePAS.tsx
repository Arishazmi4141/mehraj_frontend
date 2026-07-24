"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wrench, Clock, ShieldCheck, BadgeCheck, Phone, RefreshCcw } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: Wrench,
    title: "60+ Repair Services",
    desc: "From brake repairs to full engine replacements — a comprehensive suite of services under one roof, handled by vetted specialists.",
  },
  {
    icon: Clock,
    title: "6 Days a Week",
    desc: "Our savvy professionals are available six days a week, so your vehicle never waits long for the attention it deserves.",
  },
  {
    icon: ShieldCheck,
    title: "Vetted Mechanics",
    desc: "Every technician on our team is rigorously vetted and trained — precision and professionalism in every repair.",
  },
  {
    icon: BadgeCheck,
    title: "Mark-Free Replacements",
    desc: "Engine parts, panels, and components replaced without a mark or trace — factory-standard quality, every time.",
  },
  {
    icon: Phone,
    title: "Free Customer Support",
    desc: "Real humans answer your calls. No bots, no hold queues — just immediate, helpful support whenever you need it.",
  },
  {
    icon: RefreshCcw,
    title: "Hassle-Free Booking",
    desc: "No lengthy paperwork, no complicated processes. Tell us your requirement and we start working on it instantly.",
  },
];

export default function WhyChoosePAS() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        cardsRef.current.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, filter: "blur(4px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.7,
              delay: (i % 3) * 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%" },
            }
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, el: HTMLDivElement | null) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, { rotateY: x * 10, rotateX: -y * 10, z: 20, transformPerspective: 700, duration: 0.3, ease: "power2.out" });

    const icon = el.querySelector(".feature-icon-wrap");
    gsap.to(icon, { scale: 1.15, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (el: HTMLDivElement | null) => {
    if (!el) return;
    gsap.to(el, { rotateY: 0, rotateX: 0, z: 0, duration: 0.5, ease: "expo.out" });
    const icon = el.querySelector(".feature-icon-wrap");
    gsap.to(icon, { scale: 1, duration: 0.4, ease: "expo.out" });
  };

  return (
    <section ref={sectionRef} className="relative py-32 px-6" style={{ background: "var(--color-bg)" }}>
      {/* Faint structural grid — brass, barely there */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(169,119,60,1) 1px, transparent 1px), linear-gradient(90deg, rgba(169,119,60,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12" style={{ background: "var(--color-green)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--color-brass)" }}>
              Why Choose Us
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2
              className="font-bold leading-tight"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "var(--color-ink)",
                letterSpacing: "-0.02em",
                maxWidth: "560px",
              }}
            >
              Jack of All Trades,
              <br />
              <span style={{ color: "var(--color-green)" }}>Master of Every One.</span>
            </h2>
            <p className="max-w-sm" style={{ color: "var(--color-ink-muted)", lineHeight: "1.75", fontSize: "0.95rem" }}>
              Whatever dilemma is blocking your safe ride, our professionals prioritise your satisfaction and resolve it without delay.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                onMouseMove={(e) => handleMouseMove(e, cardsRef.current[i])}
                onMouseLeave={() => handleMouseLeave(cardsRef.current[i])}
                className="relative p-7 rounded-sm group"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  transformStyle: "preserve-3d",
                  cursor: "default",
                  transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                  boxShadow: "0 15px 35px rgba(28,28,26,0.05)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(31,74,56,0.3)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 25px 55px rgba(28,28,26,0.08)";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 15px 35px rgba(28,28,26,0.05)";
                }}
              >
                <div
                  className="absolute top-6 right-6 text-xs font-bold"
                  style={{ color: "rgba(169,119,60,0.35)", letterSpacing: "0.1em" }}
                >
                  0{i + 1}
                </div>

                <div
                  className="feature-icon-wrap w-12 h-12 flex items-center justify-center rounded-sm mb-5"
                  style={{ background: "var(--color-green-soft-2)", border: "1px solid rgba(31,74,56,0.18)" }}
                >
                  <Icon size={20} style={{ color: "var(--color-green)" }} />
                </div>

                <h3 className="font-semibold mb-3" style={{ color: "var(--color-ink)", fontSize: "1.05rem" }}>
                  {feat.title}
                </h3>
                <p style={{ color: "var(--color-ink-muted)", fontSize: "0.9rem", lineHeight: "1.7" }}>
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}