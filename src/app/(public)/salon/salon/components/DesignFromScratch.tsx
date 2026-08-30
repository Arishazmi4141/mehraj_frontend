"use client";

import { PenTool, Image as ImageIcon, Ruler, ShoppingBag } from "lucide-react";
import IdeaToGarmentIllustration from "./IdeaToGarmentIllustration";

/**
 * DesignFromScratch — Salon's answer to Atelier's "Custom Recreation" track.
 * Same visual language: dark ink gradient, gold gradient text/accents,
 * decorative dashed rings, custom SVG illustration, numbered steps with
 * a connector line. Built to be the most eye-catching section on /salon.
 */

const INK_GRADIENT = "linear-gradient(135deg, #1E0808 0%, #0D0301 100%)";
const GOLD_GRADIENT = "linear-gradient(135deg, #A9853F 0%, #C6A15B 100%)";
const GOLD = "#A9853F";
const GOLD_LIGHT = "#C6A15B";
const BG = "#FEFDFA";
const ON_DARK = "rgba(254,253,250,0.62)";
const ON_DARK_FAINT = "rgba(254,253,250,0.16)";

const GRADIENT_TEXT: React.CSSProperties = {
  backgroundImage: GOLD_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

const STEPS = [
  {
    icon: PenTool,
    step: "01",
    title: "Share Your Idea",
    body: "No cloth, no problem. Describe what you have in mind, or send a photo, sketch, or Pinterest reference.",
  },
  {
    icon: ImageIcon,
    step: "02",
    title: "We Visualise It",
    body: "Our design team translates your idea into a concept — fabric, colour, and silhouette shown to you first.",
  },
  {
    icon: Ruler,
    step: "03",
    title: "Measured & Made",
    body: "Once you approve the concept, it's built entirely made-to-measure — from raw fabric to finished piece.",
  },
  {
    icon: ShoppingBag,
    step: "04",
    title: "Delivered To You",
    body: "A one-of-a-kind garment, designed around your exact requirement — not picked off a rack.",
  },
];

const GALLERY = [
  {
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
    label: "Concept Sketch",
  },
  {
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800",
    label: "Fabric Selection",
  },
  {
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=800",
    label: "Finished Garment",
  },
];

export default function DesignFromScratch() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32" style={{ background: INK_GRADIENT }}>
      {/* faint vertical grid texture, same trick as Atelier hero */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, ${BG} 1px, transparent 1px)`,
          backgroundSize: "90px 100%",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        {/* ── Heading ── */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8" style={{ background: GOLD_GRADIENT }} />
            <span
              className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em]"
              style={{ color: GOLD_LIGHT }}
            >
              No Garment Yet? No Problem
            </span>
            <span className="h-px w-8" style={{ background: GOLD_GRADIENT }} />
          </div>
          <h2 className="font-serif text-3xl font-light leading-[1.15] md:text-5xl" style={{ color: BG }}>
            Don&apos;t Have The Piece Yet?{" "}
            <span className="italic" style={GRADIENT_TEXT}>
              We&apos;ll Build It
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-[1.9]" style={{ color: ON_DARK }}>
            Some of our clients walk in with nothing but an idea — a photo
            they saved, a sketch on paper, or just a description of what
            they&apos;re imagining. That&apos;s exactly where this service
            begins. No existing garment required.
          </p>
        </div>

        {/* ── Idea → Build → Finished illustration + gallery ── */}
        <div className="mt-16 grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex items-center justify-center">
            <IdeaToGarmentIllustration className="h-auto w-full max-w-md" />
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {GALLERY.map((item, i) => (
              <div
                key={item.label}
                className="group relative aspect-3/4 overflow-hidden border transition-colors duration-500 cursor-pointer"
                style={{ borderColor: ON_DARK_FAINT }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = GOLD_LIGHT)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = ON_DARK_FAINT)}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-85 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-2 left-2 font-sans text-[8px] font-semibold uppercase tracking-[0.15em] text-white md:bottom-3 md:left-3 md:text-[9px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Steps with connector line (same pattern as Atelier "How It Works") ── */}
        <div className="relative mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <span
            className="pointer-events-none absolute left-0 right-0 top-6 hidden lg:block"
            style={{ height: "1px", borderTop: `1px dashed ${GOLD_LIGHT}`, opacity: 0.4 }}
            aria-hidden="true"
          />
          {STEPS.map(({ icon: Icon, step, title, body }) => (
            <div key={step} className="relative text-center lg:text-left">
              <div
                className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border lg:mx-0"
                style={{ borderColor: GOLD, background: INK_GRADIENT }}
              >
                <Icon className="h-5 w-5" style={{ color: GOLD_LIGHT }} strokeWidth={1.4} />
              </div>
              <span className="mt-4 block font-serif text-xs italic" style={{ color: GOLD_LIGHT }}>
                {step}
              </span>
              <h3
                className="mt-1 font-sans text-[12px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: BG }}
              >
                {title}
              </h3>
              <p
                className="mx-auto mt-3 max-w-xs font-sans text-[12.5px] leading-[1.8] lg:mx-0"
                style={{ color: ON_DARK }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 