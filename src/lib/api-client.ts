// src/lib/api-client.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:8000/api';
export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'http://localhost:8080';

// ✅ Naya — status code aur response body dono carry karega
export class ApiError extends Error {
  status: number;
  body: string;

  constructor(status: number, body: string, statusText: string) {
    super(body || statusText || `API Error: ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export async function requestAPI<T = any>(
  endpoint: string, 
  options: Omit<RequestInit, 'headers'> & { headers?: Record<string, string> } = {}, 
  isTextResponse = false
): Promise<T> {
  const headers = new Headers();
  
  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (options.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      headers.set(key, value);
    });
  }

  const config: RequestInit = {
    ...options,
    headers,
    cache: "no-store",
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    // ✅ Response body ko text ke roop mein padho — backend ka asli error message yahi hoga
    const errorBody = await response.text().catch(() => "");
    throw new ApiError(response.status, errorBody, response.statusText);
  }

  if (isTextResponse) {
    return (await response.text()) as unknown as T;
  }

  return response.json();
}