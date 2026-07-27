"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value ?? null;
}

async function authPost(path: string, body: Record<string, unknown>) {
  const token = await getAuthToken();
  if (!token) return { error: "Not authenticated" };

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    return { error: "Cannot reach API server. Is it running?" };
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = Array.isArray(json.message)
      ? json.message.join(", ")
      : (json.message ?? `HTTP ${res.status}`);
    return { error: message };
  }
  return { data: json, error: null };
}

async function authPatch(path: string, body: Record<string, unknown>) {
  const token = await getAuthToken();
  if (!token) return { error: "Not authenticated" };

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    return { error: "Cannot reach API server. Is it running?" };
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = Array.isArray(json.message)
      ? json.message.join(", ")
      : (json.message ?? `HTTP ${res.status}`);
    return { error: message };
  }
  return { data: json, error: null };
}

function num(val: FormDataEntryValue | null) {
  if (!val || val === "") return undefined;
  const n = Number(val);
  return isNaN(n) ? undefined : n;
}

function str(val: FormDataEntryValue | null) {
  if (!val || val === "") return undefined;
  return String(val);
}

export async function createEstate(prevState: { error: string | null }, formData: FormData) {
  const body: Record<string, unknown> = {
    companyId: str(formData.get("companyId")),
    name: str(formData.get("name")),
    code: str(formData.get("code")),
    state: str(formData.get("state")),
    description: str(formData.get("description")),
    shortDescription: str(formData.get("shortDescription")),
    lga: str(formData.get("lga")),
    city: str(formData.get("city")),
    district: str(formData.get("district")),
    community: str(formData.get("community")),
    address: str(formData.get("address")),
    totalLandSize: num(formData.get("totalLandSize")),
    totalPlots: num(formData.get("totalPlots")),
  };

  const { data, error } = await authPost("/estates", body);
  if (error) return { error };

  redirect(`/estates/${(data as { id: string }).id}`);
}

export async function createProperty(prevState: { error: string | null }, formData: FormData) {
  const body: Record<string, unknown> = {
    estateId: str(formData.get("estateId")),
    title: str(formData.get("title")),
    category: str(formData.get("category")),
    type: str(formData.get("type")),
    state: str(formData.get("state")),
    lga: str(formData.get("lga")),
    city: str(formData.get("city")),
    description: str(formData.get("description")),
    shortDescription: str(formData.get("shortDescription")),
    listingPrice: num(formData.get("listingPrice")),
    landSize: num(formData.get("landSize")),
    bedrooms: num(formData.get("bedrooms")),
    bathrooms: num(formData.get("bathrooms")),
    installmentAllowed: formData.get("installmentAllowed") === "on",
    reservationAmount: num(formData.get("reservationAmount")),
  };

  const { data, error } = await authPost("/properties", body);
  if (error) return { error };

  redirect(`/properties/${(data as { id: string }).id}`);
}

export async function transitionPropertyStatus(
  id: string,
  status: string,
  reason?: string,
) {
  const { error } = await authPost(`/properties/${id}/status`, { status, reason });
  if (error) return { error };
  return { error: null };
}

export async function updateProperty(
  id: string,
  prevState: { error: string | null },
  formData: FormData,
) {
  const body: Record<string, unknown> = {
    title: str(formData.get("title")),
    state: str(formData.get("state")),
    lga: str(formData.get("lga")),
    city: str(formData.get("city")),
    description: str(formData.get("description")),
    shortDescription: str(formData.get("shortDescription")),
    listingPrice: num(formData.get("listingPrice")),
    landSize: num(formData.get("landSize")),
    bedrooms: num(formData.get("bedrooms")),
    bathrooms: num(formData.get("bathrooms")),
    installmentAllowed: formData.get("installmentAllowed") === "on",
    reservationAmount: num(formData.get("reservationAmount")),
  };

  const { error } = await authPatch(`/properties/${id}`, body);
  if (error) return { error };
  return { error: null };
}
