// src/services/content.service.ts
// Public reads for the storefront's Journal/Magazine pages — no auth headers.
import { requestAPI } from "@/src/lib/api-client";
import { Journal, JournalPage } from "@/src/types/journal.types";
import { Magazine, MagazinePage } from "@/src/types/magazine.types";

export const contentService = {
  getJournals: (page = 0, size = 12): Promise<JournalPage> => {
    return requestAPI<JournalPage>(`/journals?page=${page}&size=${size}`);
  },

  getJournalById: (journalId: number): Promise<Journal> => {
    return requestAPI<Journal>(`/journals/${journalId}`);
  },

  getMagazines: (page = 0, size = 12): Promise<MagazinePage> => {
    return requestAPI<MagazinePage>(`/magazines?page=${page}&size=${size}`);
  },
};