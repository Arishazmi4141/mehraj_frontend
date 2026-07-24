// src/services/guest.service.ts

const KEY = "guest_id"; // cart.service.ts ke sath exact match

function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const guestService = {
  getOrCreateGuestId(): string {
    if (typeof window === "undefined") return "";
    let guestId = localStorage.getItem(KEY);
    if (!guestId) {
      guestId = generateUUID();
      localStorage.setItem(KEY, guestId);
    }
    return guestId;
  },
};