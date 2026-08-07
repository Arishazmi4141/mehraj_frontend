"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

const CRAFT_STEPS = [
  { title: "Fabric", body: "Every bolt inspected by hand before it earns a place in the House." },
  { title: "Stitching", body: "Seams closed with the same hand-finished technique across every size." },
  { title: "Embroidery", body: "Motifs worked thread by thread, never machine-replicated." },
  { title: "Finishing", body: "Pressed, inspected, and packaged as the final act of care." },
];

export default function CraftSection() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(
      ".craft-header > *",
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".craft-header", start: "top 82%" },
      }
    );
    gsap.fromTo(
      ".craft-step",
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".craft-grid", start: "top 84%" },
      }
    );
  }, []);

  return (
    <section ref={scopeRef} id="the-craft" className="relative overflow-hidden bg-[#1B1B18] py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(to right, #F6F2E9 1px, transparent 1px)",
          backgroundSize: "90px 100%",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        <div className="craft-header mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#A6906F]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A6906F]">
              The Craft
            </span>
            <span className="h-px w-6 bg-[#A6906F]" />
          </div>
          <h2 className="font-serif text-3xl font-light leading-[1.15] text-[#F6F2E9] md:text-[2.8rem]">
            Why Every Garment <span className="italic text-[#A6906F]">Takes Time</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-xs leading-[1.85] text-[#F6F2E9]/60">
            From fabric to finished packaging, nothing at MehRāj is rushed. This is
            what separates a garment from a piece worth keeping.
          </p>
        </div>

        <div className="craft-grid grid grid-cols-1 gap-px border border-[#F6F2E9]/10 bg-[#F6F2E9]/10 sm:grid-cols-2 lg:grid-cols-4">
          {CRAFT_STEPS.map((step) => (
            <div key={step.title} className="craft-step bg-[#1B1B18] p-8">
              <p className="font-serif text-lg italic text-[#A6906F]">{step.title}</p>
              <p className="mt-3 font-sans text-[12px] leading-[1.8] text-[#F6F2E9]/60">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}