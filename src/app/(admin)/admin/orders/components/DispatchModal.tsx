"use client";

import React from "react";
import { Send, Loader2 } from "lucide-react";
import { OrderSummaryDto } from "@/src/services/admin.service";

interface DispatchModalProps {
  show: boolean;
  order: OrderSummaryDto | null;
  loading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DispatchModal({ show, order, loading, onConfirm, onClose }: DispatchModalProps) {
  if (!show || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] w-full max-w-md p-8 text-center shadow-2xl relative">
        <Send className="mx-auto h-8 w-8 text-[var(--color-green)] mb-6 animate-pulse" strokeWidth={1.25} />
        <h3 className="font-display text-[14px] font-bold uppercase tracking-[0.2em] text-[var(--color-ink)] mb-3">
          Authorize Logistics Clearance
        </h3>
        <p className="font-body text-[12px] leading-[1.8] text-[var(--color-ink-muted)] mb-8">
          Are you prepared to launch secure logistics routing parameters for asset token <span className="text-[var(--color-brass)] font-mono">#PAS-{order.orderId}</span> allocated under client identity <span className="text-[var(--color-ink)] font-semibold">{order.name}</span>?
        </p>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-transparent border border-[var(--color-border)] text-[var(--color-ink)] hover:bg-[var(--color-surface-alt)] py-3 text-[10px] font-bold uppercase tracking-widest transition-colors"
          >
            Abort Sequence
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-[var(--color-green)] hover:bg-[var(--color-green-deep)] text-[var(--color-bg)] py-3 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Authorize Release"}
          </button>
        </div>
      </div>
    </div>
  );
}