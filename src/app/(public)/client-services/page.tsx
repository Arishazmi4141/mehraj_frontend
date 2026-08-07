"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { q: "How long does a bespoke order take?", a: "Most bespoke garments are completed in 3–4 weeks from your final fitting, depending on complexity." },
  { q: "Do you ship internationally?", a: "Yes, we ship worldwide. Duties and import taxes are the customer's responsibility." },
  { q: "Can I amend an order after placing it?", a: "Reach out via our contact form within 24 hours of ordering and our team will assist where possible." },
];

const SIZE_GUIDE = [
  { size: "S", chest: "36–38 in", waist: "30–32 in" },
  { size: "M", chest: "39–41 in", waist: "33–35 in" },
  { size: "L", chest: "42–44 in", waist: "36–38 in" },
  { size: "XL", chest: "45–47 in", waist: "39–41 in" },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#1B1B18]/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left font-sans text-[13px] font-semibold text-[#1B1B18]"
      >
        {q}
        <ChevronDown
          className={`h-4 w-4 text-[#A6906F] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-5 font-sans text-[12.5px] leading-[1.8] text-[#1B1B18]/60">{a}</p>
      )}
    </div>
  );
}

export default function ClientServicesPage() {
  return (
    <main className="min-h-screen bg-[#EDE6D8]">
      <section className="mx-auto max-w-4xl px-6 py-24 md:px-12 md:py-32">
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#A6906F]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#1B1B18]/70">
              Client Services
            </span>
            <span className="h-px w-6 bg-[#A6906F]" />
          </div>
          <h1 className="font-serif text-3xl font-light leading-[1.12] text-[#1B1B18] md:text-[2.6rem]">
            Everything You Need, <span className="italic text-[#5C2A32]">In One Place</span>
          </h1>
        </div>

        {/* FAQs */}
        <div id="faqs" className="scroll-mt-24 border border-[#1B1B18]/10 bg-[#F6F2E9] p-8 md:p-10">
          <h2 className="font-serif text-xl font-light text-[#1B1B18]">FAQs</h2>
          <div className="mt-4">
            {FAQS.map((f) => (
              <AccordionItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>

        {/* Delivery */}
        <div id="delivery" className="scroll-mt-24 mt-8 border border-[#1B1B18]/10 bg-[#F6F2E9] p-8 md:p-10">
          <h2 className="font-serif text-xl font-light text-[#1B1B18]">Delivery</h2>
          <p className="mt-4 font-sans text-[12.5px] leading-[1.85] text-[#1B1B18]/60">
            Ready-to-wear pieces ship within 3–5 business days. Bespoke orders ship
            upon completion, with tracking shared by email. For any delivery
            question, reach our team through the contact form and we'll follow up
            over email.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5C2A32]"
          >
            Contact Us About Delivery →
          </Link>
        </div>

        {/* Returns */}
        <div id="returns" className="scroll-mt-24 mt-8 border border-[#1B1B18]/10 bg-[#F6F2E9] p-8 md:p-10">
          <h2 className="font-serif text-xl font-light text-[#1B1B18]">Returns</h2>
          <p className="mt-4 font-sans text-[12.5px] leading-[1.85] text-[#1B1B18]/60">
            Ready-to-wear items may be returned within 7 days in original,
            unworn condition. Bespoke and made-to-order pieces are final sale.
            Submit a return request through our contact form and our team will
            guide you through the next steps.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 bg-[#1B1B18] px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F6F2E9] transition-colors hover:bg-[#5C2A32]"
          >
            Request a Return
          </Link>
        </div>

        {/* Garment Care */}
        <div id="garment-care" className="scroll-mt-24 mt-8 border border-[#1B1B18]/10 bg-[#F6F2E9] p-8 md:p-10">
          <h2 className="font-serif text-xl font-light text-[#1B1B18]">Garment Care</h2>
          <ul className="mt-4 space-y-2 font-sans text-[12.5px] leading-[1.85] text-[#1B1B18]/60">
            <li>— Dry clean only, unless otherwise noted on the garment label.</li>
            <li>— Store on a padded hanger to preserve shoulder structure.</li>
            <li>— Steam rather than iron directly on embroidered panels.</li>
            <li>— Rotate wear to let full-canvas garments rest between uses.</li>
          </ul>
        </div>

        {/* Size Guide */}
        <div id="size-guide" className="scroll-mt-24 mt-8 border border-[#1B1B18]/10 bg-[#F6F2E9] p-8 md:p-10">
          <h2 className="font-serif text-xl font-light text-[#1B1B18]">Size Guide</h2>
          <table className="mt-5 w-full border-collapse font-sans text-[12.5px] text-[#1B1B18]/70">
            <thead>
              <tr className="border-b border-[#1B1B18]/15 text-left uppercase tracking-[0.15em] text-[10px] text-[#1B1B18]/50">
                <th className="py-3">Size</th>
                <th className="py-3">Chest</th>
                <th className="py-3">Waist</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_GUIDE.map((row) => (
                <tr key={row.size} className="border-b border-[#1B1B18]/10">
                  <td className="py-3 font-semibold text-[#1B1B18]">{row.size}</td>
                  <td className="py-3">{row.chest}</td>
                  <td className="py-3">{row.waist}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 font-sans text-[11px] leading-[1.7] text-[#1B1B18]/45">
            For bespoke orders, exact measurements are taken during your Atelier consultation.
          </p>
        </div>
      </section>
    </main>
  );
}