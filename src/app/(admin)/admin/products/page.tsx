"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { Plus, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { requestAPI } from "@/src/lib/api-client";
import { Product, ProductVariant, Category } from "@/src/types/product";
import { useRequireAdminAuth, useAdminAuthErrorHandler } from "@/src/hooks/useAdminAuth";

import ProductFilters from "./components/ProductFilters";
import ProductTable from "./components/ProductTable";
import ProductFormModal from "./components/ProductFormModal";
import ProductDetailModal from "./components/ProductDetailModal";

export default function AdminProductsPage() {
  useRequireAdminAuth();
  const handleAuthError = useAdminAuthErrorHandler();

  const containerRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [expandedProductId, setExpandedProductId] = useState<number | null>(null);

  const [filters, setFilters] = useState({ searchQuery: "", filterCategory: "", filterTrending: "", filterStatus: "" });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(0);

  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [showDetailModal, setShowDetailsModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({ name: "", description: "", categoryId: 0, trending: "NO", isActive: true });
  const [formVariants, setFormVariants] = useState<ProductVariant[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFilesPreviews, setSelectedFilesPreviews] = useState<string[]>([]);
  const [deleteImageIds, setDeleteImageIds] = useState<number[]>([]);
  const [localImages, setLocalImages] = useState<any[]>([]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      let routeParams = `?page=${currentPage - 1}&size=${pageSize}&sort=name,asc`;
      if (filters.searchQuery.trim()) routeParams += `&keyword=${encodeURIComponent(filters.searchQuery.trim())}`;
      if (filters.filterCategory) routeParams += `&category=${filters.filterCategory}`;
      if (filters.filterTrending) routeParams += `&trending=${filters.filterTrending}`;

      const res = await requestAPI<any>(`/admin/getallproducts${routeParams}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
      });
      setProducts(res.content || []);
      setTotalPages(res.totalPages || 1);
      setTotalElements(res.totalElements || 0);
    } catch (err) {
      if (handleAuthError(err)) return;
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filters.filterCategory, filters.filterTrending, filters.searchQuery]);

  useEffect(() => {
    requestAPI<Category[]>("/categories/getAllCategories").then((res: Category[]) => setCategories(Array.isArray(res) ? res : []));
  }, []);

  useEffect(() => {
    if (!loading && containerRef.current) {
      gsap.fromTo(
        ".animate-prod-node",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, [loading]);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formVariants.length === 0) return alert("Please add at least one variant.");
    if (formVariants.some((v) => !v.size || v.price <= 0)) return alert("Please enter a valid size and price for every variant.");

    try {
      setActionLoading(true);
      const isEdit = !!editingProduct;
      const payload = new FormData();

      payload.append("product", JSON.stringify({
        name: formData.name.trim(),
        description: formData.description.trim(),
        categoryId: Number(formData.categoryId),
        trending: formData.trending,
        isActive: formData.isActive,
        variants: formVariants.map((v: ProductVariant) => ({
          ...(v.id ? { id: v.id } : {}),
          size: v.size.trim(),
          price: Number(v.price),
          stock: Number(v.stock),
        })),
      }));

      selectedFiles.forEach((file: File) => payload.append("images", file));

      if (isEdit) {
        const primaryImageId = localImages.find((img: any) => !deleteImageIds.includes(img.id))?.id || null;
        if (primaryImageId) payload.append("primaryImageId", String(primaryImageId));
        if (deleteImageIds.length) payload.append("deleteImageIds", deleteImageIds.join(","));
      }

      const url = isEdit ? `/admin/updateproduct/${editingProduct.id}` : "/admin/addproducts";
      await requestAPI(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
        body: payload,
      });

      setShowFormModal(false);
      loadProducts();
    } catch (err) {
      if (handleAuthError(err)) return;
      alert("Something went wrong saving this product. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await requestAPI(`/admin/deleteproduct/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
      }, true);
      loadProducts();
    } catch (err) {
      if (handleAuthError(err)) return;
      alert("Failed to delete product.");
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
      <div className="animate-prod-node flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6 mb-10 gap-4" style={{ borderColor: "#E7E3D8" }}>
        <div>
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#A9773C]">Inventory</span>
          <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#171712]">Products</h1>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setFormData({ name: "", description: "", categoryId: categories[0]?.id || 0, trending: "NO", isActive: true });
            setFormVariants([{ size: "", price: 0, stock: 10 } as unknown as ProductVariant]);
            setSelectedFiles([]);
            setSelectedFilesPreviews([]);
            setDeleteImageIds([]);
            setLocalImages([]);
            setShowFormModal(true);
          }}
          className="bg-[#1F4A38] hover:bg-[#173829] transition-colors text-white px-5 py-3 text-[11px] font-semibold uppercase tracking-widest flex items-center gap-2 rounded-sm"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          <span>Add Product</span>
        </button>
      </div>

      <ProductFilters filters={filters} setFilters={setFilters} categories={categories} />

      <div className="animate-prod-node bg-white border p-8 rounded-sm" style={{ borderColor: "#E7E3D8" }}>
        <ProductTable
          products={products}
          expandedProductId={expandedProductId}
          setExpandedProductId={setExpandedProductId}
          onViewDetails={(p: Product) => { setSelectedProduct(p); setShowDetailsModal(true); }}
          onEdit={(p: Product) => {
            setEditingProduct(p);
            setFormData({ name: p.name, description: p.description || "", categoryId: p.category?.id || 0, trending: p.trending || "NO", isActive: p.isActive });
            setFormVariants(p.variants ? p.variants.map((v: ProductVariant) => ({ ...v })) : []);
            setLocalImages(p.productImages ? [...p.productImages] : []);
            setDeleteImageIds([]);
            setSelectedFiles([]);
            setSelectedFilesPreviews([]);
            setShowFormModal(true);
          }}
          onDelete={handleDeleteProduct}
        />

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 pt-6 border-t font-body" style={{ borderColor: "#E7E3D8" }}>
          <span className="text-[11px] text-[#8C8A80] uppercase tracking-wider">
            Showing {products.length} of {totalElements} products
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 border text-[#6B685F] hover:text-[#171712] disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-sm"
              style={{ borderColor: "#E7E3D8" }}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-[12px] text-[#A9773C] px-4 font-mono">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 border text-[#6B685F] hover:text-[#171712] disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-sm"
              style={{ borderColor: "#E7E3D8" }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <ProductFormModal
        show={showFormModal}
        actionLoading={actionLoading}
        categories={categories}
        editingProduct={editingProduct}
        formData={formData}
        setFormData={setFormData}
        formVariants={formVariants}
        setFormVariants={setFormVariants}
        selectedFilesPreviews={selectedFilesPreviews}
        localImages={localImages}
        deleteImageIds={deleteImageIds}
        toggleDeleteImageId={(id: number) => setDeleteImageIds((prev: number[]) => prev.includes(id) ? prev.filter((i: number) => i !== id) : [...prev, id])}
        handleFileAttachment={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (!e.target.files) return;
          const files = Array.from(e.target.files);
          setSelectedFiles((prev: File[]) => [...prev, ...files]);
          files.forEach((f: File) => {
            const r = new FileReader();
            r.onload = () => r.result && setSelectedFilesPreviews((prev: string[]) => [...prev, r.result as string]);
            r.readAsDataURL(f);
          });
        }}
        onDropFiles={(files: File[]) => {
          setSelectedFiles((prev: File[]) => [...prev, ...files]);
          files.forEach((f: File) => {
            const r = new FileReader();
            r.onload = () => r.result && setSelectedFilesPreviews((prev: string[]) => [...prev, r.result as string]);
            r.readAsDataURL(f);
          });
        }}
        setSelectedFiles={setSelectedFiles}
        setSelectedFilesPreviews={setSelectedFilesPreviews}
        onSubmit={handleProductSubmit}
        onClose={() => setShowFormModal(false)}
      />

      <ProductDetailModal show={showDetailModal} product={selectedProduct} onClose={() => setShowDetailsModal(false)} />
    </div>
  );
}