"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoaderProps {
  onFinish: () => void;
}

const ARC_R = 38;
const ARC_CIRCUMFERENCE = 2 * Math.PI * ARC_R;
const ARC_CENTER = 48;

const PARTICLES = [
  { cx: "15%", cy: "25%", r: 1.5 },
  { cx: "85%", cy: "20%", r: 1.0 },
  { cx: "10%", cy: "75%", r: 1.2 },
  { cx: "90%", cy: "80%", r: 1.6 },
  { cx: "50%", cy: "5%",  r: 0.8 },
  { cx: "50%", cy: "95%", r: 1.1 },
];

export default function Loader({ onFinish }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef       = useRef<HTMLDivElement>(null);
  const maskRef       = useRef<HTMLDivElement>(null);
  const logoTextRef   = useRef<HTMLSpanElement>(null);
  const shineRef      = useRef<HTMLDivElement>(null);
  const counterElRef  = useRef<HTMLSpanElement>(null);
  const arcCircleRef  = useRef<SVGCircleElement>(null);
  const arcTrackRef   = useRef<SVGCircleElement>(null);
  const taglineRefs   = useRef<HTMLSpanElement[]>([]);
  const particleRefs  = useRef<SVGCircleElement[]>([]);
  const cornerRefs    = useRef<HTMLDivElement[]>([]);

  const [count, setCount]   = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Ambient particle drift
  useEffect(() => {
    const ctx = gsap.context(() => {
      particleRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: `${(i % 2 === 0 ? -1 : 1) * (12 + i * 4)}`,
          x: `${(i % 3 === 0 ? 1 : -1) * (6 + i * 3)}`,
          opacity: 0.25 + i * 0.06,
          duration: 4 + i * 0.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.2,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Main timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => { setIsDone(true); onFinish(); },
      });

      const counterProxy = { value: 0 };

      tl.set(containerRef.current, { background: "#F7F7F4" })
        .set(arcCircleRef.current, { strokeDashoffset: ARC_CIRCUMFERENCE })
        .to(particleRefs.current, { opacity: 0.4, duration: 1.5, stagger: 0.1 }, 0)
        .to(orbRef.current, { opacity: 1, scale: 1, duration: 2, ease: "power3.out" }, 0)
        .to(cornerRefs.current, { opacity: 1, scale: 1, duration: 1.4, stagger: 0.05 }, 0.2);

      tl.to(maskRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power4.inOut" }, 0.4)
        .fromTo(logoTextRef.current, { scale: 1.15, filter: "blur(10px)" }, { scale: 1, filter: "blur(0px)", duration: 2, ease: "power3.out" }, 0.4)
        .to(taglineRefs.current, { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out" }, 1.0)
        .to(counterElRef.current, { opacity: 1, y: 0, duration: 1 }, 1.2);

      tl.to(counterProxy, {
        value: 100,
        duration: 3.5,
        ease: "power2.inOut",
        onUpdate: () => {
          const currentVal = Math.floor(counterProxy.value);
          setCount(currentVal);
          if (arcCircleRef.current) {
            const offset = ARC_CIRCUMFERENCE - (currentVal / 100) * ARC_CIRCUMFERENCE;
            arcCircleRef.current.style.strokeDashoffset = String(offset);
          }
        },
      }, 0.6);

      tl.fromTo(shineRef.current, { x: "-100%" }, { x: "100%", duration: 1.5, ease: "power2.inOut" }, 2.0);

      tl.to(cornerRefs.current, { opacity: 0, scale: 0.95, duration: 0.6, ease: "power3.in", stagger: 0.02 }, "+=0.3")
        .to([maskRef.current, taglineRefs.current, counterElRef.current, arcCircleRef.current, arcTrackRef.current], {
          opacity: 0, y: -20, filter: "blur(8px)", duration: 0.8, stagger: 0.05, ease: "power4.in",
        }, "-=0.4")
        .to(orbRef.current, { opacity: 0, scale: 1.3, duration: 1, ease: "power3.inOut" }, "-=0.6")
        .to(containerRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.2,
          ease: "power4.inOut",
        }, "-=0.5");
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
      aria-label="Loading Premium Automotive Solutions Experience"
    >
      {/* Soft frame vignette — keeps it a paper-white stage, not a stark white flash */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle at 50% 50%, transparent 30%, rgba(23,23,18,0.04) 100%)" }}
      />

      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <circle
            key={i}
            ref={(el) => { if (el) particleRefs.current[i] = el; }}
            cx={p.cx} cy={p.cy} r={p.r}
            fill="#A9773C"
            opacity={0}
          />
        ))}
      </svg>

      <div
        ref={orbRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-90"
        style={{
          width: "650px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(31,74,56,0.07) 0%, rgba(31,74,56,0.02) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {(["tl", "tr", "bl", "br"] as const).map((pos, i) => (
        <div key={pos} ref={(el) => { if (el) cornerRefs.current[i] = el; }} className="opacity-0 scale-95">
          <CornerAccent pos={pos} />
        </div>
      ))}

      <div className="relative flex flex-col items-center">
        <div ref={maskRef} className="relative overflow-hidden px-4" style={{ clipPath: "inset(0% 100% 0% 0%)" }}>
          <span
            ref={logoTextRef}
            className="relative block font-display font-bold text-[#171712]"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 5.5rem)",
              letterSpacing: "0.5em",
              marginRight: "-0.5em",
              textShadow: "0 0 60px rgba(31,74,56,0.12)",
              display: "inline-block",
            }}
          >
            PAS
            <div
              ref={shineRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full"
              style={{
                background: "linear-gradient(90deg, transparent 20%, rgba(23,23,18,0.12) 50%, transparent 80%)",
                mixBlendMode: "multiply",
              }}
            />
          </span>
        </div>

        <div className="mt-4 flex gap-[0.75em]" aria-label="Premium Automotive Solutions">
          {["Premium", "Automotive", "Solutions"].map((word, i) => (
            <span
              key={word}
              ref={(el) => { if (el) taglineRefs.current[i] = el; }}
              className="font-body text-[10px] font-semibold uppercase tracking-[0.4em] translate-y-2 opacity-0"
              style={{ color: "#A9773C" }}
              aria-hidden={i > 0}
            >
              {word}
            </span>
          ))}
        </div>

        <div className="relative mt-16 flex flex-col items-center">
          <svg width="112" height="112" viewBox="0 0 96 96" className="absolute -top-[36px]" aria-hidden="true" style={{ transform: "rotate(-90deg)" }}>
            <circle ref={arcTrackRef} cx={ARC_CENTER} cy={ARC_CENTER} r={ARC_R} fill="none" stroke="rgba(31,74,56,0.1)" strokeWidth="1" />
            <circle
              ref={arcCircleRef}
              cx={ARC_CENTER} cy={ARC_CENTER} r={ARC_R}
              fill="none"
              stroke="url(#loaderArcGradient)"
              strokeWidth="1"
              strokeLinecap="round"
              style={{ strokeDasharray: ARC_CIRCUMFERENCE, strokeDashoffset: ARC_CIRCUMFERENCE }}
            />
            <defs>
              <linearGradient id="loaderArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(31,74,56,0.4)" />
                <stop offset="50%" stopColor="#1F4A38" />
                <stop offset="100%" stopColor="#A9773C" />
              </linearGradient>
            </defs>
          </svg>

          <span
            ref={counterElRef}
            className="font-display font-light tabular-nums opacity-0 translate-y-2"
            style={{ fontSize: "clamp(3rem, 8vw, 4.2rem)", letterSpacing: "-0.03em", color: "#171712", lineHeight: 1 }}
          >
            {String(count).padStart(3, "0")}
            <span className="font-body text-xs font-medium tracking-normal text-[#A9773C] ml-0.5 relative -top-4">%</span>
          </span>

          <p className="mt-5 font-body text-[9px] font-medium uppercase tracking-[0.5em] text-[#171712]/25">
            Excellence In Every Detail
          </p>
        </div>
      </div>
    </div>
  );
}

function CornerAccent({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const isTop  = pos.startsWith("t");
  const isLeft = pos.endsWith("l");
  const edgeClass = `absolute ${isTop ? "top-8" : "bottom-8"} ${isLeft ? "left-8" : "right-8"}`;

  return (
    <div className={`pointer-events-none ${edgeClass}`} aria-hidden="true">
      <div className="absolute" style={{ [isTop ? "top" : "bottom"]: 0, [isLeft ? "left" : "right"]: 0, width: "28px", height: "1px", background: "rgba(31,74,56,0.25)" }} />
      <div className="absolute" style={{ [isTop ? "top" : "bottom"]: 0, [isLeft ? "left" : "right"]: 0, width: "1px", height: "28px", background: "rgba(31,74,56,0.25)" }} />
    </div>
  );
}