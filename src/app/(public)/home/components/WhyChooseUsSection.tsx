"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";
import { ShieldCheck, Clock3, Star, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    icon:  ShieldCheck,
    title: "Certified Excellence",
    body:  "Every technician holds manufacturer-level certifications and undergoes continuous training on the latest automotive systems.",
  },
  {
    icon:  Clock3,
    title: "Precision Scheduling",
    body:  "Respect for your time is non-negotiable. We commit to estimated timelines and communicate every step of the process.",
  },
  {
    icon:  Star,
    title: "Genuine Parts Only",
    body:  "We source exclusively from authorised suppliers — no substitutes, no compromises on the quality your vehicle demands.",
  },
  {
    icon:  Wrench,
    title: "Comprehensive Capability",
    body:  "From routine maintenance to complex performance engineering, our facility handles every discipline under one roof.",
  },
] as const;

export default function WhyChooseUsSection() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(".wcu-left", { x: -50, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.7, ease: "expo.out",
      scrollTrigger: { trigger: ".wcu-left", start: "top 80%" },
    });
    gsap.fromTo(".wcu-item", { x: 36, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.6, ease: "expo.out", stagger: 0.1,
      scrollTrigger: { trigger: ".wcu-grid", start: "top 80%" },
    });
  }, []);

  return (
    <section ref={scopeRef} className="bg-white py-20 md:py-28" id="why-us">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-28">
          {/* Left — brand statement */}
          <div className="wcu-left opacity-0 flex flex-col justify-center">
            <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#A9773C]">Why PAS</span>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#171712] md:text-[2.5rem] lg:text-[3rem]">
              Where Expertise<br />Meets Integrity
            </h2>
            <p className="mt-6 max-w-[340px] font-body text-[13px] leading-[1.85] text-[#6B685F]">
              Twelve years of uncompromising standards have built a reputation
              that luxury automotive owners in the region trust — and return to.
            </p>

            <div className="mt-14 pt-9 flex items-end gap-5 border-t border-[#E7E3D8]">
              <div>
                <p className="font-display font-semibold leading-none select-none text-[#EFE9DB]" style={{ fontSize: "clamp(4rem, 8vw, 6rem)" }}>
                  12
                </p>
                <p className="mt-2 font-body text-[10px] uppercase tracking-[0.28em] text-[#B8B4A8]">Years of Excellence</p>
              </div>
              <div className="mb-3 ml-auto flex flex-col items-end gap-1">
                <div className="h-px w-8 bg-[#1F4A38]/30" aria-hidden />
                <p className="font-body text-[9px] uppercase tracking-[0.3em] text-[#B8B4A8]">Est. 2012</p>
              </div>
            </div>
          </div>

          {/* Right — reasons grid */}
          <div className="wcu-grid grid grid-cols-1 gap-0 sm:grid-cols-2">
            {REASONS.map(({ icon: Icon, title, body }, idx) => (
              <div
                key={title}
                className={`wcu-item group opacity-0 p-7 transition-colors duration-400 hover:bg-[#F7F7F4] border-t border-[#E7E3D8] ${
                  idx % 2 === 1 ? "sm:border-l" : ""
                }`}
              >
                <div className="mb-5 inline-flex h-9 w-9 items-center justify-center bg-[#1F4A38]/[0.06] border border-[#1F4A38]/10 transition-transform duration-400 group-hover:scale-110">
                  <Icon className="h-4 w-4 text-[#1F4A38]" strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[#171712]">{title}</h3>
                <p className="mt-3 font-body text-[12.5px] leading-[1.8] text-[#6B685F]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}