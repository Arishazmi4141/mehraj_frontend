import { CalendarDays, Users, Palette, ShoppingBag } from "lucide-react";

const PROCESS_STEPS = [
  {
    icon: CalendarDays,
    step: "01",
    title: "Book Your Slot",
    body: "Choose a date and share a little about the occasion, so we can prepare ahead of your visit.",
  },
  {
    icon: Users,
    step: "02",
    title: "Meet Your Consultant",
    body: "A private one-on-one session at the atelier — no rush, no crowd, just an honest conversation about you.",
  },
  {
    icon: Palette,
    step: "03",
    title: "Curate The Look",
    body: "Silhouettes, colours, and fabrics are shortlisted together, refined until every piece feels right.",
  },
  {
    icon: ShoppingBag,
    step: "04",
    title: "Walk Away Ready",
    body: "Leave with a finalised edit — ready to order, alter, or wear as styled that same day.",
  },
];

export default function SalonProcess() {
  return (
    <section className="border-t border-[#1B1B18]/10 bg-[#F6F2E9]">
      <div className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-28">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#5C2A32]" />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#5C2A32]">
            The Process
          </span>
          <span className="h-px w-8 bg-[#5C2A32]" />
        </div>
        <h2 className="text-center font-serif text-2xl font-light text-[#1B1B18] md:text-4xl">
          How A Session <span className="italic text-[#5C2A32]">Unfolds</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map(({ icon: Icon, step, title, body }, i) => (
            <div key={step} className="relative pl-1">
              {i !== PROCESS_STEPS.length - 1 && (
                <span className="absolute left-6 top-6 hidden h-px w-full -translate-y-1/2 bg-[#1B1B18]/10 lg:block" />
              )}
              <div className="relative flex h-12 w-12 items-center justify-center border border-[#1B1B18]/10 bg-[#F1EADC] text-[#5C2A32]">
                <Icon className="h-5 w-5" strokeWidth={1.4} />
              </div>
              <span className="mt-4 block font-serif text-xs italic text-[#5C2A32]">
                {step}
              </span>
              <h3 className="mt-1 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1B1B18]">
                {title}
              </h3>
              <p className="mt-3 font-sans text-[12.5px] leading-[1.8] text-[#1B1B18]/60">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}