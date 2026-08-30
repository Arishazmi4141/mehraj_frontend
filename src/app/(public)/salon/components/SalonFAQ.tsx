"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How long does a styling session last?",
    a: "Most sessions run 60–90 minutes, depending on the service. Event styling and wardrobe planning sessions may run longer to allow for a thorough consultation.",
  },
  {
    q: "Is there a fee for the consultation?",
    a: "A nominal consultation fee applies, which is adjusted against any purchase made during or after your session.",
  },
  {
    q: "Can I bring my own pieces to the session?",
    a: "Yes — feel free to bring existing garments. Our consultants are happy to build a look around pieces you already own.",
  },
  {
    q: "What if I don't have a garment at all?",
    a: "That's completely fine — many clients start with just an idea, reference photo, or sketch. Our team designs and builds the piece from scratch.",
  },
  {
    q: "Do you offer styling for groups or bridal parties?",
    a: "Yes, group and bridal party sessions can be arranged by appointment. Mention your requirement while booking and we'll tailor the slot accordingly.",
  },
  {
    q: "Where do sessions take place?",
    a: "All sessions are held at our Rajkot atelier by default. For bridal or event styling, on-site visits can be arranged on request.",
  },
  {
    q: "Can I reschedule or cancel my appointment?",
    a: "Yes, appointments can be rescheduled free of charge up to 24 hours before the slot. Please reach out via WhatsApp or the contact form to make changes.",
  },
];

export default function SalonFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="border-t border-[#1B1B18]/10 bg-[#F1EADC]">
      <div className="mx-auto max-w-3xl px-6 py-20 md:px-12 md:py-28">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#5C2A32]" />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#5C2A32]">
            Good To Know
          </span>
          <span className="h-px w-8 bg-[#5C2A32]" />
        </div>
        <h2 className="text-center font-serif text-2xl font-light text-[#1B1B18] md:text-4xl">
          Frequently <span className="italic text-[#5C2A32]">Asked</span>
        </h2>

        <div className="mt-12 divide-y divide-[#1B1B18]/10 border-y border-[#1B1B18]/10">
          {FAQS.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left cursor-pointer"
                >
                  <span className="font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-[#1B1B18]">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#5C2A32] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="font-sans text-[13px] leading-[1.85] text-[#1B1B18]/65">
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}