"use client";

import Link from "next/link";
import { MessageCircle, Ruler, Layers, Scissors } from "lucide-react";

const STEPS = [
  { icon: Ruler, title: "Measurements", body: "Your master tailor takes precise measurements in person or via a guided remote fitting." },
  { icon: Layers, title: "Fabric & Fit", body: "Choose from our curated fabric library and discuss construction — canvas, lining, and finish." },
  { icon: Scissors, title: "Construction", body: "Each piece is hand-cut and assembled in the Atelier, with a fitting before final delivery." },
];

export default function AtelierPage() {
  return (
    <main className="min-h-screen bg-[#F6F2E9]">
      <section className="mx-auto max-w-4xl px-6 py-24 text-center md:px-12 md:py-32">
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#2E4B3F]" />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#2E4B3F]">
            The Atelier
          </span>
          <span className="h-px w-8 bg-[#2E4B3F]" />
        </div>

        <h1 className="mx-auto max-w-2xl font-serif text-3xl font-light leading-[1.15] text-[#1B1B18] md:text-5xl">
          Bespoke Tailoring, <span className="italic text-[#5C2A32]">Built Around You</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-[1.9] text-[#1B1B18]/65">
          Every bespoke order at MehRāj includes a direct consultation with our
          master tailor — no charge, no obligation. Customise the fabric, the fit,
          and every detail of construction before a single stitch is cut.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-8 text-left sm:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="border border-[#1B1B18]/10 bg-white p-7">
              <div className="mb-5 flex h-11 w-11 items-center justify-center border border-[#1B1B18]/10 bg-[#F6F2E9] text-[#2E4B3F]">
                <Icon className="h-5 w-5" strokeWidth={1.4} />
              </div>
              <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18]">
                {title}
              </h3>
              <p className="mt-3 font-sans text-[12.5px] leading-[1.8] text-[#1B1B18]/60">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#1B1B18] px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F6F2E9] transition-colors duration-300 hover:bg-[#2E4B3F]"
          >
            Request a Consultation
          </Link>
          <a
            href="https://wa.me/910000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#1B1B18]/25 px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18] transition-colors duration-300 hover:border-[#2E4B3F] hover:text-[#2E4B3F]"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            Message Us Directly
          </a>
        </div>
      </section>
    </main>
  );
}