"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { Loader2 } from "lucide-react";
import { requestAPI } from "@/src/lib/api-client";
import { OrderSummaryDto } from "@/src/services/admin.service";
import { useRequireAdminAuth, useAdminAuthErrorHandler } from "@/src/hooks/useAdminAuth";

import OrdersFilters from "./components/OrdersFilters";
import OrdersTable from "./components/OrdersTable";
import DispatchModal from "./components/DispatchModal";

export default function AdminOrdersMainPage() {
  useRequireAdminAuth();
  const handleAuthError = useAdminAuthErrorHandler();

  const containerRef = useRef<HTMLDivElement>(null);

  const [orders, setOrders] = useState<OrderSummaryDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dispatchLoading, setDispatchLoading] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);

  const [copiedKey, setCopiedKey] = useState("");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<OrderSummaryDto | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token") || "";
      const h = { Authorization: `Bearer ${token}` };

      if (searchQuery.trim()) {
        const res = await requestAPI<any>(`/admin/orders?trckngKey=${encodeURIComponent(searchQuery.trim())}&status=PENDING&page=${currentPage}&size=${pageSize}`, { headers: h });
        setOrders(res.content || []);
        setTotalPages(res.totalPages || 1);
      } else {
        let queryPath = `/admin/orders?status=PENDING&page=${currentPage}&size=${pageSize}`;
        if (dateFrom) {
          const d = new Date(dateFrom);
          const formattedDate = d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0");
          queryPath += `&date=${formattedDate}`;
        }
        const res = await requestAPI<any>(queryPath, { headers: h });
        setOrders(res.content || []);
        setTotalPages(res.totalPages || 1);
      }
    } catch (err) {
      if (handleAuthError(err)) return;
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, dateFrom]);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      if (searchQuery === "") fetchOrders();
      return;
    }
    const handlerDebounce = setTimeout(() => {
      setCurrentPage(0);
      fetchOrders();
    }, 400);
    return () => clearTimeout(handlerDebounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".animate-orders-node", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power4.out", stagger: 0.04 });
    }, containerRef);
    return () => ctx.revert();
  }, [loading]);

  const handleDispatch = async () => {
    if (!pendingOrder) return;
    try {
      setDispatchLoading(true);
      const token = localStorage.getItem("admin_token") || "";

      await requestAPI(`/admin/dispatch/${pendingOrder.orderId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }, true);

      setOrders((prev) => prev.filter((o) => o.orderId !== pendingOrder.orderId));
      setShowConfirmPopup(false);
      setPendingOrder(null);
    } catch (err) {
      if (handleAuthError(err)) return;
      alert("Failed to dispatch order. Please try again.");
    } finally {
      setDispatchLoading(false);
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
      <div className="animate-orders-node border-b pb-6 mb-10" style={{ borderColor: "#E7E3D8" }}>
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#A9773C]">Orders</span>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#171712]">Pending Orders</h1>
      </div>

      <OrdersFilters
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        dateFrom={dateFrom} setDateFrom={setDateFrom}
        onClear={() => { setSearchQuery(""); setDateFrom(""); setCurrentPage(0); }}
        onRefresh={fetchOrders}
      />

      <div className="animate-orders-node">
        <OrdersTable
          orders={orders} copiedKey={copiedKey}
          onCopyKey={(e, key) => { e.stopPropagation(); navigator.clipboard.writeText(key).then(() => { setCopiedKey(key); setTimeout(() => setCopiedKey(""), 2000); }); }}
          onDispatchClick={(e, order) => { e.stopPropagation(); setPendingOrder(order); setShowConfirmPopup(true); }}
          currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}
        />
      </div>

      <DispatchModal
        show={showConfirmPopup} order={pendingOrder} loading={dispatchLoading}
        onConfirm={handleDispatch} onClose={() => { setShowConfirmPopup(false); setPendingOrder(null); }}
      />
    </div>
  );
}