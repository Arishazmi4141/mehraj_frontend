// src/app/(public)/checkout/components/CheckoutSteps.tsx
"use client";

interface CheckoutStepsProps {
  currentStep: 1 | 2;
}

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="mb-10 flex select-none items-center justify-center gap-0">
      <Step label="Shipping Details" number={1} active={currentStep === 1} done={currentStep === 2} />
      <div
        className="mx-3 h-[2px] w-14 transition-colors duration-300 sm:w-20"
        style={{ background: currentStep === 2 ? "#2E4B3F" : "#1B1B18" + "1A" }}
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
  const bg = done ? "#2E4B3F" : active ? "#1B1B18" : "#A6906F";
  return (
    <div className="flex items-center gap-2.5 transition-opacity duration-300" style={{ opacity: active || done ? 1 : 0.4 }}>
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-sans text-sm font-semibold text-[#F6F2E9] transition-colors duration-300"
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
      <span className="hidden font-sans text-sm font-medium text-[#1B1B18] sm:inline">{label}</span>
    </div>
  );
}