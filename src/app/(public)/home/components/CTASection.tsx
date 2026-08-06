"use client";

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const scopeRef = useGsap<HTMLElement>(() => {
    const tween1 = gsap.fromTo(
      ".cta-inner",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".cta-inner",
          start: "top 84%",
          invalidateOnRefresh: true,
        },
      }
    );
    const tween2 = gsap.fromTo(
      ".cta-content > *",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".cta-inner",
          start: "top 80%",
          invalidateOnRefresh: true,
        },
        delay: 0.2,
      }
    );

    const orb = document.querySelector(".cta-orb");
    if (orb) {
      gsap.to(orb, {
        scale: 1.25,
        opacity: 0.6,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    // Fix: on refresh, browsers can restore scroll position after ScrollTrigger has
    // already computed trigger offsets against a not-yet-settled layout (fonts,
    // images, or the page-reveal transform still resolving). That produces a stale
    // trigger point, so the section only reveals late or needs an extra scroll.
    // Forcing a refresh once everything has actually finished loading fixes it.
    const refresh = () => ScrollTrigger.refresh();
    const rafId = requestAnimationFrame(() => setTimeout(refresh, 50));
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", refresh);
      tween1.scrollTrigger?.kill();
      tween2.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section ref={scopeRef} className="relative bg-[#FAFAFA] py-24 md:py-32" id="cta">
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
        <div className="cta-inner opacity-0 relative overflow-hidden rounded-none bg-[#0A1118] px-8 py-20 text-center shadow-2xl shadow-[#0A1118]/15 md:px-20 md:py-28 border border-[#B89752]/20">
          {/* Ambient Gold Soft Orb Glow */}
          <div
            aria-hidden="true"
            className="cta-orb pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "550px",
              height: "320px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(184,151,82,0.18) 0%, transparent 70%)",
              filter: "blur(60px)",
              opacity: 0.45,
            }}
          />

          {/* Top Divider Line */}
          <div
            aria-hidden="true"
            className="mx-auto mb-10 h-px w-20"
            style={{
              background: "linear-gradient(to right, transparent, rgba(184,151,82,0.6), transparent)",
            }}
          />

          <div className="cta-content relative z-10 flex flex-col items-center">
            {/* Eyebrow */}
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#B89752]">
              Book a Consultation
            </span>

            {/* Headline */}
            <h2 className="mx-auto mt-5 max-w-2xl font-serif text-3xl font-light leading-[1.12] tracking-[-0.01em] text-[#FAFAFA] md:text-5xl">
              Experience Craftsmanship <br />
              <span className="italic text-[#B89752]">Tailored Around You</span>
            </h2>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-md font-sans text-xs leading-[1.85] text-[#FAFAFA]/70">
              Schedule a private session with our team or request a personal fitting at your convenience — crafted with precision, made for you.
            </p>

            {/* CTA Action Buttons */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-none bg-[#B89752] px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0A1118] transition-all duration-300 hover:bg-[#cbb06d] hover:shadow-[0_0_25px_rgba(184,151,82,0.3)]"
              >
                Book a Fitting
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-none border border-[#FAFAFA]/30 px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FAFAFA] transition-all duration-300 hover:border-[#B89752] hover:text-[#B89752] hover:bg-black/20"
              >
                Explore Collection
              </Link>
            </div>

            {/* Footnote */}
            <p className="mt-10 font-sans text-[9px] font-medium uppercase tracking-[0.35em] text-[#FAFAFA]/40">
              Private Consultation • Personal Fitting • Made For You
            </p>
          </div>

          {/* Bottom Divider Line */}
          <div
            aria-hidden="true"
            className="mx-auto mt-10 h-px w-20"
            style={{
              background: "linear-gradient(to right, transparent, rgba(184,151,82,0.6), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}