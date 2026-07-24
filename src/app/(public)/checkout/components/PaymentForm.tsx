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
      name: "PAS Automobiles",
      description: "Order Payment",
      order_id: razorpayOrderId,
      prefill: {
        name: form.fullName,
        email: form.email,
        contact: form.phone,
      },
      theme: { color: "#00ADB5" },

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
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#ffffff", border: "1px solid #e2e2e2" }}>
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={onGoBack}
          className="text-sm font-medium"
          style={{ color: "#393E46" }}
        >
          ← Back
        </button>
        <h2 className="text-lg font-semibold" style={{ color: "#222831" }}>
          Secure Payment
        </h2>
      </div>

      {/* Address recap */}
      <div
        className="flex gap-3 p-4 rounded-xl mb-5"
        style={{ background: "#EEEEEE" }}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white"
          style={{ background: "#222831" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div className="text-sm" style={{ color: "#222831" }}>
          <p className="font-semibold">{form.fullName}</p>
          <p style={{ color: "#393E46" }}>{form.addressLine1}</p>
          <p style={{ color: "#393E46" }}>
            {form.city}, {form.state} – {form.pincode}
          </p>
          <p className="mt-1 text-xs" style={{ color: "#393E46" }}>
            {form.phone} · {form.email}
          </p>
        </div>
      </div>

      {/* Razorpay info box */}
      <div
        className="flex items-center gap-2.5 px-4 py-3 rounded-xl mb-5 text-sm"
        style={{ background: "#00ADB512", color: "#222831", border: "1px solid #00ADB540" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00ADB5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
        <span>Pay securely via Razorpay — UPI, Card, Net Banking, Wallets</span>
      </div>

      {errorMessage && errorType === "declined" && (
        <ErrorBanner title="Payment Declined" message={errorMessage} />
      )}
      {errorMessage && errorType === "generic" && (
        <ErrorBanner title="Payment Failed" message={errorMessage} />
      )}

      <button
        type="button"
        onClick={confirmPayment}
        disabled={paymentLoading}
        className="w-full h-12 rounded-lg text-sm font-semibold text-white disabled:opacity-60 flex items-center justify-center gap-2"
        style={{ background: "#00ADB5" }}
      >
        {paymentLoading ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            Opening Payment...
          </>
        ) : (
          <>🔒 Pay ₹{total.toFixed(2)}</>
        )}
      </button>

      <p className="text-xs text-center mt-4" style={{ color: "#393E46" }}>
        🔒 Secured by Razorpay. We never store your card details.
      </p>
    </div>
  );
}

function ErrorBanner({ title, message }: { title: string; message: string }) {
  return (
    <div
      className="flex gap-3 p-4 rounded-xl mb-5"
      style={{ background: "#fdecea", border: "1px solid #f3c4c0" }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e0554f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3" />
      </svg>
      <div className="text-sm" style={{ color: "#7a2e29" }}>
        <p className="font-semibold">{title}</p>
        <p className="mt-0.5">{message}</p>
      </div>
    </div>
  );
}