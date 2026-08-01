const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export const API_IMAGE_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000";

export async function publicFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<{ data: T | null; error: string | null }> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      cache: "no-store",
    });
  } catch {
    return { data: null, error: "Cannot reach server" };
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = Array.isArray(body.message)
      ? body.message.join(", ")
      : (body.message ?? `HTTP ${res.status}`);
    return { data: null, error: message };
  }

  const data: T = await res.json();
  return { data, error: null };
}
