"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

const CRAFT_STEPS = [
  { title: "Fabric", body: "Every bolt inspected by hand before it earns a place in the House." },
  { title: "Stitching", body: "Seams closed with the same hand-finished technique across every size." },
  { title: "Embroidery", body: "Motifs worked thread by thread, never machine-replicated." },
  { title: "Finishing", body: "Pressed, inspected, and packaged as the final act of care." },
];

const GALLERY = [
  {
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=900",
    label: "Hand Embroidery",
    isVideo: true,
  },
  {
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=900",
    label: "The Cutting Table",
    isVideo: false,
  },
  {
    image: "https://images.unsplash.com/photo-1544966503-7cc531ecfd9d?auto=format&fit=crop&q=80&w=900",
    label: "Fabric Selection",
    isVideo: false,
  },
  {
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80&w=900",
    label: "Final Inspection",
    isVideo: true,
  },
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
      ".craft-gallery-item",
      { opacity: 0, scale: 1.04 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".craft-gallery", start: "top 85%" },
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
        scrollTrigger: { trigger: ".craft-grid", start: "top 88%" },
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

        {/* Photo / video gallery */}
        <div className="craft-gallery mb-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY.map((item) => (
            <div
              key={item.label}
              className="craft-gallery-item group relative aspect-[3/4] overflow-hidden border border-[#F6F2E9]/10 bg-[#0F0F0D]"
            >
              <img
                src={item.image}
                alt={item.label}
                loading="lazy"
                className="h-full w-full object-cover opacity-80 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B18]/85 via-[#1B1B18]/10 to-transparent" />
              {item.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F6F2E9]/40 bg-[#1B1B18]/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-3.5 w-3.5 fill-[#F6F2E9] text-[#F6F2E9]" strokeWidth={0} />
                  </span>
                </div>
              )}
              <span className="absolute bottom-3 left-3 font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F6F2E9]">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Process steps */}
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