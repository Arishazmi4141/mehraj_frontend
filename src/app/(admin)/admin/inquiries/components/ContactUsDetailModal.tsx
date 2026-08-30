"use client";
import React from "react";
import { X, Mail, Phone } from "lucide-react";
import { ContactUsRequest } from "@/src/types/inquiry";

interface ContactUsDetailModalProps {
  show: boolean;
  request: ContactUsRequest | null;
  onClose: () => void;
}

function formatDate(dt?: string | null) {
  if (!dt) return null;
  return new Date(dt).toLocaleString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function ContactUsDetailModal({ show, request, onClose }: ContactUsDetailModalProps) {
  if (!show || !request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-[var(--color-surface)] border w-full max-w-lg p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto rounded-sm" style={{ borderColor: "var(--color-border)" }}>
        <button onClick={onClose} className="absolute top-6 right-6 text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors">
          <X className="h-4 w-4" />
        </button>

        <div className="border-b pb-5 mb-5" style={{ borderColor: "var(--color-border)" }}>
          <span className="font-body text-[10px] uppercase tracking-widest text-[var(--color-brass)]">Contact Us Request</span>
          <h3 className="mt-1 font-display text-[18px] font-bold text-[var(--color-ink)]">{request.name}</h3>
          <div className="mt-2 flex flex-col gap-1 text-[12px] text-[var(--color-ink-muted)] font-body">
            <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {request.email}</span>
            <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {request.phoneNumber}</span>
          </div>
        </div>

        <div className="space-y-5 text-[13px] font-body">
          <div>
            <h4 className="font-display text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-ink-faint)] mb-2">Message</h4>
            <p className="text-[var(--color-ink-muted)] leading-relaxed">{request.message || "No message provided."}</p>
          </div>

          <div className="pt-3 border-t text-[11px] text-[var(--color-ink-faint)]" style={{ borderColor: "var(--color-border)" }}>
            Submitted {formatDate(request.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}