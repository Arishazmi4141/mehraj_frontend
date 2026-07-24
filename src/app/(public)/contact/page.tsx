"use client";

import React, { useState } from "react";
import { requestAPI, ApiError } from "@/src/lib/api-client";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

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

// const SOCIALS = [
//   { icon: Facebook,  label: "Facebook",  href: "#" },
//   { icon: Twitter,   label: "Twitter",   href: "#" },
//   { icon: Instagram, label: "Instagram", href: "#" },
//   { icon: Youtube,   label: "YouTube",   href: "#" },
// ] as const;

const MAP_EMBED_SRC = "https://www.google.com/maps?q=142+Bentworth+Rd,+London+W12+7AH&output=embed";
const MAP_DIRECTIONS_HREF = "https://www.google.com/maps?cid=9669745368976377344&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAFKgSoqNcy";

export default function ContactPage() {
  const [trckngKey, setTrckngKey] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showDispatchPopup, setShowDispatchPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    setErrorMsg("");

    const payload = {
      trckngKey: trckngKey.trim().toUpperCase(),
      name: name.trim(),
      email: email.trim(),
    };

    try {
      await requestAPI("/order/cancel-order", {
        method: "POST",
        body: JSON.stringify(payload),
      }, true);

      setSending(false);
      setSubmitted(true);
    } catch (err) {
      setSending(false);

      const status = err instanceof ApiError ? err.status : undefined;
      const raw = err instanceof ApiError && err.body ? err.body : (err as Error)?.message ?? "";
      const message = String(raw).toLowerCase();

      console.log("ERR OBJECT:", err);
      console.log("RAW:", raw);
      console.log("MESSAGE:", message);

      // Order already successfully cancelled
      if (status === 400 && message.includes("cancelled")) {
        setSubmitted(true);
        return;
      }

      // Order already dispatched — show popup
      if (status === 400 && (
        message.includes("dispatch") ||
        message.includes("shipped") ||
        message.includes("cannot cancel")
      )) {
        setShowDispatchPopup(true);
        return;
      }

      // Wrong details / not found
      if (status === 404 || status === 400) {
        setErrorMsg("Order not found. Please check your Tracking Key, Name, and Email — all details must match exactly.");
        return;
      }

      setErrorMsg("Something went wrong. Please try again in a moment.");
    }
  };

  const closeDispatchPopup = () => setShowDispatchPopup(false);

  const resetForm = () => {
    setTrckngKey("");
    setName("");
    setPhone("");
    setEmail("");
    setSending(false);
    setSubmitted(false);
    setShowDispatchPopup(false);
    setErrorMsg("");
  };

  return (
    <main className="min-h-screen bg-[#F7F7F4]">
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(31,74,56,0.06) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-12">
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#A9773C]">
            Contact Us For Car Repair Services
          </span>
          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#1F4A38]/25" aria-hidden />
            <span className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1F4A38]">
              Let&rsquo;s Talk
            </span>
            <span className="h-px w-8 bg-[#1F4A38]/25" aria-hidden />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#171712] md:text-[3rem]">
            Hello! We Are Waiting for You
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-body text-[14px] leading-[1.85] text-[#6B685F]">
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
              className="group flex flex-col items-center gap-4 rounded-sm border bg-white px-7 py-9 text-center transition-shadow duration-400 hover:shadow-[0_20px_48px_-24px_rgba(23,23,18,0.18)]"
              style={{ borderColor: "#E7E3D8" }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F4A38]/[0.06] border border-[#1F4A38]/10 transition-transform duration-400 group-hover:scale-110">
                <Icon className="h-5 w-5 text-[#1F4A38]" strokeWidth={1.5} aria-hidden />
              </div>
              <div>
                <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A9773C]">
                  {label}
                </p>
                <p className="mt-2 font-display text-[14px] font-semibold text-[#171712] break-words">
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
          <div className="relative overflow-hidden rounded-sm border bg-white" style={{ borderColor: "#E7E3D8" }}>
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
              className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-sm bg-white px-4 py-2.5 font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1F4A38] shadow-md transition-colors hover:bg-[#1F4A38] hover:text-white"
            >
              Get Directions <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Follow / studio card */}
          <div className="flex flex-col justify-center rounded-sm border bg-white p-9" style={{ borderColor: "#E7E3D8" }}>
            <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#A9773C]">Stay Connected</span>
            <h3 className="mt-4 font-display text-xl font-semibold leading-[1.2] text-[#171712]">
              Follow Us
            </h3>
            <p className="mt-3 font-body text-[13px] leading-[1.8] text-[#6B685F]">
              Workshop updates, build stories, and the occasional show car — follow along.
            </p>

            {/* <div className="mt-7 flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1F4A38]/12 bg-[#F7F7F4] text-[#1F4A38] transition-colors duration-300 hover:bg-[#1F4A38] hover:text-white"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </a>
              ))}
            </div> */}

            <div className="mt-8 border-t pt-6" style={{ borderColor: "#EFECE3" }}>
              <p className="font-body text-[11px] uppercase tracking-[0.18em] text-[#B8B4A8]">Workshop Hours</p>
              <p className="mt-2 font-body text-[13px] text-[#4A4740]">Mon – Sat, 9:00 AM – 6:30 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── Cancel order (existing) ─────────────────── */}
      <section className="px-6 pb-24 md:px-12 md:pb-32">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#A9773C]">Order Support</span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#171712] md:text-[2.6rem]">
              Cancel Your Order
            </h2>
            <p className="mx-auto mt-5 max-w-md font-body text-[13px] leading-[1.8] text-[#8C8A80]">
              Enter your tracking key and account details below to request an order cancellation.
            </p>
          </div>

          <div className="rounded-sm border bg-white p-8 md:p-10" style={{ borderColor: "#E7E3D8" }}>
            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#1F4A38]/[0.08]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F4A38" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display text-[16px] font-semibold text-[#171712]">Order Cancelled</h3>
                <p className="mt-2 max-w-xs font-body text-[13px] leading-[1.7] text-[#8C8A80]">
                  Your order has been successfully cancelled. A confirmation will be sent to your email shortly.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-8 rounded-sm bg-[#1F4A38] px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#173829]"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <Field label="Tracking Key" required>
                  <input
                    type="text"
                    value={trckngKey}
                    onChange={(e) => setTrckngKey(e.target.value)}
                    placeholder="e.g. PAS-2026-XXXX"
                    required
                    className="w-full rounded-sm border px-4 py-3 font-body text-[13px] uppercase tracking-wide text-[#171712] outline-none transition-colors focus:border-[#1F4A38]/40"
                    style={{ borderColor: "#E7E3D8" }}
                  />
                </Field>

                <Field label="Full Name" required>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    className="w-full rounded-sm border px-4 py-3 font-body text-[13px] text-[#171712] outline-none transition-colors focus:border-[#1F4A38]/40"
                    style={{ borderColor: "#E7E3D8" }}
                  />
                </Field>

                <Field label="Phone">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="10-digit mobile number"
                    className="w-full rounded-sm border px-4 py-3 font-body text-[13px] text-[#171712] outline-none transition-colors focus:border-[#1F4A38]/40"
                    style={{ borderColor: "#E7E3D8" }}
                  />
                </Field>

                <Field label="Email" required>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-sm border px-4 py-3 font-body text-[13px] text-[#171712] outline-none transition-colors focus:border-[#1F4A38]/40"
                    style={{ borderColor: "#E7E3D8" }}
                  />
                </Field>

                {errorMsg && (
                  <div className="rounded-sm border px-4 py-3 font-body text-[12px]" style={{ background: "#FDECEA", borderColor: "#F3C4C0", color: "#7A2E29" }}>
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-2 flex items-center justify-center gap-2 rounded-sm bg-[#1F4A38] py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#173829] disabled:opacity-60"
                >
                  {sending ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Processing...
                    </>
                  ) : (
                    "Cancel Order"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Dispatch popup */}
      {showDispatchPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-sm bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A063]/[0.12]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A063" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3" />
              </svg>
            </div>
            <h3 className="font-display text-[15px] font-semibold text-[#171712]">Cannot Cancel Order</h3>
            <p className="mt-2 font-body text-[13px] leading-[1.7] text-[#6B685F]">
              This order has already been dispatched and can no longer be cancelled. Please contact support if you need further assistance.
            </p>
            <button
              onClick={closeDispatchPopup}
              className="mt-7 w-full rounded-sm bg-[#1F4A38] py-3 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#173829]"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-[#171712]">
        {label} {required && <span className="text-[#A9773C]">*</span>}
      </span>
      {children}
    </label>
  );
}