// (admin)/admin/magazine/page.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { magazineService } from "@/src/services/magazine.service";
import { Magazine } from "@/src/types/magazine.types";
import MagazineTable from "./components/MagazineTable";
import MagazineFormModal from "./components/MagazineFormModal";
import MagazineFilters from "./components/MagazineFilters";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

const PAGE_SIZE = 10;

export default function MagazinePage() {
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [search, setSearch] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Magazine | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchMagazines = useCallback(async (pageToLoad: number) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await magazineService.getAllMagazines(pageToLoad, PAGE_SIZE);
      setMagazines(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setPage(data.number);
    } catch (err) {
      console.error("Failed to load magazines:", err);
      setErrorMsg("Couldn't load magazine issues. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMagazines(0);
  }, [fetchMagazines]);

  // Backend has no search endpoint (only page/size), so search filters
  // whatever page is currently loaded, client-side.
  const q = search.trim().toLowerCase();
 const visibleMagazines = q
  ? magazines.filter((m) => m.title.toLowerCase().includes(q) || String(m.year).includes(q))
  : magazines;

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await magazineService.deleteMagazine(deleteTarget.id);
      // if that was the last row on a page beyond the first, step back a page
      const isLastRowOnPage = magazines.length === 1 && page > 0;
      setDeleteTarget(null);
      fetchMagazines(isLastRowOnPage ? page - 1 : page);
    } catch (err) {
      console.error("Failed to delete magazine:", err);
      setErrorMsg("Couldn't delete that issue. Please try again.");
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  const handleFormSuccess = () => {
    setShowFormModal(false);
    fetchMagazines(0);
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-[20px] font-bold text-[var(--color-ink)]">Magazine</h1>
          <p className="mt-1 text-[12px] text-[var(--color-ink-faint)]">
            {totalElements} issue{totalElements === 1 ? "" : "s"} published
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowFormModal(true)}
          className="flex items-center justify-center gap-2 rounded-sm bg-[var(--color-green)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink)] transition-colors hover:bg-[var(--color-green-deep)] hover:text-[var(--color-bg)]"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          New Issue
        </button>
      </div>

      <MagazineFilters search={search} onSearchChange={setSearch} />

      {errorMsg && (
        <div
          className="mt-4 rounded-sm border px-4 py-2.5 text-[12px]"
          style={{ background: "#FDECEA", borderColor: "#F3C4C0", color: "#7A2E29" }}
        >
          {errorMsg}
        </div>
      )}

      <div className="mt-4">
        <MagazineTable magazines={visibleMagazines} loading={loading} onDelete={setDeleteTarget} />
      </div>

      {!loading && totalPages > 1 && !q && (
        <div className="mt-5 flex items-center justify-between">
          <p className="text-[11.5px] text-[var(--color-ink-faint)]">
            Page {page + 1} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => fetchMagazines(page - 1)}
              className="rounded-sm border px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)] disabled:opacity-40"
              style={{ borderColor: "var(--color-border)" }}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= totalPages - 1}
              onClick={() => fetchMagazines(page + 1)}
              className="rounded-sm border px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)] disabled:opacity-40"
              style={{ borderColor: "var(--color-border)" }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {showFormModal && (
        <MagazineFormModal onClose={() => setShowFormModal(false)} onSuccess={handleFormSuccess} />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          title="Delete this issue?"
          message={`"${deleteTarget.title}" will be permanently removed. This can't be undone.`}
          loading={deleting}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}