export interface ConsultationRequest {
  name: string;
  email: string;
  phoneNumber: string;
  message?: string;
  preferredSlot1?: string; // ISO local datetime, e.g. "2026-09-05T14:30:00"
  preferredSlot2?: string;
  preferredSlot3?: string;
}

export interface ConsultationResponse {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  message?: string;
  preferredSlot1?: string;
  preferredSlot2?: string;
  preferredSlot3?: string;
  createdAt: string;
}