"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import gsap from "gsap";
import { ArrowLeft, ShieldX, Loader2 } from "lucide-react";
import { requestAPI, IMAGE_BASE_URL } from "@/src/lib/api-client";

interface CancelledOrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  productName: string;
  imageUrl?: string;
  size?: string;
}

interface CancelledOrderResponse {
  id: number;
  name: string;
  email: string;
  address: string;
  status: string;
  phone: number | null;
  createdAt: string;
  items: CancelledOrderItem[];
  payment?: { amount: number; paymentstatus: string } | null;
}

export default function CancelledOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id ? Number(params.id) : null;

  const [order, setOrder] = useState<CancelledOrderResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem("admin_token") || "";

    requestAPI<CancelledOrderResponse>(`/admin/order/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setOrder(res);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (loading || !order) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".animate-detail-node",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power4.out", stagger: 0.05 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [loading, order]);

  if (loading) return <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-green)]"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  if (!order) return <div className="min-h-screen bg-[var(--color-bg)] text-center p-12 text-[var(--color-ink-faint)]">RECORD INVARIANT CORRUPTED</div>;

  const subtotal = order.items?.reduce((sum: number, item: CancelledOrderItem) => sum + (item.price * item.quantity), 0) || 0;
  const aggregateTotal = order.payment?.amount || subtotal;

  // Short dynamic layout for non-operational / broken requests mapping
  const staticTimelineSteps = [
    { label: "Order Placed Matrix", done: true, active: false },
    { label: "Pipeline Terminated", done: false, active: true }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)] p-6 md:p-12">
      
      <button onClick={() => router.back()} className="animate-detail-node group mb-10 flex items-center gap-3 font-body text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink-faint)] hover:text-[var(--color-green)] transition-colors">
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
        <span>Return to Exception Grid</span>
      </button>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        
        {/* LEFT VIEW SHEET MODULE */}
        <div className="lg:col-span-8 space-y-6">
          <div className="animate-detail-node bg-[var(--color-surface)] border border-[var(--color-border)] p-8">
            <span className="font-body text-[9px] uppercase tracking-widest text-red-700">Wiped Allocation Matrix</span>
            <h2 className="mt-2 font-display text-xl font-bold tracking-tight mb-8">Node #PAS-{order.id} Log</h2>

            {/* Micro Exception Timeline indicators layout */}
            <div className="grid grid-cols-2 gap-4 mb-8 pt-4 border-t border-[var(--color-border)]">
              {staticTimelineSteps.map((step, i) => (
                <div key={i} className="p-4 bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-center flex flex-col items-center">
                  <div className={`h-2 w-2 rounded-full mb-3 ${step.active ? "bg-red-600 shadow-lg shadow-red-600/30" : "bg-[var(--color-border-strong)]"}`} />
                  <span className={`font-display text-[10px] uppercase tracking-wider ${step.active ? "text-red-700 font-bold" : "text-[var(--color-ink-faint)]"}`}>{step.label}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-body border-b border-[var(--color-border)] pb-6 mb-6">
              <div>
                <p className="text-[var(--color-ink-faint)] uppercase tracking-wider mb-2">Customer Profile Reference</p>
                <p className="text-[var(--color-ink)] font-semibold text-sm">{order.name}</p>
                <p className="text-[var(--color-ink-muted)] mt-0.5">{order.email}</p>
                <p className="text-[var(--color-ink-muted)]">{order.phone || "No Contact Key Provided"}</p>
              </div>
              <div>
                <p className="text-[var(--color-ink-faint)] uppercase tracking-wider mb-2">Logistical Target Destination</p>
                <p className="text-[var(--color-ink-muted)] leading-relaxed font-light">{order.address}</p>
              </div>
            </div>

            <h3 className="font-display text-[11px] font-bold uppercase tracking-widest text-[var(--color-ink-faint)] mb-4">Wiped Allocation Components</h3>
            <div className="space-y-4">
              {order.items?.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
                  <div className="flex gap-4 items-center">
                    <div className="h-10 w-12 bg-[var(--color-surface-alt)] border border-[var(--color-border)] overflow-hidden">
                      <img src={item.imageUrl ? `${IMAGE_BASE_URL}${item.imageUrl}` : "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=100"} className="h-full w-full object-cover grayscale opacity-60" />
                    </div>
                    <div>
                      <p className="font-display text-xs font-bold text-[var(--color-ink-faint)] line-through">{item.productName}</p>
                      <p className="font-body text-[9px] text-[var(--color-ink-faint)] uppercase tracking-wider mt-0.5">Dimension Profile: <span className="font-mono text-[var(--color-ink-faint)]">{item.size || "Standard"}</span></p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[var(--color-ink-faint)] line-through">{item.quantity} x £{item.price.toLocaleString("en-GB")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT VALUATION SUMMARY CARD */}
        <div className="lg:col-span-4 animate-detail-node bg-[var(--color-surface)] border border-[var(--color-border)] p-8 space-y-6">
          <h3 className="font-display text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--color-ink-faint)]">Financial Accounting</h3>
          
          <div className="space-y-4 text-xs font-body border-b border-[var(--color-border)] pb-6">
            <div className="flex justify-between">
              <span className="text-[var(--color-ink-muted)]">Net Elements Evaluated</span>
              <span className="font-mono text-[var(--color-ink-faint)] line-through">£{subtotal.toLocaleString("en-GB")}</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-[var(--color-border)]">
              <span className="font-display text-[10px] font-bold uppercase tracking-wider text-red-700">Voided Aggregate Total</span>
              <span className="font-display text-xl font-bold text-red-700 font-mono">£{aggregateTotal.toLocaleString("en-GB")}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[var(--color-ink-faint)]">
            <ShieldX className="h-4 w-4 text-red-600/70" />
            <span className="font-body text-[9px] uppercase tracking-wider">Transaction Void &bull; Allocation Wiped</span>
          </div>
        </div>

      </div>

    </div>
  );
}