// (admin)/admin/journal/page.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { journalService } from "@/src/services/journal.service";
import { Journal } from "@/src/types/journal.types";
import JournalTable from "./components/JournalTable";
import JournalFormModal from "./components/JournalFormModal";
import JournalFilters from "./components/JournalFilters";

const PAGE_SIZE = 10;

export default function JournalPage() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingJournal, setEditingJournal] = useState<Journal | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Journal | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchJournals = useCallback(async (pageToLoad: number) => {
    setLoading(true);
    try {
      const res = await journalService.getAllJournals(pageToLoad, PAGE_SIZE);
      setJournals(res.content || []);
      setTotalPages(res.totalPages || 0);
      setTotalElements(res.totalElements || 0);
      setPage(res.number ?? pageToLoad);
    } catch (err) {
      console.error("Failed to load journal entries:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJournals(0);
  }, [fetchJournals]);

  const filteredJournals = journals.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingJournal(null);
    setModalOpen(true);
  };

  const openEditModal = (journal: Journal) => {
    setEditingJournal(journal);
    setModalOpen(true);
  };

  const handleModalSuccess = () => {
    setModalOpen(false);
    setEditingJournal(null);
    fetchJournals(page);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await journalService.deleteJournal(deleteTarget.id);
      setDeleteTarget(null);
      // If we just deleted the only item on the last page, step back a page.
      const nextPage = journals.length === 1 && page > 0 ? page - 1 : page;
      fetchJournals(nextPage);
    } catch (err) {
      console.error("Failed to delete journal entry:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 p-6 md:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-[var(--color-ink)]">Journal</h1>
          <p className="mt-1 text-[12px] text-[var(--color-ink-faint)]">
            {totalElements} {totalElements === 1 ? "entry" : "entries"} published
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-sm bg-[var(--color-green)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-green-deep)] hover:text-[var(--color-bg)]"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          New Entry
        </button>
      </div>

      <JournalFilters search={search} onSearchChange={setSearch} />

      <JournalTable
        journals={filteredJournals}
        loading={loading}
        onEdit={openEditModal}
        onDelete={setDeleteTarget}
      />

      {totalPages > 1 && (
        <div
          className="flex items-center justify-between border-t pt-4"
          style={{ borderColor: "var(--color-border)" }}
        >
          <button
            type="button"
            disabled={page <= 0}
            onClick={() => fetchJournals(page - 1)}
            className="rounded-sm border px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)] disabled:opacity-40"
            style={{ borderColor: "var(--color-border)" }}
          >
            Previous
          </button>
          <span className="text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
            Page {page + 1} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages - 1}
            onClick={() => fetchJournals(page + 1)}
            className="rounded-sm border px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)] disabled:opacity-40"
            style={{ borderColor: "var(--color-border)" }}
          >
            Next
          </button>
        </div>
      )}

      {modalOpen && (
        <JournalFormModal
          journal={editingJournal}
          onClose={() => setModalOpen(false)}
          onSuccess={handleModalSuccess}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          title={deleteTarget.title}
          deleting={deleting}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

function DeleteConfirmModal({
  title,
  deleting,
  onCancel,
  onConfirm,
}: {
  title: string;
  deleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
      <div
        className="w-full max-w-sm rounded-sm border p-7"
        style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        <p className="font-display text-[15px] font-semibold text-[var(--color-ink)]">
          Delete this entry?
        </p>
        <p className="mt-2 text-[12.5px] leading-[1.7] text-[var(--color-ink-muted)]">
          &ldquo;{title}&rdquo; will be removed from the journal. This can&apos;t be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="rounded-sm border px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]"
            style={{ borderColor: "var(--color-border)" }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="rounded-sm bg-red-600 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}