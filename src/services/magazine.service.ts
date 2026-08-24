// src/services/magazine.service.ts
import { requestAPI } from "@/src/lib/api-client";
import { Magazine, MagazinePage, MagazineRequest } from "@/src/types/magazine.types";

const getAuthHeaders = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("admin_token") || "";
  return { Authorization: `Bearer ${token}` };
};

export const magazineService = {
  getAllMagazines: (page = 0, size = 10): Promise<MagazinePage> => {
    return requestAPI<MagazinePage>(`/admin/getallmagazines?page=${page}&size=${size}`, {
      headers: getAuthHeaders(),
    });
  },

  // The controller takes two multipart parts — "magazine" (a JSON string)
  // and "pdf" (the file) — plus an "archiveJournals" query param. The
  // JSON part is sent as a Blob with an application/json type so Spring
  // resolves @RequestPart("magazine") String correctly.
  addMagazine: (payload: MagazineRequest, pdf: File, archiveJournals = true): Promise<Magazine> => {
    const formData = new FormData();
    formData.append("magazine", new Blob([JSON.stringify(payload)], { type: "application/json" }));
    formData.append("pdf", pdf);

    return requestAPI<Magazine>(
      `/admin/addmagazine?archiveJournals=${archiveJournals}`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: formData,
      },
      true
    );
  },

  deleteMagazine: (magazineId: number): Promise<void> => {
    return requestAPI<void>(
      `/admin/deletemagazine/${magazineId}`,
      {
        method: "DELETE",
        headers: getAuthHeaders(),
      },
      true
    );
  },
};