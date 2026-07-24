// src/app/(public)/checkout/components/CheckoutSteps.tsx
"use client";

interface CheckoutStepsProps {
  currentStep: 1 | 2;
}

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10 select-none">
      <Step
        label="Shipping Details"
        number={1}
        active={currentStep === 1}
        done={currentStep === 2}
      />
      <div
        className="w-14 sm:w-20 h-[2px] mx-3 transition-colors duration-300"
        style={{ background: currentStep === 2 ? "#00ADB5" : "#d8d8d8" }}
      />
      <Step label="Payment" number={2} active={currentStep === 2} done={false} />
    </div>
  );
}

function Step({
  label,
  number,
  active,
  done,
}: {
  label: string;
  number: number;
  active: boolean;
  done: boolean;
}) {
  const bg = done ? "#00ADB5" : active ? "#222831" : "#393E46";
  return (
    <div
      className="flex items-center gap-2.5 transition-opacity duration-300"
      style={{ opacity: active || done ? 1 : 0.4 }}
    >
      <span
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 transition-colors duration-300"
        style={{ background: bg }}
      >
        {done ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          number
        )}
      </span>
      <span className="text-sm font-medium hidden sm:inline" style={{ color: "#222831" }}>
        {label}
      </span>
    </div>
  );
}