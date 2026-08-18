"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

/**
 * /the-craft — standalone page (previously an in-page section on the home
 * route). Palette kept as-is from the original section:
 * #1B1B18 charcoal bg, #F6F2E9 ivory text, #A6906F antique gold accent.
 *
 * NOTE: if the Navbar's "The Craft" link still points to "/#the-craft",
 * update it to href: "/the-craft" once this page is wired up.
 */

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

const MATERIALS = [
  { title: "Handloom Cotton", body: "Breathable, woven on traditional looms for kurtas and daywear." },
  { title: "Raw & Tussar Silk", body: "Reserved for sherwanis and bandhgalas that need weight and sheen." },
  { title: "Pure Linen", body: "Sourced for warm-weather tailoring that still holds a sharp line." },
  { title: "Zari & Zardozi Thread", body: "Metallic and silk threads for hand embroidery on festive pieces." },
];

export default function TheCraftPage() {
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
    gsap.fromTo(
      ".material-row",
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".material-list", start: "top 85%" },
      }
    );
  }, []);

  return (
    <main ref={scopeRef} className="relative bg-[#1B1B18]">
      {/* Intro / header */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(to right, #F6F2E9 1px, transparent 1px)",
            backgroundSize: "90px 100%",
          }}
          aria-hidden="true"
        />
        <div className="craft-header relative z-10 mx-auto max-w-3xl px-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#A6906F]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A6906F]">
              The Craft
            </span>
            <span className="h-px w-6 bg-[#A6906F]" />
          </div>
          <h1 className="font-serif text-3xl font-light leading-[1.15] text-[#F6F2E9] md:text-[2.8rem]">
            Why Every Garment <span className="italic text-[#A6906F]">Takes Time</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-sans text-xs leading-[1.85] text-[#F6F2E9]/60 md:text-sm">
            From fabric to finished packaging, nothing at MehRāj is rushed. This is
            what separates a garment from a piece worth keeping.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
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
        <div className="craft-grid mb-24 grid grid-cols-1 gap-px border border-[#F6F2E9]/10 bg-[#F6F2E9]/10 sm:grid-cols-2 lg:grid-cols-4">
          {CRAFT_STEPS.map((step) => (
            <div key={step.title} className="craft-step bg-[#1B1B18] p-8">
              <p className="font-serif text-lg italic text-[#A6906F]">{step.title}</p>
              <p className="mt-3 font-sans text-[12px] leading-[1.8] text-[#F6F2E9]/60">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Materials */}
        <div className="mb-24 border-t border-[#F6F2E9]/10 pt-16">
          <div className="mx-auto mb-12 max-w-lg text-center">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A6906F]">
              Materials
            </p>
            <h2 className="mt-3 font-serif text-2xl font-light leading-[1.2] text-[#F6F2E9] md:text-3xl">
              What Goes Into a MehRāj Piece
            </h2>
          </div>
          <div className="material-list mx-auto max-w-3xl divide-y divide-[#F6F2E9]/10">
            {MATERIALS.map((m) => (
              <div
                key={m.title}
                className="material-row flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <p className="font-serif text-base italic text-[#F6F2E9] sm:w-1/3">{m.title}</p>
                <p className="font-sans text-[12px] leading-[1.8] text-[#F6F2E9]/60 sm:w-2/3">
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="relative border-t border-[#F6F2E9]/10 py-20 text-center md:py-24">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A6906F]">
          Made to order, in-house
        </p>
        <Link
          href="/collections"
          className="mt-6 inline-flex items-center rounded-sm bg-[#A6906F] px-8 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18] transition-colors hover:bg-[#F6F2E9]"
        >
          Explore The Collections
        </Link>
      </section>
    </main>
  );
}