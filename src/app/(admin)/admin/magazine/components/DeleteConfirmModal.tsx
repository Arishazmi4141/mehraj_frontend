// (admin)/admin/magazine/components/DeleteConfirmModal.tsx
"use client";

export default function DeleteConfirmModal({
  title,
  message,
  confirmLabel = "Delete",
  loading,
  onCancel,
  onConfirm,
}: {
  title: string;
  message: string;
  confirmLabel?: string;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center bg-black/50 p-4">
      <div
        className="w-full max-w-sm rounded-sm border p-6"
        style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        <h3 className="font-display text-[15px] font-bold text-[var(--color-ink)]">{title}</h3>
        <p className="mt-2 text-[12.5px] leading-[1.6] text-[var(--color-ink-muted)]">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-sm border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]"
            style={{ borderColor: "var(--color-border)" }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-sm bg-red-600 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}