"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote:  "The level of care and technical knowledge at PAS is unlike anything I've experienced at other service centres. My 911 has never run better.",
    author: "Arjun Mehta",
    role:   "Porsche 911 Owner",
    rating: 5,
  },
  {
    quote:  "They sourced an OEM part in 48 hours that three other workshops couldn't find in two weeks. Unmatched network and expertise.",
    author: "Priya Nair",
    role:   "BMW M5 Owner",
    rating: 5,
  },
  {
    quote:  "Complete transparency from inspection to invoice. No surprises, no upselling — just honest, premium service. My go-to for the Range Rover.",
    author: "Rahul Sinha",
    role:   "Range Rover Owner",
    rating: 5,
  },
] as const;

export default function TestimonialsSection() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(".testimonials-heading", { y: 28, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.65, ease: "expo.out",
      scrollTrigger: { trigger: ".testimonials-heading", start: "top 86%" },
    });
    gsap.fromTo(".testimonial-card", { y: 44, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.65, ease: "expo.out", stagger: 0.1,
      scrollTrigger: { trigger: ".testimonials-grid", start: "top 82%" },
    });
  }, []);

  return (
    <section ref={scopeRef} className="bg-[#F7F7F4] py-20 md:py-28" id="testimonials">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="testimonials-heading mb-14 opacity-0">
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#A9773C]">Testimonials</span>
          <h2 className="mt-5 max-w-lg font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#171712] md:text-[2.6rem]">
            Trusted by Drivers<br />Who Demand More
          </h2>
        </div>

        <div className="testimonials-grid grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map(({ quote, author, role, rating }) => (
            <figure
              key={author}
              className="testimonial-card group relative flex flex-col overflow-hidden opacity-0 bg-white border border-[#E7E3D8] transition-shadow duration-500 hover:shadow-[0_20px_48px_-24px_rgba(23,23,18,0.18)]"
            >
              <div aria-hidden className="h-[2px] w-full bg-gradient-to-r from-[#1F4A38] via-[#C9A063] to-[#1F4A38] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />

              <div className="flex flex-col gap-6 p-9">
                <div className="flex gap-[3px]" aria-label={`${rating} out of 5 stars`}>
                  {Array.from({ length: rating }).map((_, i) => (
                    <span key={i} className="text-[#C9A063]" style={{ fontSize: "11px" }} aria-hidden>★</span>
                  ))}
                </div>

                <div aria-hidden className="font-display leading-none select-none text-[#F1EFE9]" style={{ fontSize: "3.5rem", lineHeight: 1, marginTop: "-0.5rem" }}>
                  "
                </div>

                <blockquote className="font-body text-[13px] leading-[1.85] text-[#4A4740]">
                  {quote}
                </blockquote>

                <figcaption className="mt-auto pt-7 border-t border-[#EFECE3]">
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-[#171712]">{author}</p>
                  <p className="mt-1.5 font-body text-[11px] tracking-wide text-[#8C8A80]">{role}</p>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#1F4A38]/20" aria-hidden />
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-[#B8B4A8]">Verified Reviews</p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#1F4A38]/20" aria-hidden />
        </div>
      </div>
    </section>
  );
}