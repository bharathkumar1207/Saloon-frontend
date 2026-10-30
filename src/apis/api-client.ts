export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";
const TOKEN_STORAGE_KEY = "saloon_admin_token";

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } catch {
    // ignore (private browsing etc.)
  }
}

export function clearStoredToken(): void {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    // ignore
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  auth?: boolean;
};

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function apiClient<TResponse>(
  path: string,
  { method = "GET", body, auth = false }: RequestOptions = {},
): Promise<TResponse> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (auth) {
    const token = getStoredToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return undefined as TResponse;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "error" in data
        ? String((data as { error: unknown }).error)
        : `Request to ${path} failed with status ${response.status}`;
    throw new ApiError(response.status, message);
  }

  return data as TResponse;
}

export function adminApiClient<TResponse>(
  path: string,
  options: Omit<RequestOptions, "auth"> = {},
): Promise<TResponse> {
  return apiClient<TResponse>(path, { ...options, auth: true });
}

// For multipart/form-data uploads — deliberately doesn't set Content-Type
// so the browser can add the correct multipart boundary itself.
export async function uploadFile<TResponse>(path: string, file: File): Promise<TResponse> {
  const headers: Record<string, string> = {};
  const token = getStoredToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers,
    body: formData,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "error" in data
        ? String((data as { error: unknown }).error)
        : `Upload to ${path} failed with status ${response.status}`;
    throw new ApiError(response.status, message);
  }

  return data as TResponse;
}

// image_url from the API is a relative path like "/uploads/xyz.jpg" — the
// backend serves it from its own origin, not the frontend's.
export function resolveImageUrl(imageUrl: string | null): string | null {
  if (!imageUrl) return null;
  return `${API_BASE_URL}${imageUrl}`;
}
