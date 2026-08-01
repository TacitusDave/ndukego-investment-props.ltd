"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

interface InquiryFormProps {
  propertyId?: string;
  propertyTitle?: string;
  defaultMessage?: string;
}

export function InquiryForm({ propertyId, propertyTitle, defaultMessage }: InquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      propertyId,
      propertyTitle,
    };

    try {
      const res = await fetch(`${API_BASE}/properties/public/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.message ?? "Failed to submit inquiry. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Unable to connect. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
        <CheckCircle className="h-12 w-12 text-green-500" />
        <h3 className="font-semibold text-lg">Inquiry received!</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Thank you for your interest. Our team will be in touch with you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label htmlFor="firstName" className="text-xs font-medium text-muted-foreground">First name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First name"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="lastName" className="text-xs font-medium text-muted-foreground">Last name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last name"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="text-xs font-medium text-muted-foreground">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="phone" className="text-xs font-medium text-muted-foreground">Phone *</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="080XXXXXXXX"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="message" className="text-xs font-medium text-muted-foreground">Message</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          defaultValue={defaultMessage ?? ""}
          placeholder="Tell us what you're looking for…"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
        ) : (
          <><Send className="h-4 w-4" /> Send inquiry</>
        )}
      </button>

      <p className="text-[11px] text-center text-muted-foreground">
        By submitting, you agree we may contact you about this property.
      </p>
    </form>
  );
}
