"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/src/context/CartContext";

/**
 * Palette (matches HeroSection):
 * #0A0200  ink        — curtain bg, scrolled header bg
 * #3D1214  wine        — cart badge, active accents
 * #756961  brass/taupe — hover states, underline, orb glow
 * #EDE7DF  ivory       — light text on dark surfaces
 */

const NAV_LINKS = [
  { label: "The House", href: "/the-house" },
  { label: "Collections", href: "/collections" },
  { label: "The Atelier", href: "/atelier" },
  { label: "The Salon", href: "/salon" },
  { label: "The Craft", href: "/the-craft" },
  { label: "The Journal", href: "/journal" },
  { label: "Client Services", href: "/client-services" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalCount, openDrawer } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const linksWrapRef = useRef<HTMLDivElement>(null);
  const lineTopRef = useRef<HTMLSpanElement>(null);
  const lineBotRef = useRef<HTMLSpanElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const useLightText = isOpen;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const top = lineTopRef.current;
      const bot = lineBotRef.current;
      const curtain = curtainRef.current;
      const linksWrap = linksWrapRef.current;
      const validItems = gsap.utils.toArray(".nav-link-item", linksWrap) as HTMLDivElement[];
      const orb = orbRef.current;

      if (!top || !bot || !curtain || !linksWrap) return;

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power4.inOut" } });

      tl.to(top, { y: 4, rotation: 45, width: "22px", duration: 0.45 }, 0).to(
        bot,
        { y: -4, rotation: -45, width: "22px", duration: 0.45 },
        0
      );

      tl.to(curtain, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.8 }, 0);

      tl.set(linksWrap, { visibility: "visible" }, 0.2)
        .to(linksWrap, { opacity: 1, duration: 0.4 }, 0.2)
        .to(orb, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }, 0.2);

      tl.fromTo(
        validItems,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.05, ease: "power3.out" },
        0.35
      );

      timelineRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!timelineRef.current) return;
    isOpen ? timelineRef.current.play() : timelineRef.current.reverse();
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div ref={containerRef}>
      <header
        className={`fixed inset-x-0 top-0 z-[95] transition-all duration-500 ${
          isScrolled && !isOpen
            ? "bg-[#0A0200]/90 border-b border-[#756961]/15 backdrop-blur-md py-3 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          <div className="z-[100] flex flex-1 items-center justify-start">
            <button
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="group flex h-9 w-9 flex-col items-start justify-center focus-visible:outline-none"
            >
              <div className="flex flex-col gap-1.5 items-start justify-center h-full w-full">
                <span
                  ref={lineTopRef}
                  className="h-[1.5px] w-5 bg-[#EDE7DF] transition-colors duration-300 will-change-transform group-hover:bg-[#756961]"
                  style={{ transformOrigin: "center center" }}
                />
                <span
                  ref={lineBotRef}
                  className="h-[1.5px] w-3.5 bg-[#EDE7DF] transition-all duration-300 will-change-transform group-hover:bg-[#756961] group-hover:w-5"
                  style={{ transformOrigin: "center center" }}
                />
              </div>
            </button>
          </div>

          <div className="absolute left-1/2 top-1/2 z-[100] -translate-x-1/2 -translate-y-1/2 text-center">
            <Link
              href="/"
              onClick={closeMenu}
              className="group flex flex-col items-center focus-visible:outline-none"
              aria-label="MehRāj Home"
            >
              <Image
                src="/logo.jpg"
                alt="MehRāj"
                width={64}
                height={64}
                priority
                className="h-12 w-12 object-contain transition-all duration-500 md:h-14 md:w-14"
              />
            </Link>
          </div>

          <div className="z-[100] flex flex-1 items-center justify-end">
            <button
              onClick={openDrawer}
              aria-label="Open shopping bag"
              className="group relative flex h-9 w-9 items-center justify-center focus-visible:outline-none"
            >
              <ShoppingBag className="h-[18px] w-[18px] text-[#EDE7DF] transition-colors duration-300 group-hover:text-[#756961]" />
              {totalCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center bg-[#3D1214] font-sans text-[8px] font-bold text-[#EDE7DF]">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen menu curtain */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0A0200] touch-none select-none"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      >
        <div
          ref={orbRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-90"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(117,105,97,0.20) 0%, rgba(61,18,20,0.10) 45%, transparent 75%)",
            filter: "blur(65px)",
          }}
        />

        <div
          ref={linksWrapRef}
          className="relative z-[99] flex flex-col items-center justify-center text-center opacity-0"
          style={{ visibility: "hidden" }}
        >
          <nav className="flex flex-col gap-y-3 md:gap-y-3.5" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.href} className="nav-link-item overflow-hidden py-0.5">
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`group relative block font-serif text-base font-light uppercase tracking-[0.18em] md:text-lg transition-colors duration-400 focus-visible:outline-none ${
                      isActive ? "text-[#756961]" : "text-[#EDE7DF]/65 hover:text-[#EDE7DF]"
                    }`}
                  >
                    <span className="relative inline-block transform duration-500 will-change-transform group-hover:translate-x-1">
                      {link.label}
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#756961] to-transparent transition-all duration-500 origin-center ${
                        isActive ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}