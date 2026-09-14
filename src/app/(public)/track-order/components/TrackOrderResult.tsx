"use client";

export interface OrderTrackingResponse {
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "DISPATCHED" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED" | "REFUNDED";
  name: string;
  email: string;
}

interface TimelineStep {
  label: string;
  desc: string;
  done: boolean;
  active: boolean;
}

const STATUS_ORDER: OrderTrackingResponse["status"][] = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "DISPATCHED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const STATUS_META: Record<string, { label: string; desc: string }> = {
  PENDING: { label: "Order Placed", desc: "We have received your order" },
  CONFIRMED: { label: "Order Confirmed", desc: "Your order is confirmed & being reviewed" },
  PROCESSING: { label: "Processing", desc: "Your piece is being packed with care" },
  DISPATCHED: { label: "Dispatched", desc: "Your order has been dispatched" },
  OUT_FOR_DELIVERY: { label: "Out for Delivery", desc: "Your order is almost there!" },
  DELIVERED: { label: "Delivered", desc: "Thank you for shopping with MehRāj 🌸" },
  CANCELLED: { label: "Cancelled", desc: "This order has been cancelled" },
  REFUNDED: { label: "Refunded", desc: "Your refund has been processed successfully" },
};

const STATUS_CLASS: Record<string, { bg: string; text: string; dot: string }> = {
  PENDING: { bg: "bg-[#A6906F]/10", text: "text-[#A6906F]", dot: "bg-[#A6906F]" },
  CONFIRMED: { bg: "bg-[#2E4B3F]/10", text: "text-[#2E4B3F]", dot: "bg-[#2E4B3F]" },
  PROCESSING: { bg: "bg-[#2E4B3F]/10", text: "text-[#2E4B3F]", dot: "bg-[#2E4B3F]" },
  DISPATCHED: { bg: "bg-[#2E4B3F]/10", text: "text-[#2E4B3F]", dot: "bg-[#2E4B3F]" },
  OUT_FOR_DELIVERY: { bg: "bg-[#2E4B3F]/10", text: "text-[#2E4B3F]", dot: "bg-[#2E4B3F]" },
  DELIVERED: { bg: "bg-[#2E4B3F]/10", text: "text-[#2E4B3F]", dot: "bg-[#2E4B3F]" },
  CANCELLED: { bg: "bg-[#5C2A32]/10", text: "text-[#5C2A32]", dot: "bg-[#5C2A32]" },
  REFUNDED: { bg: "bg-[#5C2A32]/10", text: "text-[#5C2A32]", dot: "bg-[#5C2A32]" },
};

function buildTimeline(current: OrderTrackingResponse["status"]): TimelineStep[] {
  if (current === "CANCELLED") {
    return [
      { label: STATUS_META.PENDING.label, desc: STATUS_META.PENDING.desc, done: true, active: false },
      { label: STATUS_META.CANCELLED.label, desc: STATUS_META.CANCELLED.desc, done: false, active: true },
    ];
  }

  if (current === "REFUNDED") {
    return [
      { label: STATUS_META.PENDING.label, desc: STATUS_META.PENDING.desc, done: true, active: false },
      { label: STATUS_META.CANCELLED.label, desc: "Order was cancelled", done: true, active: false },
      { label: STATUS_META.REFUNDED.label, desc: STATUS_META.REFUNDED.desc, done: false, active: true },
    ];
  }

  const currentIdx = STATUS_ORDER.indexOf(current);
  return STATUS_ORDER.map((s, i) => ({
    label: STATUS_META[s].label,
    desc: STATUS_META[s].desc,
    done: i < currentIdx,
    active: i === currentIdx,
  }));
}

interface TrackOrderResultProps {
  orderData: OrderTrackingResponse;
  trackingKey: string;
}

export default function TrackOrderResult({ orderData, trackingKey }: TrackOrderResultProps) {
  const steps = buildTimeline(orderData.status);
  const meta = STATUS_META[orderData.status] ?? { label: orderData.status, desc: "" };
  const cls = STATUS_CLASS[orderData.status] ?? STATUS_CLASS.PENDING;

  return (
    <div className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-5">
      {/* Order header card */}
      <div className="flex flex-col gap-4 border border-[#1B1B18]/10 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <h2 className="font-serif text-xl font-light text-[#1B1B18]">{orderData.name}</h2>
          <p className="mt-1 font-sans text-xs text-[#1B1B18]/50">
            Tracking ID: <span className="font-semibold text-[#1B1B18]/70">{trackingKey}</span>
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 font-sans text-xs text-[#1B1B18]/50">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {orderData.email}
          </div>
        </div>

        <span className={`inline-flex w-fit items-center gap-2 px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] ${cls.bg} ${cls.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${cls.dot}`} />
          {meta.label}
        </span>
      </div>

      {/* Timeline card */}
      <div className="border border-[#1B1B18]/10 bg-white p-6 sm:p-8">
        <h3 className="mb-6 flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B1B18]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Shipment Progress
        </h3>

        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div key={step.label} className="relative flex gap-4 pb-8 last:pb-0">
              {i !== steps.length - 1 && (
                <span
                  className={`absolute left-[11px] top-6 h-full w-px ${
                    step.done ? "bg-[#2E4B3F]" : "bg-[#1B1B18]/10"
                  }`}
                />
              )}

              <div
                className={`z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  step.active
                    ? "border-[#2E4B3F] bg-[#2E4B3F] text-white"
                    : step.done
                    ? "border-[#2E4B3F] bg-[#2E4B3F] text-white"
                    : "border-[#1B1B18]/20 bg-white text-[#1B1B18]/20"
                }`}
              >
                {step.done && !step.active && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {step.active && <span className="h-2 w-2 rounded-full bg-white" />}
                {!step.done && !step.active && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
              </div>

              <div className="pt-0.5">
                <p className={`font-sans text-sm font-medium ${step.active || step.done ? "text-[#1B1B18]" : "text-[#1B1B18]/40"}`}>
                  {step.label}
                </p>
                <p className="mt-0.5 font-sans text-xs text-[#1B1B18]/50">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}