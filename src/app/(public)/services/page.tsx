"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

/**
 * /services — light theme, consistent with The House / The Craft:
 * #F6F2E9 ivory bg, #1B1B18 ink text, #A6906F antique gold accent.
 */

const SERVICES = [
  {
    title: "Bespoke Tailoring",
    body: "A garment built entirely from your measure — fabric selection, pattern, and every fitting done in-house, from first sketch to final stitch.",
  },
  {
    title: "Made-to-Measure",
    body: "Our house patterns adjusted precisely to your fit, for a faster turnaround without giving up the hand-finished detail.",
  },
  {
    title: "Occasion & Wedding Wear",
    body: "Sherwanis, bandhgalas, and festive sets for weddings and celebrations, planned around your event timeline.",
  },
  {
    title: "Alterations & Repairs",
    body: "Resizing, reworking, and seasonal adjustments for pieces already in your wardrobe — ours or otherwise.",
  },
  {
    title: "Personal Styling",
    body: "A one-on-one consultation to curate or refresh your wardrobe, from fabric palette to occasion planning.",
  },
  {
    title: "Corporate & Group Orders",
    body: "Coordinated tailoring for groups — weddings parties, corporate events — kept consistent across every fit.",
  },
];

export default function ServicesPage() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(
      ".services-header > *",
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-header", start: "top 82%" },
      }
    );
    gsap.fromTo(
      ".service-card",
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 85%" },
      }
    );
  }, []);

  return (
    <main ref={scopeRef} className="relative bg-[#F6F2E9]">
      {/* Header */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="services-header relative z-10 mx-auto max-w-3xl px-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#A6906F]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A6906F]">
              Services
            </span>
            <span className="h-px w-6 bg-[#A6906F]" />
          </div>
          <h1 className="font-serif text-3xl font-light leading-[1.15] text-[#1B1B18] md:text-[2.8rem]">
            Tailoring, <span className="italic text-[#A6906F]">On Your Terms</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-sans text-xs leading-[1.85] text-[#1B1B18]/65 md:text-sm">
            From a single bespoke sherwani to a full wardrobe consultation, every
            service at MehRāj starts with a conversation, not a catalogue.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="relative border-t border-[#1B1B18]/10">
        <div className="services-grid mx-auto grid max-w-5xl grid-cols-1 gap-px border border-[#1B1B18]/10 bg-[#1B1B18]/10 px-0 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.title} className="service-card bg-[#F6F2E9] p-8">
              <p className="font-serif text-lg italic text-[#1B1B18]">{s.title}</p>
              <p className="mt-3 font-sans text-[12px] leading-[1.8] text-[#1B1B18]/65">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-[#1B1B18]/10 py-20 text-center md:py-24">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.35em] text-[#A6906F]">
          Start with a consultation
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center rounded-sm bg-[#A6906F] px-8 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18] transition-colors hover:bg-[#1B1B18] hover:text-[#F6F2E9]"
        >
          Book An Appointment
        </Link>
      </section>
    </main>
  );
}