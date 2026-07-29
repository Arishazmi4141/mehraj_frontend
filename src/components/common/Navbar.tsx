"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ShoppingBag, ChevronDown } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { TIER_SUMMARIES } from "@/src/app/(public)/services/data/tiers";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalCount, openDrawer } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const linksWrapRef = useRef<HTMLDivElement>(null);
  const lineTopRef = useRef<HTMLSpanElement>(null);
  const lineBotRef = useRef<HTMLSpanElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Use light text over dark surfaces or when full-screen curtain is open
  const useLightText = isOpen;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen) setServicesOpen(false);
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

      tl.to(top, { y: 4, rotation: 45, width: "24px", duration: 0.45 }, 0).to(
        bot,
        { y: -4, rotation: -45, width: "24px", duration: 0.45 },
        0
      );

      tl.to(curtain, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.8 }, 0);

      tl.set(linksWrap, { visibility: "visible" }, 0.2)
        .to(linksWrap, { opacity: 1, duration: 0.4 }, 0.2)
        .to(orb, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }, 0.2);

      tl.fromTo(
        validItems,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" },
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
            ? "bg-[#FAFAFA]/90 border-b border-[#0A1118]/10 backdrop-blur-md py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Hamburger Menu Toggle */}
          <div className="z-[100] flex flex-1 items-center justify-start">
            <button
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="group flex h-10 w-10 flex-col items-start justify-center focus-visible:outline-none"
            >
              <div className="flex flex-col gap-1.5 items-start justify-center h-full w-full">
                <span
                  ref={lineTopRef}
                  className={`h-[1.5px] w-6 rounded-none transition-colors duration-300 will-change-transform group-hover:bg-[#B89752] ${
                    useLightText ? "bg-[#FAFAFA]" : "bg-[#0A1118]"
                  }`}
                  style={{ transformOrigin: "center center" }}
                />
                <span
                  ref={lineBotRef}
                  className={`h-[1.5px] w-4 rounded-none transition-all duration-300 will-change-transform group-hover:bg-[#B89752] group-hover:w-6 ${
                    useLightText ? "bg-[#FAFAFA]" : "bg-[#0A1118]"
                  }`}
                  style={{ transformOrigin: "center center" }}
                />
              </div>
            </button>
          </div>

          {/* Centered Brand Wordmark */}
          <div className="absolute left-1/2 top-1/2 z-[100] -translate-x-1/2 -translate-y-1/2 text-center">
            <Link
              href="/"
              onClick={closeMenu}
              className="group flex flex-col items-center focus-visible:outline-none"
              aria-label="Sartoria Milano Home"
            >
              <span
                className={`font-serif text-2xl font-light tracking-[0.28em] transition-all duration-500 group-hover:tracking-[0.34em] ${
                  useLightText ? "text-[#B89752]" : "text-[#0A1118]"
                }`}
              >
                SARTORIA
              </span>
              <span
                className={`font-sans text-[7px] font-semibold uppercase tracking-[0.45em] transition-colors duration-300 ${
                  useLightText ? "text-[#FAFAFA]/50 group-hover:text-[#FAFAFA]" : "text-[#4A5568] group-hover:text-[#0A1118]"
                }`}
              >
                Alta Sartoria Milano
              </span>
            </Link>
          </div>

          {/* Shopping Bag Button */}
          <div className="z-[100] flex flex-1 items-center justify-end">
            <button
              onClick={openDrawer}
              aria-label="Open shopping bag"
              className="group relative flex h-10 w-10 items-center justify-center focus-visible:outline-none"
            >
              <ShoppingBag
                className={`h-5 w-5 transition-colors duration-300 group-hover:text-[#B89752] ${
                  useLightText ? "text-[#FAFAFA]" : "text-[#0A1118]"
                }`}
              />
              {totalCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center bg-[#B89752] font-sans text-[8px] font-bold text-[#0A1118]">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen Atelier Menu Curtain */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0A1118] touch-none select-none"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      >
        {/* Ambient Florentine Gold Radial Glow */}
        <div
          ref={orbRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-90"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(184,151,82,0.18) 0%, rgba(184,151,82,0.02) 50%, transparent 75%)",
            filter: "blur(65px)",
          }}
        />

        <div
          ref={linksWrapRef}
          className="relative z-[99] flex flex-col items-center justify-center text-center opacity-0"
          style={{ visibility: "hidden" }}
        >
          <nav className="flex flex-col gap-y-5 md:gap-y-7" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              if (link.label === "Services") {
                const tiersVisible = servicesOpen;
                return (
                  <div key={link.href} className="nav-link-item overflow-hidden py-1 group/services">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className={`group relative block font-serif text-2xl font-light uppercase tracking-[0.25em] md:text-4xl transition-colors duration-400 focus-visible:outline-none ${
                          isActive || pathname?.startsWith("/services/")
                            ? "text-[#B89752]"
                            : "text-[#FAFAFA]/70 hover:text-[#FAFAFA]"
                        }`}
                      >
                        <span className="relative inline-block transform duration-500 will-change-transform group-hover:translate-x-1">
                          {link.label}
                        </span>
                        <span
                          className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#B89752] to-transparent transition-all duration-500 origin-center ${
                            isActive || pathname?.startsWith("/services/")
                              ? "w-full scale-x-100"
                              : "w-full scale-x-0 group-hover:scale-x-100"
                          }`}
                        />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setServicesOpen((prev) => !prev)}
                        aria-label={tiersVisible ? "Hide service tiers" : "Show service tiers"}
                        aria-expanded={tiersVisible}
                        className="mt-1.5 text-[#FAFAFA]/50 transition-colors duration-300 hover:text-[#B89752] focus-visible:outline-none"
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-400 ${
                            tiersVisible ? "rotate-180" : ""
                          } md:group-hover/services:rotate-180`}
                        />
                      </button>
                    </div>

                    {/* Tier Submenu */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out md:group-hover/services:max-h-60 md:group-hover/services:opacity-100 md:group-hover/services:mt-4 ${
                        tiersVisible ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3 pb-1">
                        {TIER_SUMMARIES.map((tier) => (
                          <Link
                            key={tier.slug}
                            href={`/services/${tier.slug}`}
                            onClick={closeMenu}
                            className="group/tier flex items-baseline gap-2.5 font-sans text-xs uppercase tracking-[0.2em] text-[#FAFAFA]/50 transition-colors duration-300 hover:text-[#FAFAFA] md:text-sm"
                          >
                            <span>{tier.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={link.href} className="nav-link-item overflow-hidden py-1">
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`group relative block font-serif text-2xl font-light uppercase tracking-[0.25em] md:text-4xl transition-colors duration-400 focus-visible:outline-none ${
                      isActive ? "text-[#B89752]" : "text-[#FAFAFA]/70 hover:text-[#FAFAFA]"
                    }`}
                  >
                    <span className="relative inline-block transform duration-500 will-change-transform group-hover:translate-x-1">
                      {link.label}
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#B89752] to-transparent transition-all duration-500 origin-center ${
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