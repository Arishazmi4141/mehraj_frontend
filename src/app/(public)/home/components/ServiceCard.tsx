"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import type { ServiceItem } from "@/src/types/service";

interface ServiceCardProps {
  service: ServiceItem;
  className?: string;
}

export default function ServiceCard({ service, className = "" }: ServiceCardProps) {
  const Icon = service.icon;
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
      className={`service-card group relative flex flex-col overflow-hidden bg-white p-9 transition-colors duration-500 hover:bg-[#FAFAFA] ${className}`}
    >
      {/* Cursor-tracking Florentine Gold Glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(184,151,82,0.12) 0%, transparent 70%)" }}
      />

      {/* Top Accent Gradient Rule */}
      <div
        ref={ruleRef}
        aria-hidden="true"
        className="mb-9"
        style={{ height: "2px", width: "2rem", background: "linear-gradient(to right, #B89752, #0A1118)" }}
      />

      {/* Icon Wrapper */}
      <div ref={iconRef} className="mb-7">
        <div className="inline-flex h-11 w-11 items-center justify-center border border-[#0A1118]/10 bg-[#FAFAFA] text-[#0A1118] transition-colors duration-400 group-hover:border-[#B89752] group-hover:bg-[#0A1118] group-hover:text-[#FAFAFA]">
          <Icon className="h-5 w-5 transition-colors duration-300" strokeWidth={1.3} aria-hidden="true" />
        </div>
      </div>

      {/* Service Title */}
      <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0A1118]">
        {service.title}
      </h3>

      {/* Service Description */}
      <p className="mt-4 font-sans text-[12.5px] leading-[1.8] text-[#4A5568] transition-colors duration-300 group-hover:text-[#0A1118]">
        {service.description}
      </p>

      {/* Discover Action Link */}
      <Link
        href={service.href}
        className="mt-auto pt-9 flex items-center gap-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B89752] transition-colors duration-300 group-hover:text-[#0A1118]"
      >
        Discover
        <span className="transition-transform duration-350 group-hover:translate-x-1.5">→</span>
      </Link>

      {/* Border overlay with gold transition on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border border-[#0A1118]/10 transition-colors duration-500 group-hover:border-[#B89752]/40"
      />
    </div>
  );
}