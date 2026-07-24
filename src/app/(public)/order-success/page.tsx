// src/app/(public)/order-success/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { cartService } from "@/src/services/cart.service";

type PaymentStatus = "succeeded" | "failed" | "processing";

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={null}>
      <OrderSuccessContent />
    </Suspense>
  );
}

function OrderSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [verifying, setVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("failed");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const paymentId = searchParams.get("payment_id") || "";
    const status = searchParams.get("status") || "";

    if (status === "succeeded" && paymentId) {
      setPaymentIntentId(paymentId);
      setPaymentStatus("succeeded");
      setVerifying(false);
      // Cart already cleared on checkout page — this is a safety net.
      cartService.fetchCart();
      return;
    }

    if (status === "processing") {
      setPaymentStatus("processing");
      setVerifying(false);
      return;
    }

    if (status === "failed") {
      setPaymentStatus("failed");
      setErrorMessage("Payment was not completed. No amount was charged.");
      setVerifying(false);
      return;
    }

    setPaymentStatus("failed");
    setErrorMessage("No payment information found.");
    setVerifying(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (verifying) {
    return (
      <Centered>
        <div className="w-10 h-10 rounded-full border-4 mx-auto mb-5 animate-spin" style={{ borderColor: "#00ADB540", borderTopColor: "#00ADB5" }} />
        <h3 className="text-lg font-semibold" style={{ color: "#222831" }}>
          Verifying your payment...
        </h3>
        <p className="text-sm mt-1" style={{ color: "#393E46" }}>
          Please wait, do not close this page.
        </p>
      </Centered>
    );
  }

  if (paymentStatus === "succeeded") {
    return (
      <Centered wide>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "#00ADB51a" }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00ADB5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold" style={{ color: "#222831" }}>
          Order Confirmed 🎉
        </h1>
        <p className="text-sm mt-2" style={{ color: "#393E46" }}>
          Thank you for shopping with us
        </p>

        {paymentIntentId && (
          <div
            className="mt-6 px-4 py-3 rounded-xl text-left"
            style={{ background: "#EEEEEE" }}
          >
            <p className="text-xs font-medium" style={{ color: "#393E46" }}>
              Payment Reference
            </p>
            <p className="text-sm font-mono mt-0.5 break-all" style={{ color: "#222831" }}>
              {paymentIntentId}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 text-left">
          <NextStep icon="📧" title="Confirmation Email" desc="Order details sent to your email" />
          <NextStep icon="📦" title="Processing" desc="Your order is being prepared" />
          <NextStep icon="🚚" title="Delivery" desc="Expected within 5–7 business days" />
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center h-12 px-8 rounded-lg text-sm font-semibold text-white mt-8"
          style={{ background: "#222831" }}
        >
          Continue Shopping
        </Link>
      </Centered>
    );
  }

  if (paymentStatus === "processing") {
    return (
      <Centered>
        <div className="w-10 h-10 rounded-full border-4 mx-auto mb-5 animate-spin" style={{ borderColor: "#f0b42940", borderTopColor: "#f0b429" }} />
        <h1 className="text-xl font-bold" style={{ color: "#222831" }}>
          Payment Processing
        </h1>
        <p className="text-sm mt-2" style={{ color: "#393E46" }}>
          Your payment is being processed. We&apos;ll notify you once confirmed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-12 px-8 rounded-lg text-sm font-semibold text-white mt-6"
          style={{ background: "#222831" }}
        >
          Back to Store
        </Link>
      </Centered>
    );
  }

  // failed
  return (
    <Centered>
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ background: "#fdecea" }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#e0554f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
      <h1 className="text-xl font-bold" style={{ color: "#222831" }}>
        Payment Failed
      </h1>
      <p className="text-sm mt-2" style={{ color: "#393E46" }}>
        {errorMessage || "Your payment could not be processed. Please try again."}
      </p>
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={() => router.push("/checkout")}
          className="h-12 px-6 rounded-lg text-sm font-semibold text-white"
          style={{ background: "#00ADB5" }}
        >
          Try Again
        </button>
        <Link
          href="/"
          className="h-12 px-6 rounded-lg text-sm font-semibold flex items-center"
          style={{ border: "1px solid #d8d8d8", color: "#222831" }}
        >
          Back to Store
        </Link>
      </div>
    </Centered>
  );
}

function Centered({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#EEEEEE" }}>
      <div
        className={`w-full ${wide ? "max-w-xl" : "max-w-md"} text-center rounded-2xl p-8 sm:p-10`}
        style={{ background: "#ffffff", border: "1px solid #e2e2e2" }}
      >
        {children}
      </div>
    </div>
  );
}

function NextStep({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-2.5 p-3 rounded-xl" style={{ background: "#EEEEEE" }}>
      <span className="text-lg leading-none">{icon}</span>
      <div>
        <p className="text-xs font-semibold" style={{ color: "#222831" }}>
          {title}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#393E46" }}>
          {desc}
        </p>
      </div>
    </div>
  );
}