"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * /privacy-policy — light theme, consistent with the rest of the site.
 * Kept short/generic as requested. This is boilerplate, not legal advice —
 * have it reviewed before publishing, especially the data-collection and
 * payments sections once your checkout/analytics stack is finalised.
 */

const SECTIONS = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: "When you browse MehRāj, place an order, or contact us, we may collect your name, email address, phone number, shipping address, and payment details necessary to process your request. We may also collect measurements provided for bespoke and made-to-order garments.",
  },
  {
    id: "how-we-use-it",
    title: "How We Use It",
    body: "We use this information to process orders, respond to enquiries, schedule fittings and appointments, manage alterations, and — only with your consent — to send updates about new collections and private invitations.",
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    body: "Our website uses cookies to remember your cart, preferences, and login state, and to understand how the site is used so we can keep improving it. You can control cookies through your browser settings at any time.",
  },
  {
    id: "sharing",
    title: "Sharing Your Information",
    body: "We do not sell your personal information. We share it only with the payment processors, couriers, tailoring partners, and service providers strictly necessary to fulfil your order or appointment.",
  },
  {
    id: "retention",
    title: "Data Retention",
    body: "We retain your information only for as long as necessary to fulfil the purposes outlined in this policy, or as required by applicable tax, accounting, or legal obligations.",
  },
  {
    id: "security",
    title: "Data Security",
    body: "We take reasonable technical and organisational measures — including encrypted checkout and restricted internal access — to protect your information. No method of transmission over the internet is ever completely secure.",
  },
  {
    id: "third-party",
    title: "Third-Party Links",
    body: "Our site may link to third-party platforms such as Instagram or payment gateways. We are not responsible for the privacy practices of these external sites and encourage you to review their policies separately.",
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    body: "MehRāj's services are intended for individuals aged 18 and above. We do not knowingly collect personal information from children.",
  },
  {
    id: "your-rights",
    title: "Your Rights",
    body: "You can request access to, correction of, or deletion of your personal information at any time by writing to us at hello@mehraj.com. We will respond within a reasonable timeframe.",
  },
  {
    id: "policy-changes",
    title: "Changes To This Policy",
    body: "We may update this policy from time to time to reflect changes in our practices. Any updates will be posted on this page with a revised effective date.",
  },
];

export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative bg-(--color-bg)">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-10 md:pt-40 md:pb-16">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: "var(--color-brass-soft)" }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
          <span className="eyebrow mb-4 justify-center text-[9px] sm:text-[10px]">
            Legal · Client Services
          </span>

          <h1 className="font-display text-2xl font-light leading-[1.2] text-(--color-ink) sm:text-3xl md:text-5xl">
            Privacy <span className="italic text-(--color-brass)">Policy</span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg font-body text-[13px] leading-[1.8] text-(--color-ink-faint) sm:mt-5 sm:text-xs sm:leading-[1.85]">
            MehRāj respects the trust you place in us. This policy explains what
            information we collect, how we use it, and the choices available to
            you.
          </p>

          <p className="mx-auto mt-4 font-body text-[10px] uppercase tracking-[0.2em] text-(--color-ink-faint) sm:text-[11px]">
            Effective{" "}
            {new Date().toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="accent-rule mx-auto mt-6 max-w-24 sm:mt-8 sm:max-w-28" />
        </div>
      </section>

      {/* ── Body: TOC + Sections ── */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[240px_1fr] md:gap-16">
            {/* Sticky Table of Contents (desktop only) */}
            <nav className="hidden md:block">
              <div className="sticky top-28">
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-(--color-brass)">
                  On This Page
                </span>
                <ul className="mt-5 space-y-3 border-l border-(--color-border) pl-5">
                  {SECTIONS.map((s, i) => (
                    <li key={s.id}>
                      <Link
                        href={`#${s.id}`}
                        className={`block font-body text-[13px] leading-snug transition-colors ${
                          activeId === s.id
                            ? "font-medium text-(--color-ink)"
                            : "text-(--color-ink-faint) hover:text-(--color-brass)"
                        }`}
                      >
                        <span className="mr-2 font-display text-(--color-brass)">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* Sections */}
            <div>
              <div className="divide-y divide-(--color-border) border-y border-(--color-border)">
                {SECTIONS.map((s, i) => (
                  <div
                    key={s.id}
                    id={s.id}
                    className="scroll-mt-24 py-6 md:scroll-mt-28 md:py-8"
                  >
                    <div className="flex items-baseline gap-3 md:gap-4">
                      <span className="font-display text-xs text-(--color-brass) sm:text-sm">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-display text-base italic text-(--color-ink) sm:text-lg md:text-xl">
                        {s.title}
                      </h2>
                    </div>
                    <p className="mt-2.5 pl-7 font-body text-[13px] leading-[1.8] text-(--color-ink-muted) sm:mt-3 sm:pl-9 sm:leading-[1.9] md:max-w-2xl">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Contact callout */}
              <div className="accent-card mt-8 flex flex-col items-center gap-3 p-6 text-center sm:mt-12 sm:p-8 md:p-10">
                <span className="eyebrow text-[9px] sm:text-[10px]">
                  Questions About This Policy
                </span>
                <p className="font-body text-[13px] leading-[1.8] text-(--color-ink-muted) sm:leading-[1.85]">
                  Write to us and a member of our team will get back to you
                  personally.
                </p>
                <Link
                  href="mailto:hello@mehraj.com"
                  className="font-display text-sm tracking-wide text-(--color-brass) underline underline-offset-4 decoration-(--color-border-strong) hover:text-(--color-green-deep)"
                >
                  hello@mehraj.com
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
