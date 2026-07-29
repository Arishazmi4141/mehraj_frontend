"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";
import { ShieldCheck, Scissors, Award, Gem } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    icon: Scissors,
    title: "Master Tailoring",
    body: "Every garment is cut individually by seasoned Italian tailors with over 30 years of sartorial heritage in Milan and Naples.",
  },
  {
    icon: Gem,
    title: "Pure Loro Piana Fabrics",
    body: "We source exclusively from prestigious Italian mills — Super 180s wool, rare cashmere, and pure Mulberry silks without compromise.",
  },
  {
    icon: ShieldCheck,
    title: "Full Canvas Construction",
    body: "Built with traditional horsehair canvas interlining that shapes gracefully to your posture over time, ensuring flawless structure.",
  },
  {
    icon: Award,
    title: "Flawless Fit Guarantee",
    body: "We offer unlimited bespoke adjustments until every shoulder line, sleeve length, and taper aligns with absolute perfection.",
  },
] as const;

export default function WhyChooseUsSection() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(
      ".wcu-left",
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: { trigger: ".wcu-left", start: "top 80%" },
      }
    );
    gsap.fromTo(
      ".wcu-item",
      { x: 36, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".wcu-grid", start: "top 80%" },
      }
    );
  }, []);

  return (
    <section ref={scopeRef} className="relative bg-[#FAFAFA] py-24 md:py-32" id="why-us">
      {/* Background Architectural Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(10, 17, 24, 0.03) 1px, transparent 1px)",
          backgroundSize: "100px 100%",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-28">
          {/* Left — Brand Statement */}
          <div className="wcu-left opacity-0 flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-6 bg-[#B89752]" />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#B89752]">
                Perché Scegliere Noi
              </span>
            </div>

            <h2 className="mt-5 font-serif text-3xl font-light leading-[1.08] tracking-[-0.01em] text-[#0A1118] md:text-[2.6rem] lg:text-[3.2rem]">
              Where Heritage <br />
              <span className="italic text-[#B89752]">Meets Perfection</span>
            </h2>

            <p className="mt-6 max-w-[420px] font-sans text-xs leading-[1.85] text-[#4A5568]">
              Decades of uncompromising Italian craftsmanship have built a legacy trusted by international executives, diplomats, and gentlemen of discerning taste.
            </p>

            {/* Heritage Year Counter */}
            <div className="mt-14 pt-8 flex items-end gap-6 border-t border-[#0A1118]/10">
              <div>
                <p
                  className="font-serif font-light leading-none select-none text-[#0A1118]/10"
                  style={{ fontSize: "clamp(4.5rem, 8vw, 6.5rem)" }}
                >
                  58
                </p>
                <p className="mt-2 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B89752]">
                  Years of Bespoke Tailoring
                </p>
              </div>
              <div className="mb-3 ml-auto flex flex-col items-end gap-1">
                <div className="h-px w-8 bg-[#B89752]/50" aria-hidden="true" />
                <p className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-[#4A5568]">
                  Est. 1968 • Milano
                </p>
              </div>
            </div>
          </div>

          {/* Right — Reasons Grid */}
          <div className="wcu-grid grid grid-cols-1 gap-0 sm:grid-cols-2 border-b border-[#0A1118]/10 sm:border-b-0">
            {REASONS.map(({ icon: Icon, title, body }, idx) => (
              <div
                key={title}
                className={`wcu-item group opacity-0 p-8 transition-colors duration-400 hover:bg-white border-t border-[#0A1118]/10 ${
                  idx % 2 === 1 ? "sm:border-l sm:border-[#0A1118]/10" : ""
                }`}
              >
                <div className="mb-6 flex h-11 w-11 items-center justify-center border border-[#0A1118]/10 bg-[#FAFAFA] text-[#0A1118] transition-all duration-400 group-hover:border-[#B89752] group-hover:bg-[#0A1118] group-hover:text-[#FAFAFA] group-hover:scale-110">
                  <Icon className="h-4.5 w-4.5 transition-colors duration-300" strokeWidth={1.3} aria-hidden="true" />
                </div>
                <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0A1118]">
                  {title}
                </h3>
                <p className="mt-3 font-sans text-[12px] leading-[1.8] text-[#4A5568]">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}