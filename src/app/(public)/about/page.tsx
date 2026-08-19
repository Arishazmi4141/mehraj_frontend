"use client";

import Link from "next/link";
import { Wrench, ShieldCheck, Clock, Award } from "lucide-react";

/**
 * /about — same palette as Contact/Cancel Order: home page :root vars for
 * bg/surface/ink/border, with wine (#3D1214) as primary accent and
 * taupe/brass (#756961) as secondary accent.
 */

const STATS = [
  { label: "Years In Business", value: "15+" },
  { label: "Cars Serviced", value: "8,000+" },
  { label: "Certified Technicians", value: "12" },
  { label: "Customer Rating", value: "4.9/5" },
];

const VALUES = [
  {
    icon: Wrench,
    title: "Skilled Hands",
    body: "Every technician on the floor is factory-trained and certified, not just experienced.",
  },
  {
    icon: ShieldCheck,
    title: "Honest Diagnostics",
    body: "We show you what's wrong before we fix it — no upsells, no guesswork billed as work.",
  },
  {
    icon: Clock,
    title: "Respect For Your Time",
    body: "Most jobs are quoted with a clear turnaround, and we stick to it.",
  },
  {
    icon: Award,
    title: "Parts You Can Trust",
    body: "OEM and top-tier aftermarket parts only — nothing that cuts corners on safety.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full"
          style={{ background: "rgba(61,18,20,0.06)", filter: "blur(60px)" }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-12">
          <span className="font-body text-[10px] uppercase tracking-[0.3em]" style={{ color: "#756961" }}>
            About Us
          </span>
          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-8" style={{ background: "var(--color-border-strong)" }} aria-hidden />
            <span className="font-body text-[12px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#3D1214" }}>
              London Motor Sports
            </span>
            <span className="h-px w-8" style={{ background: "var(--color-border-strong)" }} aria-hidden />
          </div>
          <h1
            className="mt-6 font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] md:text-[3rem]"
            style={{ color: "var(--color-ink)" }}
          >
            Built On Trust, Run On Craft
          </h1>
          <p
            className="mx-auto mt-6 max-w-xl font-body text-[14px] leading-[1.85]"
            style={{ color: "var(--color-ink-muted)" }}
          >
            London Motor Sports started as a two-bay workshop with one promise:
            fix it right the first time. Years on, that promise hasn&apos;t changed —
            only the number of cars we&apos;ve kept on the road because of it.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-12">
        <div
          className="mx-auto grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-sm border sm:grid-cols-4"
          style={{ borderColor: "var(--color-border)", background: "var(--color-border)" }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="p-6 text-center md:p-8" style={{ background: "var(--color-surface)" }}>
              <p className="font-display text-2xl font-bold md:text-3xl" style={{ color: "#3D1214" }}>
                {s.value}
              </p>
              <p
                className="mt-2 font-body text-[10px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: "var(--color-ink-faint)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <span className="font-body text-[10px] uppercase tracking-[0.3em]" style={{ color: "#756961" }}>
              Our Story
            </span>
            <h2
              className="mt-4 font-display text-2xl font-bold leading-[1.2] tracking-[-0.02em] md:text-3xl"
              style={{ color: "var(--color-ink)" }}
            >
              A Workshop That Grew On Word Of Mouth
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-body text-[14px] leading-[1.85]" style={{ color: "var(--color-ink-muted)" }}>
              We never set out to be the biggest garage in London — just the one
              people trusted enough to send their friends to. That&apos;s still how
              most of our customers find us today.
            </p>
            <p className="font-body text-[14px] leading-[1.85]" style={{ color: "var(--color-ink-muted)" }}>
              From routine servicing to complex diagnostics, our team treats every
              car the way we&apos;d want our own handled — properly, and without
              cutting corners.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <span className="font-body text-[10px] uppercase tracking-[0.3em]" style={{ color: "#756961" }}>
              What We Stand For
            </span>
            <h2
              className="mt-4 font-display text-2xl font-bold leading-[1.2] tracking-[-0.02em] md:text-3xl"
              style={{ color: "var(--color-ink)" }}
            >
              Why Customers Come Back
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 rounded-sm border p-7"
                style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
                  style={{ background: "rgba(61,18,20,0.06)", borderColor: "rgba(61,18,20,0.15)" }}
                >
                  <Icon className="h-5 w-5" style={{ color: "#3D1214" }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-display text-[15px] font-semibold" style={{ color: "var(--color-ink)" }}>
                    {title}
                  </p>
                  <p className="mt-2 font-body text-[13px] leading-[1.8]" style={{ color: "var(--color-ink-muted)" }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t px-6 py-20 text-center md:py-24" style={{ borderColor: "var(--color-border)" }}>
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: "#756961" }}>
          Ready when you are
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center rounded-sm px-8 py-3.5 font-body text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors"
          style={{ background: "#3D1214", color: "var(--color-surface)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#756961")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#3D1214")}
        >
          Get In Touch
        </Link>
      </section>
    </main>
  );
}