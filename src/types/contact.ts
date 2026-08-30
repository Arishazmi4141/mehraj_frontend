// src/types/contact.ts

export interface ContactUsRequest {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export interface ContactUsResponse {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  createdAt: string;
}