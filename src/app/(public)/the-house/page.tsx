"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

/**
 * /the-house — standalone page (previously an in-page section on the home
 * route). Palette kept as the original light theme:
 * #1B1B18 charcoal, #F6F2E9 ivory, #A6906F antique gold, #C9AE8C soft gold
 * (the intro banner keeps the original dark-to-ivory gradient; every
 * section below it sits on the ivory bg with dark ink text).
 *
 * NOTE: if the Navbar's "The House" link still points to "/#the-house",
 * update it to href: "/the-house" once this page is wired up.
 */

const PILLARS = [
  {
    title: "Provenance",
    body: "Fabrics sourced from mills with a century of restraint — handloom cottons, raw silks, and pure linen chosen for how they age, not just how they photograph.",
  },
  {
    title: "Precision",
    body: "Every sherwani, kurta and bandhgala is cut and finished by hand in-house, never rushed through a production line.",
  },
  {
    title: "Permanence",
    body: "Designed to outlast the trend cycle it was born into — pieces built to be worn for decades, not a single season.",
  },
];

const CRAFT_STEPS = [
  {
    title: "Measure",
    body: "A one-on-one consultation and full body measure, so the garment starts from the man, not a size chart.",
  },
  {
    title: "Cut",
    body: "Master tailors hand-cut every panel from the chosen fabric, checking drape and grain before a single stitch is made.",
  },
  {
    title: "Hand-finish",
    body: "Zardozi, mukaish, and thread work — where used — are embroidered by hand, the same way they were generations ago.",
  },
  {
    title: "Fit",
    body: "A final fitting before the piece leaves the atelier, so what you wear on the day is exactly what was promised.",
  },
];

const LEGACY_STATS = [
  { value: "12+", label: "Years of Craft" },
  { value: "40+", label: "Master Tailors" },
  { value: "3,000+", label: "Garments Delivered" },
  { value: "100%", label: "Made In-House" },
];

const FABRICS = [
  {
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800",
    name: "Handloom Cotton",
    origin: "Sourced from Kutch",
  },
  {
    image: "https://images.unsplash.com/photo-1544966503-7cc531ecfd9d?auto=format&fit=crop&q=80&w=800",
    name: "Raw Silk",
    origin: "Sourced from Varanasi",
  },
  {
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
    name: "Pure Linen",
    origin: "Sourced from Ahmedabad",
  },
];

const PRESS = [
  { outlet: "Vogue India", quote: "A quiet revival of hand-tailoring for the modern Indian man." },
  { outlet: "GQ India", quote: "MehRāj proves restraint can be its own kind of luxury." },
  { outlet: "Elle Man", quote: "Every seam feels deliberate — nothing here is accidental." },
];

export default function TheHousePage() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(
      ".house-eyebrow, .house-title, .house-body",
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".house-inner", start: "top 78%" },
      }
    );
    gsap.fromTo(
      ".house-pillar",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".house-pillars", start: "top 82%" },
      }
    );
    gsap.fromTo(
      ".legacy-stat",
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".legacy-stats", start: "top 85%" },
      }
    );
    gsap.fromTo(
      ".craft-eyebrow, .craft-title, .craft-body",
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".craft-inner", start: "top 78%" },
      }
    );
    gsap.fromTo(
      ".craft-step",
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".craft-steps", start: "top 85%" },
      }
    );
    gsap.fromTo(
      ".fabric-card",
      { opacity: 0, scale: 1.03 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".fabric-grid", start: "top 85%" },
      }
    );
    gsap.fromTo(
      ".founder-note",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".founder-note", start: "top 82%" },
      }
    );
    gsap.fromTo(
      ".press-card",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".press-grid", start: "top 85%" },
      }
    );
  }, []);

  return (
    <main ref={scopeRef} className="relative bg-[#F6F2E9]">
      {/* Intro banner — original dark-to-ivory gradient */}
      <section
        className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
        style={{
          background:
            "linear-gradient(180deg, #1B1B18 0%, #3A342C 22%, #C9AE8C 55%, #F6F2E9 100%)",
        }}
      >
        <div className="house-inner relative mx-auto max-w-3xl px-6 text-center">
          <div className="house-eyebrow mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#F6F2E9]/60" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-[#F6F2E9]/80">
              The House
            </span>
            <span className="h-px w-8 bg-[#F6F2E9]/60" />
          </div>

          <h1 className="house-title font-serif text-4xl font-light leading-[1.12] text-[#F6F2E9]">
            The House of <span className="italic">MehRāj</span>
          </h1>

          <p className="house-body mx-auto mt-8 max-w-xl font-sans text-sm leading-[1.9] text-[#F6F2E9]/85 md:text-base">
            MehRāj was founded on a simple conviction — that a man&apos;s clothing
            should carry the weight of intention. Every collection begins not
            with a trend, but with a question of craft: how a seam falls, how
            a fabric ages, how a garment is remembered long after it is worn.
            We build for those who dress with purpose — not for the season,
            but for a lifetime.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative border-t border-[#1B1B18]/10 bg-[#F6F2E9]">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
          <div className="house-pillars grid grid-cols-1 gap-10 sm:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.title} className="house-pillar">
                <p className="font-serif text-lg italic text-[#1B1B18]">{p.title}</p>
                <p className="mt-3 font-sans text-[13px] leading-[1.8] text-[#1B1B18]/65">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy in Numbers */}
      <section className="relative overflow-hidden border-t border-[#1B1B18]/10 bg-[#1B1B18] py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="legacy-stats grid grid-cols-2 gap-10 sm:grid-cols-4">
            {LEGACY_STATS.map((stat) => (
              <div key={stat.label} className="legacy-stat text-center">
                <p className="font-serif text-3xl font-light italic text-[#C9AE8C] md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F6F2E9]/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Craft (process) */}
      <section className="relative overflow-hidden border-t border-[#1B1B18]/10 bg-[#EFE8D8] py-24 md:py-28">
        <div className="craft-inner mx-auto max-w-2xl px-6 text-center">
          <div className="craft-eyebrow mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#A6906F]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-[#A6906F]">
              The Craft
            </span>
            <span className="h-px w-8 bg-[#A6906F]" />
          </div>
          <h2 className="craft-title font-serif text-2xl font-light leading-[1.15] text-[#1B1B18] md:text-3xl">
            From measure to fitting
          </h2>
          <p className="craft-body mx-auto mt-5 max-w-lg font-sans text-sm leading-[1.9] text-[#1B1B18]/70">
            Sherwanis, bandhgalas, and kurtas move through the same
            disciplined process — nothing shortcut, nothing outsourced.
          </p>
        </div>

        <div className="craft-steps mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {CRAFT_STEPS.map((step, i) => (
            <div key={step.title} className="craft-step text-center">
              <span className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#A6906F]/50 font-serif text-sm italic text-[#A6906F]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-serif text-base italic text-[#1B1B18]">{step.title}</p>
              <p className="mt-2 font-sans text-[12px] leading-[1.8] text-[#1B1B18]/60">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Fabric Library */}
      <section className="relative border-t border-[#1B1B18]/10 bg-[#F6F2E9] py-24 md:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#A6906F]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-[#A6906F]">
              The Fabric Library
            </span>
            <span className="h-px w-8 bg-[#A6906F]" />
          </div>
          <h2 className="font-serif text-2xl font-light leading-[1.15] text-[#1B1B18] md:text-3xl">
            Chosen for how they age
          </h2>
          <p className="mx-auto mt-5 max-w-lg font-sans text-sm leading-[1.9] text-[#1B1B18]/70">
            Every fabric in the atelier is hand-selected from mills we&apos;ve
            worked with for years, not picked off a seasonal swatch book.
          </p>
        </div>

        <div className="fabric-grid mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 px-6 sm:grid-cols-3">
          {FABRICS.map((fabric) => (
            <div key={fabric.name} className="fabric-card group relative aspect-3/4 overflow-hidden">
              <img
                src={fabric.image}
                alt={fabric.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-serif text-base italic text-white">{fabric.name}</p>
                <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.15em] text-white/70">
                  {fabric.origin}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder note */}
      <section className="relative border-t border-[#1B1B18]/10 bg-[#F6F2E9]">
        <div className="founder-note mx-auto max-w-2xl px-6 py-24 text-center md:py-28">
          <p className="font-serif text-xl italic leading-relaxed text-[#1B1B18] md:text-2xl">
            &ldquo;We are not chasing the season. We are building the wardrobe
            a man reaches for a decade from now.&rdquo;
          </p>
          <p className="mt-4 font-sans text-[11px] font-semibold uppercase tracking-[0.35em] text-[#A6906F]">
            The Atelier, Rajkot
          </p>
        </div>
      </section>

      {/* Press mentions */}
      <section className="relative border-t border-[#1B1B18]/10 bg-[#EFE8D8] py-20 md:py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A6906F]">
            As Seen In
          </span>
        </div>
        <div className="press-grid mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 px-6 sm:grid-cols-3">
          {PRESS.map((p) => (
            <div key={p.outlet} className="press-card border border-[#1B1B18]/10 bg-[#F6F2E9] p-6 text-center">
              <p className="font-serif text-sm italic leading-[1.7] text-[#1B1B18]/80">
                &ldquo;{p.quote}&rdquo;
              </p>
              <p className="mt-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A6906F]">
                {p.outlet}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-[#1B1B18]/10 bg-[#F6F2E9] py-20 text-center md:py-24">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.35em] text-[#A6906F]">
          Made to order, in-house
        </p>
        <Link
          href="/collections"
          className="mt-6 inline-flex items-center rounded-sm bg-[#A6906F] px-8 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18] transition-colors hover:bg-[#1B1B18] hover:text-[#F6F2E9]"
        >
          Explore The Collections
        </Link>
      </section>
    </main>
  );
}