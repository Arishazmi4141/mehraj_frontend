// src/app/(public)/checkout/components/OrderSummary.tsx
"use client";

import Image from "next/image";
import type { CartItem } from "@/src/services/cart.service";
import { IMAGE_BASE_URL } from "@/src/lib/api-client";

interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

function itemTotal(item: CartItem): string {
  return (item.currentPrice * item.quantity).toLocaleString();
}

export default function OrderSummary({ cartItems, subtotal, shipping, total }: OrderSummaryProps) {
  return (
    <aside
      className="h-fit w-full shrink-0 border border-[#1B1B18]/10 bg-white p-6 lg:sticky lg:top-8 lg:w-[380px]"
    >
      <h3 className="mb-5 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B1B18]">
        Order Summary
      </h3>

      <div className="flex max-h-[340px] flex-col gap-4 overflow-y-auto pr-1">
        {cartItems.map((item) => (
          <div key={item.cartItemId} className="flex items-center gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-[#EDE6D8]">
              <Image
                src={item.imageUrl?.startsWith("http") ? item.imageUrl : `${IMAGE_BASE_URL}${item.imageUrl}`}
                alt={item.productName}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-sans text-sm font-medium text-[#1B1B18]">{item.productName}</p>
              <p className="mt-0.5 font-sans text-xs text-[#1B1B18]/50">
                Qty {item.quantity} · {item.size}
              </p>
            </div>
            <span className="shrink-0 font-sans text-sm font-semibold tabular-nums text-[#1B1B18]">
              ₹{itemTotal(item)}
            </span>
          </div>
        ))}
      </div>

      <div className="my-5 h-px bg-[#1B1B18]/10" />

      <div className="flex flex-col gap-2 font-sans text-sm text-[#1B1B18]/60">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="tabular-nums">₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="tabular-nums">{shipping === 0 ? "Free" : `₹${shipping.toLocaleString()}`}</span>
        </div>
      </div>

      <div className="my-4 h-px bg-[#1B1B18]/10" />

      <div className="flex items-baseline justify-between">
        <span className="font-sans text-sm font-semibold uppercase tracking-[0.15em] text-[#1B1B18]">
          Total
        </span>
        <span className="font-serif text-xl font-normal tabular-nums text-[#2E4B3F]">
          ₹{total.toLocaleString()}
        </span>
      </div>
    </aside>
  );
}