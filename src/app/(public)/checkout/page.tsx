// src/app/(public)/checkout/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/src/context/CartContext";
import { requestAPI } from "@/src/lib/api-client";
import { guestService } from "@/src/services/guest.service";
import { cartService } from "@/src/services/cart.service";
import {
  CheckoutForm,
  CheckoutResponse,
  emptyCheckoutForm,
  buildAddressString,
} from "@/src/types/checkout.types";

import CheckoutSteps from "./components/CheckoutSteps";
import ShippingForm from "./components/ShippingForm";
import PaymentForm from "./components/PaymentForm";
import OrderSummary from "./components/OrderSummary";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalCount, totalPrice } = useCart();

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<CheckoutForm>(emptyCheckoutForm);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [razorpayOrderId, setRazorpayOrderId] = useState("");

  const subtotal = +totalPrice.toFixed(2);
  const shipping = 0;
  const total = +(subtotal + shipping).toFixed(2);

  useEffect(() => {
    if (totalCount === 0) {
      router.replace("/cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleShippingSubmitted(submitted: CheckoutForm) {
    setForm(submitted);
    setErrorMessage("");
    setLoading(true);

    try {
      const payload = {
        guestId: guestService.getOrCreateGuestId(),
        amount: total,
        currency: "INR",
        name: submitted.fullName,
        address: buildAddressString(submitted),
        email: submitted.email,
        phone: submitted.phone,
      };

      const res = await requestAPI<CheckoutResponse>("/order/create-guestorder", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res?.razorpayOrderId) {
        setErrorMessage("Could not initiate payment. Please try again.");
        return;
      }

      setRazorpayOrderId(res.razorpayOrderId);
      setCurrentStep(2);
    } catch (err: any) {
      setErrorMessage(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handlePaymentSuccess(data: { razorpay_payment_id: string }) {
    try {
      const guestId = guestService.getOrCreateGuestId();
      await requestAPI(`/cart/${guestId}`, { method: "DELETE" }, true);
    } catch {
      // non-blocking — order-success page clears again as a safety net
    } finally {
      cartService.fetchCart();
      router.push(`/order-success?payment_id=${data.razorpay_payment_id}&status=succeeded`);
    }
  }

  function handlePaymentFailed(message: string) {
    setErrorMessage(message);
  }

  function handleGoBack() {
    setCurrentStep(1);
    setErrorMessage("");
    setRazorpayOrderId("");
  }

  return (
    <div className="min-h-screen bg-[#F6F2E9] px-4 py-10 pt-32 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center font-serif text-2xl font-light text-[#1B1B18] sm:text-3xl">
          Checkout
        </h1>

        <CheckoutSteps currentStep={currentStep} />

        {errorMessage && currentStep === 1 && (
          <div className="mx-auto mb-6 max-w-2xl border border-[#5C2A32]/25 bg-[#5C2A32]/8 px-4 py-3 font-sans text-sm text-[#5C2A32]">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col items-start gap-6 lg:flex-row">
          <div className="w-full flex-1">
            {currentStep === 1 && <ShippingForm form={form} loading={loading} onSubmit={handleShippingSubmitted} />}
            {currentStep === 2 && (
              <PaymentForm
                form={form}
                razorpayOrderId={razorpayOrderId}
                total={total}
                onGoBack={handleGoBack}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentFailed={handlePaymentFailed}
              />
            )}
          </div>

          <OrderSummary cartItems={items} subtotal={subtotal} shipping={shipping} total={total} />
        </div>
      </div>
    </div>
  );
}