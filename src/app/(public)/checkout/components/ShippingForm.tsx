// src/app/(public)/checkout/components/ShippingForm.tsx
"use client";

import { useState } from "react";
import type { CheckoutForm } from "@/src/types/checkout.types";
import { isValidEmail, isValidPhone, isCheckoutFormValid } from "@/src/types/checkout.types";

interface ShippingFormProps {
  form: CheckoutForm;
  loading: boolean;
  onSubmit: (form: CheckoutForm) => void;
}

const inputClass =
  "w-full h-11 px-3.5 font-sans text-sm bg-[#F6F2E9] border outline-none transition-colors focus:ring-2 text-[#1B1B18] placeholder:text-[#1B1B18]/35";

export default function ShippingForm({ form: initialForm, loading, onSubmit }: ShippingFormProps) {
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof CheckoutForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (key === "phone") value = value.replace(/\D/g, "").slice(0, 10);
    if (key === "pincode") value = value.replace(/\D/g, "").slice(0, 6);
    setForm((f) => ({ ...f, [key]: value }));
  };

  const invalid = (ok: boolean) => submitted && !ok;

  const borderStyle = (ok: boolean) => ({
    borderColor: invalid(ok) ? "#5C2A32" : "rgba(27,27,24,0.15)",
    ["--tw-ring-color" as any]: "rgba(46,75,63,0.25)",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (!isCheckoutFormValid(form)) return;
    onSubmit(form);
  }

  return (
    <div className="border border-[#1B1B18]/10 bg-white p-6 sm:p-8">
      <h2 className="mb-6 font-serif text-lg font-light text-[#1B1B18]">Shipping &amp; Billing Details</h2>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <Field label="Full Name" required>
          <input
            type="text"
            value={form.fullName}
            onChange={set("fullName")}
            placeholder="Enter your full name"
            className={inputClass}
            style={borderStyle(!!form.fullName.trim())}
          />
        </Field>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Email" required>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="you@example.com"
              className={inputClass}
              style={borderStyle(!!form.email.trim() && isValidEmail(form.email))}
            />
          </Field>
          <Field label="Phone" required>
            <input
              type="tel"
              value={form.phone}
              onChange={set("phone")}
              placeholder="10-digit mobile number"
              className={inputClass}
              style={borderStyle(!!form.phone.trim() && isValidPhone(form.phone))}
            />
          </Field>
        </div>

        <Field label="Address" required>
          <input
            type="text"
            value={form.addressLine1}
            onChange={set("addressLine1")}
            placeholder="House no, Street name, Area"
            className={inputClass}
            style={borderStyle(!!form.addressLine1.trim())}
          />
        </Field>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Field label="City" required>
            <input
              type="text"
              value={form.city}
              onChange={set("city")}
              placeholder="City"
              className={inputClass}
              style={borderStyle(!!form.city.trim())}
            />
          </Field>
          <Field label="State" required>
            <input
              type="text"
              value={form.state}
              onChange={set("state")}
              placeholder="State"
              className={inputClass}
              style={borderStyle(!!form.state.trim())}
            />
          </Field>
          <Field label="Pincode" required>
            <input
              type="text"
              value={form.pincode}
              onChange={set("pincode")}
              placeholder="6-digit"
              className={inputClass}
              style={borderStyle(!!form.pincode.trim() && form.pincode.length === 6)}
            />
          </Field>
        </div>

        {submitted && !isCheckoutFormValid(form) && (
          <p className="font-sans text-sm text-[#5C2A32]">Please fill all required fields correctly.</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex h-12 items-center justify-center gap-2 bg-[#1B1B18] font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F6F2E9] transition-colors disabled:opacity-60 hover:bg-[#2E4B3F]"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Setting up payment...
            </>
          ) : (
            "Continue to Payment →"
          )}
        </button>
      </form>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-[#1B1B18]/55">
        {label} {required && <span className="text-[#2E4B3F]">*</span>}
      </span>
      {children}
    </label>
  );
}