import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<{ data: T; error: null } | { data: null; error: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return { data: null, error: body.message ?? `HTTP ${res.status}` };
  }

  const data: T = await res.json();
  return { data, error: null };
}

export async function apiPost<T>(
  path: string,
  body: unknown,
): Promise<{ data: T; error: null } | { data: null; error: string }> {
  return apiFetch<T>(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function apiPatch<T>(
  path: string,
  body: unknown,
): Promise<{ data: T; error: null } | { data: null; error: string }> {
  return apiFetch<T>(path, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function apiDelete<T>(path: string): Promise<{ data: T; error: null } | { data: null; error: string }> {
  return apiFetch<T>(path, { method: "DELETE" });
}
