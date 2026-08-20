"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

/**
 * /services — MehRāj brand system (logo-derived palette, no CSS vars).
 * Alternates dark and light bands for a premium, editorial rhythm.
 * Gradients replace flat fills on dark sections, cards, and CTAs.
 */

// ── Brand palette (from logo + ivory set) ─────────────────────────
const INK = "#3D1214";
const INK_MUTED = "#756961";
const BG = "#FEFDFA";
const SURFACE = "#FAF6EE";
const BORDER = "#F3EADC";
const BORDER_STRONG = "#C6A15B";
const GOLD = "#A9853F";
const GOLD_LIGHT = "#C6A15B";

const INK_GRADIENT = "linear-gradient(135deg, #1E0808 0%, #0D0301 100%)";
const GOLD_GRADIENT = "linear-gradient(135deg, #A9853F 0%, #C6A15B 100%)";
const SURFACE_GRADIENT = "linear-gradient(180deg, #FEFDFA 0%, #FAF6EE 100%)";
const ICON_BG_GRADIENT = "linear-gradient(135deg, rgba(198,161,91,0.22), rgba(169,133,63,0.14))";

const ON_DARK = "rgba(254,253,250,0.62)"; // muted ivory text on ink backgrounds
const ON_DARK_FAINT = "rgba(254,253,250,0.16)"; // hairline borders on ink backgrounds

const GRADIENT_TEXT: React.CSSProperties = {
  backgroundImage: GOLD_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

const SERVICES = [
  {
    title: "Bespoke Tailoring",
    body: "A garment built entirely from your measure — fabric selection, pattern, and every fitting done in-house, from first sketch to final stitch.",
    Icon: RulerIcon,
  },
  {
    title: "Made-to-Measure",
    body: "Our house patterns adjusted precisely to your fit, for a faster turnaround without giving up the hand-finished detail.",
    Icon: PatternIcon,
  },
  {
    title: "Occasion & Wedding Wear",
    body: "Sherwanis, bandhgalas, and festive sets for weddings and celebrations, planned around your event timeline.",
    Icon: OccasionIcon,
  },
  {
    title: "Personal Styling",
    body: "A one-on-one consultation to curate or refresh your wardrobe, from fabric palette to occasion planning.",
    Icon: PaletteIcon,
  },
  {
    title: "Corporate & Group Orders",
    body: "Coordinated tailoring for groups — wedding parties, corporate events — kept consistent across every fit.",
    Icon: GroupIcon,
  },
];

const PROCESS = [
  { title: "Consult", body: "A conversation about fit, fabric, and occasion — in person or by appointment." },
  { title: "Design", body: "Fabric, silhouette, and construction confirmed before a single cut is made." },
  { title: "Craft", body: "Hand-cut and assembled in the Atelier, with a fitting along the way." },
  { title: "Deliver", body: "A final inspection, a final press, and the piece is yours." },
];

export default function ServicesPage() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(
      ".svc-hero > *",
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
    gsap.fromTo(
      ".svc-feature",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".svc-feature", start: "top 80%" },
      }
    );
    gsap.fromTo(
      ".svc-grid-header > *",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".svc-grid-header", start: "top 85%" },
      }
    );
    gsap.fromTo(
      ".service-card",
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 85%" },
      }
    );
    gsap.fromTo(
      ".process-step",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".process-row", start: "top 85%" },
      }
    );
    gsap.fromTo(
      ".svc-cta > *",
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".svc-cta", start: "top 85%" },
      }
    );
  }, []);

  return (
    <main ref={scopeRef} className="relative">
      {/* ── Hero (dark) ───────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-36 pb-28 md:pt-44 md:pb-36" style={{ background: INK_GRADIENT }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, ${BG} 1px, transparent 1px)`,
            backgroundSize: "90px 100%",
          }}
          aria-hidden="true"
        />
        <div className="svc-hero relative z-10 mx-auto max-w-3xl px-6 text-center">
          <CrestIcon className="mx-auto mb-8 h-16 w-16 md:h-20 md:w-20" />
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8" style={{ background: GOLD_GRADIENT }} />
            <span
              className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em]"
              style={{ color: GOLD_LIGHT }}
            >
              Services
            </span>
            <span className="h-px w-8" style={{ background: GOLD_GRADIENT }} />
          </div>
          <h1 className="font-serif text-4xl font-light leading-[1.12] md:text-6xl" style={{ color: BG }}>
            Tailoring,{" "}
            <span className="italic" style={GRADIENT_TEXT}>
              On Your Terms
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg font-sans text-sm leading-[1.9] md:text-base" style={{ color: ON_DARK }}>
            From a single bespoke sherwani to a full wardrobe consultation, every
            service at MehRāj starts with a conversation, not a catalogue.
          </p>
        </div>
      </section>

      {/* ── Featured: The Atelier (light, large) ─────────────────── */}
      <section className="relative py-24 md:py-32" style={{ background: BG }}>
        <div className="svc-feature mx-auto max-w-6xl px-6 md:px-12">
          <div
            className="grid grid-cols-1 items-center gap-12 border p-8 md:grid-cols-2 md:gap-16 md:p-16"
            style={{ borderColor: BORDER, background: SURFACE_GRADIENT }}
          >
            <div className="order-2 flex items-center justify-center md:order-1">
              <AtelierIllustration className="h-auto w-full max-w-md" />
            </div>

            <div className="order-1 md:order-2">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8" style={{ background: GOLD_GRADIENT }} />
                <span
                  className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em]"
                  style={{ color: GOLD }}
                >
                  Signature Service
                </span>
              </div>
              <h2 className="font-serif text-3xl font-light leading-[1.15] md:text-[2.5rem]" style={{ color: INK }}>
                The <span className="italic" style={GRADIENT_TEXT}>Atelier</span>
              </h2>
              <p className="mt-5 max-w-md font-sans text-sm leading-[1.9]" style={{ color: INK_MUTED }}>
                Two ways to make a piece truly yours. Bring in a garment —
                ours or any other brand&apos;s — for resizing, recolouring, or
                reworking. Or bring a reference you love, and we&apos;ll
                recreate it as an original, made-to-measure MehRāj piece.
              </p>
              <ul className="mt-7 flex flex-col gap-2.5">
                {["Resizing, recolouring & refitting", "Bespoke recreation from any reference", "One-on-one consultation, no obligation"].map(
                  (point) => (
                    <li key={point} className="flex items-start gap-2.5 font-sans text-[13px]" style={{ color: INK_MUTED }}>
                      <span className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full" style={{ background: GOLD }} />
                      {point}
                    </li>
                  )
                )}
              </ul>
              <Link
                href="/atelier"
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300"
                style={{ background: GOLD_GRADIENT, color: INK }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = INK_GRADIENT;
                  e.currentTarget.style.color = BG;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = GOLD_GRADIENT;
                  e.currentTarget.style.color = INK;
                }}
              >
                Explore The Atelier
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services grid (light) ─────────────────────────────── */}
      <section className="relative border-t py-24 md:py-28" style={{ borderColor: BORDER, background: BG }}>
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="svc-grid-header mb-14 text-center">
            <h2 className="font-serif text-2xl font-light md:text-3xl" style={{ color: INK }}>
              Every Other <span className="italic" style={GRADIENT_TEXT}>Way We Help</span>
            </h2>
          </div>

          <div className="services-grid grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className="service-card group relative overflow-hidden border p-9 transition-colors duration-300"
                style={{ borderColor: BORDER, background: SURFACE_GRADIENT }}
              >
                <span className="absolute right-6 top-6 font-serif text-xs italic" style={{ color: BORDER_STRONG }}>
                  0{i + 1}
                </span>
                <div
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-105"
                  style={{ borderColor: BORDER_STRONG, background: ICON_BG_GRADIENT }}
                >
                  <s.Icon />
                </div>
                <p className="font-serif text-lg italic" style={GRADIENT_TEXT}>
                  {s.title}
                </p>
                <p className="mt-3 font-sans text-[12.5px] leading-[1.85]" style={{ color: INK_MUTED }}>
                  {s.body}
                </p>
                <span
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: GOLD_GRADIENT }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process (dark) ───────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 md:py-28" style={{ background: INK_GRADIENT }}>
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-16 text-center">
            <span
              className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em]"
              style={{ color: GOLD_LIGHT }}
            >
              How We Work
            </span>
            <h2 className="mt-3 font-serif text-2xl font-light md:text-3xl" style={{ color: BG }}>
              From First Conversation <span className="italic" style={GRADIENT_TEXT}>To Final Fit</span>
            </h2>
          </div>

          <div className="process-row relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <span
              className="pointer-events-none absolute left-0 right-0 top-6 hidden lg:block"
              style={{ height: "1px", background: ON_DARK_FAINT }}
              aria-hidden="true"
            />
            {PROCESS.map((step, i) => (
              <div key={step.title} className="process-step relative text-center lg:text-left">
                <div
                  className="relative z-10 mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border font-serif text-sm italic lg:mx-0"
                  style={{ borderColor: GOLD_LIGHT, background: INK, color: GOLD_LIGHT }}
                >
                  0{i + 1}
                </div>
                <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em]" style={{ color: BG }}>
                  {step.title}
                </h3>
                <p className="mt-3 font-sans text-[12.5px] leading-[1.8]" style={{ color: ON_DARK }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (light) ──────────────────────────────────────── */}
      <section className="relative py-24 text-center md:py-28" style={{ background: BG }}>
        <div className="svc-cta mx-auto max-w-xl px-6">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: GOLD }}>
            Start With A Consultation
          </p>
          <h2 className="mt-4 font-serif text-2xl font-light leading-[1.2] md:text-3xl" style={{ color: INK }}>
            Every Piece Begins With <span className="italic" style={GRADIENT_TEXT}>A Conversation</span>
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center rounded-sm px-9 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] transition-all"
            style={{ background: GOLD_GRADIENT, color: INK }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = INK_GRADIENT;
              e.currentTarget.style.color = BG;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = GOLD_GRADIENT;
              e.currentTarget.style.color = INK;
            }}
          >
            Book An Appointment
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ── Decorative crest ─────────────────────────────────────────── */

function CrestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="svc-gold-grad" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor={GOLD} />
          <stop offset="100%" stopColor={GOLD_LIGHT} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="38" stroke="url(#svc-gold-grad)" strokeWidth="1" />
      <circle cx="50" cy="50" r="31" stroke={GOLD_LIGHT} strokeWidth="0.6" strokeOpacity="0.6" />
      <path d="M15 50 C22 44 22 56 15 50" stroke="url(#svc-gold-grad)" strokeWidth="1" strokeLinecap="round" />
      <path d="M85 50 C78 44 78 56 85 50" stroke="url(#svc-gold-grad)" strokeWidth="1" strokeLinecap="round" />
      <text
        x="50"
        y="61"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontSize="34"
        fill={BG}
      >
        M
      </text>
    </svg>
  );
}

/* ── Large Atelier illustration ───────────────────────────────── */

function AtelierIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of a garment with pins marking alteration points, beside a needle and thread">
      <circle cx="140" cy="140" r="110" stroke={BORDER_STRONG} strokeWidth="1" strokeDasharray="2 6" />
      {/* Garment */}
      <path
        d="M105 60 L92 48 L64 60 L54 90 L72 100 L80 88 L80 210 C80 220 88 228 98 228 L182 228 C192 228 200 220 200 210 L200 88 L208 100 L226 90 L216 60 L188 48 L175 60 C175 60 164 70 140 70 C116 70 105 60 105 60 Z"
        stroke={INK}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M140 70 V228" stroke={INK} strokeWidth="1" strokeOpacity="0.35" />
      {/* Pin markers */}
      <circle cx="105" cy="90" r="3.4" fill={INK} />
      <line x1="105" y1="90" x2="118" y2="76" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="175" cy="90" r="3.4" fill={GOLD} />
      <line x1="175" y1="90" x2="162" y2="76" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="90" cy="180" r="3.4" fill={GOLD} />
      <line x1="90" y1="180" x2="72" y2="180" stroke={GOLD} strokeWidth="1.4" strokeDasharray="3 3" />
      <circle cx="190" cy="180" r="3.4" fill={INK} />
      <line x1="190" y1="180" x2="208" y2="180" stroke={INK} strokeWidth="1.4" strokeDasharray="3 3" />
      {/* Needle & thread motif */}
      <path d="M228 210 L250 188" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M250 188 L256 182 C258 180 258 177 256 175 C254 173 251 173 249 175 L243 181" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M200 224 C208 224 214 218 218 212" stroke={GOLD} strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" />
    </svg>
  );
}

/* ── Service icons ────────────────────────────────────────────── */

function RulerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="9" width="18" height="6" rx="1" transform="rotate(-8 12 12)" stroke={INK} strokeWidth="1.4" />
      <path d="M6.3 10.3 L6.9 12.1 M9.6 9.7 L10.2 11.5 M12.9 9.1 L13.5 10.9 M16.2 8.5 L16.8 10.3" stroke={GOLD} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function PatternIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 4 H15 L19 8 V20 H5 Z" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M15 4 V8 H19" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8 12 H16 M8 15.5 H16 M8 19 H13" stroke={GOLD} strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round" />
    </svg>
  );
}

function OccasionIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4 L12 7 L16 4 L16 10 C16 15 14 18 12 20 C10 18 8 15 8 10 Z" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      {[8, 10.5, 13, 15.5].map((y) => (
        <circle key={y} cx="12" cy={y} r="0.9" fill={GOLD} />
      ))}
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 4 C7 4 3 7.6 3 12 C3 15.5 6 16 7.5 15 C9 14 8 12.3 9.5 12 C11.5 11.6 12 13.5 14 13.5 C18 13.5 21 10.8 21 8.5 C21 5.8 17 4 12 4 Z"
        stroke={INK}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="7.8" cy="8.6" r="1.1" fill={GOLD} />
      <circle cx="12" cy="7.2" r="1.1" fill={GOLD} />
      <circle cx="16" cy="8.8" r="1.1" fill={GOLD} />
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 4 L7 6 M7 6 C5 6 4 7.3 4 9 V20 H10 V9 C10 7.3 9 6 7 6 Z" stroke={GOLD} strokeWidth="1.2" />
      <path d="M17 4 L17 6 M17 6 C15 6 14 7.3 14 9 V20 H20 V9 C20 7.3 19 6 17 6 Z" stroke={INK} strokeWidth="1.4" />
      <circle cx="7" cy="3.4" r="1.1" fill={GOLD} />
      <circle cx="17" cy="3.4" r="1.1" fill={INK} />
    </svg>
  );
}