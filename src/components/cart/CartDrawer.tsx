"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/src/context/CartContext";
import { cartService } from "@/src/services/cart.service";
import { IMAGE_BASE_URL } from "@/src/lib/api-client";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, totalPrice } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRows = useRef(false);

  const resolveImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${IMAGE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  useEffect(() => {
    if (!panelRef.current || !overlayRef.current) return;

    if (isDrawerOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
      gsap.to(panelRef.current, { x: 0, duration: 0.55, ease: "power4.out" });
      hasAnimatedRows.current = false;
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.35, ease: "power2.in" });
      gsap.to(panelRef.current, { x: "100%", duration: 0.5, ease: "power3.in" });
    }
  }, [isDrawerOpen]);

  useEffect(() => {
    if (isDrawerOpen && items.length > 0 && !hasAnimatedRows.current) {
      gsap.fromTo(
        ".drawer-item-row",
        { opacity: 0, x: 24 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: "power3.out", delay: 0.15 }
      );
      hasAnimatedRows.current = true;
    }
  }, [isDrawerOpen, items.length]);

  return (
    <div className={`fixed inset-0 z-[110] ${isDrawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#1B1B18]/50 opacity-0 backdrop-blur-[2px]"
        onClick={closeDrawer}
      />

      <div
        ref={panelRef}
        className="absolute right-0 top-0 flex h-full w-full max-w-sm translate-x-full flex-col bg-[#F6F2E9] shadow-[-30px_0_60px_rgba(27,27,24,0.15)]"
        style={{ borderLeft: "1px solid rgba(27,27,24,0.1)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1B1B18]/10 px-7 py-6">
          <div>
            <div className="mb-1 font-sans text-[10px] uppercase tracking-[0.3em] text-[#A6906F]">
              Your Selection
            </div>
            <h2 className="font-serif text-xl text-[#1B1B18]">
              Cart <span className="text-[#2E4B3F]">({items.length})</span>
            </h2>
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center border border-[#1B1B18]/10 transition-colors duration-300 hover:border-[#2E4B3F]"
          >
            <X className="h-4 w-4 text-[#1B1B18]" />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#2E4B3F]/20 bg-[#2E4B3F]/10">
              <ShoppingBag className="h-6 w-6 text-[#2E4B3F]" />
            </div>
            <p className="font-sans text-sm text-[#1B1B18]/55">Your cart is empty for now.</p>
          </div>
        ) : (
          <div className="flex-1 space-y-5 overflow-y-auto px-7 py-6">
            {items.map((item) => (
              <div key={item.cartItemId} className="drawer-item-row flex gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden border border-[#1B1B18]/10 bg-[#EDE6D8]">
                  <img src={resolveImageUrl(item.imageUrl)} alt={item.productName} className="h-full w-full object-cover" />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate font-sans text-sm font-medium text-[#1B1B18]">{item.productName}</p>
                    <button
                      onClick={() => cartService.removeItem(item.cartItemId)}
                      aria-label="Remove item"
                      className="shrink-0 text-[#1B1B18]/35 transition-colors duration-300 hover:text-[#5C2A32]"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center border border-[#1B1B18]/10">
                      <button
                        onClick={() => cartService.decrement(item.variantId)}
                        className="flex h-7 w-7 items-center justify-center text-[#1B1B18]/60 transition-colors duration-200 hover:text-[#1B1B18]"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center font-sans text-xs text-[#1B1B18]">{item.quantity}</span>
                      <button
                        onClick={() => cartService.increment(item.variantId)}
                        className="flex h-7 w-7 items-center justify-center text-[#1B1B18]/60 transition-colors duration-200 hover:text-[#1B1B18]"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="font-sans text-sm font-semibold text-[#2E4B3F]">
                      ₹{(item.currentPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#1B1B18]/10 bg-[#EDE6D8] px-7 py-6">
            <div className="mb-5 flex items-baseline justify-between">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#1B1B18]/45">Subtotal</span>
              <span className="font-serif text-2xl text-[#1B1B18]">₹{totalPrice.toLocaleString()}</span>
            </div>
            <Link
              href="/cart"
              onClick={closeDrawer}
              className="block bg-[#1B1B18] py-4 text-center font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#F6F2E9] transition-colors duration-300 hover:bg-[#2E4B3F]"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}