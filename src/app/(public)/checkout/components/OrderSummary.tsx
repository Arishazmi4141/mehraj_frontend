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
  return (item.currentPrice * item.quantity).toFixed(2);
}

export default function OrderSummary({ cartItems, subtotal, shipping, total }: OrderSummaryProps) {
  return (
    <aside
      className="w-full lg:w-[380px] shrink-0 rounded-2xl p-6 h-fit lg:sticky lg:top-8"
      style={{ background: "#ffffff", border: "1px solid #e2e2e2" }}
    >
      <h3 className="text-base font-semibold tracking-wide mb-5" style={{ color: "#222831" }}>
        ORDER SUMMARY
      </h3>

      <div className="flex flex-col gap-4 max-h-[340px] overflow-y-auto pr-1">
        {cartItems.map((item) => (
          <div key={item.cartItemId} className="flex items-center gap-3">
            <div
              className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0"
              style={{ background: "#EEEEEE" }}
            >
              <Image
                src={item.imageUrl?.startsWith("http") ? item.imageUrl : `${IMAGE_BASE_URL}${item.imageUrl}`}
                alt={item.productName}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: "#222831" }}>
                {item.productName}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#393E46" }}>
                Qty {item.quantity} · {item.size}
              </p>
            </div>
            <span
              className="text-sm font-semibold tabular-nums shrink-0"
              style={{ color: "#222831", fontFamily: "var(--font-mono, monospace)" }}
            >
              ₹{itemTotal(item)}
            </span>
          </div>
        ))}
      </div>

      <div className="h-px my-5" style={{ background: "#e2e2e2" }} />

      <div className="flex flex-col gap-2 text-sm" style={{ color: "#393E46" }}>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="tabular-nums">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="tabular-nums">{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
        </div>
      </div>

      <div className="h-px my-4" style={{ background: "#e2e2e2" }} />

      <div className="flex justify-between items-baseline">
        <span className="text-sm font-semibold" style={{ color: "#222831" }}>
          Total
        </span>
        <span className="text-xl font-bold tabular-nums" style={{ color: "#00ADB5" }}>
          ₹{total.toFixed(2)}
        </span>
      </div>
    </aside>
  );
}