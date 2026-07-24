"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ShieldCheck, Eye, EyeOff, Loader2 } from "lucide-react";
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
      gsap.fromTo(
        ".animate-login-box",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" }
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
    <div ref={containerRef} className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)] flex items-center justify-center p-6 relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px]"
        style={{
          background: "radial-gradient(circle, var(--color-green-soft) 0%, transparent 75%)",
          filter: "blur(60px)",
        }}
      />

      <div
        className="animate-login-box opacity-0 w-full max-w-md p-8 md:p-10 relative z-10 rounded-sm bg-[var(--color-surface)] border border-[var(--color-border)]"
      >
        <div className="text-center mb-8">
          <div
            className="inline-flex h-12 w-12 items-center justify-center mb-4 rounded-full bg-[var(--color-green-soft)] border border-[var(--color-green)]/25"
          >
            <ShieldCheck className="h-5 w-5 text-[var(--color-green)]" strokeWidth={1.5} />
          </div>
          <span className="block font-body text-[9px] uppercase tracking-[0.4em] text-[var(--color-green)]">Admin Panel</span>
          <h1 className="mt-2 font-display text-xl font-bold tracking-tight text-[var(--color-ink)]">
            Sign In
          </h1>
          <p className="mt-2 font-body text-[12px] text-[var(--color-ink-muted)]">
            Enter your credentials to access the dashboard.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-sm font-body text-[11px] text-center bg-red-600/5 border border-red-600/25 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-6" noValidate>
          <div>
            <label className="block font-body text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-2">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="admin@pas.com"
              className="w-full h-11 px-4 text-[13px] tracking-wide text-[var(--color-ink)] outline-none transition-colors rounded-sm placeholder-[var(--color-ink-faint)] bg-[var(--color-surface-alt)] border border-[var(--color-border)] focus:border-[var(--color-green)]/40"
            />
          </div>

          <div>
            <label className="block font-body text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-2">Password</label>
            <div
              className="relative flex items-center rounded-sm transition-colors bg-[var(--color-surface-alt)] border border-[var(--color-border)] focus-within:border-[var(--color-green)]/40"
            >
              <input
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="••••••••••••"
                className="w-full bg-transparent h-11 px-4 text-[13px] tracking-widest text-[var(--color-ink)] outline-none placeholder-[var(--color-ink-faint)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="px-4 text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors h-full flex items-center"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-green)] hover:bg-[var(--color-green-deep)] disabled:bg-[var(--color-border-strong)] disabled:text-[var(--color-ink-faint)] text-[var(--color-bg)] py-3.5 font-body text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 flex items-center justify-center gap-2 rounded-sm"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}