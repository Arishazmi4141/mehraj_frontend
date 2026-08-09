"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ChevronRight } from "lucide-react";
import { cartService, CartItem } from "@/src/services/cart.service";
import { IMAGE_BASE_URL } from "@/src/lib/api-client";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const hasAnimatedRows = useRef(false);

  useEffect(() => {
    cartService.fetchCart().then(() => setLoading(false));
    const unsubscribe = cartService.subscribe((updatedItems) => {
      setItems(updatedItems);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && items.length > 0 && !hasAnimatedRows.current) {
      gsap.fromTo(
        ".cart-item-row",
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }
      );
      hasAnimatedRows.current = true;
    }
  }, [loading, items.length]);

  const subtotal = items.reduce((sum, i) => sum + i.currentPrice * i.quantity, 0);

  const resolveImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${IMAGE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const handleRemove = (cartItemId: number) => {
    const el = rowRefs.current.get(cartItemId);
    if (!el) {
      cartService.removeItem(cartItemId);
      return;
    }
    gsap.to(el, {
      opacity: 0,
      x: -30,
      height: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.45,
      ease: "power3.in",
      onComplete: () => cartService.removeItem(cartItemId),
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-3 bg-[#F6F2E9]">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1B1B18]/20 border-t-[#2E4B3F]" />
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#1B1B18]/50">
          Loading Cart
        </span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F6F2E9] px-6 text-center">
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#2E4B3F]/25 bg-[#2E4B3F]/10">
          <ShoppingBag className="h-7 w-7 text-[#2E4B3F]" />
        </div>
        <h2 className="mb-4 font-serif text-3xl font-light text-[#1B1B18]">Your Cart is Empty</h2>
        <p className="mb-9 max-w-sm font-sans text-sm leading-[1.85] text-[#1B1B18]/60">
          Nothing in here yet. Browse the collections to find your next piece.
        </p>
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 bg-[#1B1B18] px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F6F2E9] transition-colors duration-300 hover:bg-[#2E4B3F]"
        >
          Browse Collections <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F6F2E9] px-6 pb-28 pt-36">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 font-sans text-[9px] font-medium uppercase tracking-[0.4em] text-[#1B1B18]/40">
          <Link href="/" className="hover:text-[#1B1B18]/60">Home</Link>
          <ChevronRight size={9} className="text-[#A6906F]" />
          <span className="text-[#2E4B3F]">Cart</span>
        </div>

        <h1 className="mb-14 font-serif text-3xl font-light tracking-[-0.01em] text-[#1B1B18] md:text-4xl">
          Your Cart <span className="text-[#2E4B3F]">({items.length})</span>
        </h1>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Item list */}
          <div className="space-y-5 lg:col-span-2">
            {items.map((item) => (
              <div
                key={item.cartItemId}
                ref={(el) => {
                  if (el) rowRefs.current.set(item.cartItemId, el);
                  else rowRefs.current.delete(item.cartItemId);
                }}
                className="cart-item-row flex flex-col gap-6 border border-[#1B1B18]/10 bg-white p-6 shadow-[0_15px_35px_rgba(27,27,24,0.04)] sm:flex-row"
              >
                <div className="h-24 w-24 shrink-0 overflow-hidden border border-[#1B1B18]/10 bg-[#EDE6D8]">
                  <img src={resolveImageUrl(item.imageUrl)} alt={item.productName} className="h-full w-full object-cover" />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-normal text-[#1B1B18]">{item.productName}</h3>
                    <p className="mt-1 font-sans text-xs text-[#1B1B18]/45">Spec: {item.size}</p>
                  </div>
                  <div className="mt-4 font-sans text-sm font-semibold text-[#2E4B3F] sm:mt-0">
                    ₹{item.currentPrice.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:flex-col sm:justify-center">
                  <div className="flex items-center border border-[#1B1B18]/10">
                    <button
                      onClick={() => cartService.decrement(item.variantId)}
                      className="flex h-8 w-8 items-center justify-center text-[#1B1B18]/60 transition-colors duration-200 hover:text-[#1B1B18]"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-7 text-center font-sans text-xs text-[#1B1B18]">{item.quantity}</span>
                    <button
                      onClick={() => cartService.increment(item.variantId)}
                      className="flex h-8 w-8 items-center justify-center text-[#1B1B18]/60 transition-colors duration-200 hover:text-[#1B1B18]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.cartItemId)}
                    aria-label="Remove item"
                    className="text-[#1B1B18]/35 transition-colors duration-300 hover:text-[#5C2A32]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 border border-[#1B1B18]/10 bg-white p-8 shadow-[0_20px_45px_rgba(27,27,24,0.05)]">
              <h2 className="mb-6 border-b border-[#1B1B18]/10 pb-4 font-sans text-[11px] uppercase tracking-[0.25em] text-[#1B1B18]/45">
                Order Summary
              </h2>

              <div className="space-y-4 font-sans text-sm text-[#1B1B18]/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1B1B18]">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-[#1B1B18]">Calculated at checkout</span>
                </div>
              </div>

              <div className="mt-8 flex items-end justify-between border-t border-[#1B1B18]/10 pt-6">
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#1B1B18]/45">Total</span>
                <span className="font-serif text-2xl text-[#2E4B3F]">₹{subtotal.toLocaleString()}</span>
              </div>

              <Link
                href="/checkout"
                className="mt-10 flex w-full items-center justify-center gap-2 bg-[#1B1B18] py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F6F2E9] transition-colors duration-300 hover:bg-[#2E4B3F]"
              >
                Proceed to Checkout <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}