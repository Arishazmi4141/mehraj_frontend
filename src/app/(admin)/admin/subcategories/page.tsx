"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { Plus, Loader2, CheckCircle2 } from "lucide-react";
import { requestAPI } from "@/src/lib/api-client";
import { Category, SubCategory } from "@/src/types/product";
import { useRequireAdminAuth, useAdminAuthErrorHandler } from "@/src/hooks/useAdminAuth";

import SubCategoryListTable from "./components/SubCategoryListTable";
import SubCategoryFormModal from "./components/SubCategoryFormModal";

export default function AdminSubCategoriesPage() {
  useRequireAdminAuth();
  const handleAuthError = useAdminAuthErrorHandler();

  const containerRef = useRef<HTMLDivElement>(null);

  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [editData, setEditData] = useState<SubCategory | null>(null);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const [subCatRes, catRes] = await Promise.all([
        requestAPI<SubCategory[]>("/subcategories/getAllSubCategories"),
        requestAPI<Category[]>("/categories/getAllCategories"),
      ]);
      setSubCategories(Array.isArray(subCatRes) ? subCatRes : []);
      setCategories(Array.isArray(catRes) ? catRes : []);
    } catch (err) {
      if (handleAuthError(err)) return;
      console.error("Failed to load subcategories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".animate-subcat-node", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power4.out", stagger: 0.05 });
    }, containerRef);
    return () => ctx.revert();
  }, [loading]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Submit (Add / Edit) — multipart: "subCategory" JSON part + optional "image" file part
 const handleSubCategorySubmit = async (payload: {
  name: string;
  description: string;
  categoryId: number;
  imageFile: File | null;
}) => {
  try {
    setSaving(true);
    const token = localStorage.getItem("admin_token") || "";
    const isEdit = !!editData;

    const formData = new FormData();
    formData.append(
      "subCategory",
      new Blob([JSON.stringify({ name: payload.name, description: payload.description })], { type: "application/json" })
    );
    if (payload.imageFile) {
      formData.append("image", payload.imageFile);
    }

    const url = isEdit
      ? `/admin/updateSubCategory/${editData.id}`
      : `/admin/addSubCategory/${payload.categoryId}`;   // ✅ path variable — backend @PathVariable Long categoryId leta hai
    const method = isEdit ? "PUT" : "POST";

    const savedSubCat = await requestAPI<SubCategory>(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (isEdit) {
      setSubCategories((prev) => prev.map((sc) => (sc.id === savedSubCat.id ? savedSubCat : sc)));
      showToast("Sub-category updated successfully.");
    } else {
      setSubCategories((prev) => [...prev, savedSubCat]);
      showToast("Sub-category added successfully.");
    }

    setShowFormModal(false);
    setEditData(null);
  } catch (err) {
    if (handleAuthError(err)) return;
    showToast("Something went wrong. Please try again.");
  } finally {
    setSaving(false);
  }
};

  const handleDeleteSubCategory = async (id: number) => {
    if (!confirm("Delete this sub-category? Products linked to it may be affected.")) return;

    try {
      const token = localStorage.getItem("admin_token") || "";
      await requestAPI(`/admin/deleteSubCategory/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }, true);

      setSubCategories((prev) => prev.filter((sc) => sc.id !== id));
      showToast("Sub-category deleted successfully.");
    } catch (err) {
      if (handleAuthError(err)) return;
      showToast("Failed to delete sub-category. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-green)]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)] p-6 md:p-12">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[var(--color-surface)] border border-[var(--color-green)]/20 text-[var(--color-green-deep)] text-[11px] uppercase tracking-widest font-semibold px-5 py-3 shadow-xl rounded-sm flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="animate-subcat-node flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-6 mb-10 gap-4" style={{ borderColor: "var(--color-border)" }}>
        <div>
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[var(--color-brass)]">Inventory</span>
          <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--color-ink)]">
            Sub-Categories
          </h1>
        </div>
        <button
          type="button"
          onClick={() => { setEditData(null); setShowFormModal(true); }}
          disabled={categories.length === 0}
          className="bg-[var(--color-green)] hover:bg-[var(--color-green-deep)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-bg)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest transition-colors flex items-center gap-2 rounded-sm"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          <span>Add Sub-Category</span>
        </button>
      </div>

      {categories.length === 0 && (
        <div className="animate-subcat-node mb-6 text-[12px] text-[var(--color-ink-faint)] font-body">
          Pehle ek Category banao, phir usme sub-category add ho payegi.
        </div>
      )}

      <div className="animate-subcat-node">
        <SubCategoryListTable
          subCategories={subCategories}
          onEditClick={(sc) => { setEditData(sc); setShowFormModal(true); }}
          onDeleteClick={handleDeleteSubCategory}
        />
      </div>

      <SubCategoryFormModal
        show={showFormModal}
        saving={saving}
        editData={editData}
        categories={categories}
        onSubmit={handleSubCategorySubmit}
        onClose={() => { setShowFormModal(false); setEditData(null); }}
      />
    </div>
  );
}