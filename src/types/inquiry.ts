export interface ConsultationRequest {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  message?: string;
  preferredSlot1?: string | null;
  preferredSlot2?: string | null;
  preferredSlot3?: string | null;
  createdAt: string;
}

export interface ContactUsRequest {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  message?: string;
  createdAt: string;
}

export interface InquiryPage<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface InquiryFilterParams {
  name?: string;
  fromDate?: string | null; // "yyyy-MM-ddTHH:mm:ss"
  toDate?: string | null;
}