const CONSULTANTS = [
  {
    name: "Meera Kapadia",
    role: "Lead Stylist — Bridal & Event",
    body: "12 years styling wedding parties and destination events, with an eye for silhouette and drape.",
  },
  {
    name: "Aditya Rao",
    role: "Wardrobe Consultant",
    body: "Specialises in building versatile capsule wardrobes for professionals who travel often.",
  },
  {
    name: "Simran Oberoi",
    role: "Colour & Image Consultant",
    body: "Trained in seasonal colour analysis, helping clients shop with far more confidence.",
  },
];

export default function SalonConsultants() {
  return (
    <section className="border-t border-[#1B1B18]/10 bg-[#F6F2E9]">
      <div className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-28">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#5C2A32]" />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#5C2A32]">
            The Team
          </span>
          <span className="h-px w-8 bg-[#5C2A32]" />
        </div>
        <h2 className="text-center font-serif text-2xl font-light text-[#1B1B18] md:text-4xl">
          Meet Your <span className="italic text-[#5C2A32]">Consultants</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {CONSULTANTS.map((c) => (
            <div key={c.name} className="border border-[#1B1B18]/10 bg-[#F1EADC] p-7 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#1B1B18]/10 bg-[#F6F2E9] font-serif text-lg italic text-[#5C2A32]">
                {c.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="mt-5 font-sans text-[13px] font-semibold uppercase tracking-[0.15em] text-[#1B1B18]">
                {c.name}
              </h3>
              <p className="mt-1 font-sans text-[11px] uppercase tracking-widest text-[#5C2A32]">
                {c.role}
              </p>
              <p className="mt-4 font-sans text-[12.5px] leading-[1.8] text-[#1B1B18]/60">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}