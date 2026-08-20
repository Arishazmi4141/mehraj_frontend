"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

/**
 * Palette — Ivory Silk / Imperial Gold system (site-wide :root vars):
 * --color-bg / --color-surface / --color-surface-alt   ivory surfaces
 * --color-ink / --color-ink-muted / --color-ink-faint   charcoal text
 * --color-border / --color-border-strong                hairline stone
 * --color-green / --color-green-deep                     Imperial Gold — primary accent
 * --color-brass / --color-brass-soft                     Antique Bronze — secondary accent
 */

const CRAFT_STEPS = [
  {
    number: "01",
    title: "Fabric",
    body: "Every bolt inspected by hand before it earns a place in the House.",
    Icon: FabricIcon,
  },
  {
    number: "02",
    title: "Stitching",
    body: "Seams closed with the same hand-finished technique across every size.",
    Icon: StitchIcon,
  },
  {
    number: "03",
    title: "Embroidery",
    body: "Motifs worked thread by thread, never machine-replicated.",
    Icon: EmbroideryIcon,
  },
  {
    number: "04",
    title: "Finishing",
    body: "Pressed, inspected, and packaged as the final act of care.",
    Icon: FinishingIcon,
  },
];

const GALLERY = [
  {
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=900",
    label: "Hand Embroidery",
    isVideo: true,
  },
  {
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=900",
    label: "The Cutting Table",
    isVideo: false,
  },
  {
    image: "https://images.unsplash.com/photo-1544966503-7cc531ecfd9d?auto=format&fit=crop&q=80&w=900",
    label: "Fabric Selection",
    isVideo: false,
  },
  {
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80&w=900",
    label: "Final Inspection",
    isVideo: true,
  },
];

export default function CraftSection() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(
      ".craft-header > *",
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".craft-header", start: "top 82%" },
      }
    );
    gsap.fromTo(
      ".craft-gallery-item",
      { opacity: 0, scale: 1.04 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".craft-gallery", start: "top 85%" },
      }
    );
    gsap.fromTo(
      ".craft-step",
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".craft-grid", start: "top 88%" },
      }
    );
    gsap.fromTo(
      ".craft-step-icon path, .craft-step-icon circle",
      { strokeDashoffset: 30 },
      {
        strokeDashoffset: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ".craft-grid", start: "top 85%" },
      }
    );
  }, []);

  return (
    <section
      ref={scopeRef}
      id="the-craft"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "var(--color-bg)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "linear-gradient(to right, #211D18 1px, transparent 1px)",
          backgroundSize: "90px 100%",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        <div className="craft-header mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-6" style={{ background: "var(--color-brass)" }} />
            <span
              className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em]"
              style={{ color: "var(--color-brass)" }}
            >
              The Craft
            </span>
            <span className="h-px w-6" style={{ background: "var(--color-brass)" }} />
          </div>
          <h2
            className="font-serif text-3xl font-light leading-[1.15] md:text-[2.8rem]"
            style={{ color: "var(--color-ink)" }}
          >
            Why Every Garment{" "}
            <span className="italic" style={{ color: "var(--color-green-deep)" }}>
              Takes Time
            </span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-lg font-sans text-xs leading-[1.85] md:text-sm"
            style={{ color: "var(--color-ink-muted)" }}
          >
            From fabric to finished packaging, nothing at MehRāj is rushed. This is
            what separates a garment from a piece worth keeping.
          </p>
        </div>

        {/* Ornamental divider */}
        <div className="mb-14 flex items-center justify-center gap-3" aria-hidden="true">
          <span
            className="h-px w-16 sm:w-28"
            style={{ background: "linear-gradient(to left, var(--color-border-strong), transparent)" }}
          />
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 0 L14 7 L7 14 L0 7 Z" stroke="var(--color-green)" strokeWidth="1.2" />
          </svg>
          <span
            className="h-px w-16 sm:w-28"
            style={{ background: "linear-gradient(to right, var(--color-border-strong), transparent)" }}
          />
        </div>

        {/* Photo / video gallery */}
        <div className="craft-gallery mb-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY.map((item) => (
            <div
              key={item.label}
              className="craft-gallery-item group relative aspect-[3/4] overflow-hidden border transition-colors duration-500"
              style={{ borderColor: "var(--color-border)", background: "var(--color-surface-alt)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-green)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
            >
              <img
                src={item.image}
                alt={item.label}
                loading="lazy"
                className="h-full w-full object-cover opacity-85 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              {item.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
                    style={{ borderColor: "var(--color-green)", background: "rgba(0,0,0,0.4)" }}
                  >
                    <Play className="h-3.5 w-3.5 fill-white text-white" strokeWidth={0} />
                  </span>
                </div>
              )}
              <span className="absolute bottom-3 left-3 font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-white">
                {item.label}
              </span>
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: "var(--color-green)" }}
              />
            </div>
          ))}
        </div>

        {/* Process steps */}
        <div
          className="craft-grid grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-4"
          style={{ borderColor: "var(--color-border)", background: "var(--color-border)" }}
        >
          {CRAFT_STEPS.map(({ number, title, body, Icon }) => (
            <div
              key={title}
              className="craft-step group relative p-8 transition-colors duration-300"
              style={{ background: "var(--color-surface)" }}
            >
              <span
                className="absolute right-6 top-7 font-serif text-xs italic"
                style={{ color: "var(--color-border-strong)" }}
              >
                {number}
              </span>
              <div
                className="craft-step-icon mb-4 flex h-12 w-12 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-105"
                style={{ borderColor: "var(--color-border-strong)", background: "var(--color-brass-soft)" }}
              >
                <Icon />
              </div>
              <p className="font-serif text-lg italic" style={{ color: "var(--color-green-deep)" }}>
                {title}
              </p>
              <p className="mt-3 font-sans text-[12px] leading-[1.8]" style={{ color: "var(--color-ink-muted)" }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Custom line-art step icons — Imperial Gold on Antique Bronze wash ── */

function FabricIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="7" width="14" height="12" rx="1" stroke="var(--color-green-deep)" strokeWidth="1.4" />
      <path
        d="M17 8 C19 8 21 9.2 21 11 C21 12.8 19 14 17 14"
        stroke="var(--color-green-deep)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="30"
      />
      <path d="M6 11 H14" stroke="var(--color-brass)" strokeWidth="1" strokeOpacity="0.6" strokeLinecap="round" />
      <path d="M6 15 H14" stroke="var(--color-brass)" strokeWidth="1" strokeOpacity="0.6" strokeLinecap="round" />
      <circle cx="19.5" cy="4.5" r="1" fill="var(--color-green)" />
    </svg>
  );
}

function StitchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 17 C6 13 6 11 3 7"
        stroke="var(--color-green-deep)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="4 3"
      />
      <path
        d="M3 7 L20 4"
        stroke="var(--color-green-deep)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="30"
      />
      <circle cx="20" cy="4" r="1.6" fill="var(--color-green)" />
      <circle cx="3" cy="7" r="1.3" fill="var(--color-brass)" fillOpacity="0.85" />
      <path d="M17 3.4 L21 3 L20.6 6" stroke="var(--color-brass)" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
    </svg>
  );
}

function EmbroideryIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="var(--color-green-deep)" strokeWidth="1.4" strokeDasharray="56" />
      <circle cx="12" cy="12" r="5.2" stroke="var(--color-brass)" strokeWidth="1" strokeOpacity="0.55" />
      <circle cx="12" cy="7.5" r="1" fill="var(--color-green)" />
      <circle cx="15.8" cy="10.2" r="1" fill="var(--color-green)" />
      <circle cx="14.4" cy="14.6" r="1" fill="var(--color-green)" />
      <circle cx="9.6" cy="14.6" r="1" fill="var(--color-green)" />
      <circle cx="8.2" cy="10.2" r="1" fill="var(--color-green)" />
      <circle cx="12" cy="12" r="1.2" fill="var(--color-green-deep)" />
    </svg>
  );
}

function FinishingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 9 L14 5 C17 4 20 6 20 9 C20 12 17.5 13.5 15 13 L6 15 Z"
        stroke="var(--color-green-deep)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeDasharray="60"
      />
      <path d="M6 15 L4.5 19" stroke="var(--color-green-deep)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 19 H4" stroke="var(--color-green-deep)" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M15.5 6.5 C16.5 5.5 16.5 4.5 15.7 3.6"
        stroke="var(--color-brass)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
    </svg>
  );
}