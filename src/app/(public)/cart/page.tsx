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
      <div className="min-h-screen flex items-center justify-center gap-3" style={{ background: "var(--color-bg)" }}>
        <div
          className="w-4 h-4 rounded-full animate-spin"
          style={{ border: "2px solid var(--color-border-strong)", borderTopColor: "var(--color-green)" }}
        />
        <span className="text-xs tracking-[0.25em] uppercase" style={{ color: "var(--color-ink-faint)" }}>
          Loading Cart
        </span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ background: "var(--color-bg)" }}>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
          style={{ background: "var(--color-green-soft-2)", border: "1px solid rgba(31,74,56,0.18)" }}
        >
          <ShoppingBag className="w-7 h-7" style={{ color: "var(--color-green)" }} />
        </div>
        <h2 className="font-display text-3xl mb-4" style={{ color: "var(--color-ink)" }}>
          Your Cart is Empty
        </h2>
        <p className="max-w-sm mb-9" style={{ color: "var(--color-ink-muted)", fontSize: "0.95rem", lineHeight: "1.7" }}>
          Nothing in here yet. Browse the shop to find your next upgrade.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-sm text-xs font-semibold tracking-[0.2em] uppercase transition-transform duration-300 hover:-translate-y-0.5"
          style={{ background: "var(--color-green)", color: "#F7F7F4" }}
        >
          Browse Shop <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen pt-36 pb-28 px-6" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.4em] mb-8" style={{ color: "var(--color-ink-faint)" }}>
          <Link href="/" style={{ color: "var(--color-ink-faint)" }}>Home</Link>
          <ChevronRight size={9} style={{ color: "var(--color-brass)" }} />
          <span style={{ color: "var(--color-green)" }}>Cart</span>
        </div>

        <h1
          className="font-display font-light mb-14"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--color-ink)", letterSpacing: "-0.01em" }}
        >
          Your Cart <span style={{ color: "var(--color-green)" }}>({items.length})</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Item list */}
          <div className="lg:col-span-2 space-y-5">
            {items.map((item) => (
              <div
                key={item.cartItemId}
                ref={(el) => {
                  if (el) rowRefs.current.set(item.cartItemId, el);
                  else rowRefs.current.delete(item.cartItemId);
                }}
                className="cart-item-row flex flex-col sm:flex-row gap-6 p-6 rounded-sm overflow-hidden"
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "0 15px 35px rgba(28,28,26,0.05)" }}
              >
                <div className="w-24 h-24 rounded-sm overflow-hidden shrink-0" style={{ background: "var(--color-surface-alt)", border: "1px solid var(--color-border)" }}>
                  <img src={resolveImageUrl(item.imageUrl)} alt={item.productName} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg font-medium" style={{ color: "var(--color-ink)" }}>{item.productName}</h3>
                    <p className="text-xs mt-1" style={{ color: "var(--color-ink-faint)" }}>Spec: {item.size}</p>
                  </div>
                  <div className="text-sm font-semibold mt-4 sm:mt-0" style={{ color: "var(--color-green)" }}>
                    £{item.currentPrice}
                  </div>
                </div>

                <div className="flex items-center sm:flex-col justify-between sm:justify-center gap-4">
                  <div className="flex items-center rounded-sm" style={{ border: "1px solid var(--color-border)" }}>
                    <button
                      onClick={() => cartService.decrement(item.variantId)}
                      className="w-8 h-8 flex items-center justify-center transition-colors duration-200"
                      style={{ color: "var(--color-ink-muted)" }}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs w-7 text-center" style={{ color: "var(--color-ink)" }}>{item.quantity}</span>
                    <button
                      onClick={() => cartService.increment(item.variantId)}
                      className="w-8 h-8 flex items-center justify-center transition-colors duration-200"
                      style={{ color: "var(--color-ink-muted)" }}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.cartItemId)}
                    aria-label="Remove item"
                    className="transition-colors duration-300"
                    style={{ color: "var(--color-ink-faint)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brass)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-ink-faint)")}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div
              className="p-8 rounded-sm sticky top-32"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "0 20px 45px rgba(28,28,26,0.07)" }}
            >
              <h2
                className="text-xs uppercase tracking-[0.25em] mb-6 pb-4"
                style={{ color: "var(--color-ink-faint)", borderBottom: "1px solid var(--color-border)" }}
              >
                Order Summary
              </h2>

              <div className="space-y-4 text-sm" style={{ color: "var(--color-ink-muted)" }}>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span style={{ color: "var(--color-ink)" }}>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span style={{ color: "var(--color-ink)" }}>Calculated at checkout</span>
                </div>
              </div>

              <div className="mt-8 pt-6 flex justify-between items-end" style={{ borderTop: "1px solid var(--color-border)" }}>
                <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--color-ink-faint)" }}>Total</span>
                <span className="font-display text-3xl" style={{ color: "var(--color-green)" }}>£{subtotal.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="mt-10 w-full flex items-center justify-center gap-2 rounded-sm py-4 text-xs font-semibold tracking-[0.2em] uppercase transition-transform duration-300 hover:-translate-y-0.5"
                style={{ background: "var(--color-green)", color: "#F7F7F4" }}
              >
                Proceed to Checkout <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}