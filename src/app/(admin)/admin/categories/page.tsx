"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { Plus, Loader2, CheckCircle2 } from "lucide-react";
import { requestAPI } from "@/src/lib/api-client";
import { Category } from "@/src/types/product";
import { useRequireAdminAuth, useAdminAuthErrorHandler } from "@/src/hooks/useAdminAuth";

import CategoryListTable from "./components/CategoryListTable";
import CategoryFormModal from "./components/CategoryFormModal";

export default function AdminCategoriesPage() {
  useRequireAdminAuth();
  const handleAuthError = useAdminAuthErrorHandler();

  const containerRef = useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [editData, setEditData] = useState<Category | null>(null);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      const res = await requestAPI<Category[]>("/categories/getAllCategories");
      setCategories(Array.isArray(res) ? res : []);
    } catch (err) {
      if (handleAuthError(err)) return;
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".animate-cat-node", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power4.out", stagger: 0.05 });
    }, containerRef);
    return () => ctx.revert();
  }, [loading]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleCategorySubmit = async (name: string) => {
    try {
      setSaving(true);
      const token = localStorage.getItem("admin_token") || "";
      const isEdit = !!editData;

      if (isEdit) {
        const updatedCat = await requestAPI<Category>(`/admin/updateCategory/${editData.id}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({ name }),
        });
        setCategories((prev) => prev.map((c) => (c.id === updatedCat.id ? updatedCat : c)));
        showToast("Category updated successfully.");
      } else {
        const createdCat = await requestAPI<Category>("/admin/addCategory", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({ name }),
        });
        setCategories((prev) => [...prev, createdCat]);
        showToast("Category added successfully.");
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

  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Delete this category? Products linked to it may be affected.")) return;

    try {
      const token = localStorage.getItem("admin_token") || "";
      await requestAPI(`/admin/deleteCategory/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }, true);

      setCategories((prev) => prev.filter((c) => c.id !== id));
      showToast("Category deleted successfully.");
    } catch (err) {
      if (handleAuthError(err)) return;
      showToast("Failed to delete category. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F4] flex items-center justify-center text-[#1F4A38]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F7F7F4] text-[#171712] p-6 md:p-12">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-[#1F4A38]/20 text-[#1F4A38] text-[11px] uppercase tracking-widest font-semibold px-5 py-3 shadow-xl rounded-sm flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="animate-cat-node flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-6 mb-10 gap-4" style={{ borderColor: "#E7E3D8" }}>
        <div>
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#A9773C]">Inventory</span>
          <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#171712]">
            Categories
          </h1>
        </div>
        <button
          type="button"
          onClick={() => { setEditData(null); setShowFormModal(true); }}
          className="bg-[#1F4A38] hover:bg-[#173829] text-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest transition-colors flex items-center gap-2 rounded-sm"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="animate-cat-node">
        <CategoryListTable
          categories={categories}
          onEditClick={(cat) => { setEditData(cat); setShowFormModal(true); }}
          onDeleteClick={handleDeleteCategory}
        />
      </div>

      <CategoryFormModal
        show={showFormModal}
        saving={saving}
        editData={editData}
        onSubmit={handleCategorySubmit}
        onClose={() => { setShowFormModal(false); setEditData(null); }}
      />
    </div>
  );
}