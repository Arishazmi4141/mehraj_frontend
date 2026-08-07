"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

export default function TheHouseSection() {
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
  }, []);

  return (
    <section
      ref={scopeRef}
      id="the-house"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #1B1B18 0%, #3A342C 22%, #C9AE8C 55%, #F6F2E9 100%)",
      }}
    >
      <div className="house-inner mx-auto max-w-3xl px-6 py-28 text-center md:py-40">
        <div className="house-eyebrow mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#F6F2E9]/60" />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-[#F6F2E9]/80">
            The House
          </span>
          <span className="h-px w-8 bg-[#F6F2E9]/60" />
        </div>

        <h2 className="house-title font-serif text-3xl font-light leading-[1.15] text-[#F6F2E9] md:text-5xl">
          The House of <span className="italic">MehRāj</span>
        </h2>

        <p className="house-body mx-auto mt-8 max-w-xl font-sans text-sm leading-[1.9] text-[#F6F2E9]/85 md:text-base">
          MehRāj was founded on a simple conviction — that clothing should carry the
          weight of intention. Every collection begins not with a trend, but with a
          question of craft: how a seam falls, how a fabric ages, how a garment is
          remembered long after it is worn. We build for those who dress with
          purpose, not for the season, but for a lifetime.
        </p>

        <div className="house-pillars mt-16 grid grid-cols-1 gap-10 border-t border-[#1B1B18]/10 pt-12 sm:grid-cols-3">
          {[
            { title: "Provenance", body: "Fabrics sourced from mills with a century of restraint." },
            { title: "Precision", body: "Every garment cut and finished by hand, never rushed." },
            { title: "Permanence", body: "Designed to outlast the trend cycle it was born into." },
          ].map((p) => (
            <div key={p.title} className="house-pillar">
              <p className="font-serif text-lg italic text-[#1B1B18]">{p.title}</p>
              <p className="mt-2 font-sans text-[12px] leading-[1.8] text-[#1B1B18]/65">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}