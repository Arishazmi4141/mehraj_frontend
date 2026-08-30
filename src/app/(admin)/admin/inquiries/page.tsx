"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useRequireAdminAuth, useAdminAuthErrorHandler } from "@/src/hooks/useAdminAuth";
import { inquiryService } from "@/src/services/inquiry.service";
import { ConsultationRequest, ContactUsRequest, InquiryFilterParams } from "@/src/types/inquiry";

import InquiryFilters from "./components/InquiryFilters";
import ConsultationsTable from "./components/ConsultationsTable";
import ContactUsTable from "./components/ContactUsTable";
import ConsultationDetailModal from "./components/ConsultationDetailModal";
import ContactUsDetailModal from "./components/ContactUsDetailModal";

type TabKey = "consultations" | "contactus";
const PAGE_SIZE = 10;

export default function AdminInquiriesPage() {
  useRequireAdminAuth();
  const handleAuthError = useAdminAuthErrorHandler();

  const containerRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<TabKey>("consultations");
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<InquiryFilterParams>({ name: "", fromDate: null, toDate: null });
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(0);

  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactUsRequest[]>([]);

  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationRequest | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactUsRequest | null>(null);

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === "consultations") {
        const res = await inquiryService.getConsultations(filters, currentPage, PAGE_SIZE);
        setConsultations(res.content || []);
        setTotalPages(res.totalPages || 1);
        setTotalElements(res.totalElements || 0);
      } else {
        const res = await inquiryService.getContactUs(filters, currentPage, PAGE_SIZE);
        setContactRequests(res.content || []);
        setTotalPages(res.totalPages || 1);
        setTotalElements(res.totalElements || 0);
      }
    } catch (err) {
      if (handleAuthError(err)) return;
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, currentPage, filters.name, filters.fromDate, filters.toDate]);

  useEffect(() => {
    setCurrentPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, filters.name, filters.fromDate, filters.toDate]);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".animate-inq-node", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power4.out", stagger: 0.05 });
    }, containerRef);
    return () => ctx.revert();
  }, [loading, activeTab]);

  const handleDeleteConsultation = async (id: number, name: string) => {
    if (!confirm(`Delete consultation request from "${name}"?`)) return;
    try {
      await inquiryService.deleteConsultation(id);
      setConsultations((prev) => prev.filter((c) => c.id !== id));
      setTotalElements((prev) => Math.max(0, prev - 1));
      showToast("Consultation request deleted.");
    } catch (err) {
      if (handleAuthError(err)) return;
      showToast("Failed to delete. Please try again.");
    }
  };

  const handleDeleteContact = async (id: number, name: string) => {
    if (!confirm(`Delete contact request from "${name}"?`)) return;
    try {
      await inquiryService.deleteContactUs(id);
      setContactRequests((prev) => prev.filter((c) => c.id !== id));
      setTotalElements((prev) => Math.max(0, prev - 1));
      showToast("Contact request deleted.");
    } catch (err) {
      if (handleAuthError(err)) return;
      showToast("Failed to delete. Please try again.");
    }
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: "consultations", label: "Consultations" },
    { key: "contactus", label: "Contact Us" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)] p-6 md:p-12">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[var(--color-surface)] border border-[var(--color-green)]/20 text-[var(--color-green-deep)] text-[11px] uppercase tracking-widest font-semibold px-5 py-3 shadow-xl rounded-sm flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="animate-inq-node flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-6 mb-8 gap-4" style={{ borderColor: "var(--color-border)" }}>
        <div>
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[var(--color-brass)]">Front Desk</span>
          <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--color-ink)]">Inquiries</h1>
        </div>

        <div className="flex border rounded-sm overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest transition-colors"
              style={{
                background: activeTab === t.key ? "var(--color-green)" : "transparent",
                color: activeTab === t.key ? "var(--color-bg)" : "var(--color-ink-muted)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <InquiryFilters filters={filters} setFilters={setFilters} />

      <div className="animate-inq-node bg-[var(--color-surface)] border p-6 md:p-8 rounded-sm" style={{ borderColor: "var(--color-border)" }}>
        {loading ? (
          <div className="py-16 flex items-center justify-center text-[var(--color-green)]">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : activeTab === "consultations" ? (
          <ConsultationsTable consultations={consultations} onViewDetails={setSelectedConsultation} onDelete={handleDeleteConsultation} />
        ) : (
          <ContactUsTable requests={contactRequests} onViewDetails={setSelectedContact} onDelete={handleDeleteContact} />
        )}

        {!loading && totalElements > 0 && (
          <div className="flex justify-between items-center mt-6 pt-6 border-t font-body" style={{ borderColor: "var(--color-border)" }}>
            <span className="text-[11px] text-[var(--color-ink-faint)] uppercase tracking-wider">
              Showing {(activeTab === "consultations" ? consultations : contactRequests).length} of {totalElements}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="p-2 border text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-sm"
                style={{ borderColor: "var(--color-border)" }}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-[12px] text-[var(--color-brass)] px-4 font-mono">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages - 1}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-2 border text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-sm"
                style={{ borderColor: "var(--color-border)" }}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <ConsultationDetailModal show={!!selectedConsultation} consultation={selectedConsultation} onClose={() => setSelectedConsultation(null)} />
      <ContactUsDetailModal show={!!selectedContact} request={selectedContact} onClose={() => setSelectedContact(null)} />
    </div>
  );
}