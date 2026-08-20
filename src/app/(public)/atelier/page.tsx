"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

/**
 * /atelier — MehRāj brand system (logo-derived palette, no CSS vars).
 * Dark ink / light ivory bands alternate to give the page weight and
 * rhythm. Gradients replace flat fills on dark sections, cards, and CTAs.
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
  { title: "Consultation", body: "Bring your piece or your reference. Your tailor discusses fit, fabric, and what needs to change." },
  { title: "Fabric & Fit", body: "Choose from our curated fabric library, or match your reference, and confirm every construction detail." },
  { title: "Construction", body: "Each piece is hand-worked in the Atelier, with a fitting before final delivery." },
];

const GALLERY = [
  { image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=900", label: "Hand Finishing" },
  { image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=900", label: "The Cutting Table" },
  { image: "https://images.unsplash.com/photo-1544966503-7cc531ecfd9d?auto=format&fit=crop&q=80&w=900", label: "Fabric Library" },
  { image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80&w=900", label: "Final Fitting" },
];

export default function AtelierPage() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(".atl-hero > *", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });

    gsap.fromTo(
      ".atl-track-1",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".atl-track-1", start: "top 80%" } }
    );
    gsap.fromTo(
      ".atl-track-2",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".atl-track-2", start: "top 80%" } }
    );
    gsap.fromTo(
      ".atl-step",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".atl-steps-row", start: "top 85%" },
      }
    );
    gsap.fromTo(
      ".atl-gallery-item",
      { opacity: 0, scale: 1.03 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ".atl-gallery", start: "top 85%" },
      }
    );
    gsap.fromTo(
      ".atl-cta > *",
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: ".atl-cta", start: "top 85%" } }
    );
  }, []);

  return (
    <main ref={scopeRef} className="relative">
      {/* ── Hero (dark) ───────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32" style={{ background: INK_GRADIENT }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, ${BG} 1px, transparent 1px)`,
            backgroundSize: "90px 100%",
          }}
          aria-hidden="true"
        />
        <div className="atl-hero relative z-10 mx-auto max-w-3xl px-6 text-center">
          <NeedleMonogram className="mx-auto mb-8 h-16 w-16 md:h-20 md:w-20" />
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8" style={{ background: GOLD_GRADIENT }} />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em]" style={{ color: GOLD_LIGHT }}>
              The Atelier
            </span>
            <span className="h-px w-8" style={{ background: GOLD_GRADIENT }} />
          </div>
          <h1 className="font-serif text-4xl font-light leading-[1.12] md:text-6xl" style={{ color: BG }}>
            Made For You,{" "}
            <span className="italic" style={GRADIENT_TEXT}>
              Two Ways
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-[1.9] md:text-base" style={{ color: ON_DARK }}>
            The Atelier is where existing pieces get refit, and imagined ones
            get built. Whether you&apos;re bringing in a garment that needs
            work, or a look you&apos;ve always wanted made real, it starts
            with the same conversation with our master tailor — no charge,
            no obligation.
          </p>
        </div>
      </section>

      {/* ── Track 1 — Alterations & Customisation (light) ───────── */}
      <section className="relative py-24 md:py-32" style={{ background: BG }}>
        <div className="atl-track-1 mx-auto max-w-6xl px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
            <div className="order-2 flex items-center justify-center md:order-1">
              <AlterationsIllustration className="h-auto w-full max-w-md" />
            </div>
            <div className="order-1 md:order-2">
              <span className="font-serif text-xs italic" style={{ color: BORDER_STRONG }}>
                01
              </span>
              <h2 className="mt-2 font-serif text-3xl font-light leading-[1.15] md:text-[2.5rem]" style={{ color: INK }}>
                Alterations &{" "}
                <span className="italic" style={GRADIENT_TEXT}>
                  Customisation
                </span>
              </h2>
              <p className="mt-5 max-w-md font-sans text-sm leading-[1.9]" style={{ color: INK_MUTED }}>
                Bring in a shirt, kurta, sherwani, or pair of trousers — ours
                or from any other brand — and our tailors will make it yours
                again.
              </p>
              <ul className="mt-7 flex flex-col gap-2.5">
                {["Resizing — take in or let out", "Collar, cuff & hem adjustment", "Re-colouring & re-lining", "Repairs & re-stitching"].map(
                  (point) => (
                    <li key={point} className="flex items-start gap-2.5 font-sans text-[13px]" style={{ color: INK_MUTED }}>
                      <span className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full" style={{ background: GOLD }} />
                      {point}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Track 2 — Custom Recreation (dark) ───────────────────── */}
      <section className="relative overflow-hidden py-24 md:py-32" style={{ background: INK_GRADIENT }}>
        <div className="atl-track-2 mx-auto max-w-6xl px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
            <div>
              <span className="font-serif text-xs italic" style={{ color: ON_DARK_FAINT }}>
                02
              </span>
              <h2 className="mt-2 font-serif text-3xl font-light leading-[1.15] md:text-[2.5rem]" style={{ color: BG }}>
                Custom{" "}
                <span className="italic" style={GRADIENT_TEXT}>
                  Recreation
                </span>
              </h2>
              <p className="mt-5 max-w-md font-sans text-sm leading-[1.9]" style={{ color: ON_DARK }}>
                Seen a design you love — from another label, a photograph, or
                your own sketch? Our tailors study the silhouette and build it
                fresh, entirely to your measure.
              </p>
              <ul className="mt-7 flex flex-col gap-2.5">
                {[
                  "Reference & silhouette matching",
                  "Fabric selection to match the look",
                  "Fully made-to-measure construction",
                  "One-on-one design consultation",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 font-sans text-[13px]" style={{ color: ON_DARK }}>
                    <span className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full" style={{ background: GOLD_LIGHT }} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <RecreationIllustration className="h-auto w-full max-w-md" />
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works (light) ─────────────────────────────────── */}
      <section className="relative py-24 md:py-28" style={{ background: BG }}>
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <div className="mb-16 text-center">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em]" style={{ color: GOLD }}>
              How It Works
            </span>
            <h2 className="mt-3 font-serif text-2xl font-light md:text-3xl" style={{ color: INK }}>
              Three Steps, <span className="italic" style={GRADIENT_TEXT}>One Conversation</span>
            </h2>
          </div>

          <div className="atl-steps-row relative grid grid-cols-1 gap-10 sm:grid-cols-3">
            <span
              className="pointer-events-none absolute left-0 right-0 top-6 hidden sm:block"
              style={{ height: "1px", borderTop: `1px dashed ${BORDER_STRONG}` }}
              aria-hidden="true"
            />
            {STEPS.map((step, i) => (
              <div key={step.title} className="atl-step relative text-center">
                <div
                  className="relative z-10 mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border font-serif text-sm italic"
                  style={{ borderColor: GOLD, background: BG, color: INK }}
                >
                  0{i + 1}
                </div>
                <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em]" style={{ color: INK }}>
                  {step.title}
                </h3>
                <p className="mx-auto mt-3 max-w-xs font-sans text-[12.5px] leading-[1.8]" style={{ color: INK_MUTED }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery strip (dark) ─────────────────────────────────── */}
      <section className="relative py-24 md:py-28" style={{ background: INK_GRADIENT }}>
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em]" style={{ color: GOLD_LIGHT }}>
              Inside The Atelier
            </span>
          </div>
          <div className="atl-gallery grid grid-cols-2 gap-4 md:grid-cols-4">
            {GALLERY.map((item) => (
              <div
                key={item.label}
                className="atl-gallery-item group relative aspect-[3/4] overflow-hidden border transition-colors duration-500"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-3 left-3 font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-white">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (light) ──────────────────────────────────────────── */}
      <section className="relative py-24 text-center md:py-28" style={{ background: BG }}>
        <div className="atl-cta mx-auto max-w-xl px-6">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: GOLD }}>
            No Charge, No Obligation
          </p>
          <h2 className="mt-4 font-serif text-2xl font-light leading-[1.2] md:text-3xl" style={{ color: INK }}>
            Bring It In, Or{" "}
            <span className="italic" style={GRADIENT_TEXT}>
              Bring It To Life
            </span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300"
              style={{ background: INK_GRADIENT, color: BG }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = GOLD_GRADIENT;
                e.currentTarget.style.color = INK;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = INK_GRADIENT;
                e.currentTarget.style.color = BG;
              }}
            >
              Request a Consultation
            </Link>
            <a
              href="https://wa.me/910000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300"
              style={{ borderColor: BORDER_STRONG, color: INK }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = GOLD;
                e.currentTarget.style.color = GOLD;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = BORDER_STRONG;
                e.currentTarget.style.color = INK;
              }}
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              Message Us Directly
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Decorative monogram ──────────────────────────────────────── */

function NeedleMonogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="atl-gold-grad" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor={GOLD} />
          <stop offset="100%" stopColor={GOLD_LIGHT} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="38" stroke="url(#atl-gold-grad)" strokeWidth="1" />
      <circle cx="50" cy="50" r="31" stroke={GOLD_LIGHT} strokeWidth="0.6" strokeOpacity="0.6" />
      <path d="M32 62 L60 34" stroke={BG} strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M60 34 L65 29 C67 27 70 27 72 29 C74 31 74 34 72 36 L67 41"
        stroke={BG}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M32 62 C26 66 22 64 22 64" stroke="url(#atl-gold-grad)" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 3" />
    </svg>
  );
}

/* ── Large track illustrations ────────────────────────────────── */

function AlterationsIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of a shirt with alteration points marked at collar, sleeve, waist, and hem">
      <circle cx="140" cy="140" r="110" stroke={BORDER_STRONG} strokeWidth="1" strokeDasharray="2 6" />
      <path
        d="M100 58 L84 44 L54 58 L44 92 L64 104 L72 90 L72 220 C72 230 80 238 90 238 L190 238 C200 238 208 230 208 220 L208 90 L216 104 L236 92 L226 58 L196 44 L180 58 C180 58 168 68 140 68 C112 68 100 58 100 58 Z"
        stroke={INK}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M140 68 V238" stroke={INK} strokeWidth="1" strokeOpacity="0.35" />
      {[92, 122, 152, 182, 212].map((y) => (
        <circle key={y} cx="140" cy={y} r="2" fill={INK} fillOpacity="0.4" />
      ))}

      <line x1="106" y1="52" x2="128" y2="52" stroke={INK} strokeWidth="1.4" strokeDasharray="4 4" />
      <circle cx="106" cy="52" r="2.8" fill={INK} />
      <circle cx="128" cy="52" r="2.8" fill={INK} />
      <text x="117" y="40" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill={INK} letterSpacing="0.5">
        COLLAR
      </text>

      <line x1="48" y1="96" x2="66" y2="92" stroke={GOLD} strokeWidth="1.4" strokeDasharray="4 4" />
      <circle cx="48" cy="96" r="2.8" fill={GOLD} />
      <circle cx="66" cy="92" r="2.8" fill={GOLD} />
      <text x="34" y="114" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill={GOLD} letterSpacing="0.5">
        SLEEVE
      </text>

      <line x1="80" y1="164" x2="200" y2="164" stroke={INK} strokeWidth="1.4" strokeDasharray="4 4" />
      <circle cx="80" cy="164" r="2.8" fill={INK} />
      <circle cx="200" cy="164" r="2.8" fill={INK} />
      <text x="140" y="180" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill={INK} letterSpacing="0.5">
        WAIST
      </text>

      <line x1="76" y1="230" x2="204" y2="230" stroke={GOLD} strokeWidth="1.4" strokeDasharray="4 4" />
      <circle cx="76" cy="230" r="2.8" fill={GOLD} />
      <circle cx="204" cy="230" r="2.8" fill={GOLD} />
      <text x="140" y="248" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill={GOLD} letterSpacing="0.5">
        HEM
      </text>
    </svg>
  );
}

function RecreationIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of a reference photograph transforming into a finished, hand-tailored garment">
      <circle cx="140" cy="140" r="110" stroke={ON_DARK_FAINT} strokeWidth="1" strokeDasharray="2 6" />

      {/* Reference card */}
      <g transform="translate(38,86) rotate(-6)">
        <rect x="0" y="0" width="86" height="106" rx="2" stroke={GOLD} strokeWidth="1.6" />
        <path d="M10 78 L32 52 L48 68 L62 44 L76 78 Z" stroke={GOLD} strokeWidth="1.2" strokeLinejoin="round" strokeOpacity="0.8" />
        <circle cx="62" cy="24" r="8" stroke={GOLD} strokeWidth="1.2" strokeOpacity="0.8" />
      </g>

      {/* Arrow */}
      <path d="M140 130 C160 118 178 118 196 130" stroke={GOLD_LIGHT} strokeWidth="1.4" strokeLinecap="round" strokeDasharray="4 4" />
      <path d="M190 124 L198 130 L191 137" stroke={GOLD_LIGHT} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

      {/* Finished garment on hanger */}
      <g transform="translate(158,58)">
        <path d="M42 0 L42 10" stroke={BG} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="42" cy="-4" r="4" stroke={BG} strokeWidth="1.4" />
        <path d="M6 34 L42 10 L78 34" stroke={BG} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M14 34 L2 46 L14 56 L22 48 L22 132 C22 138 27 143 33 143 L51 143 C57 143 62 138 62 132 L62 48 L70 56 L82 46 L70 34 Z"
          stroke={BG}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M42 10 V143" stroke={BG} strokeWidth="1" strokeOpacity="0.3" />
        {[36, 58, 80, 102, 124].map((y) => (
          <circle key={y} cx="42" cy={y} r="1.6" fill={BG} fillOpacity="0.5" />
        ))}
        <circle cx="14" cy="56" r="2.4" fill={GOLD_LIGHT} />
        <circle cx="70" cy="56" r="2.4" fill={GOLD_LIGHT} />
      </g>
    </svg>
  );
}