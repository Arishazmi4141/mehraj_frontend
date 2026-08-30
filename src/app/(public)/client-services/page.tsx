"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

// ── FAQs Data (Simple) ──
const FAQS = [
  {
    q: "How long does a bespoke order take?",
    a: "Most bespoke garments are completed in 3–4 weeks from your final fitting, depending on complexity.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship worldwide. Duties and import taxes are calculated at checkout or billed according to local regulations.",
  },
  {
    q: "Can I amend an order after placing it?",
    a: "Reach out via our contact form within 24 hours of ordering and our team will assist where possible before fabric cutting begins.",
  },
  {
    q: "How many fittings are required for a bespoke suit?",
    a: "Typically 2 to 3 fittings are scheduled: initial measurement & skeleton fitting, forward fitting, and final delivery fitting.",
  },
];

// ── Size Guide Data ──
const SIZE_GUIDE = [
  { uk: "36", eu: "46", size: "S", chestIn: "36–38 in", chestCm: "91–96 cm", waistIn: "30–32 in", waistCm: "76–81 cm" },
  { uk: "38", eu: "48", size: "M", chestIn: "39–41 in", chestCm: "99–104 cm", waistIn: "33–35 in", waistCm: "84–89 cm" },
  { uk: "40", eu: "50", size: "L", chestIn: "42–44 in", chestCm: "107–112 cm", waistIn: "36–38 in", waistCm: "91–96 cm" },
  { uk: "42", eu: "52", size: "XL", chestIn: "45–47 in", chestCm: "114–119 cm", waistIn: "39–41 in", waistCm: "99–104 cm" },
];

// ── Fabric Care Data ──
const FABRIC_TIPS = {
  wool: [
    "Dry clean only 1–2 times a season to maintain natural oils.",
    "Hang on padded contoured mahogany hangers between wears.",
    "Steam lightly to remove surface creases without flattening canvas.",
  ],
  cashmere: [
    "Store folded flat in breathable linen bags with cedar inserts.",
    "Gently brush with a natural-bristle garment brush after wearing.",
    "Avoid back-to-back daily wear to allow fibers to natural recover.",
  ],
  linen: [
    "Embrace the natural drape and creasing inherent to fine flax fibers.",
    "Iron on reverse side while fabric is slightly damp.",
    "Store in a dry, well-ventilated wardrobe space.",
  ],
};

// ── Accordion Component ──
function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b transition-colors" style={{ borderColor: "var(--color-border)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left font-sans text-[13px] font-semibold transition-colors"
        style={{ color: "var(--color-ink)" }}
      >
        <span>{q}</span>
        <ChevronDown
          className="h-4 w-4 shrink-0 transition-transform duration-300"
          style={{
            color: "var(--color-brass)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {open && (
        <p className="pb-5 font-sans text-[12.5px] leading-[1.85]" style={{ color: "var(--color-ink-muted)" }}>
          {a}
        </p>
      )}
    </div>
  );
}

export default function ClientServicesPage() {
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [activeFabric, setActiveFabric] = useState<keyof typeof FABRIC_TIPS>("wool");
  const [selectedSlot, setSelectedSlot] = useState("Morning (10 AM - 1 PM)");
  const [booked, setBooked] = useState(false);

  return (
    <main className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <section className="mx-auto max-w-4xl px-6 py-24 md:px-12 md:py-32">
        
        {/* ── ORIGINAL HERO SECTION ── */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-6" style={{ background: "var(--color-brass)" }} />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em]" style={{ color: "var(--color-ink-muted)" }}>
              Client Services
            </span>
            <span className="h-px w-6" style={{ background: "var(--color-brass)" }} />
          </div>
          <h1 className="font-serif text-3xl font-light leading-[1.12] md:text-[2.6rem]" style={{ color: "var(--color-ink)" }}>
            Everything You Need, <span className="italic" style={{ color: "var(--color-brass)" }}>In One Place</span>
          </h1>
        </div>

        {/* ── 1. SIMPLE FAQS SECTION (NO SEARCH) ── */}
        <div
          id="faqs"
          className="scroll-mt-24 border p-8 md:p-10"
          style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          <h2 className="font-serif text-xl font-light" style={{ color: "var(--color-ink)" }}>
            Frequently Asked Questions
          </h2>
          <div className="mt-4">
            {FAQS.map((f) => (
              <AccordionItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>

        {/* ── 2. DELIVERY SECTION ── */}
        <div
          id="delivery"
          className="scroll-mt-24 mt-8 border p-8 md:p-10"
          style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          <h2 className="font-serif text-xl font-light" style={{ color: "var(--color-ink)" }}>
            Delivery
          </h2>
          <p className="mt-4 font-sans text-[12.5px] leading-[1.85]" style={{ color: "var(--color-ink-muted)" }}>
            Ready-to-wear pieces ship within 3–5 business days. Bespoke orders ship upon completion, with tracking shared by email. For any delivery question, reach our team through the contact form and we&apos;ll follow up over email.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
            style={{ color: "var(--color-brass)" }}
          >
            Contact Us About Delivery →
          </Link>
        </div>

        {/* ── 3. RETURNS SECTION ── */}
        <div
          id="returns"
          className="scroll-mt-24 mt-8 border p-8 md:p-10"
          style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          <h2 className="font-serif text-xl font-light" style={{ color: "var(--color-ink)" }}>
            Returns & Exchanges
          </h2>
          <p className="mt-4 font-sans text-[12.5px] leading-[1.85]" style={{ color: "var(--color-ink-muted)" }}>
            Ready-to-wear items may be returned within 14 days in original, unworn condition. Bespoke and made-to-order pieces are final sale, but include lifetime complimentary adjustments at our Atelier.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all hover:opacity-90"
            style={{ background: "var(--color-ink)", color: "var(--color-surface)" }}
          >
            Request a Return
          </Link>
        </div>

        {/* ── 4. NEW FEATURE: INTERACTIVE FABRIC CARE TABS ── */}
        <div
          id="garment-care"
          className="scroll-mt-24 mt-8 border p-8 md:p-10"
          style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-light" style={{ color: "var(--color-ink)" }}>
              Garment Care
            </h2>
            <Sparkles className="h-4 w-4" style={{ color: "var(--color-brass)" }} />
          </div>

          <div className="mt-4 flex gap-2 border-b pb-3" style={{ borderColor: "var(--color-border)" }}>
            {[
              { id: "wool", label: "Merino Wool" },
              { id: "cashmere", label: "Cashmere" },
              { id: "linen", label: "Pure Linen" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFabric(tab.id as keyof typeof FABRIC_TIPS)}
                className="px-3 py-1 font-sans text-[11px] font-medium tracking-wide transition-colors"
                style={{
                  background: activeFabric === tab.id ? "var(--color-brass)" : "transparent",
                  color: activeFabric === tab.id ? "#FEFDFA" : "var(--color-ink-muted)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <ul className="mt-4 space-y-2.5 font-sans text-[12.5px] leading-[1.85]" style={{ color: "var(--color-ink-muted)" }}>
            {FABRIC_TIPS[activeFabric].map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span style={{ color: "var(--color-brass)" }}>—</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── 5. SIZE GUIDE WITH IN / CM SWITCHER ── */}
        <div
          id="size-guide"
          className="scroll-mt-24 mt-8 border p-8 md:p-10"
          style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="font-serif text-xl font-light" style={{ color: "var(--color-ink)" }}>
              Size Guide
            </h2>

            {/* Switcher */}
            <div className="inline-flex rounded-sm border p-0.5" style={{ borderColor: "var(--color-border)", background: "var(--color-bg)" }}>
              <button
                onClick={() => setUnit("in")}
                className="px-3 py-1 font-sans text-[10px] font-semibold uppercase transition-colors"
                style={{
                  background: unit === "in" ? "var(--color-brass)" : "transparent",
                  color: unit === "in" ? "#FEFDFA" : "var(--color-ink-faint)",
                }}
              >
                Inches (IN)
              </button>
              <button
                onClick={() => setUnit("cm")}
                className="px-3 py-1 font-sans text-[10px] font-semibold uppercase transition-colors"
                style={{
                  background: unit === "cm" ? "var(--color-brass)" : "transparent",
                  color: unit === "cm" ? "#FEFDFA" : "var(--color-ink-faint)",
                }}
              >
                Centimeters (CM)
              </button>
            </div>
          </div>

          <table className="mt-5 w-full border-collapse font-sans text-[12.5px]">
            <thead>
              <tr className="border-b text-left uppercase tracking-[0.15em] text-[10px]" style={{ borderColor: "var(--color-border)", color: "var(--color-ink-faint)" }}>
                <th className="py-3">UK / EU</th>
                <th className="py-3">Size</th>
                <th className="py-3">Chest</th>
                <th className="py-3">Waist</th>
              </tr>
            </thead>
            <tbody style={{ color: "var(--color-ink-muted)" }}>
              {SIZE_GUIDE.map((row) => (
                <tr key={row.size} className="border-b" style={{ borderColor: "var(--color-border)" }}>
                  <td className="py-3" style={{ color: "var(--color-ink-faint)" }}>
                    {row.uk} UK / {row.eu} EU
                  </td>
                  <td className="py-3 font-semibold" style={{ color: "var(--color-ink)" }}>
                    {row.size}
                  </td>
                  <td className="py-3">{unit === "in" ? row.chestIn : row.chestCm}</td>
                  <td className="py-3">{unit === "in" ? row.waistIn : row.waistCm}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-4 font-sans text-[11px] leading-[1.7]" style={{ color: "var(--color-ink-faint)" }}>
            For bespoke orders, exact measurements are taken during your Atelier consultation.
          </p>
        </div>

        {/* ── 6. NEW FEATURE: QUICK ATELIER FITTING SCHEDULER WIDGET ── */}
        <div
          className="mt-8 border p-8 md:p-10"
          style={{ background: "var(--color-surface-alt)", borderColor: "var(--color-border)" }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--color-brass)" }}>
                Atelier Services
              </span>
              <h3 className="mt-1 font-serif text-2xl font-light" style={{ color: "var(--color-ink)" }}>
                Book Private Fitting Consultation
              </h3>
              <p className="mt-2 font-sans text-[12.5px] leading-[1.8]" style={{ color: "var(--color-ink-muted)" }}>
                Reserve a private appointment with a Master Tailor at our London Atelier.
              </p>
            </div>

            {/* Quick Action Box */}
            <div className="w-full md:w-auto shrink-0">
              {!booked ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 border px-3 py-2" style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}>
                    <Clock className="h-4 w-4" style={{ color: "var(--color-brass)" }} />
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="bg-transparent font-sans text-[12px] outline-none"
                      style={{ color: "var(--color-ink)" }}
                    >
                      <option>Morning (10 AM - 1 PM)</option>
                      <option>Afternoon (2 PM - 5 PM)</option>
                      <option>Evening (5 PM - 7 PM)</option>
                    </select>
                  </div>
                  <button
                    onClick={() => setBooked(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-90"
                    style={{ background: "var(--color-ink)", color: "var(--color-surface)" }}
                  >
                    Request Slot <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded border p-4 font-sans text-[12px]" style={{ borderColor: "var(--color-brass)", background: "var(--color-surface)" }}>
                  <CheckCircle2 className="h-5 w-5" style={{ color: "var(--color-green-deep)" }} />
                  <div>
                    <strong style={{ color: "var(--color-ink)" }}>Slot Requested ({selectedSlot})</strong>
                    <p style={{ color: "var(--color-ink-muted)" }}>Our concierge will confirm via email within 2 hours.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}