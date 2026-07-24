"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoaderProgressProps {
  progress: number; // 0–100
}

export function LoaderProgress({ progress }: LoaderProgressProps) {
  const arcRef = useRef<SVGCircleElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const prevProgressRef = useRef(0);

  const R = 28;
  const C = 2 * Math.PI * R;

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const arc = arcRef.current;
    const dot = dotRef.current;
    if (!arc || !dot) return;

    const targetOffset = C - (progress / 100) * C;
    const angle = (progress / 100) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    const dotX = 32 + R * Math.cos(rad);
    const dotY = 32 + R * Math.sin(rad);

    if (prefersReduced) {
      arc.style.strokeDashoffset = `${targetOffset}`;
      gsap.set(dot, { attr: { cx: dotX, cy: dotY } });
      prevProgressRef.current = progress;
      return;
    }

    gsap.to(arc, { strokeDashoffset: targetOffset, duration: 0.5, ease: "power2.out" });
    gsap.to(dot, { attr: { cx: dotX, cy: dotY }, duration: 0.5, ease: "power2.out" });
    prevProgressRef.current = progress;
  }, [progress, C]);

  const initRad = (-90 * Math.PI) / 180;
  const initDotX = 32 + R * Math.cos(initRad);
  const initDotY = 32 + R * Math.sin(initRad);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: 64, height: 64 }}>
        <svg viewBox="0 0 64 64" width="64" height="64" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="32" cy="32" r={R} fill="none" stroke="rgba(31,74,56,0.12)" strokeWidth="1.5" />
          <circle
            ref={arcRef}
            cx="32" cy="32" r={R}
            fill="none"
            stroke="#1F4A38"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C}
            style={{ transition: "none" }}
          />
          <circle ref={dotRef} cx={initDotX} cy={initDotY} r="2.5" fill="#A9773C" style={{ filter: "drop-shadow(0 0 3px rgba(31,74,56,0.4))" }} />
        </svg>
      </div>

      <span
        className="text-xs tracking-[0.3em] font-light tabular-nums"
        style={{ color: "#8C8A80", fontFamily: "var(--font-inter, Inter, sans-serif)", letterSpacing: "0.3em" }}
      >
        {String(progress).padStart(3, "\u2007")}
      </span>
    </div>
  );
}