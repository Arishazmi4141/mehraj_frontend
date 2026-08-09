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
        <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-[#2E4B3F]/25 border-t-[#2E4B3F]" />
        <h3 className="font-serif text-lg font-light text-[#1B1B18]">Verifying your payment...</h3>
        <p className="mt-1 font-sans text-sm text-[#1B1B18]/55">Please wait, do not close this page.</p>
      </Centered>
    );
  }

  if (paymentStatus === "succeeded") {
    return (
      <Centered wide>
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#2E4B3F]/10">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2E4B3F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="font-serif text-2xl font-light leading-[1.15] text-[#1B1B18]">
          Order Confirmed — <span className="italic text-[#5C2A32]">Thank You</span>
        </h1>
        <p className="mt-2 font-sans text-sm text-[#1B1B18]/55">Thank you for shopping with MehRāj.</p>

        {paymentIntentId && (
          <div className="mt-6 border border-[#1B1B18]/10 bg-[#F6F2E9] px-4 py-3 text-left">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-[#1B1B18]/45">
              Payment Reference
            </p>
            <p className="mt-0.5 break-all font-sans text-sm text-[#1B1B18]">{paymentIntentId}</p>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-3 text-left sm:grid-cols-3">
          <NextStep icon="📧" title="Confirmation Email" desc="Order details sent to your email" />
          <NextStep icon="📦" title="Processing" desc="Your order is being prepared" />
          <NextStep icon="🚚" title="Delivery" desc="Expected within 5–7 business days" />
        </div>

        <Link
          href="/collections"
          className="mt-8 inline-flex h-12 items-center justify-center bg-[#1B1B18] px-8 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F6F2E9] transition-colors hover:bg-[#2E4B3F]"
        >
          Continue Shopping
        </Link>
      </Centered>
    );
  }

  if (paymentStatus === "processing") {
    return (
      <Centered>
        <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-[#A6906F]/30 border-t-[#A6906F]" />
        <h1 className="font-serif text-xl font-light text-[#1B1B18]">Payment Processing</h1>
        <p className="mt-2 font-sans text-sm text-[#1B1B18]/55">
          Your payment is being processed. We'll notify you once confirmed.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-12 items-center justify-center bg-[#1B1B18] px-8 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F6F2E9] transition-colors hover:bg-[#2E4B3F]"
        >
          Back to Store
        </Link>
      </Centered>
    );
  }

  // failed
  return (
    <Centered>
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#5C2A32]/10">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5C2A32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
      <h1 className="font-serif text-xl font-light text-[#1B1B18]">Payment Failed</h1>
      <p className="mt-2 font-sans text-sm text-[#1B1B18]/55">
        {errorMessage || "Your payment could not be processed. Please try again."}
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() => router.push("/checkout")}
          className="h-12 bg-[#2E4B3F] px-6 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F6F2E9] transition-colors hover:bg-[#1B1B18]"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="flex h-12 items-center border border-[#1B1B18]/20 px-6 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18] transition-colors hover:border-[#1B1B18]"
        >
          Back to Store
        </Link>
      </div>
    </Centered>
  );
}

function Centered({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F2E9] px-4">
      <div className={`w-full ${wide ? "max-w-xl" : "max-w-md"} border border-[#1B1B18]/10 bg-white p-8 text-center sm:p-10`}>
        {children}
      </div>
    </div>
  );
}

function NextStep({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-2.5 bg-[#F6F2E9] p-3">
      <span className="text-lg leading-none">{icon}</span>
      <div>
        <p className="font-sans text-xs font-semibold text-[#1B1B18]">{title}</p>
        <p className="mt-0.5 font-sans text-xs text-[#1B1B18]/55">{desc}</p>
      </div>
    </div>
  );
}