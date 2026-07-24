"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import {
  LayoutDashboard, ShoppingCart, Sliders, Truck, CheckCircle2,
  AlertOctagon, Layers, LogOut, Menu, X, ChevronLeft, ChevronRight, ShieldCheck
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  route: string;
}

const menuItems: MenuItem[] = [
  { id: "dashboard",  label: "Dashboard",         icon: LayoutDashboard, route: "/admin/dashboard" },
  { id: "products",   label: "Products",          icon: Sliders,         route: "/admin/products" },
  { id: "orders",     label: "Pending Orders",     icon: ShoppingCart,    route: "/admin/orders" },
  { id: "dispatched", label: "Dispatched Orders",  icon: Truck,           route: "/admin/dispatched" },
  { id: "delivered",  label: "Delivered Orders",   icon: CheckCircle2,    route: "/admin/delivered" },
  { id: "cancelled",  label: "Cancelled Orders",   icon: AlertOctagon,    route: "/admin/cancelled" },
  { id: "categories", label: "Categories",         icon: Layers,          route: "/admin/categories" },
];

export default function AdminGlobalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string>("admin@pas.com");

  const todayLabel = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAdminEmail(localStorage.getItem("admin_email") || "admin@pas.com");
    }
  }, []);

  const adminInitials = adminEmail.split("@")[0].substring(0, 2).toUpperCase();
  const adminName = adminEmail.split("@")[0];

  const currentActiveMatch = menuItems.find((item) => pathname?.startsWith(item.route));
  const pageTitleDisplay = currentActiveMatch ? currentActiveMatch.label : "Admin Panel";

  const handleLogout = () => {
    if (!confirm("Are you sure you want to log out?")) return;
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_email");
    router.push("/admin/login");
  };

  useEffect(() => {
    if (mobileSidebarOpen) {
      gsap.fromTo(".mobile-sidebar-layer", { x: "-100%" }, { x: 0, duration: 0.4, ease: "power3.out" });
    }
  }, [mobileSidebarOpen]);

  // The login screen renders its own full-page design — it shouldn't be
  // wrapped in the sidebar/header shell (that would leak nav to a signed-out visitor).
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F4] flex text-[#171712] font-body overflow-hidden">
      {/* ── Desktop sidebar ── */}
      <aside
        ref={sidebarRef}
        className={`hidden md:flex flex-col justify-between border-r bg-white h-screen sticky top-0 transition-all duration-300 z-40 flex-shrink-0 ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
        style={{ borderColor: "#E7E3D8" }}
      >
        <div className="space-y-8 flex flex-col pt-6">
          <div className={`flex items-center border-b pb-6 px-5 justify-between ${sidebarCollapsed ? "flex-col gap-4" : ""}`} style={{ borderColor: "#E7E3D8" }}>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-[#1F4A38] flex-shrink-0" strokeWidth={1.5} />
              {!sidebarCollapsed && (
                <span className="font-display text-[11px] font-bold uppercase tracking-[0.3em] text-[#171712]">
                  PAS Admin
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-[#B8B4A8] hover:text-[#1F4A38] transition-colors"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>

          <nav className="flex flex-col px-3 space-y-1.5" role="list">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.route;
              return (
                <Link
                  key={item.id}
                  href={item.route}
                  className={`flex items-center gap-3.5 h-11 transition-all duration-300 border relative group rounded-sm ${
                    sidebarCollapsed ? "justify-center px-0" : "px-4"
                  } ${
                    isActive
                      ? "border-[#1F4A38]/20 bg-[#1F4A38]/[0.05] text-[#1F4A38] font-semibold"
                      : "border-transparent text-[#6B685F] hover:text-[#171712] hover:bg-[#F7F7F4]"
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                  {!sidebarCollapsed && (
                    <span className="text-[11px] uppercase tracking-wider font-medium">{item.label}</span>
                  )}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-4 bg-white border text-[#1F4A38] text-[9px] uppercase tracking-widest font-mono font-bold px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 shadow-lg rounded-sm" style={{ borderColor: "#E7E3D8" }}>
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t p-4 space-y-3" style={{ borderColor: "#E7E3D8" }}>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3 px-2 py-1">
              <div className="h-8 w-8 flex items-center justify-center font-mono text-[11px] font-bold text-[#1F4A38] bg-[#F1EFE9] border rounded-sm" style={{ borderColor: "#E7E3D8" }}>
                {adminInitials}
              </div>
              <div className="truncate text-left">
                <p className="text-[12px] text-[#171712] font-semibold capitalize truncate">{adminName}</p>
                <p className="text-[10px] text-[#B8B4A8] truncate">{adminEmail}</p>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className={`w-full flex items-center gap-3.5 h-10 px-4 text-[11px] font-medium uppercase tracking-wider text-[#8C8A80] hover:text-red-600 border border-transparent hover:border-red-200 hover:bg-red-50 transition-colors rounded-sm ${
              sidebarCollapsed ? "justify-center px-0" : ""
            }`}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
            {!sidebarCollapsed && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* ── Mobile drawer ── */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden flex">
          <div className="mobile-sidebar-layer bg-white w-72 h-full border-r p-6 flex flex-col justify-between transform -translate-x-full" style={{ borderColor: "#E7E3D8" }}>
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b pb-5" style={{ borderColor: "#E7E3D8" }}>
                <span className="font-display text-[10px] font-bold uppercase tracking-widest text-[#A9773C]">PAS Admin</span>
                <button type="button" onClick={() => setMobileSidebarOpen(false)} className="text-[#8C8A80] hover:text-[#171712]">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="flex flex-col space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.route}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-4 h-12 px-4 border text-[11px] font-medium uppercase tracking-wider rounded-sm ${
                        pathname === item.route ? "border-[#1F4A38]/25 bg-[#1F4A38]/5 text-[#1F4A38]" : "border-transparent text-[#6B685F]"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="h-12 border border-red-200 bg-red-50 text-red-600 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest w-full rounded-sm"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-16 border-b bg-white px-6 md:px-12 flex items-center justify-between flex-shrink-0 z-30" style={{ borderColor: "#E7E3D8" }}>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setMobileSidebarOpen(true)} className="md:hidden text-[#6B685F] hover:text-[#171712] transition-colors">
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-[#1F4A38] border-l-2 border-[#1F4A38] pl-3">
              {pageTitleDisplay}
            </h2>
          </div>

          <div className="hidden sm:block text-right font-mono text-[10px] text-[#B8B4A8] uppercase tracking-wider">
            {todayLabel}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#F7F7F4] relative">
          {children}
        </main>
      </div>
    </div>
  );
}