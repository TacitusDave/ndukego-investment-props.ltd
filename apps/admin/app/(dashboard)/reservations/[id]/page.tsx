"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { ChevronLeft, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";

interface Reservation {
  id: string;
  reservationNumber: string;
  status: string;
  reservationAmount: string;
  currency: string;
  reservedAt: string;
  expiresAt: string;
  confirmedAt: string | null;
  cancelledAt: string | null;
  cancellationReason: string | null;
  notes: string | null;
  customer: {
    id: string;
    customerNumber: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    phone: string;
    whatsapp: string | null;
    status: string;
  };
  property: {
    id: string;
    title: string;
    state: string;
    city: string | null;
    listingPrice: string | null;
    reservationAmount: string | null;
    category: string;
    type: string;
    media: { url: string }[];
  };
}

const STATUS_CONFIG: Record<string, { label: string; badgeClass: string }> = {
  PENDING:           { label: "Pending Review",   badgeClass: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400" },
  CONFIRMED:         { label: "Confirmed",         badgeClass: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400" },
  EXPIRED:           { label: "Expired",           badgeClass: "bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-500" },
  CANCELLED:         { label: "Cancelled",         badgeClass: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  CONVERTED_TO_SALE: { label: "Converted to Sale", badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400" },
};

const TRANSITIONS: Record<string, { status: string; label: string; variant: "confirm" | "cancel" }[]> = {
  PENDING: [
    { status: "CONFIRMED", label: "Confirm reservation", variant: "confirm" },
    { status: "CANCELLED", label: "Cancel reservation", variant: "cancel" },
  ],
  CONFIRMED: [
    { status: "CONVERTED_TO_SALE", label: "Mark as converted to sale", variant: "confirm" },
    { status: "CANCELLED", label: "Cancel reservation", variant: "cancel" },
  ],
};

export default function ReservationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState("");
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  useEffect(() => {
    params.then(({ id: resolvedId }) => {
      setId(resolvedId);
      fetch(`/api/proxy/reservations/${resolvedId}`, { cache: "no-store" })
        .then(async (r) => { if (r.ok) { const d = await r.json(); if (d?.id) setReservation(d); } })
        .catch(() => {})
        .finally(() => setLoading(false));
    });
  }, [params]);

  function updateStatus(status: string) {
    if (!id) return;
    startTransition(async () => {
      const res = await fetch(`/api/proxy/reservations/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes: notes || undefined }),
      });
      if (res.ok) {
        const updated = await res.json();
        setReservation((prev) => prev ? { ...prev, status: updated.status, confirmedAt: updated.confirmedAt, cancelledAt: updated.cancelledAt } : prev);
        setFeedback({ type: "success", msg: `Status updated to ${STATUS_CONFIG[status]?.label ?? status}` });
        setNotes("");
      } else {
        const body = await res.json().catch(() => ({}));
        setFeedback({ type: "error", msg: body.message ?? "Update failed" });
      }
    });
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Reservation not found.</p>
        <Link href="/reservations" className="mt-4 inline-block text-sm text-secondary hover:underline">
          ← Back to reservations
        </Link>
      </div>
    );
  }

  const cfg = STATUS_CONFIG[reservation.status] ?? { label: reservation.status, badgeClass: "bg-gray-100 text-gray-600" };
  const transitions = TRANSITIONS[reservation.status] ?? [];
  const customerName = [reservation.customer.firstName, reservation.customer.lastName].filter(Boolean).join(" ") || "—";

  return (
    <div className="p-6 space-y-5 max-w-4xl">
      {/* Breadcrumb */}
      <Link href="/reservations" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ChevronLeft className="h-4 w-4" />
        Reservations
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.badgeClass}`}>
              {cfg.label}
            </span>
            <span className="font-mono text-xs text-muted-foreground">{reservation.reservationNumber}</span>
          </div>
          <h1 className="text-xl font-bold">{reservation.property.title}</h1>
          <p className="text-sm text-muted-foreground">
            {reservation.property.city ? `${reservation.property.city}, ` : ""}{reservation.property.state}
          </p>
        </div>
        <Link
          href={`/properties/${reservation.property.id}`}
          className="shrink-0 rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors"
        >
          View property →
        </Link>
      </div>

      {feedback && (
        <div className={`rounded-lg border px-4 py-3 text-sm flex items-center gap-2 ${feedback.type === "success" ? "border-green-700/30 bg-green-900/20 text-green-400" : "border-destructive/30 bg-destructive/10 text-destructive"}`}>
          {feedback.type === "success" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          {feedback.msg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Customer */}
        <div className="rounded-xl border bg-card p-5 space-y-3">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Customer</h2>
          <div className="space-y-1">
            <p className="font-semibold">{customerName}</p>
            <p className="text-sm text-muted-foreground">{reservation.customer.email}</p>
            <p className="text-sm text-muted-foreground">{reservation.customer.phone}</p>
            {reservation.customer.whatsapp && (
              <p className="text-sm text-muted-foreground">WhatsApp: {reservation.customer.whatsapp}</p>
            )}
            <p className="text-xs text-muted-foreground font-mono">{reservation.customer.customerNumber}</p>
          </div>
          <Link
            href={`/customers/${reservation.customer.id}`}
            className="text-sm text-secondary hover:underline"
          >
            View customer profile →
          </Link>
        </div>

        {/* Reservation details */}
        <div className="rounded-xl border bg-card p-5 space-y-3">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Reservation Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cfg.badgeClass}`}>{cfg.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reserved on</span>
              <span>{formatDate(reservation.reservedAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expires</span>
              <span className={reservation.status === "PENDING" ? "text-amber-500" : ""}>{formatDate(reservation.expiresAt)}</span>
            </div>
            {reservation.confirmedAt && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confirmed</span>
                <span className="text-green-500">{formatDate(reservation.confirmedAt)}</span>
              </div>
            )}
            {reservation.cancelledAt && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cancelled</span>
                <span className="text-red-400">{formatDate(reservation.cancelledAt)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reservation fee</span>
              <span className="font-semibold">
                {Number(reservation.reservationAmount) > 0
                  ? formatCurrency(reservation.reservationAmount)
                  : "—"}
              </span>
            </div>
            {reservation.property.listingPrice && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Listing price</span>
                <span className="font-semibold text-secondary">{formatCurrency(reservation.property.listingPrice)}</span>
              </div>
            )}
          </div>
          {reservation.notes && (
            <div className="border-t pt-3">
              <p className="text-xs text-muted-foreground mb-1">Customer message</p>
              <p className="text-sm">{reservation.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      {transitions.length > 0 && (
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <h2 className="font-semibold">Update Status</h2>
          <div className="space-y-2">
            <label className="block text-sm text-muted-foreground">
              Add a note (optional — sent to customer with status update)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Reason for decision, next steps, contact time…"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {transitions.map((t) => (
              <button
                key={t.status}
                onClick={() => updateStatus(t.status)}
                disabled={isPending}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60 ${
                  t.variant === "confirm"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : t.variant === "confirm" ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
