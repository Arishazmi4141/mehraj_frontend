"use client";

import { useState } from "react";
import { consultationService } from "@/src/services/consultation.service";

const PHONE_PATTERN = /^[6-9]\d{9}$/;

type FormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
  slot1: string;
  slot2: string;
  slot3: string;
};

const INITIAL_FORM: FormState = {
  name: "", phone: "", email: "", message: "", slot1: "", slot2: "", slot3: "",
};

// datetime-local gives "YYYY-MM-DDTHH:mm" — pad seconds so Jackson's
// LocalDateTime parser has a consistent format on the backend.
function toLocalDateTime(value: string): string | undefined {
  if (!value) return undefined;
  return value.length === 16 ? `${value}:00` : value;
}

export default function ConsultationPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!PHONE_PATTERN.test(form.phone.trim())) {
      setError("Enter a valid 10-digit Indian phone number.");
      return;
    }

    if (!form.slot1 && !form.slot2 && !form.slot3) {
      setError("Please select at least one preferred date & time slot.");
      return;
    }

    setSending(true);
    try {
      await consultationService.submitConsultation({
        name: form.name.trim(),
        email: form.email.trim(),
        phoneNumber: form.phone.trim(),
        message: form.message.trim() || undefined,
        preferredSlot1: toLocalDateTime(form.slot1),
        preferredSlot2: toLocalDateTime(form.slot2),
        preferredSlot3: toLocalDateTime(form.slot3),
      });

      setForm(INITIAL_FORM);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-12">
          <span className="font-body text-[10px] uppercase tracking-[0.3em]" style={{ color: "#756961" }}>
            Book A Consultation
          </span>
          <h1
            className="mt-6 font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] md:text-[3rem]"
            style={{ color: "var(--color-ink)" }}
          >
            Talk To Our Experts
          </h1>
          <p
            className="mx-auto mt-6 max-w-xl font-body text-[14px] leading-[1.85]"
            style={{ color: "var(--color-ink-muted)" }}
          >
            Pick up to three preferred slots and we&apos;ll confirm the one that works best.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12 md:pb-32">
        <div className="mx-auto max-w-2xl">
          <div
            className="rounded-sm border p-8 md:p-10"
            style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
          >
            {submitted ? (
              <div className="flex flex-col items-center py-6 text-center">
                <h3 className="font-display text-[16px] font-semibold" style={{ color: "var(--color-ink)" }}>
                  Thank you.
                </h3>
                <p className="mt-2 max-w-xs font-body text-[13px] leading-[1.7]" style={{ color: "var(--color-ink-faint)" }}>
                  We&apos;ve received your request and will confirm a slot shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 font-body text-[11px] font-semibold uppercase tracking-[0.14em] underline underline-offset-4"
                  style={{ color: "#3D1214" }}
                >
                  Book another consultation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="font-body text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--color-ink)" }}>
                      Name <span style={{ color: "#756961" }}>*</span>
                    </span>
                    <input
                      type="text" name="name" required
                      value={form.name} onChange={handleChange}
                      className="w-full rounded-sm border px-4 py-3 font-body text-[13px] outline-none"
                      style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="font-body text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--color-ink)" }}>
                      Phone <span style={{ color: "#756961" }}>*</span>
                    </span>
                    <input
                      type="tel" name="phone" required
                      pattern="[6-9]\d{9}"
                      title="Enter a valid 10-digit Indian phone number"
                      value={form.phone} onChange={handleChange}
                      className="w-full rounded-sm border px-4 py-3 font-body text-[13px] outline-none"
                      style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="font-body text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--color-ink)" }}>
                    Email <span style={{ color: "#756961" }}>*</span>
                  </span>
                  <input
                    type="email" name="email" required
                    value={form.email} onChange={handleChange}
                    className="w-full rounded-sm border px-4 py-3 font-body text-[13px] outline-none"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-body text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--color-ink)" }}>
                    Message
                  </span>
                  <textarea
                    name="message" rows={3}
                    value={form.message} onChange={handleChange}
                    className="w-full resize-none rounded-sm border px-4 py-3 font-body text-[13px] outline-none"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
                  />
                </label>

                <div>
                  <span className="font-body text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--color-ink)" }}>
                    Preferred Slots <span style={{ color: "#756961" }}>* (at least one)</span>
                  </span>
                  <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {(["slot1", "slot2", "slot3"] as const).map((key, i) => (
                      <input
                        key={key}
                        type="datetime-local"
                        name={key}
                        value={form[key]}
                        onChange={handleChange}
                        aria-label={`Preferred slot ${i + 1}`}
                        className="w-full rounded-sm border px-3 py-3 font-body text-[13px] outline-none"
                        style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
                      />
                    ))}
                  </div>
                </div>

                {error && (
                  <p className="font-body text-[12px]" style={{ color: "#B3261E" }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-2 flex items-center justify-center gap-2 rounded-sm py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors disabled:opacity-60"
                  style={{ background: "#3D1214", color: "var(--color-surface)" }}
                >
                  {sending ? "Sending..." : "Book Consultation"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}