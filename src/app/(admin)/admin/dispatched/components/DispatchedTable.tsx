"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { OrderSummaryDto } from "@/src/services/admin.service";

interface DispatchedTableProps {
  orders: OrderSummaryDto[];
  copiedKey: string;
  onCopyKey: (e: React.MouseEvent, key: string) => void;
  onDeliverClick: (e: React.MouseEvent, order: OrderSummaryDto) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function DispatchedTable({
  orders, copiedKey, onCopyKey, onDeliverClick, currentPage, totalPages, onPageChange
}: DispatchedTableProps) {
  const router = useRouter();

  const parseDtOfOpsLabel = (val: number | undefined) => {
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
          Log Vacant: No dispatched component asset parameters currently rolling in pipeline.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs font-body">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-[var(--color-ink-faint)] uppercase tracking-wider">
                <th className="pb-4 font-semibold">Registry Token</th>
                <th className="pb-4 font-semibold">Client Reference</th>
                <th className="pb-4 font-semibold">Financial scale</th>
                <th className="pb-4 font-semibold">Secure Tracking Hash</th>
                <th className="pb-4 text-right font-semibold">Lifecycle Command</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {orders.map((o) => {
                const trkKey = o.trckngKey || `TRK-DISP-${o.orderId}`;
                return (
                  <tr
                    key={o.orderId}
                    onClick={() => router.push(`/admin/orders/${o.orderId}`)}
                    className="hover:bg-[var(--color-surface-alt)] transition-colors cursor-pointer group"
                  >
                    <td className="py-5 font-mono text-[var(--color-brass)]">#PAS-{o.orderId}</td>
                    <td className="py-5">
                      <p className="text-[var(--color-ink)] font-semibold">{o.name}</p>
                      <p className="text-[10px] text-[var(--color-ink-faint)] mt-0.5">{parseDtOfOpsLabel(o.dtOfOps)}</p>
                    </td>
                    <td className="py-5 font-mono text-[var(--color-ink)]">
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
                      <button
                        type="button"
                        onClick={(e) => onDeliverClick(e, o)}
                        className="opacity-80 group-hover:opacity-100 bg-transparent border border-emerald-600/40 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white text-emerald-700 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-all duration-300"
                      >
                        Mark Delivered
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-between items-center border-t border-[var(--color-border)] pt-6 mt-8">
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-faint)]">
            Page Core Index: {currentPage} / {totalPages} Pages
          </span>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="p-2 bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-ink-faint)] hover:text-[var(--color-green)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
            </button>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="p-2 bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-ink-faint)] hover:text-[var(--color-green)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}