"use client";
import React from "react";
import { Eye, Trash2, Mail } from "lucide-react";
import { ContactUsRequest } from "@/src/types/inquiry";

interface ContactUsTableProps {
  requests: ContactUsRequest[];
  onViewDetails: (c: ContactUsRequest) => void;
  onDelete: (id: number, name: string) => void;
}

function formatDate(dt?: string | null) {
  if (!dt) return "—";
  return new Date(dt).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function ContactUsTable({ requests, onViewDetails, onDelete }: ContactUsTableProps) {
  if (requests.length === 0) {
    return (
      <div className="py-16 flex flex-col items-center gap-2 text-[var(--color-ink-faint)]">
        <Mail className="h-6 w-6" />
        <span className="text-[12px] uppercase tracking-widest">No contact requests found</span>
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
            <th className="py-3 pr-4">Message</th>
            <th className="py-3 pr-4">Received</th>
            <th className="py-3 pr-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((c) => (
            <tr key={c.id} className="border-b last:border-b-0 hover:bg-[var(--color-surface-alt)] transition-colors" style={{ borderColor: "var(--color-border)" }}>
              <td className="py-3 pr-4 text-[var(--color-ink)] font-semibold">{c.name}</td>
              <td className="py-3 pr-4">
                <p className="text-[var(--color-ink-muted)]">{c.email}</p>
                <p className="text-[11px] text-[var(--color-ink-faint)]">{c.phoneNumber}</p>
              </td>
              <td className="py-3 pr-4 text-[var(--color-ink-muted)] truncate max-w-[260px]">{c.message || "—"}</td>
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