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
        className="absolute inset-0 opacity-0"
        style={{ background: "rgba(28,28,26,0.5)", backdropFilter: "blur(2px)" }}
        onClick={closeDrawer}
      />

      <div
        ref={panelRef}
        className="absolute right-0 top-0 h-full w-full max-w-sm flex flex-col"
        style={{ background: "var(--color-bg)", borderLeft: "1px solid var(--color-border)", transform: "translateX(100%)", boxShadow: "-30px 0 60px rgba(28,28,26,0.15)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-6" style={{ borderBottom: "1px solid var(--color-border)" }}>
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: "var(--color-brass)" }}>Your Selection</div>
            <h2 className="font-display text-xl" style={{ color: "var(--color-ink)" }}>
              Cart <span style={{ color: "var(--color-green)" }}>({items.length})</span>
            </h2>
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-300"
            style={{ border: "1px solid var(--color-border)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-green)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
          >
            <X className="w-4 h-4" style={{ color: "var(--color-ink)" }} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "var(--color-green-soft-2)", border: "1px solid rgba(31,74,56,0.18)" }}
            >
              <ShoppingBag className="w-6 h-6" style={{ color: "var(--color-green)" }} />
            </div>
            <p style={{ color: "var(--color-ink-muted)", fontSize: "0.9rem" }}>Your cart is empty for now.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-7 py-6 space-y-5">
            {items.map((item) => (
              <div key={item.cartItemId} className="drawer-item-row flex gap-4">
                <div
                  className="w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden"
                  style={{ background: "var(--color-surface-alt)", border: "1px solid var(--color-border)" }}
                >
                  <img src={resolveImageUrl(item.imageUrl)} alt={item.productName} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--color-ink)" }}>{item.productName}</p>
                    <button
                      onClick={() => cartService.removeItem(item.cartItemId)}
                      aria-label="Remove item"
                      className="flex-shrink-0 transition-colors duration-300"
                      style={{ color: "var(--color-ink-faint)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brass)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-ink-faint)")}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center rounded-sm" style={{ border: "1px solid var(--color-border)" }}>
                      <button
                        onClick={() => cartService.decrement(item.variantId)}
                        className="w-7 h-7 flex items-center justify-center transition-colors duration-200"
                        style={{ color: "var(--color-ink-muted)" }}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs w-6 text-center" style={{ color: "var(--color-ink)" }}>{item.quantity}</span>
                      <button
                        onClick={() => cartService.increment(item.variantId)}
                        className="w-7 h-7 flex items-center justify-center transition-colors duration-200"
                        style={{ color: "var(--color-ink-muted)" }}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-sm font-semibold" style={{ color: "var(--color-green)" }}>
                      £{(item.currentPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-7 py-6" style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-surface-alt)" }}>
            <div className="flex justify-between items-baseline mb-5">
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--color-ink-faint)" }}>Subtotal</span>
              <span className="font-display text-2xl" style={{ color: "var(--color-ink)" }}>£{totalPrice.toFixed(2)}</span>
            </div>
            <Link
              href="/cart"
              onClick={closeDrawer}
              className="block text-center rounded-sm py-4 text-xs font-semibold tracking-[0.2em] uppercase transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: "var(--color-green)", color: "#F7F7F4" }}
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}