"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, ArrowLeft, ArrowRight, AlertOctagon } from "lucide-react";
import { OrderSummaryDto } from "@/src/services/admin.service";

interface CancelledTableProps {
  orders: OrderSummaryDto[];
  copiedKey: string;
  onCopyKey: (e: React.MouseEvent, key: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  statusFilter: "cancelled" | "refund";
}

export default function CancelledTable({
  orders, copiedKey, onCopyKey, currentPage, totalPages, onPageChange, statusFilter
}: CancelledTableProps) {
  const router = useRouter();

  const parseDtOfOpsLabel = (val: number | null | undefined) => {
    if (!val) return "—";
    const s = String(val);
    const d = new Date(`${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8">
      {orders.length === 0 ? (
        <div className="text-center py-16 text-[var(--color-ink-faint)] font-body text-xs uppercase tracking-widest">
          No records: Archives clear of matching rejected component transactions.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs font-body">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-[var(--color-ink-faint)] uppercase tracking-wider">
                <th className="pb-4 font-semibold">Token code</th>
                <th className="pb-4 font-semibold">Client Target</th>
                <th className="pb-4 font-semibold">Financial Volume</th>
                <th className="pb-4 font-semibold">Logistics Exception Keys</th>
                <th className="pb-4 text-right font-semibold">System State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {orders.map((o) => {
                const trkKey = o.trckngKey || `TRK-ERR-${o.orderId}`;
                return (
                  <tr
                    key={o.orderId}
                    onClick={() => router.push(`/admin/cancelled/${o.orderId}`)}
                    className="hover:bg-[var(--color-surface-alt)] transition-colors cursor-pointer group"
                  >
                    <td className="py-5 font-mono text-[var(--color-ink-faint)] group-hover:text-red-700 transition-colors">#PAS-{o.orderId}</td>
                    <td className="py-5">
                      <p className="text-[var(--color-ink)] font-semibold">{o.name}</p>
                      <p className="text-[10px] text-[var(--color-ink-faint)] mt-0.5">{parseDtOfOpsLabel(o.dtOfOps)}</p>
                    </td>
                    <td className="py-5 font-mono text-[var(--color-ink-muted)]">
                      £{o.amount.toLocaleString("en-GB")}
                    </td>
                    <td className="py-5 font-mono">
                      <button
                        type="button"
                        onClick={(e) => onCopyKey(e, trkKey)}
                        className="inline-flex items-center gap-2 px-2 py-1 bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[10px] text-[var(--color-ink-faint)] hover:text-[var(--color-green)] transition-colors"
                      >
                        <span className="max-w-[120px] truncate">{trkKey}</span>
                        {copiedKey === trkKey ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </td>
                    <td className="py-5 text-right">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase border ${
                        statusFilter === "refund" ? "border-amber-600/25 bg-amber-600/5 text-amber-700" : "border-red-600/25 bg-red-600/5 text-red-700"
                      }`}>
                        <AlertOctagon className="h-2.5 w-2.5" />
                        <span>{o.orderStatus || (statusFilter === "refund" ? "REFUNDED" : "CANCELLED")}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Module controls layout */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center border-t border-[var(--color-border)] pt-6 mt-8">
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-faint)]">
            Node Index Matrix: {currentPage} / {totalPages} Pages
          </span>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="p-2 bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-ink-faint)] hover:text-[var(--color-green)] disabled:opacity-30 transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
            </button>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="p-2 bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-ink-faint)] hover:text-[var(--color-green)] disabled:opacity-30 transition-colors"
            >
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}