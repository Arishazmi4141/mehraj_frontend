// src/services/journal.service.ts
import { requestAPI } from "@/src/lib/api-client";
import { Journal, JournalPage, JournalPayload, JournalRequest } from "@/src/types/journal.types";

const getAuthHeaders = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("admin_token") || "";
  return { Authorization: `Bearer ${token}` };
};

// Backend expects a "journal" part as a JSON string (@RequestPart("journal")
// String), plus zero or more "images" file parts, plus an optional
// "deleteImageIds" text part (comma-separated ids) on update. Don't set
// Content-Type manually — the browser attaches its own multipart boundary.
const buildFormData = (payload: JournalPayload): FormData => {
  const formData = new FormData();

  const journalRequest: JournalRequest = {
    title: payload.title,
    content: payload.content,
  };
  formData.append(
    "journal",
    new Blob([JSON.stringify(journalRequest)], { type: "application/json" })
  );

  (payload.images ?? []).forEach((file) => formData.append("images", file));

  if (payload.deleteImageIds && payload.deleteImageIds.length > 0) {
    formData.append("deleteImageIds", payload.deleteImageIds.join(","));
  }

  return formData;
};

export const journalService = {
  getAllJournals: (page = 0, size = 10): Promise<JournalPage> => {
    return requestAPI<JournalPage>(`/admin/getalljournals?page=${page}&size=${size}`, {
      headers: getAuthHeaders(),
    });
  },

  addJournal: (payload: JournalPayload): Promise<Journal> => {
    return requestAPI<Journal>(
      "/admin/addjournal",
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: buildFormData(payload),
      },
      true
    );
  },

  // NOTE: backend route is @PostMapping, not PUT.
  updateJournal: (journalId: number, payload: JournalPayload): Promise<Journal> => {
    return requestAPI<Journal>(
      `/admin/updatejournal/${journalId}`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: buildFormData(payload),
      },
      true
    );
  },

  deleteJournal: (journalId: number): Promise<void> => {
    return requestAPI<void>(
      `/admin/deletejournal/${journalId}`,
      {
        method: "DELETE",
        headers: getAuthHeaders(),
      },
      true
    );
  },
};