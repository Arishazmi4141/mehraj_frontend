"use client";

/**
 * /privacy-policy — light theme, consistent with the rest of the site.
 * Kept short/generic as requested. This is boilerplate, not legal advice —
 * have it reviewed before publishing, especially the data-collection and
 * payments sections once your checkout/analytics stack is finalised.
 */

const SECTIONS = [
  {
    title: "Information We Collect",
    body: "When you browse MehRāj, place an order, or contact us, we may collect your name, email address, phone number, shipping address, and payment details necessary to process your request.",
  },
  {
    title: "How We Use It",
    body: "We use this information to process orders, respond to enquiries, schedule fittings and appointments, and — only with your consent — to send updates about new collections.",
  },
  {
    title: "Cookies",
    body: "Our website may use cookies to remember your preferences and understand how the site is used, so we can keep improving it.",
  },
  {
    title: "Sharing Your Information",
    body: "We do not sell your personal information. We share it only with the payment processors, couriers, and service providers needed to fulfil your order.",
  },
  {
    title: "Data Security",
    body: "We take reasonable technical and organisational measures to protect your information, though no method of transmission over the internet is ever completely secure.",
  },
  {
    title: "Your Rights",
    body: "You can request access to, correction of, or deletion of your personal information at any time by writing to us at hello@mehraj.com.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="relative bg-[#F6F2E9]">
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#A6906F]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A6906F]">
              Privacy Policy
            </span>
            <span className="h-px w-6 bg-[#A6906F]" />
          </div>
          <h1 className="font-serif text-3xl font-light leading-[1.15] text-[#1B1B18] md:text-4xl">
            Your Privacy, <span className="italic text-[#A6906F]">Respected</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md font-sans text-xs leading-[1.85] text-[#1B1B18]/65">
            Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </section>

      <section className="relative border-t border-[#1B1B18]/10">
        <div className="mx-auto max-w-2xl divide-y divide-[#1B1B18]/10 px-6 py-16 md:py-20">
          {SECTIONS.map((s) => (
            <div key={s.title} className="py-6 first:pt-0 last:pb-0">
              <p className="font-serif text-base italic text-[#1B1B18]">{s.title}</p>
              <p className="mt-2 font-sans text-[13px] leading-[1.85] text-[#1B1B18]/65">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}