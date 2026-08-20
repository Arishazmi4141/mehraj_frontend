"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scissors } from "lucide-react";
import { useGsap } from "@/src/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

/**
 * Palette — Ivory Silk / Imperial Gold system (site-wide :root vars).
 * See globals.css for the full token list.
 */

export default function AtelierSection() {
  const scopeRef = useGsap<HTMLElement>(() => {
    gsap.fromTo(
      ".atelier-text > *",
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".atelier-text", start: "top 80%" },
      }
    );
    gsap.fromTo(
      ".atelier-image",
      { opacity: 0, scale: 1.05 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".atelier-image", start: "top 82%" },
      }
    );
    gsap.fromTo(
      ".alter-text > *",
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".alter-text", start: "top 82%" },
      }
    );
    gsap.fromTo(
      ".alter-svg",
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".alter-svg", start: "top 85%" },
      }
    );
    gsap.fromTo(
      ".alter-dash",
      { strokeDashoffset: 40 },
      {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: ".alter-svg", start: "top 82%" },
      }
    );
  }, []);

  return (
    <section ref={scopeRef} id="the-atelier" className="relative" style={{ background: "var(--color-bg)" }}>
      {/* Alterations & customisation on existing pieces */}
      <div className="border-t py-24 md:py-32" style={{ borderColor: "var(--color-border)" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 md:px-12 lg:grid-cols-2 lg:gap-20">
          {/* SVG illustration */}
          <div className="alter-svg order-1 flex items-center justify-center">
            <svg
              viewBox="0 0 320 340"
              className="h-auto w-full max-w-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Illustration of a shirt with alteration points marked at the collar, cuffs, waist, and hem"
            >
              {/* Shirt silhouette */}
              <path
                d="M110 46 L92 30 L58 44 L44 86 L66 100 L76 84 L76 250 C76 262 86 272 98 272 L222 272 C234 272 244 262 244 250 L244 84 L254 100 L276 86 L262 44 L228 30 L210 46 C210 46 196 58 160 58 C124 58 110 46 110 46 Z"
                stroke="var(--color-ink)"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              {/* Placket */}
              <path d="M160 58 L160 272" stroke="var(--color-ink)" strokeWidth="1.4" strokeOpacity="0.4" />
              {/* Buttons */}
              {[86, 118, 150, 182, 214, 246].map((y) => (
                <circle key={y} cx="160" cy={y} r="2.2" fill="var(--color-ink)" fillOpacity="0.45" />
              ))}

              {/* Collar adjustment marker */}
              <line
                x1="118" y1="52" x2="150" y2="52"
                stroke="var(--color-green-deep)" strokeWidth="1.6" strokeDasharray="5 5" className="alter-dash"
              />
              <circle cx="118" cy="52" r="3" fill="var(--color-green-deep)" />
              <circle cx="150" cy="52" r="3" fill="var(--color-green-deep)" />
              <text x="134" y="38" textAnchor="middle" className="font-sans" fontSize="9" fill="var(--color-green-deep)" letterSpacing="0.5">
                COLLAR
              </text>

              {/* Cuff adjustment marker — left */}
              <line
                x1="48" y1="102" x2="70" y2="96"
                stroke="var(--color-brass)" strokeWidth="1.6" strokeDasharray="5 5" className="alter-dash"
              />
              <circle cx="48" cy="102" r="3" fill="var(--color-brass)" />
              <circle cx="70" cy="96" r="3" fill="var(--color-brass)" />
              <text x="30" y="122" textAnchor="middle" className="font-sans" fontSize="9" fill="var(--color-brass)" letterSpacing="0.5">
                SLEEVE
              </text>

              {/* Waist adjustment marker */}
              <line
                x1="88" y1="188" x2="232" y2="188"
                stroke="var(--color-green-deep)" strokeWidth="1.6" strokeDasharray="5 5" className="alter-dash"
              />
              <circle cx="88" cy="188" r="3" fill="var(--color-green-deep)" />
              <circle cx="232" cy="188" r="3" fill="var(--color-green-deep)" />
              <text x="160" y="204" textAnchor="middle" className="font-sans" fontSize="9" fill="var(--color-green-deep)" letterSpacing="0.5">
                WAIST
              </text>

              {/* Hem adjustment marker */}
              <line
                x1="80" y1="266" x2="240" y2="266"
                stroke="var(--color-brass)" strokeWidth="1.6" strokeDasharray="5 5" className="alter-dash"
              />
              <circle cx="80" cy="266" r="3" fill="var(--color-brass)" />
              <circle cx="240" cy="266" r="3" fill="var(--color-brass)" />
              <text x="160" y="292" textAnchor="middle" className="font-sans" fontSize="9" fill="var(--color-brass)" letterSpacing="0.5">
                HEM LENGTH
              </text>
            </svg>
          </div>

          <div className="alter-text order-2">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8" style={{ background: "var(--color-brass)" }} />
              <span
                className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em]"
                style={{ color: "var(--color-brass)" }}
              >
                The Atelier
              </span>
            </div>

            <h2 className="max-w-md font-serif text-3xl font-light leading-[1.15] md:text-[2.6rem]" style={{ color: "var(--color-ink)" }}>
              Already Own A Piece?{" "}
              <span className="italic" style={{ color: "var(--color-green-deep)" }}>
                We&apos;ll Refit It.
              </span>
            </h2>

            <p className="mt-6 max-w-md font-sans text-sm leading-[1.85]" style={{ color: "var(--color-ink-muted)" }}>
              Bespoke isn&apos;t the only way to get a MehRāj piece to sit right.
              Bring in a shirt, kurta, or pair of trousers — ours or from any
              other brand — and our tailors will adjust the collar, sleeve,
              waist, or hem, or even rework it in a new colour, until the fit
              is exactly yours.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {[
                "Collar & cuff resizing",
                "Waist take-in or let-out",
                "Sleeve and hem length adjustment",
                "Re-colouring, re-lining & re-stitching",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 font-sans text-[13px]" style={{ color: "var(--color-ink-muted)" }}>
                  <Scissors className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--color-green-deep)" }} strokeWidth={1.5} />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                href="/atelier"
                className="inline-flex items-center gap-2 border px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300"
                style={{ borderColor: "var(--color-border-strong)", color: "var(--color-ink)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-green)";
                  e.currentTarget.style.color = "var(--color-green-deep)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border-strong)";
                  e.currentTarget.style.color = "var(--color-ink)";
                }}
              >
                Book An Alteration
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}