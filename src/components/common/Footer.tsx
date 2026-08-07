"use client";

import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { label: "Collections", href: "/collections" },
  { label: "The Atelier", href: "/atelier" },
  { label: "The Salon", href: "/salon" },
  { label: "The Journal", href: "/journal" },
  { label: "Client Services", href: "/client-services" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Garment Care", href: "/client-services#garment-care" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[#1B1B18]/10 bg-[#F6F2E9] overflow-hidden text-[#1B1B18]">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(to right, #1B1B18 1px, transparent 1px)",
          backgroundSize: "100px 100%",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[220px] w-[500px] -translate-x-1/2 rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle at center, rgba(166,144,111,0.14) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-24">
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-3 lg:grid-cols-5">
          <div className="sm:col-span-1 lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.jpg"
                alt="MehRāj"
                width={160}
                height={160}
                className="h-32 w-32 object-contain"
              />
            </Link>

            <p className="mt-6 max-w-sm font-sans text-xs font-normal leading-[1.85] text-[#1B1B18]/60">
              Bespoke tailoring and considered menswear, built on craft, provenance,
              and a commitment to garments made to last.
            </p>
            <div className="mt-8 h-px w-16 bg-gradient-to-r from-[#A6906F]/60 to-transparent" />
          </div>

          <div>
            <h4 className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A6906F]">
              Navigation
            </h4>
            <ul className="mt-6 space-y-3.5" role="list">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group relative inline-block font-sans text-xs font-normal tracking-wide text-[#1B1B18]/60 transition-colors duration-300 hover:text-[#1B1B18]"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A6906F]">
              Contact
            </h4>
            <ul className="mt-6 space-y-3.5" role="list">
              <li>
                <a
                  href="mailto:contact@mehraj.com"
                  className="group block font-sans text-xs text-[#1B1B18]/60 transition-colors duration-300 hover:text-[#1B1B18]"
                >
                  <span className="block transition-transform duration-300 group-hover:translate-x-1">
                    contact@mehraj.com
                  </span>
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group block font-sans text-xs text-[#1B1B18]/60 transition-colors duration-300 hover:text-[#1B1B18]"
                >
                  <span className="block transition-transform duration-300 group-hover:translate-x-1">
                    Contact Form
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start gap-6 border-t border-[#1B1B18]/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[11px] font-normal tracking-wide text-[#1B1B18]/50">
            &copy; {new Date().getFullYear()} MehRāj. All rights reserved.
          </p>
          <div className="flex gap-6">
            {LEGAL.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-sans text-[11px] font-normal tracking-wide text-[#1B1B18]/50 transition-colors duration-300 hover:text-[#1B1B18]"
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