"use client";

import Link from "next/link";

const LINKS = [
  { label: "Collection", href: "/shop" },
  { label: "Su Misura Services", href: "/services" },
  { label: "Atelier Legacy", href: "/about" },
  { label: "Private Fitting", href: "/contact" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Sartorial Care", href: "/care" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[#0A1118]/10 bg-[#FAFAFA] overflow-hidden text-[#0A1118]">
      {/* Background Architectural Lines */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(10, 17, 24, 0.03) 1px, transparent 1px)",
          backgroundSize: "100px 100%",
        }}
        aria-hidden="true"
      />

      {/* Subtle Ambient Gold Backdrop Glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[220px] w-[500px] -translate-x-1/2 rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle at center, rgba(184, 151, 82, 0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-24">
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand & Editorial Bio */}
          <div className="sm:col-span-1 lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-light tracking-[0.25em] text-[#0A1118]">
                SARTORIA
              </span>
              <span className="block font-sans text-[8px] font-semibold uppercase tracking-[0.45em] text-[#B89752] mt-0.5">
                Alta Sartoria Milano
              </span>
            </Link>
            
            <p className="mt-6 max-w-sm font-sans text-xs font-normal leading-[1.85] text-[#4A5568]">
              Handcrafting bespoke Neapolitan suits, rare cashmere overcoats, and refined menswear for international gentlemen who demand unyielding craftsmanship.
            </p>
            <div className="mt-8 h-px w-16 bg-gradient-to-r from-[#B89752]/50 to-transparent" />
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#B89752]">
              Navigation
            </h4>
            <ul className="mt-6 space-y-3.5" role="list">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group relative inline-block font-sans text-xs font-normal tracking-wide text-[#4A5568] transition-colors duration-300 hover:text-[#0A1118]"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Ateliers */}
          <div>
            <h4 className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#B89752]">
              Ateliers
            </h4>
            <ul className="mt-6 space-y-3.5" role="list">
              <li>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#0A1118]">Milano Salon</p>
                <p className="font-sans text-xs text-[#4A5568]">Via Monte Napoleone, 12</p>
              </li>
              <li className="pt-2">
                <a
                  href="mailto:concierge@sartoria-milano.it"
                  className="group block font-sans text-xs text-[#4A5568] transition-colors duration-300 hover:text-[#0A1118]"
                >
                  <span className="block transition-transform duration-300 group-hover:translate-x-1">
                    concierge@sartoria-milano.it
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Brand Emblem Stamp */}
          <div className="flex items-start justify-start lg:justify-end">
            <div className="border border-[#B89752]/30 bg-white px-6 py-5 text-center shadow-sm">
              <span className="block font-serif text-sm italic text-[#B89752]">
                Fatto a Mano
              </span>
              <span className="block font-sans text-[9px] font-bold uppercase tracking-[0.3em] text-[#0A1118] mt-1">
                Italia • Est. 1968
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col items-start gap-6 border-t border-[#0A1118]/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[11px] font-normal tracking-wide text-[#4A5568]/70">
            &copy; {new Date().getFullYear()} Sartoria Milano. All rights reserved. Made in Italy.
          </p>
          <div className="flex gap-6">
            {LEGAL.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-sans text-[11px] font-normal tracking-wide text-[#4A5568]/70 transition-colors duration-300 hover:text-[#0A1118]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}