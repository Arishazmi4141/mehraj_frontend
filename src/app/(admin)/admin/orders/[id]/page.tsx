"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import gsap from "gsap";
import { ArrowLeft, ShieldAlert, Loader2 } from "lucide-react";
import { IMAGE_BASE_URL, requestAPI } from "@/src/lib/api-client";
import { useRequireAdminAuth, useAdminAuthErrorHandler } from "@/src/hooks/useAdminAuth";

interface OrderItemDto {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  productName: string;
  imageUrl?: string;
  size?: string;
}

interface OrderDetailResponse {
  id: number;
  name: string;
  email: string;
  address: string;
  status: string;
  phone: number | null;
  createdAt: string;
  items: OrderItemDto[];
  payment?: { amount: number; paymentstatus: string } | null;
}

export default function AdminOrderDetailPage() {
  useRequireAdminAuth();
  const handleAuthError = useAdminAuthErrorHandler();

  const params = useParams();
  const router = useRouter();
  const orderId = params?.id ? Number(params.id) : null;
  const containerRef = useRef<HTMLDivElement>(null);

  const [order, setOrder] = useState<OrderDetailResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [statusUpdating, setStatusUpdating] = useState<boolean>(false);

  const loadOrderDetails = async () => {
    if (!orderId) return;
    try {
      const token = localStorage.getItem("admin_token") || "";
      const res = await requestAPI<OrderDetailResponse>(`/admin/order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrder(res);
    } catch (err) {
      if (handleAuthError(err)) return;
      setError("Couldn't load this order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  useEffect(() => {
    if (loading || error) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".animate-detail-node", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power4.out", stagger: 0.05 });
    }, containerRef);
    return () => ctx.revert();
  }, [loading, error]);

  const updateStatus = async (targetStatus: string) => {
    if (!order || !orderId) return;
    if (!confirm(`Update order #${orderId} status to "${targetStatus}"?`)) return;

    try {
      setStatusUpdating(true);
      const token = localStorage.getItem("admin_token") || "";
      await requestAPI(`/admin/order/${orderId}/status?status=${targetStatus}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }, true);

      await loadOrderDetails();
    } catch (err) {
      if (handleAuthError(err)) return;
      alert("Failed to update order status. Please try again.");
    } finally {
      setStatusUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F4] flex items-center justify-center text-[#1F4A38]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#F7F7F4] flex flex-col items-center justify-center text-[#6B685F]">
        <ShieldAlert className="h-10 w-10 text-red-500 mb-4" />
        <p className="font-body text-[12px] uppercase tracking-widest">{error || "Order not found."}</p>
      </div>
    );
  }

  const subtotal = order.items?.reduce((sum, i) => sum + i.price * i.quantity, 0) || 0;

  const statusPillStyles: Record<string, string> = {
    PENDING: "border-amber-300 bg-amber-50 text-amber-700",
    CANCELLED: "border-red-300 bg-red-50 text-red-700",
  };
  const pillStyle = statusPillStyles[order.status] || "border-emerald-300 bg-emerald-50 text-emerald-700";

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F7F7F4] text-[#171712] p-6 md:p-12">
      <div className="animate-detail-node border-b pb-6 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" style={{ borderColor: "#E7E3D8" }}>
        <button onClick={() => router.back()} className="group flex items-center gap-3 font-body text-[11px] font-semibold uppercase tracking-widest text-[#6B685F] hover:text-[#1F4A38] transition-colors">
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to Orders</span>
        </button>
        <div className="flex gap-3">
          {order.status !== "CANCELLED" && order.status !== "DELIVERED" && (
            <button
              disabled={statusUpdating}
              onClick={() => updateStatus("CONFIRMED")}
              className="bg-white border border-emerald-300 hover:border-emerald-500 text-emerald-700 px-4 py-2 text-[10px] font-semibold uppercase tracking-widest transition-colors rounded-sm disabled:opacity-50"
            >
              Confirm Order
            </button>
          )}
          {order.status !== "CANCELLED" && (
            <button
              disabled={statusUpdating}
              onClick={() => updateStatus("CANCELLED")}
              className="bg-white border border-red-300 hover:border-red-500 text-red-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-widest transition-colors rounded-sm disabled:opacity-50"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="animate-detail-node bg-white border p-8 rounded-sm" style={{ borderColor: "#E7E3D8" }}>
            <span className="font-body text-[10px] uppercase tracking-widest text-[#A9773C]">Order Details</span>
            <h2 className="mt-2 font-display text-xl font-bold tracking-tight mb-6 text-[#171712]">#PAS-{order.id}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[13px] font-body border-b pb-6 mb-6" style={{ borderColor: "#EFECE3" }}>
              <div>
                <p className="text-[#8C8A80] uppercase tracking-wider mb-1 text-[11px]">Customer</p>
                <p className="text-[#171712] font-semibold">{order.name}</p>
                <p className="text-[#6B685F] mt-0.5">{order.email}</p>
                <p className="text-[#6B685F]">{order.phone || "No phone provided"}</p>
              </div>
              <div>
                <p className="text-[#8C8A80] uppercase tracking-wider mb-1 text-[11px]">Shipping Address</p>
                <p className="text-[#4A4740] leading-relaxed">{order.address}</p>
              </div>
            </div>

            <h3 className="font-display text-[11px] font-bold uppercase tracking-widest text-[#8C8A80] mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items?.map((item) => {
                const imgPath = item.imageUrl ? `${IMAGE_BASE_URL}${item.imageUrl}` : "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=150";
                return (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-[#F7F7F4] border rounded-sm" style={{ borderColor: "#EFECE3" }}>
                    <div className="flex gap-4 items-center">
                      <img src={imgPath} alt={item.productName} className="h-10 w-12 object-cover border rounded-sm" style={{ borderColor: "#E7E3D8" }} />
                      <div>
                        <p className="font-display text-[13px] font-bold text-[#171712]">{item.productName}</p>
                        <p className="font-body text-[11px] text-[#8C8A80] uppercase tracking-wider mt-0.5">
                          Size: <span className="font-mono text-[#6B685F]">{item.size || "Standard"}</span>
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[13px] text-[#4A4740]">{item.quantity} x £{item.price.toLocaleString("en-GB")}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-4 animate-detail-node bg-white border p-8 space-y-6 rounded-sm" style={{ borderColor: "#E7E3D8" }}>
          <h2 className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C8A80]">Order Summary</h2>

          <div className="space-y-4 text-[13px] font-body border-b pb-6" style={{ borderColor: "#EFECE3" }}>
            <div className="flex justify-between">
              <span className="text-[#8C8A80]">Subtotal</span>
              <span className="font-mono text-[#4A4740]">£{subtotal.toLocaleString("en-GB")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C8A80]">Shipping</span>
              <span className="text-emerald-700 font-semibold tracking-wide uppercase text-[11px]">Included</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t" style={{ borderColor: "#EFECE3" }}>
              <span className="font-display text-[11px] font-bold uppercase tracking-wider text-[#171712]">Total</span>
              <span className="font-display text-xl font-bold text-[#A9773C]">£{(order.payment?.amount || subtotal).toLocaleString("en-GB")}</span>
            </div>
          </div>

          <div>
            <p className="font-body text-[10px] uppercase tracking-widest text-[#8C8A80] mb-2">Status</p>
            <span className={`inline-block px-3 py-1 text-[11px] font-mono font-bold tracking-widest uppercase border rounded-sm ${pillStyle}`}>
              {order.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}