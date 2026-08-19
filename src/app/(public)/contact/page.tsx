"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone, Mail, MapPin, ArrowUpRight, PackageX } from "lucide-react";

/**
 * Background/text still pull from the home page's :root vars, but every
 * accent that was green/gold is now hardcoded to the dark palette:
 * #3D1214 wine (primary accent, icons, CTA fill)
 * #756961 brass/taupe (secondary accent — hover, meta/eyebrow text)
 */

const CONTACT_INFO = [
  {
    icon:  Phone,
    label: "Phone Call",
    value: "+44 203 337 1831",
    href:  "tel:+442033371831",
  },
  {
    icon:  Mail,
    label: "Email Drop Us",
    value: "sm@londonmotorsports.co.uk",
    href:  "mailto:sm@londonmotorsports.co.uk",
  },
  {
    icon:  MapPin,
    label: "Location",
    value: "142 Bentworth Rd, London W12 7AH",
    href:  "https://www.google.com/maps?cid=9669745368976377344&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAFKgSoqNcy",
  },
] as const;

const MAP_EMBED_SRC = "https://www.google.com/maps?q=142+Bentworth+Rd,+London+W12+7AH&output=embed";
const MAP_DIRECTIONS_HREF = "https://www.google.com/maps?cid=9669745368976377344&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAFKgSoqNcy";

export default function ContactPage() {
  // NOTE: the contact API isn't built yet — this just holds local state
  // and shows a confirmation message on submit. Wire handleSubmit up to
  // your API route / email service once it's ready.
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    // TODO: replace with a real request once the contact API exists.
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full"
          style={{ background: "rgba(61,18,20,0.06)", filter: "blur(60px)" }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-12">
          <span className="font-body text-[10px] uppercase tracking-[0.3em]" style={{ color: "#756961" }}>
            Contact Us For Car Repair Services
          </span>
          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-8" style={{ background: "var(--color-border-strong)" }} aria-hidden />
            <span
              className="font-body text-[12px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#3D1214" }}
            >
              Let&rsquo;s Talk
            </span>
            <span className="h-px w-8" style={{ background: "var(--color-border-strong)" }} aria-hidden />
          </div>
          <h1
            className="mt-6 font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] md:text-[3rem]"
            style={{ color: "var(--color-ink)" }}
          >
            Hello! We Are Waiting for You
          </h1>
          <p
            className="mx-auto mt-6 max-w-xl font-body text-[14px] leading-[1.85]"
            style={{ color: "var(--color-ink-muted)" }}
          >
            Are you looking for top-tier auto repair services? Your hassle is over now.
            Reach out to us for any repair and maintenance services by experts.
          </p>
        </div>
      </section>

      {/* ─────────────────── Contact info cards ─────────────────── */}
      <section className="px-6 md:px-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-3">
          {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={label === "Location" ? "_blank" : undefined}
              rel={label === "Location" ? "noopener noreferrer" : undefined}
              className="group flex flex-col items-center gap-4 rounded-sm border px-7 py-9 text-center transition-shadow duration-400 hover:shadow-[0_20px_48px_-24px_rgba(33,29,24,0.18)]"
              style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full border transition-transform duration-400 group-hover:scale-110"
                style={{ background: "rgba(61,18,20,0.06)", borderColor: "rgba(61,18,20,0.15)" }}
              >
                <Icon className="h-5 w-5" style={{ color: "#3D1214" }} strokeWidth={1.5} aria-hidden />
              </div>
              <div>
                <p
                  className="font-body text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "#756961" }}
                >
                  {label}
                </p>
                <p
                  className="mt-2 font-display text-[14px] font-semibold break-words"
                  style={{ color: "var(--color-ink)" }}
                >
                  {value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ─────────────────── Map + Follow Us ─────────────────── */}
      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Map */}
          <div
            className="relative overflow-hidden rounded-sm border"
            style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
          >
            <iframe
              title="PAS location on Google Maps"
              src={MAP_EMBED_SRC}
              className="h-[320px] w-full grayscale-[15%] contrast-[1.02] md:h-[380px]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={MAP_DIRECTIONS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-sm px-4 py-2.5 font-body text-[10px] font-semibold uppercase tracking-[0.14em] shadow-md transition-colors"
              style={{ background: "var(--color-surface)", color: "#3D1214" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#3D1214";
                e.currentTarget.style.color = "var(--color-surface)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-surface)";
                e.currentTarget.style.color = "#3D1214";
              }}
            >
              Get Directions <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Follow / studio card */}
          <div
            className="flex flex-col justify-center rounded-sm border p-9"
            style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
          >
            <span className="font-body text-[10px] uppercase tracking-[0.3em]" style={{ color: "#756961" }}>
              Stay Connected
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold leading-[1.2]" style={{ color: "var(--color-ink)" }}>
              Follow Us
            </h3>
            <p className="mt-3 font-body text-[13px] leading-[1.8]" style={{ color: "var(--color-ink-muted)" }}>
              Workshop updates, build stories, and the occasional show car — follow along.
            </p>

            <div className="mt-8 border-t pt-6" style={{ borderColor: "var(--color-border)" }}>
              <p className="font-body text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--color-ink-faint)" }}>
                Workshop Hours
              </p>
              <p className="mt-2 font-body text-[13px]" style={{ color: "var(--color-ink-muted)" }}>
                Mon – Sat, 9:00 AM – 6:30 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── Send us a message ─────────────────── */}
      <section className="px-6 pb-20 md:px-12 md:pb-24">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <span className="font-body text-[10px] uppercase tracking-[0.3em]" style={{ color: "#756961" }}>
              Get In Touch
            </span>
            <h2
              className="mt-4 font-display text-2xl font-bold leading-[1.15] tracking-[-0.02em] md:text-[2rem]"
              style={{ color: "var(--color-ink)" }}
            >
              Send Us A Message
            </h2>
          </div>

          <div
            className="rounded-sm border p-8 md:p-10"
            style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
          >
            {submitted ? (
              <div className="flex flex-col items-center py-6 text-center">
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: "rgba(61,18,20,0.10)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3D1214" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display text-[16px] font-semibold" style={{ color: "var(--color-ink)" }}>
                  Thank you.
                </h3>
                <p className="mt-2 max-w-xs font-body text-[13px] leading-[1.7]" style={{ color: "var(--color-ink-faint)" }}>
                  We&apos;ve received your message and will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="font-body text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--color-ink)" }}>
                      Name <span style={{ color: "#756961" }}>*</span>
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full rounded-sm border px-4 py-3 font-body text-[13px] outline-none transition-colors"
                      style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#3D1214")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="font-body text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--color-ink)" }}>
                      Phone
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full rounded-sm border px-4 py-3 font-body text-[13px] outline-none transition-colors"
                      style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#3D1214")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="font-body text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--color-ink)" }}>
                    Email <span style={{ color: "#756961" }}>*</span>
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-sm border px-4 py-3 font-body text-[13px] outline-none transition-colors"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#3D1214")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-body text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--color-ink)" }}>
                    Message <span style={{ color: "#756961" }}>*</span>
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="w-full resize-none rounded-sm border px-4 py-3 font-body text-[13px] outline-none transition-colors"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#3D1214")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                  />
                </label>

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-2 flex items-center justify-center gap-2 rounded-sm py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors disabled:opacity-60"
                  style={{ background: "#3D1214", color: "var(--color-surface)" }}
                  onMouseEnter={(e) => !sending && (e.currentTarget.style.background = "#756961")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#3D1214")}
                >
                  {sending ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────── Order support CTA ─────────────────── */}
      <section className="px-6 pb-24 md:px-12 md:pb-32">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/cancel-order"
            className="group flex flex-col items-center gap-4 rounded-sm border px-8 py-10 text-center transition-shadow duration-400 hover:shadow-[0_20px_48px_-24px_rgba(33,29,24,0.18)] sm:flex-row sm:justify-between sm:text-left"
            style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-transform duration-400 group-hover:scale-110"
                style={{ background: "rgba(61,18,20,0.06)", borderColor: "rgba(61,18,20,0.15)" }}
              >
                <PackageX className="h-5 w-5" style={{ color: "#3D1214" }} strokeWidth={1.5} aria-hidden />
              </div>
              <div>
                <p
                  className="font-body text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "#756961" }}
                >
                  Order Support
                </p>
                <p className="mt-1 font-display text-[15px] font-semibold" style={{ color: "var(--color-ink)" }}>
                  Need to cancel an order?
                </p>
              </div>
            </div>
            <span
              className="mt-4 inline-flex shrink-0 items-center gap-1.5 rounded-sm px-5 py-2.5 font-body text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors sm:mt-0"
              style={{ background: "#3D1214", color: "var(--color-surface)" }}
            >
              Cancel Order <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}