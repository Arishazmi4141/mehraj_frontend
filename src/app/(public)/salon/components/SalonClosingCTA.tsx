import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function SalonClosingCTA() {
  return (
    <section className="border-t border-[#1B1B18]/10 bg-[#F6F2E9]">
      <div className="mx-auto max-w-2xl px-6 py-20 text-center md:px-12 md:py-28">
        <h2 className="font-serif text-2xl font-light leading-[1.2] text-[#1B1B18] md:text-4xl">
          Ready To Be <span className="italic text-[#5C2A32]">Styled?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md font-sans text-sm leading-[1.9] text-[#1B1B18]/65">
          Slots are limited to keep every session unhurried. Reserve yours today.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 bg-[#1B1B18] px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F6F2E9] transition-colors duration-300 hover:bg-[#5C2A32]"
          >
            Book a Consultant
          </Link>
          <Link
            href="https://wa.me/910000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#1B1B18]/25 px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B1B18] transition-colors duration-300 hover:border-[#5C2A32] hover:text-[#5C2A32]"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            Message Us Directly
          </Link>
        </div>
      </div>
    </section>
  );
}