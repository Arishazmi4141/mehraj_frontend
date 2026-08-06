"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wrench, Clock, ShieldCheck, BadgeCheck, Phone, RefreshCcw } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const INK = "#0A1118";
const INK_MUTED = "rgba(10,17,24,0.65)";
const GOLD = "#B89752";
const BORDER = "rgba(10,17,24,0.1)";
const SURFACE = "#FFFFFF";

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

export default function WhyChooseMehRaj() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const numberRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: labelRef.current, start: "top 85%" } }
        );

        cardsRef.current.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, scale: 0.95, filter: "blur(6px)" },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.8,
              delay: (i % 3) * 0.12,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%" },
            }
          );

          const num = numberRefs.current[i];
          if (num) {
            gsap.fromTo(
              num,
              { opacity: 0, y: -8 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: (i % 3) * 0.12 + 0.25,
                ease: "power2.out",
                scrollTrigger: { trigger: card, start: "top 88%" },
              }
            );
          }

          const icon = card.querySelector(".feature-icon-wrap");
          if (icon) {
            gsap.fromTo(
              icon,
              { scale: 0.4, opacity: 0, rotate: -20 },
              {
                scale: 1,
                opacity: 1,
                rotate: 0,
                duration: 0.6,
                delay: (i % 3) * 0.12 + 0.15,
                ease: "back.out(2)",
                scrollTrigger: { trigger: card, start: "top 88%" },
              }
            );
          }
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
    gsap.to(el, {
      rotateY: x * 10,
      rotateX: -y * 10,
      z: 20,
      transformPerspective: 700,
      borderColor: "rgba(184,151,82,0.45)",
      boxShadow: `0 25px 55px rgba(10,17,24,0.09), ${-x * 12}px ${16 - y * 12}px 35px rgba(184,151,82,0.12)`,
      duration: 0.3,
      ease: "power2.out",
    });

    const icon = el.querySelector(".feature-icon-wrap");
    gsap.to(icon, { scale: 1.15, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (el: HTMLDivElement | null) => {
    if (!el) return;
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      z: 0,
      borderColor: BORDER,
      boxShadow: "0 15px 35px rgba(10,17,24,0.05)",
      duration: 0.5,
      ease: "expo.out",
    });
    const icon = el.querySelector(".feature-icon-wrap");
    gsap.to(icon, { scale: 1, duration: 0.4, ease: "expo.out" });
  };

  return (
    <section ref={sectionRef} className="relative py-32 px-6 bg-[#FAFAFA]">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(184,151,82,1) 1px, transparent 1px), linear-gradient(90deg, rgba(184,151,82,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 45% at 80% 20%, rgba(184,151,82,0.1) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto">
        <div ref={labelRef} className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12" style={{ background: GOLD }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: GOLD }}>
              Why Choose Us
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2
              className="font-bold leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: INK,
                letterSpacing: "-0.02em",
                maxWidth: "560px",
              }}
            >
              Jack of All Trades,
              <br />
              <span style={{ color: GOLD }}>Master of Every One.</span>
            </h2>
            <p className="max-w-sm" style={{ color: INK_MUTED, lineHeight: "1.75", fontSize: "0.95rem" }}>
              Whatever dilemma is blocking your safe ride, MehRaj&apos;s professionals prioritise your satisfaction and resolve it without delay.
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
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  transformStyle: "preserve-3d",
                  cursor: "default",
                  boxShadow: "0 15px 35px rgba(10,17,24,0.05)",
                  willChange: "transform",
                }}
              >
                <div
                  ref={(el) => {
                    if (el) numberRefs.current[i] = el;
                  }}
                  className="absolute top-6 right-6 text-xs font-bold"
                  style={{ color: "rgba(184,151,82,0.5)", letterSpacing: "0.1em" }}
                >
                  0{i + 1}
                </div>

                <div
                  className="feature-icon-wrap w-12 h-12 flex items-center justify-center rounded-sm mb-5"
                  style={{ background: "rgba(184,151,82,0.1)", border: "1px solid rgba(184,151,82,0.3)" }}
                >
                  <Icon size={20} style={{ color: GOLD }} />
                </div>

                <h3 className="font-semibold mb-3" style={{ fontFamily: "var(--font-display)", color: INK, fontSize: "1.05rem" }}>
                  {feat.title}
                </h3>
                <p style={{ color: INK_MUTED, fontSize: "0.9rem", lineHeight: "1.7" }}>{feat.desc}</p>

                <div
                  className="absolute bottom-0 left-7 right-7 h-px scale-x-0 group-hover:scale-x-100"
                  style={{
                    background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
                    transition: "transform 0.4s ease",
                    transformOrigin: "center",
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