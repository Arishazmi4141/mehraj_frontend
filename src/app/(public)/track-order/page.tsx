"use client";

import { useState } from "react";
import { requestAPI } from "@/src/lib/api-client";
import TrackOrderResult, { OrderTrackingResponse } from "./components/TrackOrderResult";

export default function TrackOrderPage() {
  const [trackingKey, setTrackingKey] = useState("");
  const [lastTracked, setLastTracked] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderData, setOrderData] = useState<OrderTrackingResponse | null>(null);

  async function handleTrack() {
    const key = trackingKey.trim();
    if (!key) {
      setError("Please enter a tracking ID.");
      return;
    }

    setLoading(true);
    setError("");
    setOrderData(null);

    try {
      const res = await requestAPI<OrderTrackingResponse>(`/order/track/${key}`);
      setOrderData(res);
      setLastTracked(key);
    } catch (err: any) {
      setError(err?.message || "No order found with this tracking ID. Please check and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleTrack();
  }

  return (
    <div className="min-h-screen bg-[#F6F2E9] px-4 py-10 pt-32 sm:px-6">
      <div className="mx-auto max-w-2xl">
        {/* Hero */}
        <div className="text-center">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5C2A32]">
            Track Your Order
          </span>
          <h1 className="mt-3 font-serif text-2xl font-light leading-[1.2] text-[#1B1B18] sm:text-3xl">
            Where is your <span className="italic text-[#5C2A32]">order</span> right now?
          </h1>
          <p className="mt-2 font-sans text-sm text-[#1B1B18]/55">
            Enter your tracking ID to get live shipment status
          </p>
        </div>

        {/* Search card */}
        <div className="mt-8 border border-[#1B1B18]/10 bg-white p-6 sm:p-8">
          <label htmlFor="trackInput" className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#1B1B18]/60">
            Tracking ID
          </label>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="trackInput"
              type="text"
              value={trackingKey}
              onChange={(e) => setTrackingKey(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. TRK-3A9402DFD0F63"
              autoComplete="off"
              className="h-12 flex-1 border border-[#1B1B18]/15 bg-[#F6F2E9] px-4 font-sans text-sm text-[#1B1B18] outline-none focus:border-[#2E4B3F]"
            />
            <button
              type="button"
              onClick={handleTrack}
              disabled={loading}
              className="flex h-12 items-center justify-center gap-2 bg-[#2E4B3F] px-6 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#F6F2E9] transition-colors disabled:opacity-60 hover:bg-[#1B1B18]"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Tracking…
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Track
                </>
              )}
            </button>
          </div>

          {error && (
            <p className="mt-3 flex items-center gap-1.5 font-sans text-xs text-[#5C2A32]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </p>
          )}
        </div>

        {/* Result */}
        {orderData && <TrackOrderResult orderData={orderData} trackingKey={lastTracked} />}

        {/* Help strip */}
        <div className="mt-10 border-t border-[#1B1B18]/10 pt-6 text-center">
          <p className="font-sans text-sm text-[#1B1B18]/55">
            <strong className="text-[#1B1B18]">Need help?</strong> Our team is available Mon–Sat, 10am–7pm IST
          </p>
          <div className="mt-3 flex justify-center">
            <span className="inline-flex items-center gap-1.5 border border-[#1B1B18]/10 bg-white px-3 py-1.5 font-sans text-xs text-[#1B1B18]/60">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              contact@mehraj.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}