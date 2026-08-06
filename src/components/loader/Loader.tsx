"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoaderProps {
  onFinish: () => void;
}

const BRAND_LETTERS = ["M", "e", "h", "R", "a", "j"];

// Floating ambient dust / gold speckles for premium craft feel
const PARTICLES = [
  { cx: "12%", cy: "20%", r: 1.2 },
  { cx: "88%", cy: "18%", r: 0.9 },
  { cx: "8%", cy: "80%", r: 1.1 },
  { cx: "92%", cy: "82%", r: 1.5 },
  { cx: "50%", cy: "6%", r: 0.8 },
  { cx: "50%", cy: "94%", r: 1.0 },
];

export default function Loader({ onFinish }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]);
  const shineRef = useRef<HTMLDivElement>(null);
  const barTrackRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const barDotRef = useRef<HTMLDivElement>(null);
  const loadingLabelRef = useRef<HTMLSpanElement>(null);
  const ambientParticleRefs = useRef<SVGCircleElement[]>([]);
  const cornerRefs = useRef<HTMLDivElement[]>([]);

  const [isDone, setIsDone] = useState(false);

  // Ambient particle drift (background dust, unrelated to letter reveal)
  useEffect(() => {
    const ctx = gsap.context(() => {
      ambientParticleRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: `${(i % 2 === 0 ? -1 : 1) * (10 + i * 3)}`,
          x: `${(i % 3 === 0 ? 1 : -1) * (5 + i * 2)}`,
          opacity: 0.35 + i * 0.05,
          duration: 4.5 + i * 0.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.2,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Main GSAP animation timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => {
          setIsDone(true);
          onFinish();
        },
      });

      const barProxy = { value: 0 };

      // Base initialization
      tl.set(containerRef.current, { background: "#F4F1EA" })
        .set(barFillRef.current, { scaleX: 0 })
        .set(letterRefs.current, { opacity: 0, filter: "blur(14px)" })
        .to(ambientParticleRefs.current, { opacity: 0.5, duration: 1.5, stagger: 0.1 }, 0)
        .to(orbRef.current, { opacity: 1, scale: 1, duration: 2.2, ease: "power3.out" }, 0)
        .to(cornerRefs.current, { opacity: 1, scale: 1, duration: 1.4, stagger: 0.05 }, 0.2);

      // Smooth left-to-right reveal: each letter clears from blur to sharp, one after another
      const letterDuration = 0.45;
      const letterStagger = 0.22;
      const revealStart = 0.4;

      tl.to(
        letterRefs.current,
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: letterDuration,
          stagger: letterStagger,
          ease: "power2.out",
        },
        revealStart
      );

      const lastLetterEnd =
        revealStart + (BRAND_LETTERS.length - 1) * letterStagger + letterDuration;

      // Loading label + progress track fade in once the name has fully formed
      tl.to(loadingLabelRef.current, { opacity: 1, y: 0, duration: 0.9 }, lastLetterEnd + 0.1)
        .to(barTrackRef.current, { opacity: 1, duration: 0.9 }, lastLetterEnd + 0.1);

      // Smooth progress bar fill + traveling highlight dot
      tl.to(
        barProxy,
        {
          value: 100,
          duration: 2.6,
          ease: "power2.inOut",
          onUpdate: () => {
            const pct = barProxy.value / 100;
            if (barFillRef.current) {
              gsap.set(barFillRef.current, { scaleX: pct });
            }
            if (barDotRef.current && barTrackRef.current) {
              const trackWidth = barTrackRef.current.offsetWidth;
              gsap.set(barDotRef.current, { x: pct * trackWidth });
            }
          },
        },
        lastLetterEnd + 0.3
      );

      // Gold shimmer sweep across the completed wordmark
      tl.fromTo(
        shineRef.current,
        { x: "-100%" },
        { x: "100%", duration: 1.6, ease: "power2.inOut" },
        lastLetterEnd + 0.15
      );

      // Outro transition — premium exit curtain
      tl.to(cornerRefs.current, { opacity: 0, scale: 0.95, duration: 0.6, ease: "power3.in", stagger: 0.02 }, "+=0.35")
        .to(
          [letterRefs.current, loadingLabelRef.current, barTrackRef.current],
          {
            opacity: 0,
            y: -15,
            filter: "blur(6px)",
            duration: 0.8,
            stagger: 0.03,
            ease: "power4.in",
          },
          "-=0.4"
        )
        .to(orbRef.current, { opacity: 0, scale: 1.25, duration: 1, ease: "power3.inOut" }, "-=0.6")
        .to(
          containerRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1.3,
            ease: "power4.inOut",
          },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [onFinish]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden touch-none select-none"
      role="status"
      aria-live="polite"
      aria-label="Loading MehRaj"
    >
      {/* Soft Vignette Overlay for Depth */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 35%, rgba(20, 18, 16, 0.04) 100%)",
        }}
      />

      {/* Floating Gold Dust Particles (ambient background) */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <circle
            key={i}
            ref={(el) => {
              if (el) ambientParticleRefs.current[i] = el;
            }}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill="#C5A059"
            opacity={0}
          />
        ))}
      </svg>

      {/* Warm Gold Glow Behind Logo */}
      <div
        ref={orbRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-90"
        style={{
          width: "600px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(197, 160, 89, 0.12) 0%, rgba(197, 160, 89, 0.03) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Minimalist Corner Brackets */}
      {(["tl", "tr", "bl", "br"] as const).map((pos, i) => (
        <div key={pos} ref={(el) => { if (el) cornerRefs.current[i] = el; }} className="opacity-0 scale-95">
          <CornerAccent pos={pos} />
        </div>
      ))}

      {/* Main Center Content */}
      <div className="relative flex flex-col items-center">
        {/* Brand Name — smooth left-to-right blur-to-unblur reveal */}
        <div className="relative flex overflow-visible px-4">
          {BRAND_LETTERS.map((letter, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) letterRefs.current[i] = el;
              }}
              className="relative inline-block font-serif font-light text-[#141210]"
              style={{
                fontSize: "clamp(3rem, 8vw, 5rem)",
                lineHeight: 1,
                letterSpacing: "0.02em",
                textShadow: "0 0 40px rgba(197, 160, 89, 0.15)",
              }}
            >
              {letter}
            </span>
          ))}

          <div
            ref={shineRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full"
            style={{
              background: "linear-gradient(90deg, transparent 20%, rgba(197, 160, 89, 0.3) 50%, transparent 80%)",
              mixBlendMode: "overlay",
            }}
          />
        </div>

        {/* Loading label */}
        <span
          ref={loadingLabelRef}
          className="mt-5 font-sans text-[9px] font-medium uppercase tracking-[0.5em] opacity-0 translate-y-2"
          style={{ color: "#141210", opacity: 0.4 } as React.CSSProperties}
        >
          Loading
        </span>

        {/* Modern Progress Bar */}
        <div
          ref={barTrackRef}
          className="relative mt-6 h-[2px] w-[180px] overflow-visible opacity-0"
          style={{ background: "rgba(20, 18, 16, 0.08)" }}
        >
          <div
            ref={barFillRef}
            className="absolute inset-y-0 left-0 h-full w-full origin-left"
            style={{
              background: "linear-gradient(90deg, #8C6D37 0%, #C5A059 60%, #E8CE94 100%)",
              transform: "scaleX(0)",
            }}
          />
          <div
            ref={barDotRef}
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 -translate-x-1/2 rounded-full"
            style={{
              background: "#C5A059",
              boxShadow: "0 0 10px 2px rgba(197, 160, 89, 0.6)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Minimal Corner Framing Elements
function CornerAccent({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const isTop = pos.startsWith("t");
  const isLeft = pos.endsWith("l");
  const edgeClass = `absolute ${isTop ? "top-8" : "bottom-8"} ${isLeft ? "left-8" : "right-8"}`;

  return (
    <div className={`pointer-events-none ${edgeClass}`} aria-hidden="true">
      <div
        className="absolute"
        style={{
          [isTop ? "top" : "bottom"]: 0,
          [isLeft ? "left" : "right"]: 0,
          width: "24px",
          height: "1px",
          background: "rgba(197, 160, 89, 0.35)",
        }}
      />
      <div
        className="absolute"
        style={{
          [isTop ? "top" : "bottom"]: 0,
          [isLeft ? "left" : "right"]: 0,
          width: "1px",
          height: "24px",
          background: "rgba(197, 160, 89, 0.35)",
        }}
      />
    </div>
  );
}