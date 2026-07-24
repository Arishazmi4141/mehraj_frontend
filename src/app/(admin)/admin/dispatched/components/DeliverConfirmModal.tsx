"use client";

import React from "react";
import { X, ShieldCheck, Loader2 } from "lucide-react";
import { OrderSummaryDto } from "@/src/services/admin.service";

interface DeliverConfirmModalProps {
  show: boolean;
  actionLoading: boolean;
  order: OrderSummaryDto | null;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeliverConfirmModal({
  show, actionLoading, order, onConfirm, onClose
}: DeliverConfirmModalProps) {
  if (!show || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] w-full max-w-md p-8 text-center shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors">
          <X className="h-4 w-4" />
        </button>

        <ShieldCheck className="mx-auto h-8 w-8 text-emerald-600 mb-6 animate-pulse" strokeWidth={1.25} />
        
        <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--color-ink)] mb-3">
          Confirm Logistics Delivery
        </h3>
        
        <p className="font-body text-[12px] leading-[1.8] text-[var(--color-ink-muted)] mb-8">
          Are you prepared to authorize terminal delivery signature mapping for token point <span className="text-[var(--color-brass)] font-mono">#PAS-{order.orderId}</span>? This action confirms client asset receipt.
        </p>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-transparent border border-[var(--color-border)] text-[var(--color-ink)] hover:bg-[var(--color-surface-alt)] py-3 text-[10px] font-bold uppercase tracking-widest transition-colors"
          >
            Abort Transition
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={actionLoading}
            className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-[var(--color-border-strong)] disabled:text-[var(--color-ink-faint)] py-3 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            style={{ cursor: "pointer" }}
          >
            {actionLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Confirm Receipt"}
          </button>
        </div>
      </div>
    </div>
  );
}