"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

interface HeroSectionProps {
  heading?: string;
  subheading?: string;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  heroImageMain?: string;
  heroImageSecondary?: string;
}

/**
 * Waits until `el` and every one of its ancestors is actually visible
 * (computed opacity !== "0") before firing `cb`.
 *
 * Why this is needed: PageRevealProvider mounts page content immediately
 * but keeps it at `opacity: 0` (via inline style) until the Loader
 * finishes. If this component's entrance animation runs on plain mount,
 * it plays — and finishes — while still hidden behind that opacity:0
 * wrapper, so by the time the page is actually revealed there's nothing
 * left to animate. Polling ancestor opacity lets us start the timeline
 * exactly when the content becomes visible, regardless of whether this
 * section is wrapped by a loader or rendered directly.
 */
function waitUntilVisible(el: HTMLElement, cb: () => void): () => void {
  let rafId = 0;
  const check = () => {
    let node: HTMLElement | null = el;
    while (node) {
      const style = window.getComputedStyle(node);
      if (style.opacity === "0" || style.visibility === "hidden") {
        rafId = requestAnimationFrame(check);
        return;
      }
      node = node.parentElement;
    }
    cb();
  };
  check();
  return () => cancelAnimationFrame(rafId);
}

export default function HeroSection({
  heading = "L'Arte della Sartoria Italiana",
  subheading = "Handcrafted in Naples & Milan. Engineered for gentlemen who understand that true luxury lies in unyielding precision, structured shoulders, and rare Italian cashmere.",
  ctaPrimaryText = "Discover Collezione '26",
  ctaPrimaryHref = "/collection",
  ctaSecondaryText = "Book Bespoke Fitting",
  ctaSecondaryHref = "/bespoke",
  heroImageMain = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwa1q4X6XSc1JLqUM-1nh1kEbnfWH4ipwMsbfJUYyA2Q&s=10",
  heroImageSecondary = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_RH1vbxzMXW6UhBIy2AOhb4fXR-HqaPDvbqEuPkjwWg&s=10",
}: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const secondaryImageRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const footerBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!containerRef.current) return;

    if (prefersReduced) return;

    let ctx: gsap.Context | undefined;

    const cancelWait = waitUntilVisible(containerRef.current, () => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // 1. Reveal Main Image Canvas with smooth clip-path transition
        tl.fromTo(
          mainImageRef.current,
          { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", scale: 1.12 },
          { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", scale: 1, duration: 1.8 }
        );

        // 2. Reveal Secondary Floating Frame
        tl.fromTo(
          secondaryImageRef.current,
          { opacity: 0, y: 40, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "back.out(1.2)" },
          "-=1.2"
        );

        // 3. Staggered Text Animations
        const textElements = textContentRef.current?.children;
        if (textElements) {
          tl.fromTo(
            Array.from(textElements),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.14 },
            "-=1.0"
          );
        }

        // 4. Badge Bounce Effect
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.8, rotate: -12 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: "elastic.out(1, 0.75)" },
          "-=0.8"
        );

        // 5. Footer Specifications Bar
        tl.fromTo(
          footerBarRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        );
      }, containerRef);
    });

    return () => {
      cancelWait();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#FAFAFA] text-[#0A1118] selection:bg-[#0A1118] selection:text-white"
    >
      {/* Background Architectural Subtle Lines (Pinstripe Craft Effect) */}
      <div 
        className="pointer-events-none absolute inset-0 z-[1] opacity-35"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(10, 17, 24, 0.04) 1px, transparent 1px)",
          backgroundSize: "80px 100%"
        }}
        aria-hidden="true"
      />

      {/* Main Grid Layout (Asymmetric 12-Column Fashion Layout) */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 lg:grid-cols-12 items-center px-6 pt-28 pb-16 md:px-12 lg:gap-12 lg:pt-20">
        
        {/* LEFT COLUMN: Editorial Typography & CTAs (Cols 1 to 7) */}
        <div ref={textContentRef} className="lg:col-span-7 flex flex-col justify-center space-y-8 z-20 pt-8 lg:pt-0">
          
          {/* Eyebrow Tag */}
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#B89752]" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.35em] text-[#B89752]">
              NAPOLI • MILANO • EST. 1968
            </span>
          </div>

          {/* Headline with Midnight Navy & Serif Gold Accent */}
          <h1 className="font-serif text-[2.8rem] font-light leading-[1.05] tracking-[-0.02em] text-[#0A1118] sm:text-[4rem] lg:text-[5.2rem]">
            {heading.split(" ").slice(0, 2).join(" ")}{" "}
            <span className="italic font-normal text-[#B89752]">
              {heading.split(" ").slice(2, 4).join(" ")}
            </span>{" "}
            <span className="block text-[#0A1118]">
              {heading.split(" ").slice(4).join(" ")}
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-[540px] font-sans text-sm font-normal leading-[1.85] text-[#4A5568] md:text-base">
            {subheading}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-5 pt-2">
            <Link
              href={ctaPrimaryHref}
              className="group relative inline-flex items-center gap-3 overflow-hidden bg-[#0A1118] px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FAFAFA] shadow-lg shadow-[#0A1118]/10 transition-all duration-500 hover:bg-[#1a2533] hover:shadow-xl"
            >
              <span>{ctaPrimaryText}</span>
              <svg
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href={ctaSecondaryHref}
              className="group inline-flex items-center gap-3 border border-[#0A1118]/25 px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#0A1118] transition-all duration-300 hover:border-[#0A1118] hover:bg-[#0A1118]/5"
            >
              <span>{ctaSecondaryText}</span>
            </Link>
          </div>

          {/* Quality Guarantee Note */}
          <div className="flex items-center gap-8 pt-6 border-t border-[#0A1118]/10 max-w-[500px]">
            <div>
              <p className="font-serif text-lg font-normal text-[#0A1118]">100% Super 180s Wool</p>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#4A5568]">Loro Piana Fabrics</p>
            </div>
            <div className="h-8 w-px bg-[#0A1118]/15" />
            <div>
              <p className="font-serif text-lg font-normal text-[#0A1118]">Full Canvas</p>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#4A5568]">Hand-Stitched Horsehair</p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Asymmetric Fashion Imagery Frame (Cols 8 to 12) */}
        <div className="relative lg:col-span-5 flex items-center justify-center mt-12 lg:mt-0">
          
          {/* Main Hero Image Canvas */}
          <div
            ref={mainImageRef}
            className="relative h-[520px] w-full max-w-[440px] overflow-hidden rounded-none shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] lg:h-[640px]"
          >
            <Image
              src={heroImageMain}
              alt="Italian Tailored Suit"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top filter brightness-[0.98] contrast-[1.02]"
            />
          </div>

          {/* Secondary Floating Detail Frame (Overlapping Offset Image) */}
          <div
            ref={secondaryImageRef}
            className="absolute -bottom-6 -left-4 z-20 hidden h-[220px] w-[170px] overflow-hidden border-4 border-[#FAFAFA] bg-[#FAFAFA] shadow-2xl sm:block lg:-left-12 lg:h-[260px] lg:w-[200px]"
          >
            <Image
              src={heroImageSecondary}
              alt="Sartorial Suit Detail"
              fill
              sizes="200px"
              className="object-cover object-center"
            />
          </div>

          {/* Circular Stamp / Seal Badge */}
          <div
            ref={badgeRef}
            className="absolute -top-6 -right-2 z-30 flex h-24 w-24 items-center justify-center rounded-full border border-[#B89752]/30 bg-[#FAFAFA]/90 p-2 shadow-xl backdrop-blur-md sm:h-28 sm:w-28"
          >
            <div className="text-center">
              <span className="block font-serif text-xs italic text-[#B89752]">Fatto a</span>
              <span className="block font-sans text-[9px] font-bold uppercase tracking-[0.25em] text-[#0A1118]">Mano</span>
              <span className="block font-sans text-[8px] text-[#4A5568]">Italia</span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Ticker / Brand Attributes Bar */}
      <div 
        ref={footerBarRef}
        className="relative z-20 w-full border-t border-[#0A1118]/10 bg-[#FAFAFA]/80 py-4.5 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-6 px-6 md:px-12 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#0A1118]/70">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B89752]" />
            <span>Handmade Canvas Construction</span>
          </div>
          <div className="hidden md:flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0A1118]" />
            <span>Worldwide Express Shipping</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B89752]" />
            <span>Private Fitting Ateliers</span>
          </div>
        </div>
      </div>

    </section>
  );
}