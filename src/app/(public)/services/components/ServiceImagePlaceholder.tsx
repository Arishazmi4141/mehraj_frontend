"use client";

import { ImageIcon } from "lucide-react";

type Props = {
  label: string;
  aspect?: string; // e.g. "4/5", "16/9", "1/1"
  className?: string;
};

/**
 * Drop-in placeholder for real photography.
 * To swap in a real image later, replace the inner content with:
 *   <Image src="..." alt={label} fill className="object-cover" />
 * and remove the placeholder styling below.
 */
export default function ServiceImagePlaceholder({ label, aspect = "4/5", className = "" }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm flex flex-col items-center justify-center gap-3 ${className}`}
      style={{
        aspectRatio: aspect,
        background: "var(--color-surface-alt)",
        border: "1px dashed var(--color-border-strong)",
      }}
    >
      <ImageIcon size={22} strokeWidth={1.5} style={{ color: "var(--color-ink-faint)" }} />
      <span
        className="text-[10px] tracking-[0.25em] uppercase text-center px-6"
        style={{ color: "var(--color-ink-faint)" }}
      >
        {label}
      </span>
    </div>
  );
}