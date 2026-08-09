"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19a29 29 0 0 0 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/mehraj", Icon: InstagramIcon },
  { label: "Facebook", href: "https://facebook.com/mehraj", Icon: FacebookIcon },
  { label: "YouTube", href: "https://youtube.com/@mehraj", Icon: YoutubeIcon },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // NOTE: no newsletter API endpoint provided yet — this just confirms
    // locally for now. Wire this to a real endpoint when one exists.
    setSubscribed(true);
    setEmail("");
  };

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
        {/* Newsletter */}
        <div className="mb-16 border-b border-[#1B1B18]/10 pb-16">
          <div className="mx-auto max-w-md text-center">
            <h4 className="font-serif text-xl font-light text-[#1B1B18]">
              Join the <span className="italic text-[#5C2A32]">House</span>
            </h4>
            <p className="mt-2 font-sans text-xs leading-[1.8] text-[#1B1B18]/55">
              New collections, journal features, and private invitations —
              delivered occasionally, never often.
            </p>

            {subscribed ? (
              <p className="mt-6 font-sans text-sm text-[#2E4B3F]">You're on the list — welcome.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-6 flex gap-0">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="h-12 flex-1 border border-[#1B1B18]/15 bg-white px-4 font-sans text-sm text-[#1B1B18] outline-none focus:border-[#2E4B3F]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#1B1B18] text-[#F6F2E9] transition-colors hover:bg-[#2E4B3F]"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>

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

            {/* Social */}
            <div className="mt-6 flex items-center gap-4">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center border border-[#1B1B18]/15 text-[#1B1B18]/60 transition-colors hover:border-[#5C2A32] hover:text-[#5C2A32]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

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