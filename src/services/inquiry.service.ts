import { requestAPI } from "@/src/lib/api-client";
import { ConsultationRequest, ContactUsRequest, InquiryPage, InquiryFilterParams } from "@/src/types/inquiry";

function buildQuery(filters: InquiryFilterParams, page: number, size: number) {
  const query = new URLSearchParams();
  if (filters.name?.trim()) query.set("name", filters.name.trim());
  if (filters.fromDate) query.set("fromDate", filters.fromDate);
  if (filters.toDate) query.set("toDate", filters.toDate);
  query.set("page", String(page));
  query.set("size", String(size));
  return query.toString();
}

const authHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("admin_token")}` });

export const inquiryService = {
  getConsultations: (filters: InquiryFilterParams, page: number, size: number) =>
    requestAPI<InquiryPage<ConsultationRequest>>(`/admin/consultations?${buildQuery(filters, page, size)}`, {
      headers: authHeaders(),
    }),

  deleteConsultation: (id: number) =>
    requestAPI<string>(`/admin/consultations/${id}`, { method: "DELETE", headers: authHeaders() }, true),

  getContactUs: (filters: InquiryFilterParams, page: number, size: number) =>
    requestAPI<InquiryPage<ContactUsRequest>>(`/admin/contactus?${buildQuery(filters, page, size)}`, {
      headers: authHeaders(),
    }),

  deleteContactUs: (id: number) =>
    requestAPI<string>(`/admin/contactus/${id}`, { method: "DELETE", headers: authHeaders() }, true),
};