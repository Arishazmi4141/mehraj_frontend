"use client";
import React from "react";
import { Eye, Trash2, Calendar } from "lucide-react";
import { ConsultationRequest } from "@/src/types/inquiry";

interface ConsultationsTableProps {
  consultations: ConsultationRequest[];
  onViewDetails: (c: ConsultationRequest) => void;
  onDelete: (id: number, name: string) => void;
}

function formatDate(dt?: string | null) {
  if (!dt) return "—";
  return new Date(dt).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function ConsultationsTable({ consultations, onViewDetails, onDelete }: ConsultationsTableProps) {
  if (consultations.length === 0) {
    return (
      <div className="py-16 flex flex-col items-center gap-2 text-[var(--color-ink-faint)]">
        <Calendar className="h-6 w-6" />
        <span className="text-[12px] uppercase tracking-widest">No consultation requests found</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px] font-body">
        <thead>
          <tr className="border-b text-left text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink-faint)]" style={{ borderColor: "var(--color-border)" }}>
            <th className="py-3 pr-4">Name</th>
            <th className="py-3 pr-4">Contact</th>
            <th className="py-3 pr-4">1st Preferred Slot</th>
            <th className="py-3 pr-4">Received</th>
            <th className="py-3 pr-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((c) => (
            <tr key={c.id} className="border-b last:border-b-0 hover:bg-[var(--color-surface-alt)] transition-colors" style={{ borderColor: "var(--color-border)" }}>
              <td className="py-3 pr-4">
                <p className="text-[var(--color-ink)] font-semibold">{c.name}</p>
                <p className="text-[11px] text-[var(--color-ink-faint)] truncate max-w-[220px]">{c.message || "—"}</p>
              </td>
              <td className="py-3 pr-4">
                <p className="text-[var(--color-ink-muted)]">{c.email}</p>
                <p className="text-[11px] text-[var(--color-ink-faint)]">{c.phoneNumber}</p>
              </td>
              <td className="py-3 pr-4 text-[var(--color-ink-muted)]">{formatDate(c.preferredSlot1)}</td>
              <td className="py-3 pr-4 text-[var(--color-ink-faint)]">{formatDate(c.createdAt)}</td>
              <td className="py-3 pr-4">
                <div className="flex items-center justify-end gap-2">
                  <button onClick={() => onViewDetails(c)} className="p-2 border text-[var(--color-ink-muted)] hover:text-[var(--color-green-deep)] hover:border-[var(--color-green)]/40 rounded-sm transition-colors" style={{ borderColor: "var(--color-border)" }}>
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => onDelete(c.id, c.name)} className="p-2 border text-[var(--color-ink-muted)] hover:text-red-600 hover:border-red-200 rounded-sm transition-colors" style={{ borderColor: "var(--color-border)" }}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}