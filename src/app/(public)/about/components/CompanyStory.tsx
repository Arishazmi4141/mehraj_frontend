"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

export default function CompanyStory() {
  const labelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const statCardRef = useRef<HTMLDivElement>(null);

  const sectionRef = useGsap<HTMLElement>((ctx) => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: labelRef.current, start: "top 85%" } }
      );

      gsap.fromTo(
        maskRef.current,
        { scaleX: 1 },
        {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.2,
          ease: "expo.inOut",
          scrollTrigger: { trigger: imageRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        imageCardRef.current,
        { opacity: 0, y: 40, rotateY: -6, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          scale: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: imageRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        statCardRef.current,
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: imageRef.current, start: "top 75%" },
        }
      );

      gsap.to(statCardRef.current, {
        y: -8,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.3,
      });

      const paras = textRef.current?.querySelectorAll(".story-para");
      if (paras) {
        gsap.fromTo(
          paras,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: textRef.current, start: "top 80%" },
          }
        );
      }

      const facts = textRef.current?.querySelectorAll(".quick-fact");
      if (facts) {
        gsap.fromTo(
          facts,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: facts[0], start: "top 90%" },
          }
        );
      }
    });

    ctx.add(() => mm.revert());
  }, []);

  const handleImageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = imageCardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: x * 6,
      rotateX: -y * 6,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleImageLeave = () => {
    gsap.to(imageCardRef.current, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "expo.out" });
  };

  return (
    <section ref={sectionRef} className="relative py-32 px-6" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-7xl mx-auto">
        <div ref={labelRef} className="eyebrow mb-20">
          <span>Our Story</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Image */}
          <div ref={imageRef} className="relative lg:sticky lg:top-32">
            <div
              ref={imageCardRef}
              onMouseMove={handleImageMove}
              onMouseLeave={handleImageLeave}
              className="relative overflow-hidden rounded-sm"
              style={{
                aspectRatio: "4/5",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                transformStyle: "preserve-3d",
                boxShadow: "0 30px 70px rgba(28,28,26,0.08)",
              }}
            >
              <div
                ref={maskRef}
                className="absolute inset-0 z-10"
                style={{ background: "var(--color-green)", transformOrigin: "left" }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-px" style={{ background: "var(--color-border-strong)" }} />
                <span
                  className="text-xs tracking-[0.3em] uppercase text-center px-8"
                  style={{ color: "var(--color-ink-faint)" }}
                >
                  Company / Workshop Image
                </span>
                <div className="w-16 h-px" style={{ background: "var(--color-border-strong)" }} />
              </div>

              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l" style={{ borderColor: "var(--color-green)" }} />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r" style={{ borderColor: "var(--color-brass)" }} />

              <div
                className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 hover:opacity-100"
                style={{ background: "radial-gradient(circle at 50% 0%, var(--color-green-soft-2) 0%, transparent 60%)" }}
              />
            </div>

            {/* Floating stat card */}
            <div
              ref={statCardRef}
              className="accent-card absolute -bottom-6 -right-6 px-8 py-6 rounded-sm"
              style={{ background: "var(--color-green)" }}
            >
              <div
                className="text-4xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "#F7F7F4", letterSpacing: "-0.02em" }}
              >
                6+
              </div>
              <div className="text-xs tracking-widest uppercase mt-1" style={{ color: "rgba(247,247,244,0.7)" }}>
                Years of Excellence
              </div>
            </div>
          </div>

          {/* Right — Story text */}
          <div ref={textRef} className="pt-8">
            <h2
              className="font-bold mb-12 leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                color: "var(--color-ink)",
                letterSpacing: "-0.02em",
              }}
            >
              Where Quality Car
              <br />
              <span style={{ color: "var(--color-green)" }}>Repairs Get Done.</span>
            </h2>

            {/* ========================= */}
            {/* COMPANY STORY START       */}
            {/* ========================= */}
            <div className="space-y-6">
              <p className="story-para leading-relaxed" style={{ color: "var(--color-ink-muted)", fontSize: "1.05rem", lineHeight: "1.8" }}>
                London Motor Sports has become one of London&apos;s leading independent garages in vehicle servicing, maintenance and repairs. With proven experience of more than 6 years, we have evolved into the best car repair garage in W12.
              </p>
              <p className="story-para leading-relaxed" style={{ color: "var(--color-ink-muted)", fontSize: "1.05rem", lineHeight: "1.8" }}>
                We are completely transparent with our clients — if a booking is cancelled, we refund the amount without question. Whether there are brake failures, engine replacements, or other mechanical issues, our team diagnoses properly and repairs your vehicle with precision.
              </p>
              <p className="story-para leading-relaxed" style={{ color: "var(--color-ink-muted)", fontSize: "1.05rem", lineHeight: "1.8" }}>
                Our expert technicians work tirelessly to recover and restore, ensuring your car moves with proper repair and sustenance — so you can drive with confidence, every time.
              </p>
            </div>
            {/* ========================= */}
            {/* COMPANY STORY END         */}
            {/* ========================= */}

            <div className="accent-rule my-10" />

            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "60+", label: "Repair Services" },
                { value: "1300+", label: "5-Star Reviews" },
                { value: "98%+", label: "Repeat Customers" },
                { value: "W12", label: "London Base" },
              ].map((item) => (
                <div key={item.label} className="quick-fact flex flex-col gap-1">
                  <div
                    className="text-2xl font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-green)", letterSpacing: "-0.02em" }}
                  >
                    {item.value}
                  </div>
                  <div className="text-xs tracking-widest uppercase" style={{ color: "var(--color-ink-faint)" }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}