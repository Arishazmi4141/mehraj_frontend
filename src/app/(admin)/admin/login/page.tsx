"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ShieldCheck, Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { requestAPI } from "@/src/lib/api-client";

export default function AdminLoginPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Already signed in? Skip the login screen entirely.
  useEffect(() => {
    if (localStorage.getItem("admin_token")) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".animate-brand > *",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }
      );
      tl.fromTo(
        ".animate-login-box",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.6"
      );
      tl.fromTo(
        ".animate-field",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
        "-=0.4"
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!email.trim() || !password.trim()) {
      setError("Please enter both your email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await requestAPI<{ token: string; email?: string }>("/admin/login", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      if (response?.token) {
        localStorage.setItem("admin_token", response.token);
        localStorage.setItem("admin_email", response.email || email.trim());
        router.push("/admin/dashboard");
      } else {
        setError("Something went wrong signing you in. Please try again.");
      }
    } catch (err) {
      console.error("Admin login failed:", err);
      setError("Incorrect email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen w-full overflow-hidden bg-[var(--color-bg)] text-[var(--color-ink)]"
    >
      {/* Left: brand rail — hidden below lg, becomes a compact top strip instead */}
      <div className="relative hidden w-[42%] flex-col justify-between overflow-hidden bg-[var(--color-ink)] px-14 py-14 lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-bg) 1px, transparent 1px), linear-gradient(to bottom, var(--color-bg) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-[420px] w-[420px] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--color-green-soft-2) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        <div className="animate-brand relative z-10 flex flex-col items-start">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full border"
            style={{ borderColor: "color-mix(in srgb, var(--color-green) 40%, transparent)" }}
          >
            <span className="font-display text-xl italic" style={{ color: "var(--color-green)" }}>
              M
            </span>
          </div>
          <h1
            className="mt-8 font-display text-4xl font-light tracking-[0.02em]"
            style={{ color: "var(--color-bg)" }}
          >
            Meh<span className="italic" style={{ color: "var(--color-green)" }}>Rāj</span>
          </h1>
          <p
            className="mt-3 font-body text-[10px] font-semibold uppercase tracking-[0.4em]"
            style={{ color: "var(--color-brass)" }}
          >
            House Administration
          </p>
        </div>

        <div className="animate-brand relative z-10 flex flex-col gap-3">
          <span
            className="h-px w-10"
            style={{ background: "color-mix(in srgb, var(--color-bg) 20%, transparent)" }}
          />
          <p
            className="max-w-[22rem] font-body text-[12px] leading-relaxed"
            style={{ color: "color-mix(in srgb, var(--color-bg) 55%, transparent)" }}
          >
            This panel controls live storefront content. Every sign-in is
            logged and access is limited to authorized staff of the House.
          </p>
        </div>
      </div>

      {/* Right: form panel */}
      <div className="relative flex flex-1 items-center justify-center p-6 md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:right-[-10%]"
          style={{
            background: "radial-gradient(circle, var(--color-green-soft) 0%, transparent 75%)",
            filter: "blur(60px)",
          }}
        />

        <div
          className="animate-login-box relative z-10 w-full max-w-md rounded-sm border bg-[var(--color-surface)] p-8 opacity-0 shadow-[0_25px_70px_-20px_rgba(0,0,0,0.18)] md:p-10"
          style={{ borderColor: "var(--color-border)" }}
        >
          {/* Compact brand mark for mobile / small screens only */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
              style={{ borderColor: "color-mix(in srgb, var(--color-green) 40%, transparent)" }}
            >
              <span className="font-display text-base italic" style={{ color: "var(--color-green)" }}>
                M
              </span>
            </div>
            <span
              className="font-body text-[10px] font-semibold uppercase tracking-[0.35em]"
              style={{ color: "var(--color-brass)" }}
            >
              House Administration
            </span>
          </div>

          <div className="mb-8 text-left">
            <div
              className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full"
              style={{
                background: "var(--color-green-soft)",
                border: "1px solid color-mix(in srgb, var(--color-green) 25%, transparent)",
              }}
            >
              <ShieldCheck className="h-5 w-5" style={{ color: "var(--color-green)" }} strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--color-ink)]">
              Sign In
            </h2>
            <p className="mt-2 font-body text-[12px] text-[var(--color-ink-muted)]">
              Enter your credentials to access the dashboard.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-sm border border-red-600/25 bg-red-600/5 p-3 text-center font-body text-[11px] text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-5" noValidate>
            <div className="animate-field">
              <label className="mb-2 block font-body text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
                Email
              </label>
              <div
                className="relative flex items-center rounded-sm border bg-[var(--color-surface-alt)] transition-colors focus-within:border-[color-mix(in_srgb,var(--color-green)_40%,transparent)]"
                style={{ borderColor: "var(--color-border)" }}
              >
                <Mail className="ml-4 h-3.5 w-3.5 shrink-0 text-[var(--color-ink-faint)]" strokeWidth={1.75} />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  placeholder="admin@pas.com"
                  className="h-11 w-full bg-transparent px-3 text-[13px] tracking-wide text-[var(--color-ink)] outline-none placeholder-[var(--color-ink-faint)]"
                />
              </div>
            </div>

            <div className="animate-field">
              <label className="mb-2 block font-body text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
                Password
              </label>
              <div
                className="relative flex items-center rounded-sm border bg-[var(--color-surface-alt)] transition-colors focus-within:border-[color-mix(in_srgb,var(--color-green)_40%,transparent)]"
                style={{ borderColor: "var(--color-border)" }}
              >
                <Lock className="ml-4 h-3.5 w-3.5 shrink-0 text-[var(--color-ink-faint)]" strokeWidth={1.75} />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  placeholder="••••••••••••"
                  className="h-11 w-full bg-transparent px-3 text-[13px] tracking-widest text-[var(--color-ink)] outline-none placeholder-[var(--color-ink-faint)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="flex h-full items-center px-4 text-[var(--color-ink-faint)] transition-colors hover:text-[var(--color-ink)]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="animate-field flex w-full items-center justify-center gap-2 rounded-sm bg-[var(--color-green)] py-3.5 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-bg)] transition-colors duration-300 hover:bg-[var(--color-green-deep)] disabled:bg-[var(--color-border-strong)] disabled:text-[var(--color-ink-faint)]"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center font-body text-[10px] tracking-wide text-[var(--color-ink-faint)]">
            Restricted access · All sign-ins are logged
          </p>
        </div>
      </div>
    </div>
  );
}