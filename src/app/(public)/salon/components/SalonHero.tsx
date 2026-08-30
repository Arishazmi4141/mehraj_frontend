import Link from "next/link";
import { MessageCircle, Sparkles, Palette, CalendarHeart } from "lucide-react";

const SALON_SERVICES = [
  { icon: Sparkles, title: "Wardrobe Planning", body: "A curated capsule wardrobe built around how you actually live and dress." },
  { icon: Palette, title: "Colour Consultation", body: "Personal palette guidance to refine every future purchase you make." },
  { icon: CalendarHeart, title: "Event Styling", body: "Complete looks for weddings, business, and every occasion in between." },
];

export default function SalonHero() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center md:px-12 md:py-32">
      <div className="mb-5 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-[#5C2A32]" />
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#5C2A32]">
          The Salon
        </span>
        <span className="h-px w-8 bg-[#5C2A32]" />
      </div>

      <h1 className="mx-auto max-w-2xl font-serif text-3xl font-light leading-[1.15] text-[#1B1B18] md:text-5xl">
        Personal Styling, <span className="italic text-[#5C2A32]">By Appointment</span>
      </h1>

      <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-[1.9] text-[#1B1B18]/65">
        Book a fashion consultant for wardrobe planning, event styling, and colour
        consultation — tailored to how you want to be seen, for weddings,
        business, or everyday elegance.
      </p>

      <div className="mt-14 grid grid-cols-1 gap-8 text-left sm:grid-cols-3">
        {SALON_SERVICES.map(({ icon: Icon, title, body }) => (
          <div key={title} className="border border-[#1B1B18]/10 bg-[#F6F2E9] p-7">
            <div className="mb-5 flex h-11 w-11 items-center justify-center border border-[#1B1B18]/10 bg-[#F1EADC] text-[#5C2A32]">
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
    </section>
  );
}