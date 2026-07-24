"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { adminService, DashboardStats, OrderSummaryDto } from "@/src/services/admin.service";
import { Package, Truck, FileText, TrendingUp, ShieldAlert, Loader2, ArrowUpRight } from "lucide-react";
import { useRequireAdminAuth, useAdminAuthErrorHandler } from "@/src/hooks/useAdminAuth";

interface DayBar {
  label: string;
  date: string;
  count: number;
  revenue: number;
  pct: number;
}

export default function AdminDashboardPage() {
  useRequireAdminAuth();
  const handleAuthError = useAdminAuthErrorHandler();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<OrderSummaryDto[]>([]);
  const [chartBars, setChartBars] = useState<DayBar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);
  const adminEmail = typeof window !== "undefined" ? localStorage.getItem("admin_email") || "admin" : "admin";
  const adminName = adminEmail.split("@")[0];

  // ── Load dashboard data ──────────────────────────────────────────────────
  useEffect(() => {
    adminService.getDashboardMetrics()
      .then((data) => {
        setStats(data.stats);
        setRecentOrders(data.recentOrders);
        buildChartBars(data.allOrdersForChart);
        setLoading(false);
      })
      .catch((err) => {
        if (handleAuthError(err)) return; // expired session — already redirecting
        setError("Couldn't load dashboard data. Please try refreshing the page.");
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Build the last-7-days chart data ────────────────────────────────────
  const buildChartBars = (ordersList: OrderSummaryDto[]) => {
    const now = new Date();
    const days: DayBar[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      d.setHours(0, 0, 0, 0);

      days.push({
        label: d.toLocaleDateString("en-GB", { weekday: "short" }),
        date: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
        count: 0,
        revenue: 0,
        pct: 0,
      });
    }

    ordersList.forEach((o) => {
      const oDate = new Date(o.createdAt);
      const formattedStr = oDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
      const bucket = days.find((b) => b.date === formattedStr);
      if (bucket) {
        bucket.count++;
        bucket.revenue += o.amount || 0;
      }
    });

    const maxCount = Math.max(...days.map((d) => d.count), 1);
    days.forEach((d) => { d.pct = (d.count / maxCount) * 100; });
    setChartBars(days);
  };

  // ── Entrance animation ───────────────────────────────────────────────────
  useEffect(() => {
    if (loading || error) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".animate-core-node", { y: 25, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power4.out", stagger: 0.04,
      });
      gsap.fromTo(".chart-bar-fill", { scaleY: 0 }, {
        scaleY: 1, duration: 1.2, transformOrigin: "bottom center", ease: "expo.out", delay: 0.3,
      });
    }, containerRef);
    return () => ctx.revert();
  }, [loading, error]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-green)]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center p-6 text-center text-[var(--color-ink-muted)]">
        <ShieldAlert className="h-8 w-8 text-red-600 mb-4" />
        <p className="font-body text-xs uppercase tracking-widest leading-relaxed">{error}</p>
      </div>
    );
  }

  const STAT_CARDS = [
    { label: "Total Revenue",     value: `£${stats?.totalRevenue.toLocaleString("en-GB")}`, icon: TrendingUp },
    { label: "Pending Orders",    value: stats?.pendingOrders,   icon: Package },
    { label: "Dispatched Orders", value: stats?.dispatchedOrders, icon: Truck },
    { label: "Total Products",   value: stats?.totalProducts,   icon: FileText },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)] p-6 md:p-12">
      {/* Header */}
      <div
        className="animate-core-node flex flex-col md:flex-row justify-between items-start md:items-center pb-8 mb-12 gap-6 border-b border-[var(--color-border)]"
      >
        <div>
          <span className="font-body text-[9px] uppercase tracking-[0.4em] text-[var(--color-green)]">Dashboard</span>
          <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--color-ink)] capitalize">
            Welcome back, {adminName}
          </h1>
        </div>
        <Link
          href="/admin/orders"
          className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 rounded-sm bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-green)]/40"
        >
          View All Orders
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {STAT_CARDS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="animate-core-node p-6 flex flex-col justify-between group transition-colors duration-300 rounded-sm bg-[var(--color-surface)] border border-[var(--color-border)]"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-body text-[9px] uppercase tracking-widest text-[var(--color-ink-muted)]">{stat.label}</span>
                <Icon className="h-3.5 w-3.5 text-[var(--color-green)]/50 group-hover:text-[var(--color-green)] transition-colors" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-[var(--color-ink)]">{stat.value}</span>
            </div>
          );
        })}
      </div>

      {/* Chart + recent orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chart */}
        <div
          className="lg:col-span-7 p-8 flex flex-col justify-between min-h-[380px] animate-core-node rounded-sm bg-[var(--color-surface)] border border-[var(--color-border)]"
        >
          <div>
            <h3 className="font-display text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--color-ink-faint)] mb-2">
              Last 7 Days
            </h3>
            <p className="font-body text-[10px] uppercase tracking-wider text-[var(--color-ink-faint)]">Orders &amp; revenue by day</p>
          </div>

          <div className="flex items-end justify-between gap-2 h-48 pt-6 border-b border-[var(--color-border)]">
            {chartBars.map((bar, i) => (
              <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group">
                <div className="relative w-full flex justify-center">
                  <span
                    className="opacity-0 group-hover:opacity-100 absolute -top-8 font-mono text-[9px] px-1.5 py-0.5 transition-opacity duration-200 rounded-sm bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-green)]"
                  >
                    £{bar.revenue}
                  </span>
                </div>
                <div
                  className="chart-bar-fill w-6 sm:w-8 transition-all duration-300"
                  style={{ height: `${bar.pct}%`, background: "linear-gradient(to top, var(--color-green-soft-2), var(--color-green))" }}
                />
                <span className="mt-3 font-body text-[9px] uppercase tracking-wider text-[var(--color-ink-muted)]">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        <div
          className="lg:col-span-5 p-8 flex flex-col animate-core-node rounded-sm bg-[var(--color-surface)] border border-[var(--color-border)]"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--color-ink-faint)]">
              Recent Orders
            </h3>
            <Link href="/admin/orders" className="text-[var(--color-green)] font-body text-[9px] uppercase tracking-widest inline-flex items-center gap-1 hover:underline">
              View All <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="divide-y divide-[var(--color-border)] flex-1">
            {recentOrders.length === 0 ? (
              <p className="font-body text-xs text-[var(--color-ink-faint)] uppercase tracking-widest py-8">No orders yet.</p>
            ) : (
              recentOrders.map((order) => (
                <div key={order.orderId} className="py-4 flex justify-between items-center font-body text-xs first:pt-0 last:pb-0 group border-[var(--color-border)]">
                  <div>
                    <p className="font-display text-[var(--color-ink)] font-bold tracking-wide group-hover:text-[var(--color-green)] transition-colors">
                      {order.name}
                    </p>
                    <p className="text-[10px] text-[var(--color-ink-faint)] mt-0.5 font-mono">#PAS-{order.orderId}</p>
                  </div>
                  <span className="font-mono text-[var(--color-ink-muted)] font-semibold text-right">
                    £{order.amount.toLocaleString("en-GB")}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}