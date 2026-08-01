"use client";

import { useState, useEffect, useTransition } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { updateProfile } from "@/lib/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

function getToken(): string | null {
  if (typeof document === "undefined") return null;
  return document.cookie.split("; ").find((c) => c.startsWith("web_access_token="))?.split("=")[1] ?? null;
}

interface Profile {
  id: string;
  customerNumber: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string;
  city: string | null;
  state: string | null;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    const token = getToken();
    if (!token) { setLoading(false); return; }

    fetch(`${API_BASE}/auth/customer/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((data) => {
        setProfile(data);
        setForm({
          firstName: data.firstName ?? "",
          lastName: data.lastName ?? "",
          phone: data.phone ?? "",
          city: data.city ?? "",
          state: data.state ?? "",
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSuccess(false);
    setError(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      const result = await updateProfile(form);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setProfile((prev) => prev ? { ...prev, ...form } : prev);
      }
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const NIGERIAN_STATES = [
    "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
    "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
    "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nassarawa",
    "Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba",
    "Yobe","Zamfara",
  ];

  return (
    <div className="space-y-5 max-w-lg">
      <div>
        <h1 className="text-xl font-bold">My Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Update your personal information</p>
      </div>

      {profile?.customerNumber && (
        <p className="text-xs text-muted-foreground font-mono">
          Customer ID: {profile.customerNumber}
        </p>
      )}

      <form onSubmit={handleSubmit} className="rounded-xl border bg-card p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="firstName" className="block text-sm font-medium">First name</label>
            <input
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="lastName" className="block text-sm font-medium">Last name</label>
            <input
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Email address</label>
          <input
            value={profile?.email ?? ""}
            disabled
            className="w-full rounded-lg border border-input bg-muted px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground">Email cannot be changed. Contact support if needed.</p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="phone" className="block text-sm font-medium">Phone number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="city" className="block text-sm font-medium">City</label>
            <input
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="e.g. Enugu"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="state" className="block text-sm font-medium">State</label>
            <select
              id="state"
              name="state"
              value={form.state}
              onChange={(e) => { setForm((p) => ({ ...p, state: e.target.value })); setSuccess(false); }}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select state</option>
              {NIGERIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>
        )}
        {success && (
          <div className="flex items-center gap-2 text-sm text-green-400 border border-green-700/30 bg-green-900/20 rounded-lg px-3 py-2">
            <CheckCircle className="h-4 w-4" />
            Profile updated successfully.
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#C1121F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#D62839] transition-colors disabled:opacity-60"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          Save changes
        </button>
      </form>
    </div>
  );
}
