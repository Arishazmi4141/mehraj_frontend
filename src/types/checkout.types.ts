// src/types/checkout.ts

export interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CheckoutResponse {
  razorpayOrderId: string;
  amount: number;
  currency: string;
}

export const emptyCheckoutForm: CheckoutForm = {
  fullName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
};

export function buildAddressString(form: CheckoutForm): string {
  const { addressLine1, addressLine2, city, state, pincode } = form;
  return `${addressLine1}${addressLine2 ? ", " + addressLine2 : ""}, ${city}, ${state} - ${pincode}`;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^\d{10}$/.test(phone);
}

export function isCheckoutFormValid(form: CheckoutForm): boolean {
  return !!(
    form.fullName?.trim() &&
    form.email?.trim() &&
    isValidEmail(form.email) &&
    form.phone?.trim() &&
    isValidPhone(form.phone) &&
    form.addressLine1?.trim() &&
    form.city?.trim() &&
    form.state?.trim() &&
    form.pincode?.trim() &&
    form.pincode.length === 6
  );
}