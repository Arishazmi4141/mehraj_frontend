"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ShoppingBag, ChevronDown } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { TIER_SUMMARIES } from "@/src/app/(public)/services/data/tiers";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Shop",     href: "/shop" },
  { label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalCount, openDrawer } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef   = useRef<HTMLDivElement>(null);
  const linksWrapRef = useRef<HTMLDivElement>(null);
  const lineTopRef   = useRef<HTMLSpanElement>(null);
  const lineBotRef   = useRef<HTMLSpanElement>(null);
  const orbRef       = useRef<HTMLDivElement>(null);
  const timelineRef  = useRef<gsap.core.Timeline | null>(null);

  // Icons/text read light (white) whenever we're over the hero video or the
  // dark curtain is open; they read dark (ink) once scrolled with the menu closed.
  const useLightText = !isScrolled || isOpen;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen) setServicesOpen(false);
    return () => { document.body.style.overflow = ""; };
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

      tl.to(top, { y: 4, rotation: 45, width: "24px", duration: 0.45 }, 0)
        .to(bot, { y: -4, rotation: -45, width: "24px", duration: 0.45 }, 0);

      tl.to(curtain, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.8 }, 0);

      tl.set(linksWrap, { visibility: "visible" }, 0.2)
        .to(linksWrap, { opacity: 1, duration: 0.4 }, 0.2)
        .to(orb, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }, 0.2);

      tl.fromTo(validItems, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }, 0.35);

      timelineRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!timelineRef.current) return;
    isOpen ? timelineRef.current.play() : timelineRef.current.reverse();
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu  = () => setIsOpen(false);

  return (
    <div ref={containerRef}>
      <header
        className={`fixed inset-x-0 top-0 z-[95] transition-all duration-500 ${
          isScrolled && !isOpen
            ? "bg-[#F7F7F4]/90 border-b border-[#E7E3D8] backdrop-blur-md py-4"
            : "bg-transparent py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Hamburger */}
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
                  className={`h-[1.5px] w-6 rounded-full transition-colors duration-300 will-change-transform group-hover:bg-[#A9773C] ${
                    useLightText ? "bg-white" : "bg-[#171712]"
                  }`}
                  style={{ transformOrigin: "center center" }}
                />
                <span
                  ref={lineBotRef}
                  className={`h-[1.5px] w-4 rounded-full transition-all duration-300 will-change-transform group-hover:bg-[#A9773C] group-hover:w-6 ${
                    useLightText ? "bg-white" : "bg-[#171712]"
                  }`}
                  style={{ transformOrigin: "center center" }}
                />
              </div>
            </button>
          </div>

          {/* Centered wordmark */}
          <div className="absolute left-1/2 top-1/2 z-[100] -translate-x-1/2 -translate-y-1/2 text-center">
            <Link href="/" onClick={closeMenu} className="group flex flex-col items-center focus-visible:outline-none" aria-label="PAS Home">
              <span
                className={`font-display text-2xl font-bold tracking-[0.32em] transition-all duration-500 group-hover:tracking-[0.38em] ${
                  useLightText ? "text-[#C9A063]" : "text-[#1F4A38]"
                }`}
              >
                PAS
              </span>
              <span className={`font-body text-[6.5px] uppercase tracking-[0.5em] transition-colors duration-300 ${
                useLightText ? "text-white/40 group-hover:text-white/70" : "text-[#171712]/35 group-hover:text-[#171712]/60"
              }`}>
                Premium Automotive
              </span>
            </Link>
          </div>

          {/* Cart */}
          <div className="z-[100] flex flex-1 items-center justify-end">
            <button onClick={openDrawer} aria-label="Open cart" className="group relative flex h-10 w-10 items-center justify-center focus-visible:outline-none">
              <ShoppingBag className={`h-5 w-5 transition-colors duration-300 group-hover:text-[#A9773C] ${useLightText ? "text-white" : "text-[#171712]"}`} />
              {totalCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1F4A38] font-mono text-[9px] font-bold text-white">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen menu curtain — deliberately the one dark racing-green panel, echoing the CTA */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[90] flex items-center justify-center bg-[#14251D] touch-none select-none"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      >
        <div
          ref={orbRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-90"
          style={{
            background: "radial-gradient(ellipse at center, rgba(201,160,99,0.14) 0%, rgba(201,160,99,0.02) 50%, transparent 75%)",
            filter: "blur(65px)",
          }}
        />

        <div ref={linksWrapRef} className="relative z-[99] flex flex-col items-center justify-center text-center opacity-0" style={{ visibility: "hidden" }}>
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
                        className={`group relative block font-display text-2xl font-light uppercase tracking-[0.25em] md:text-4xl transition-colors duration-400 focus-visible:outline-none ${
                          isActive || pathname?.startsWith("/services/") ? "text-[#C9A063]" : "text-white/70 hover:text-white"
                        }`}
                      >
                        <span className="relative inline-block transform duration-500 will-change-transform group-hover:translate-x-1">
                          {link.label}
                        </span>
                        <span
                          className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A063] to-transparent transition-all duration-500 origin-center ${
                            isActive || pathname?.startsWith("/services/") ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                          }`}
                        />
                      </Link>

                      {/* Tap target for touch devices — desktop opens on hover via group/services */}
                      <button
                        type="button"
                        onClick={() => setServicesOpen((prev) => !prev)}
                        aria-label={tiersVisible ? "Hide service tiers" : "Show service tiers"}
                        aria-expanded={tiersVisible}
                        className="mt-1.5 text-white/50 transition-colors duration-300 hover:text-[#C9A063] focus-visible:outline-none"
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-400 ${tiersVisible ? "rotate-180" : ""} md:group-hover/services:rotate-180`}
                        />
                      </button>
                    </div>

                    {/* Tier submenu */}
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
                            className="group/tier flex items-baseline gap-2.5 text-xs uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 hover:text-white md:text-sm"
                          >
                            {/* <span className="font-semibold text-[#C9A063]">{tier.number}</span> */}
                            <span>{tier.label}</span>
                            {/* <span className="hidden normal-case tracking-normal text-white/30 transition-colors duration-300 group-hover/tier:text-white/55 md:inline">
                              — {tier.name}
                            </span> */}
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
                    className={`group relative block font-display text-2xl font-light uppercase tracking-[0.25em] md:text-4xl transition-colors duration-400 focus-visible:outline-none ${
                      isActive ? "text-[#C9A063]" : "text-white/70 hover:text-white"
                    }`}
                  >
                    <span className="relative inline-block transform duration-500 will-change-transform group-hover:translate-x-1">
                      {link.label}
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A063] to-transparent transition-all duration-500 origin-center ${
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