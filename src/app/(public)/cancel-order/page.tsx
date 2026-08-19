"use client";

import React, { useState } from "react";
import { requestAPI, ApiError } from "@/src/lib/api-client";

/**
 * /cancel-order — background/text still pull from the home page's
 * :root vars (--color-bg, --color-surface, --color-ink family,
 * --color-border), but every accent that was green/gold is now hardcoded
 * to the dark palette:
 * #0A0200  ink-deep — reserved for the darkest accents if needed
 * #3D1214  wine      — primary accent: CTA fill, icons, active states
 * #756961  brass/taupe — secondary accent: hover state, meta/eyebrow text
 */

export default function CancelOrderPage() {
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
    <main className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full"
          style={{ background: "rgba(61,18,20,0.06)", filter: "blur(60px)" }}
        />
        <div className="relative mx-auto max-w-2xl px-6 text-center md:px-12">
          <span className="font-body text-[10px] uppercase tracking-[0.3em]" style={{ color: "#756961" }}>
            Order Support
          </span>
          <h1
            className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] md:text-[2.6rem]"
            style={{ color: "var(--color-ink)" }}
          >
            Cancel Your Order
          </h1>
          <p
            className="mx-auto mt-5 max-w-md font-body text-[13px] leading-[1.8]"
            style={{ color: "var(--color-ink-faint)" }}
          >
            Enter your tracking key and account details below to request an order cancellation.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 pb-24 md:px-12 md:pb-32">
        <div className="mx-auto max-w-2xl">
          <div
            className="rounded-sm border p-8 md:p-10"
            style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
          >
            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: "rgba(61,18,20,0.10)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3D1214" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display text-[16px] font-semibold" style={{ color: "var(--color-ink)" }}>
                  Order Cancelled
                </h3>
                <p
                  className="mt-2 max-w-xs font-body text-[13px] leading-[1.7]"
                  style={{ color: "var(--color-ink-faint)" }}
                >
                  Your order has been successfully cancelled. A confirmation will be sent to your email shortly.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-8 rounded-sm px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors"
                  style={{ background: "#3D1214", color: "var(--color-surface)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#756961")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#3D1214")}
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
                    className="w-full rounded-sm border px-4 py-3 font-body text-[13px] uppercase tracking-wide outline-none transition-colors"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#3D1214")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                  />
                </Field>

                <Field label="Full Name" required>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    className="w-full rounded-sm border px-4 py-3 font-body text-[13px] outline-none transition-colors"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#3D1214")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                  />
                </Field>

                <Field label="Phone">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="10-digit mobile number"
                    className="w-full rounded-sm border px-4 py-3 font-body text-[13px] outline-none transition-colors"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#3D1214")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                  />
                </Field>

                <Field label="Email" required>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-sm border px-4 py-3 font-body text-[13px] outline-none transition-colors"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#3D1214")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
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
                  className="mt-2 flex items-center justify-center gap-2 rounded-sm py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors disabled:opacity-60"
                  style={{ background: "#3D1214", color: "var(--color-surface)" }}
                  onMouseEnter={(e) => !sending && (e.currentTarget.style.background = "#756961")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#3D1214")}
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
          <div
            className="w-full max-w-sm rounded-sm p-8 text-center shadow-2xl"
            style={{ background: "var(--color-surface)" }}
          >
            <div
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: "rgba(117,105,97,0.15)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#756961" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3" />
              </svg>
            </div>
            <h3 className="font-display text-[15px] font-semibold" style={{ color: "var(--color-ink)" }}>
              Cannot Cancel Order
            </h3>
            <p
              className="mt-2 font-body text-[13px] leading-[1.7]"
              style={{ color: "var(--color-ink-muted)" }}
            >
              This order has already been dispatched and can no longer be cancelled. Please contact support if you need further assistance.
            </p>
            <button
              onClick={closeDispatchPopup}
              className="mt-7 w-full rounded-sm py-3 font-body text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors"
              style={{ background: "#3D1214", color: "var(--color-surface)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#756961")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#3D1214")}
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
      <span className="font-body text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--color-ink)" }}>
        {label} {required && <span style={{ color: "#756961" }}>*</span>}
      </span>
      {children}
    </label>
  );
}