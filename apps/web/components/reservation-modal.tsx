"use client";

import { useState } from "react";
import { X, CheckCircle, Loader2, CalendarCheck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

interface Props {
  propertyId: string;
  propertyTitle: string;
  reservationAmount?: string | null;
  onClose: () => void;
}

type Status = "idle" | "submitting" | "success" | "error";

export function ReservationModal({ propertyId, propertyTitle, reservationAmount, onClose }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [refNumber, setRefNumber] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const body = {
      propertyId,
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value.trim(),
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim() || undefined,
    };

    try {
      const res = await fetch(`${API_BASE}/reservations/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg = Array.isArray(data.message) ? data.message.join(", ") : (data.message ?? "Submission failed");
        setErrorMsg(msg);
        setStatus("error");
        return;
      }
      setRefNumber(data.reservationNumber ?? "");
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-lg bg-card rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-5 border-b shrink-0">
          <div>
            <div className="flex items-center gap-2 text-primary mb-0.5">
              <CalendarCheck className="h-4 w-4" />
              <span className="text-sm font-semibold">Reserve this property</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">{propertyTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          {status === "success" ? (
            <div className="p-8 text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">Request submitted!</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Your reservation request has been received. Our team will contact you within 24–48 hours.
                </p>
                {refNumber && (
                  <div className="mt-4 rounded-lg bg-muted p-3 inline-block">
                    <p className="text-xs text-muted-foreground mb-1">Your reference number</p>
                    <p className="font-mono font-bold text-primary">{refNumber}</p>
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {reservationAmount && Number(reservationAmount) > 0 && (
                <div className="rounded-lg bg-secondary/10 border border-secondary/30 px-4 py-3">
                  <p className="text-xs text-muted-foreground">Reservation fee (payable at our office)</p>
                  <p className="text-lg font-bold text-primary">{formatCurrency(reservationAmount)}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-foreground">First name *</label>
                  <input
                    name="firstName"
                    type="text"
                    required
                    placeholder="Chidi"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-foreground">Last name *</label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    placeholder="Obi"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-foreground">Email address *</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-foreground">Phone number *</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="+234 800 000 0000"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-foreground">Message (optional)</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Any questions or specific requirements…"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-destructive rounded-lg bg-destructive/10 px-3 py-2.5">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
                Submit reservation request
              </button>

              <p className="text-center text-xs text-muted-foreground">
                No payment is taken online. Our team will contact you to discuss next steps.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
