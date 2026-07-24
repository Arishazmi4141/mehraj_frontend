"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/src/lib/api-client";

const TOKEN_KEY = "admin_token";
const EMAIL_KEY = "admin_email";

/**
 * Call at the top of every protected admin page (dashboard, orders, products, etc).
 * If there's no session token in this browser, it sends the admin straight
 * back to /admin/login — no flash of protected content first.
 */
export function useRequireAdminAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      router.replace("/admin/login");
    }
  }, [router]);
}

/**
 * Call from inside a catch block after any admin API request.
 * If the failure was an expired/invalid session (401/403), it clears the
 * stored session and redirects to /admin/login, returning true so the
 * caller can skip showing its own error message.
 * Returns false for any other kind of error, so the page can handle it normally.
 */
export function useAdminAuthErrorHandler() {
  const router = useRouter();

  return (err: unknown): boolean => {
    const status = err instanceof ApiError ? err.status : undefined;
    if (status === 401 || status === 403) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(EMAIL_KEY);
      router.replace("/admin/login");
      return true;
    }
    return false;
  };
}