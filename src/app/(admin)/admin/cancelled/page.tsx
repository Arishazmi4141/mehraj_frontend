"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { Loader2 } from "lucide-react";
import { requestAPI } from "@/src/lib/api-client";
import { OrderSummaryDto } from "@/src/services/admin.service";
import CancelledFilters from "./components/CancelledFilters";
import CancelledTable from "./components/CancelledTable";

export default function AdminCancelledOrdersPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [orders, setOrders] = useState<OrderSummaryDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedKey, setCopiedKey] = useState<string>("");

  // Core filter parameters configuration state matrices
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"cancelled" | "refund">("refund");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize = 10;

  // ── 1. Fetch Exception Log Core Records ────────────────────────────────────
  const fetchExceptionLogsStream = async () => {
    try {
      setLoading(true);
      const statusParam = statusFilter === "refund" ? "REFUNDED" : "CANCELLED";
      let url = `/admin/orders?status=${statusParam}&page=${currentPage - 1}&size=${pageSize}`;
      
      if (searchQuery.trim()) {
        url += `&trckngKey=${encodeURIComponent(searchQuery.trim())}`;
      }

      const token = localStorage.getItem("admin_token") || "";
      const res = await requestAPI<any>(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setOrders(res?.content || []);
      setTotalPages(res?.totalPages || 1);
    } catch (err) {
      console.error("Cancelled registry serialization failure:", err);
    } finally {
      // ✅ FIXED: Accidental 'military' typo removed completely and switched back to standard 'finally'
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExceptionLogsStream();
  }, [currentPage, statusFilter]);

  // Search Debounce system parsing algorithms
  useEffect(() => {
    if (!searchQuery.trim()) return;
    const searchDelay = setTimeout(() => {
      setCurrentPage(1);
      fetchExceptionLogsStream();
    }, 450);
    return () => clearTimeout(searchDelay);
  }, [searchQuery]);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".animate-cancelled-node",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power4.out", stagger: 0.04 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [loading]);

  if (loading) return <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-green)]"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)] p-6 md:p-12">
      
      <div className="animate-cancelled-node border-b border-[var(--color-border)] pb-6 mb-10">
        <span className="font-body text-[9px] uppercase tracking-[0.4em] text-[var(--color-green)]">Exception Archives</span>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--color-ink)]">Terminated Allocations</h1>
      </div>

      <CancelledFilters
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        onRefresh={fetchExceptionLogsStream}
      />

      <div className="animate-cancelled-node">
        <CancelledTable
          orders={orders} copiedKey={copiedKey}
          onCopyKey={(e, key) => { e.stopPropagation(); setCopiedKey(key); navigator.clipboard.writeText(key); setTimeout(() => setCopiedKey(""), 2000); }}
          currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}
          statusFilter={statusFilter}
        />
      </div>

    </div>
  );
}