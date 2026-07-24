"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import type { ServiceItem } from "@/src/types/service";

interface ServiceCardProps {
  service:    ServiceItem;
  className?: string;
}

export default function ServiceCard({ service, className = "" }: ServiceCardProps) {
  const Icon    = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: e.clientX - left - width / 2,
        y: e.clientY - top - height / 2,
        opacity: 1,
        duration: 0.35,
        ease: "power1.out",
      });
    }
  };

  const handleMouseEnter = () => {
    if (iconRef.current) gsap.to(iconRef.current, { y: -3, scale: 1.1, duration: 0.4, ease: "power2.out" });
    if (ruleRef.current) gsap.to(ruleRef.current, { width: "4rem", duration: 0.5, ease: "power3.out" });
  };

  const handleMouseLeave = () => {
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    if (iconRef.current) gsap.to(iconRef.current, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
    if (ruleRef.current) gsap.to(ruleRef.current, { width: "2rem", duration: 0.5, ease: "power3.out" });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`service-card group relative flex flex-col overflow-hidden bg-white p-9 transition-colors duration-500 hover:bg-[#FBFAF7] ${className}`}
    >
      {/* Cursor-tracking glow */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(31,74,56,0.08) 0%, transparent 70%)" }}
      />

      {/* Top accent rule */}
      <div ref={ruleRef} aria-hidden className="mb-9" style={{ height: "2px", width: "2rem", background: "linear-gradient(to right, #1F4A38, #C9A063)" }} />

      {/* Icon */}
      <div ref={iconRef} className="mb-7">
        <div className="inline-flex h-11 w-11 items-center justify-center bg-[#1F4A38]/[0.06] border border-[#1F4A38]/10">
          <Icon className="h-5 w-5 text-[#1F4A38]" strokeWidth={1.5} aria-hidden />
        </div>
      </div>

      <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-[#171712]">
        {service.title}
      </h3>

      <p className="mt-4 font-body text-[13px] leading-[1.8] text-[#6B685F] transition-colors duration-300 group-hover:text-[#4A4740]">
        {service.description}
      </p>

      <Link
        href={service.href}
        className="mt-auto pt-9 flex items-center gap-2.5 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1F4A38]"
      >
        Discover
        <span className="transition-transform duration-350 group-hover:translate-x-1.5">→</span>
      </Link>

      {/* Border, drawn last so it sits above the hover background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 border border-[#E7E3D8] transition-colors duration-500 group-hover:border-[#1F4A38]/25" />
    </div>
  );
}