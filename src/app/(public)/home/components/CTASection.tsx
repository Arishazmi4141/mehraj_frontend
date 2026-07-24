"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(".cta-inner", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, ease: "expo.out",
      scrollTrigger: { trigger: ".cta-inner", start: "top 84%" },
    });
    gsap.fromTo(".cta-content > *", { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.12,
      scrollTrigger: { trigger: ".cta-inner", start: "top 80%" }, delay: 0.2,
    });

    const orb = document.querySelector(".cta-orb");
    if (orb) {
      gsap.to(orb, { scale: 1.2, opacity: 0.5, duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true });
    }
  }, []);

  return (
    <section ref={scopeRef} className="bg-[#F7F7F4] py-20 md:py-28" id="cta">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div
          className="cta-inner opacity-0 relative overflow-hidden rounded-sm px-8 py-20 text-center md:px-20 md:py-28 bg-[#14251D]"
        >
          {/* Ambient brass orb */}
          <div
            aria-hidden
            className="cta-orb pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "500px", height: "300px", borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(201,160,99,0.14) 0%, transparent 70%)",
              filter: "blur(50px)", opacity: 0.4,
            }}
          />

          <div aria-hidden className="mx-auto mb-10 h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(201,160,99,0.5), transparent)" }} />

          <div className="cta-content relative z-10 flex flex-col items-center">
            <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#C9A063]">Schedule a Visit</span>

            <h2 className="mx-auto mt-6 max-w-xl font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
              Your Vehicle Deserves<br />Nothing Less Than Perfect
            </h2>

            <p className="mx-auto mt-7 max-w-sm font-body text-[13px] leading-[1.85] text-white/60">
              Book an appointment today and experience a level of automotive care
              that matches the vehicle you drive.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-sm bg-[#C9A063] px-7 py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[#171712] transition-colors duration-300 hover:bg-[#dab077]"
              >
                Book Appointment
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-sm border border-white/25 px-7 py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>

            <p className="mt-10 font-body text-[9px] uppercase tracking-[0.35em] text-white/30">
              Complimentary Consultation · No Obligation
            </p>
          </div>

          <div aria-hidden className="mx-auto mt-10 h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(201,160,99,0.5), transparent)" }} />
        </div>
      </div>
    </section>
  );
}