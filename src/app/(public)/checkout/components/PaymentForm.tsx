// src/app/(public)/checkout/components/PaymentForm.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { CheckoutForm } from "@/src/types/checkout.types";
import { loadRazorpayScript } from "@/src/lib/razorpay.lib";

type ErrorType = "declined" | "generic" | null;

interface PaymentFormProps {
  form: CheckoutForm;
  razorpayOrderId: string;
  total: number;
  onGoBack: () => void;
  onPaymentSuccess: (data: { razorpay_payment_id: string }) => void;
  onPaymentFailed: (message: string) => void;
}

export default function PaymentForm({
  form,
  razorpayOrderId,
  total,
  onGoBack,
  onPaymentSuccess,
  onPaymentFailed,
}: PaymentFormProps) {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorType, setErrorType] = useState<ErrorType>(null);

  const paymentSucceeded = useRef(false);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    loadRazorpayScript();
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, []);

  async function confirmPayment() {
    if (paymentLoading) return;

    setPaymentLoading(true);
    setErrorMessage("");
    setErrorType(null);
    paymentSucceeded.current = false;

    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current);
      dismissTimer.current = null;
    }

    const ready = await loadRazorpayScript();
    if (!ready || !window.Razorpay) {
      setPaymentLoading(false);
      setErrorType("generic");
      setErrorMessage("Could not open payment window. Please refresh and try again.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
      amount: total * 100,
      currency: "INR",
      name: "MehRāj",
      description: "Order Payment",
      order_id: razorpayOrderId,
      prefill: {
        name: form.fullName,
        email: form.email,
        contact: form.phone,
      },
      theme: { color: "#2E4B3F" },

      handler: (response: { razorpay_payment_id: string }) => {
        paymentSucceeded.current = true;
        if (dismissTimer.current) {
          clearTimeout(dismissTimer.current);
          dismissTimer.current = null;
        }
        setPaymentLoading(false);
        onPaymentSuccess({ razorpay_payment_id: response.razorpay_payment_id });
      },

      modal: {
        ondismiss: () => {
          dismissTimer.current = setTimeout(() => {
            if (paymentSucceeded.current) return;
            setPaymentLoading(false);
            setErrorType("generic");
            setErrorMessage(
              "Payment cancelled or not completed. If your amount was deducted, it will be refunded within 5–7 business days."
            );
          }, 3000);
        },
      },
    };

    try {
      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", (response: any) => {
        if (dismissTimer.current) {
          clearTimeout(dismissTimer.current);
          dismissTimer.current = null;
        }
        setPaymentLoading(false);
        setErrorType("declined");
        const msg = response.error?.description || "Payment failed. Please try again.";
        setErrorMessage(msg);
        onPaymentFailed(msg);
      });

      rzp.open();
    } catch {
      setPaymentLoading(false);
      setErrorType("generic");
      setErrorMessage("Could not open payment window. Please refresh and try again.");
    }
  }

  return (
    <div className="border border-[#1B1B18]/10 bg-white p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <button type="button" onClick={onGoBack} className="font-sans text-sm font-medium text-[#1B1B18]/60 hover:text-[#1B1B18]">
          ← Back
        </button>
        <h2 className="font-serif text-lg font-light text-[#1B1B18]">Secure Payment</h2>
      </div>

      {/* Address recap */}
      <div className="mb-5 flex gap-3 bg-[#F6F2E9] p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#1B1B18] text-[#F6F2E9]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div className="font-sans text-sm text-[#1B1B18]">
          <p className="font-semibold">{form.fullName}</p>
          <p className="text-[#1B1B18]/60">{form.addressLine1}</p>
          <p className="text-[#1B1B18]/60">
            {form.city}, {form.state} – {form.pincode}
          </p>
          <p className="mt-1 text-xs text-[#1B1B18]/50">
            {form.phone} · {form.email}
          </p>
        </div>
      </div>

      {/* Razorpay info box */}
      <div className="mb-5 flex items-center gap-2.5 border border-[#2E4B3F]/25 bg-[#2E4B3F]/8 px-4 py-3 font-sans text-sm text-[#1B1B18]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E4B3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
        <span>Pay securely via Razorpay — UPI, Card, Net Banking, Wallets</span>
      </div>

      {errorMessage && errorType === "declined" && <ErrorBanner title="Payment Declined" message={errorMessage} />}
      {errorMessage && errorType === "generic" && <ErrorBanner title="Payment Failed" message={errorMessage} />}

      <button
        type="button"
        onClick={confirmPayment}
        disabled={paymentLoading}
        className="flex h-12 w-full items-center justify-center gap-2 bg-[#2E4B3F] font-sans text-sm font-semibold uppercase tracking-[0.15em] text-[#F6F2E9] transition-colors disabled:opacity-60 hover:bg-[#1B1B18]"
      >
        {paymentLoading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Opening Payment...
          </>
        ) : (
          <>🔒 Pay ₹{total.toLocaleString()}</>
        )}
      </button>

      <p className="mt-4 text-center font-sans text-xs text-[#1B1B18]/45">
        🔒 Secured by Razorpay. We never store your card details.
      </p>
    </div>
  );
}

function ErrorBanner({ title, message }: { title: string; message: string }) {
  return (
    <div className="mb-5 flex gap-3 border border-[#5C2A32]/25 bg-[#5C2A32]/8 p-4">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#5C2A32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-0.5 shrink-0"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3" />
      </svg>
      <div className="font-sans text-sm text-[#5C2A32]">
        <p className="font-semibold">{title}</p>
        <p className="mt-0.5">{message}</p>
      </div>
    </div>
  );
}