"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export interface WebUser {
  id: string;
  email: string;
  type: string;
  customerId: string;
  firstName: string | null;
  lastName: string | null;
}

function setAuthCookies(cookieStore: Awaited<ReturnType<typeof cookies>>, tokens: {
  accessToken: string;
  refreshToken: string;
  user: WebUser;
}) {
  cookieStore.set("web_access_token", tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60,
    path: "/",
  });
  cookieStore.set("web_refresh_token", tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
  cookieStore.set(
    "web_user_info",
    JSON.stringify({
      id: tokens.user.id,
      email: tokens.user.email,
      customerId: tokens.user.customerId,
      firstName: tokens.user.firstName,
      lastName: tokens.user.lastName,
    }),
    {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    },
  );
}

export async function webLogin(email: string, password: string) {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/auth/customer/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });
  } catch {
    return { error: "Cannot connect to server. Please try again." };
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = Array.isArray(body.message) ? body.message.join(", ") : (body.message ?? "Login failed");
    return { error: msg };
  }

  const data = await res.json();

  if (data.user?.type !== "CUSTOMER") {
    return { error: "Invalid account type. Please use the staff portal." };
  }

  const cookieStore = await cookies();
  setAuthCookies(cookieStore, {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    user: data.user,
  });

  return { error: null };
}

export async function webRegister(input: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}) {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/auth/customer/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      cache: "no-store",
    });
  } catch {
    return { error: "Cannot connect to server. Please try again." };
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = Array.isArray(body.message) ? body.message.join(", ") : (body.message ?? "Registration failed");
    return { error: msg };
  }

  const data = await res.json();

  const cookieStore = await cookies();
  setAuthCookies(cookieStore, {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    user: data.user,
  });

  return { error: null };
}

export async function webLogout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("web_access_token")?.value;
  if (token) {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }).catch(() => {});
  }
  cookieStore.delete("web_access_token");
  cookieStore.delete("web_refresh_token");
  cookieStore.delete("web_user_info");
  redirect("/");
}

export async function updateProfile(data: {
  firstName?: string;
  lastName?: string;
  phone?: string;
  city?: string;
  state?: string;
}) {
  const session = await getWebSession();
  if (!session) return { error: "Not authenticated" };

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/auth/customer/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });
  } catch {
    return { error: "Cannot connect to server. Please try again." };
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = Array.isArray(body.message) ? body.message.join(", ") : (body.message ?? "Update failed");
    return { error: msg };
  }

  return { error: null };
}

export async function getWebSession(): Promise<{ token: string; user: WebUser } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("web_access_token")?.value;
  const userInfoStr = cookieStore.get("web_user_info")?.value;
  if (!token || !userInfoStr) return null;
  try {
    return { token, user: JSON.parse(userInfoStr) as WebUser };
  } catch {
    return null;
  }
}
