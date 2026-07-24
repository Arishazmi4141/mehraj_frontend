"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { Loader2 } from "lucide-react";
import { requestAPI } from "@/src/lib/api-client";
import { OrderSummaryDto } from "@/src/services/admin.service";
import DispatchedFilters from "./components/DispatchedFilters";
import DispatchedTable from "./components/DispatchedTable";
import DeliverConfirmModal from "./components/DeliverConfirmModal";

export default function AdminDispatchedOrdersPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [orders, setOrders] = useState<OrderSummaryDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string>("");

  // Filter States Matrix
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize = 10;

  // ✅ FIXED NAMES: Types are now thoroughly balanced to match structural mapping boundaries
  const [showConfirmPopup, setShowConfirmPopup] = useState<boolean>(false);
  const [pendingOrder, setPendingOrder] = useState<OrderSummaryDto | null>(null);

  // ── 1. Fetch Dynamic Routing Stream Logs ───────────────────────────────────
  const fetchDispatchedGrid = async () => {
    try {
      let url = `/admin/orders?status=DISPATCHED&page=${currentPage - 1}&size=${pageSize}`;
      if (searchQuery.trim()) {
        url = `/admin/orders?status=DISPATCHED&page=${currentPage - 1}&size=${pageSize}&trckngKey=${encodeURIComponent(searchQuery.trim())}`;
      }

      const token = localStorage.getItem("admin_token") || "";
      const res = await requestAPI(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setOrders(res.content || []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error("Dispatched pipeline serialization fault:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDispatchedGrid();
  }, [currentPage]);

  // Search Debounce Mimic stream handling
  useEffect(() => {
    if (!searchQuery.trim()) return;
    const timeout = setTimeout(() => {
      setCurrentPage(1);
      fetchDispatchedGrid();
    }, 450);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // ── 2. Entrance Timelines Reveal ──────────────────────────────────────────
  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".animate-dispatched-node",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power4.out", stagger: 0.04 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [loading]);

  // ── 3. Post Confirmation Receipt Deployment Sequence ──────────────────────
  const executeDeliverySequence = async () => {
    if (!pendingOrder) return;
    try {
      setActionLoading(true);
      const token = localStorage.getItem("admin_token") || "";

      await requestAPI(`/admin/delivered/${pendingOrder.orderId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      }, true);

      setOrders(prev => prev.filter(o => o.orderId !== pendingOrder.orderId));
      setShowConfirmPopup(false);
      setPendingOrder(null);
    } catch (err) {
      alert("Terminal execution rejected by core infrastructure pipeline blocks.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-green)]"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)] p-6 md:p-12">
      
      <div className="animate-dispatched-node border-b border-[var(--color-border)] pb-6 mb-10">
        <span className="font-body text-[9px] uppercase tracking-[0.4em] text-[var(--color-green)]">Logistics Pipeline</span>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--color-ink)]">Dispatched Allocations</h1>
      </div>

      <DispatchedFilters
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        onClear={() => { setSearchQuery(""); setCurrentPage(1); fetchDispatchedGrid(); }}
        onRefresh={fetchDispatchedGrid}
      />

      <div className="animate-dispatched-node">
        <DispatchedTable
          orders={orders} copiedKey={copiedKey}
          onCopyKey={(e, key) => { e.stopPropagation(); setCopiedKey(key); navigator.clipboard.writeText(key); setTimeout(() => setCopiedKey(""), 2000); }}
          onDeliverClick={(e, order) => { e.stopPropagation(); setPendingOrder(order); setShowConfirmPopup(true); }}
          currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}
        />
      </div>

      {/* ✅ SYNCHRONIZED COMPONENT INVARIANT FLOW */}
      <DeliverConfirmModal
        show={showConfirmPopup} order={pendingOrder} actionLoading={actionLoading}
        onConfirm={executeDeliverySequence} onClose={() => { setShowConfirmPopup(false); setPendingOrder(null); }}
      />

    </div>
  );
}