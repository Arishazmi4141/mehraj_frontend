"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoaderLogoProps {
  onStrokeComplete?: () => void;
}

export function LoaderLogo({ onStrokeComplete }: LoaderLogoProps) {
  const containerRef   = useRef<HTMLDivElement>(null);
  const svgRef         = useRef<SVGSVGElement>(null);
  const shineRef       = useRef<SVGRectElement>(null);
  const fillGroupRef   = useRef<SVGGElement>(null);
  const strokeGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const svg = svgRef.current;
    if (!svg) return;

    const strokePaths = strokeGroupRef.current?.querySelectorAll("path");
    const fillGroup = fillGroupRef.current;
    const shine = shineRef.current;
    if (!strokePaths || !fillGroup || !shine) return;

    if (prefersReduced) {
      (fillGroup as SVGElement).style.opacity = "1";
      onStrokeComplete?.();
      return;
    }

    strokePaths.forEach((path) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
    });

    gsap.set(fillGroup, { opacity: 0 });
    gsap.set(shine, { x: -280, opacity: 0 });

    const tl = gsap.timeline({ onComplete: () => onStrokeComplete?.() });

    tl.to(Array.from(strokePaths), { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", stagger: 0.08 });
    tl.to(fillGroup, { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.3");
    tl.to(strokeGroupRef.current, { opacity: 0, duration: 0.3, ease: "power1.in" }, "-=0.2");
    tl.to(shine, { opacity: 0.4, duration: 0.05 }, "+=0.1");
    tl.to(shine, { x: 280, duration: 0.9, ease: "power1.inOut" });
    tl.to(shine, { opacity: 0, duration: 0.15 }, "-=0.15");

    return () => { tl.kill(); };
  }, [onStrokeComplete]);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center select-none">
      <div
        className="absolute"
        style={{
          width: 260, height: 260,
          background: "radial-gradient(ellipse at center, rgba(31,74,56,0.08) 0%, transparent 70%)",
          filter: "blur(24px)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      <svg ref={svgRef} viewBox="0 0 280 160" width="280" height="160" xmlns="http://www.w3.org/2000/svg" aria-label="PAS — Premium Automotive Solutions" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="brandFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2C6B4F" />
            <stop offset="45%" stopColor="#1F4A38" />
            <stop offset="100%" stopColor="#123024" />
          </linearGradient>
          <clipPath id="logoClip">
            <rect x="10" y="10" width="260" height="140" />
          </clipPath>
          <linearGradient id="shineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(23,23,18,0)" />
            <stop offset="45%" stopColor="rgba(23,23,18,0.14)" />
            <stop offset="50%" stopColor="rgba(23,23,18,0.22)" />
            <stop offset="55%" stopColor="rgba(23,23,18,0.14)" />
            <stop offset="100%" stopColor="rgba(23,23,18,0)" />
          </linearGradient>
        </defs>

        <g ref={strokeGroupRef} fill="none" stroke="#1F4A38" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M28 120 L28 40 L62 40 Q82 40 82 62 Q82 84 62 84 L28 84" />
          <path d="M100 120 L128 40 L156 120" />
          <path d="M110 92 L146 92" />
          <path d="M198 52 Q198 40 218 40 L246 40 Q258 40 258 52 Q258 62 240 68 L210 76 Q196 82 196 96 Q196 108 208 114 L236 120 Q254 120 254 108" />
          <path d="M14 134 L266 134" strokeWidth="0.6" strokeOpacity="0.5" />
          <path d="M14 30 L266 30" strokeWidth="0.6" strokeOpacity="0.5" />
        </g>

        <g ref={fillGroupRef} fill="url(#brandFill)">
          <path d="M28 120 L28 40 L62 40 Q82 40 82 62 Q82 84 62 84 L28 84 Z M36 76 L60 76 Q74 76 74 62 Q74 48 60 48 L36 48 Z" fillRule="evenodd" />
          <path d="M100 120 L128 40 L156 120 L148 120 L128 60 L108 120 Z" />
          <rect x="112" y="88" width="32" height="6" rx="1" />
          <path d="M198 52 Q198 40 218 40 L246 40 Q258 40 258 52 Q258 62 240 68 L210 76 Q196 82 196 96 Q196 108 208 114 L236 120 Q254 120 254 108 L246 108 Q248 116 236 116 L210 110 Q204 106 204 96 Q204 88 216 84 L246 76 Q252 72 252 62 Q252 48 246 48 L218 48 Q206 48 206 52 Z" />
          <rect x="14" y="133.5" width="252" height="0.7" rx="0.35" opacity="0.4" />
          <rect x="14" y="29.5" width="252" height="0.7" rx="0.35" opacity="0.4" />
        </g>

        <g clipPath="url(#logoClip)">
          <rect ref={shineRef} x="-60" y="0" width="60" height="160" fill="url(#shineGrad)" opacity="0" style={{ pointerEvents: "none" }} />
        </g>
      </svg>
    </div>
  );
}