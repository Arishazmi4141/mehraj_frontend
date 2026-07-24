"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { Loader2, CheckCircle, XCircle, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { requestAPI } from "@/src/lib/api-client";
import { OrderSummaryDto } from "@/src/services/admin.service";
import { useRequireAdminAuth, useAdminAuthErrorHandler } from "@/src/hooks/useAdminAuth";

export default function AdminOrdersTabsPage() {
  useRequireAdminAuth();
  const handleAuthError = useAdminAuthErrorHandler();

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [orders, setOrders] = useState<OrderSummaryDto[]>([]);
  const [currentTab, setCurrentTab] = useState<"DELIVERED" | "CANCELLED">("DELIVERED");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchTabOrders = async (status: "DELIVERED" | "CANCELLED") => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("admin_token") || "";
      const res = await requestAPI<any>(`/admin/orders?status=${status}&page=0&size=50`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res?.content || []);
    } catch (err) {
      if (handleAuthError(err)) return;
      setError("Couldn't load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTabOrders(currentTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  useEffect(() => {
    if (loading || error) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".animate-tab-node", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power4.out", stagger: 0.04 });
    }, containerRef);
    return () => ctx.revert();
  }, [loading, error]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F7F7F4] text-[#171712] p-6 md:p-12">
      <div className="animate-tab-node border-b pb-6 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" style={{ borderColor: "#E7E3D8" }}>
        <div>
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#A9773C]">Orders</span>
          <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#171712]">
            Order History
          </h1>
        </div>

        <div className="flex bg-white border p-1 rounded-sm" style={{ borderColor: "#E7E3D8" }}>
          <button
            onClick={() => setCurrentTab("DELIVERED")}
            className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-widest transition-all rounded-sm ${
              currentTab === "DELIVERED" ? "bg-[#1F4A38] text-white" : "text-[#8C8A80] hover:text-[#171712]"
            }`}
          >
            Delivered
          </button>
          <button
            onClick={() => setCurrentTab("CANCELLED")}
            className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-widest transition-all rounded-sm ${
              currentTab === "CANCELLED" ? "bg-red-50 text-red-700 border border-red-200" : "text-[#8C8A80] hover:text-[#171712]"
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      <div className="animate-tab-node bg-white border p-8 rounded-sm" style={{ borderColor: "#E7E3D8" }}>
        {loading ? (
          <div className="flex justify-center py-12 text-[#1F4A38]"><Loader2 className="h-6 w-6 animate-spin" /></div>
        ) : error ? (
          <div className="flex items-center justify-center gap-2 text-[13px] text-red-600 py-8"><ShieldAlert className="h-4 w-4" /> {error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-[#B8B4A8] font-body text-[12px] uppercase tracking-widest">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-[13px] font-body">
              <thead>
                <tr className="border-b text-[#8C8A80] uppercase tracking-wider text-[10px]" style={{ borderColor: "#E7E3D8" }}>
                  <th className="pb-4 font-semibold">Order</th>
                  <th className="pb-4 font-semibold">Customer</th>
                  <th className="pb-4 font-semibold">Amount</th>
                  <th className="pb-4 text-right font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "#EFECE3" }}>
                {orders.map((o) => (
                  <tr
                    key={o.orderId}
                    onClick={() => router.push(`/admin/orders/${o.orderId}`)}
                    className="hover:bg-[#F7F7F4] transition-colors cursor-pointer"
                  >
                    <td className="py-4 font-mono text-[#A9773C]">#PAS-{o.orderId}</td>
                    <td className="py-4 text-[#171712] font-medium">{o.name}</td>
                    <td className="py-4 font-mono text-[#4A4740]">£{o.amount.toLocaleString("en-GB")}</td>
                    <td className="py-4 text-right">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase border rounded-sm ${
                        currentTab === "DELIVERED" ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-red-300 bg-red-50 text-red-700"
                      }`}>
                        {currentTab === "DELIVERED" ? <CheckCircle className="h-2.5 w-2.5" /> : <XCircle className="h-2.5 w-2.5" />}
                        {o.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}