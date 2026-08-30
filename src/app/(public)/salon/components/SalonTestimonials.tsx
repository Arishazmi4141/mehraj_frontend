const TESTIMONIALS = [
  {
    quote: "The consultant understood exactly what I needed before I even finished explaining it. Every suggestion felt personal, not generic.",
    name: "Arjun Mehta",
    context: "Wedding Styling, Rajkot",
  },
  {
    quote: "I walked in unsure of what would suit me and walked out with a wardrobe plan I still use months later.",
    name: "Rohan Vasavada",
    context: "Wardrobe Planning",
  },
  {
    quote: "Discreet, unhurried, and precise — exactly what a styling session should feel like.",
    name: "Kunal Shah",
    context: "Colour Consultation",
  },
];

export default function SalonTestimonials() {
  return (
    <section className="border-t border-[#1B1B18]/10 bg-[#1B1B18]">
      <div className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-28">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#5C2A32]" />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C6A15B]">
            Client Voices
          </span>
          <span className="h-px w-8 bg-[#5C2A32]" />
        </div>
        <h2 className="text-center font-serif text-2xl font-light text-[#F6F2E9] md:text-4xl">
          Trusted By Those Who <span className="italic text-[#C6A15B]">Dress With Purpose</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col justify-between border border-[#F6F2E9]/10 bg-[#232019] p-7"
            >
              <p className="font-serif text-[15px] italic leading-[1.7] text-[#F6F2E9]/85">
                “{t.quote}”
              </p>
              <div className="mt-6 border-t border-[#F6F2E9]/10 pt-4">
                <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.15em] text-[#F6F2E9]">
                  {t.name}
                </p>
                <p className="mt-1 font-sans text-[11px] text-[#F6F2E9]/50">{t.context}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}