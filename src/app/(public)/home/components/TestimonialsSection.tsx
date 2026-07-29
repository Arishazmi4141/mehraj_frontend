"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote:
      "The fit of my bespoke double-breasted suit is absolute perfection. The shoulder line and canvas structure feel weightless yet sharp. Truly Neapolitan craftsmanship at its finest.",
    author: "Arjun Mehta",
    role: "Managing Director • Private Equity",
    rating: 5,
  },
  {
    quote:
      "They sourced a rare Loro Piana Zenit cashmere fabric for my winter overcoat in under three days. The private fitting atelier experience in Milan was world-class.",
    author: "Priya Nair",
    role: "Creative Director • Luxury Retail",
    rating: 5,
  },
  {
    quote:
      "Uncompromising attention to detail. From hand-stitched buttonholes to custom silk linings, every garment feels like a heirloom piece tailored specifically for my posture.",
    author: "Rahul Sinha",
    role: "Diplomat & Collector",
    rating: 5,
  },
] as const;

export default function TestimonialsSection() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(
      ".testimonials-heading",
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: "expo.out",
        scrollTrigger: { trigger: ".testimonials-heading", start: "top 86%" },
      }
    );
    gsap.fromTo(
      ".testimonial-card",
      { y: 44, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".testimonials-grid", start: "top 82%" },
      }
    );
  }, []);

  return (
    <section ref={scopeRef} className="relative bg-[#FAFAFA] py-24 md:py-32" id="testimonials">
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
        {/* Header Block */}
        <div className="testimonials-heading mb-16 opacity-0">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-6 bg-[#B89752]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#B89752]">
              Clientele Voice
            </span>
          </div>

          <h2 className="mt-5 max-w-lg font-serif text-3xl font-light leading-[1.12] tracking-[-0.01em] text-[#0A1118] md:text-[2.8rem]">
            Trusted by Gentlemen <br />
            <span className="italic text-[#B89752]">Of Discerning Taste</span>
          </h2>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="testimonials-grid grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map(({ quote, author, role, rating }) => (
            <figure
              key={author}
              className="testimonial-card group relative flex flex-col justify-between overflow-hidden opacity-0 bg-white border border-[#0A1118]/10 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0A1118]/5"
            >
              {/* Florentine Gold Hover Accent Line */}
              <div
                aria-hidden="true"
                className="h-[2px] w-full bg-gradient-to-r from-[#B89752] via-[#0A1118] to-[#B89752] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
              />

              <div className="flex flex-col gap-6 p-9">
                {/* Gold Stars */}
                <div className="flex gap-[4px]" aria-label={`${rating} out of 5 stars`}>
                  {Array.from({ length: rating }).map((_, i) => (
                    <span key={i} className="text-[#B89752] text-xs" aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>

                {/* Decorative Serif Quote Symbol */}
                <div
                  aria-hidden="true"
                  className="font-serif leading-none select-none text-[#0A1118]/10"
                  style={{ fontSize: "3.5rem", lineHeight: 1, marginTop: "-0.5rem" }}
                >
                  “
                </div>

                {/* Quote Text */}
                <blockquote className="font-sans text-xs leading-[1.85] text-[#4A5568]">
                  {quote}
                </blockquote>
              </div>

              {/* Author & Role Footer */}
              <figcaption className="mx-9 mb-9 pt-6 border-t border-[#0A1118]/10">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0A1118]">
                  {author}
                </p>
                <p className="mt-1 font-sans text-[11px] tracking-wide text-[#4A5568]/70">
                  {role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Bottom Ticker */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#B89752]/40" aria-hidden="true" />
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#4A5568]/60">
            Verified Bespoke Reviews • Milano Atelier
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#B89752]/40" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}