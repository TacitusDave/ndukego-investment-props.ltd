"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { ChevronLeft, CheckCircle, XCircle, Loader2, CreditCard } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";

interface Payment {
  id: string;
  amount: string;
  currency: string;
  transactionDate: string;
  method: string;
  reference: string | null;
  notes: string | null;
}

interface Sale {
  id: string;
  saleNumber: string;
  status: string;
  type: string;
  salePrice: string;
  discountAmount: string;
  finalPrice: string;
  currency: string;
  totalPaid: string;
  balanceDue: string;
  installmentMonths: number | null;
  downPayment: string | null;
  contractDate: string | null;
  approvedAt: string | null;
  notes: string | null;
  createdAt: string;
  property: {
    id: string;
    title: string;
    state: string;
    city: string | null;
    category: string;
    type: string;
  };
  customer: {
    id: string;
    customerNumber: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    phone: string;
    whatsapp: string | null;
  };
  reservation: {
    id: string;
    reservationNumber: string;
    reservationAmount: string;
  } | null;
  salesAgent: {
    id: string;
    firstName: string;
    lastName: string;
    jobTitle: string | null;
  } | null;
  payments: Payment[];
}

const STATUS_CONFIG: Record<string, { label: string; badgeClass: string }> = {
  DRAFT:            { label: "Draft",            badgeClass: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400" },
  PENDING_APPROVAL: { label: "Pending Approval", badgeClass: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400" },
  APPROVED:         { label: "Approved",         badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400" },
  ACTIVE:           { label: "Active",           badgeClass: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400" },
  DISPUTED:         { label: "Disputed",         badgeClass: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-400" },
  COMPLETED:        { label: "Completed",        badgeClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400" },
  CANCELLED:        { label: "Cancelled",        badgeClass: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
};

const TRANSITIONS: Record<string, { status: string; label: string; variant: "confirm" | "warn" | "cancel" }[]> = {
  DRAFT:            [
    { status: "PENDING_APPROVAL", label: "Submit for approval",   variant: "confirm" },
    { status: "CANCELLED",        label: "Cancel sale",           variant: "cancel" },
  ],
  PENDING_APPROVAL: [
    { status: "APPROVED",   label: "Approve sale",    variant: "confirm" },
    { status: "CANCELLED",  label: "Reject / Cancel", variant: "cancel" },
  ],
  APPROVED:         [
    { status: "ACTIVE",    label: "Mark as active",  variant: "confirm" },
    { status: "CANCELLED", label: "Cancel sale",     variant: "cancel" },
  ],
  ACTIVE:           [
    { status: "COMPLETED", label: "Mark as completed", variant: "confirm" },
    { status: "DISPUTED",  label: "Flag as disputed",  variant: "warn" },
    { status: "CANCELLED", label: "Cancel sale",       variant: "cancel" },
  ],
  DISPUTED:         [
    { status: "ACTIVE",    label: "Resume sale",   variant: "confirm" },
    { status: "CANCELLED", label: "Cancel sale",   variant: "cancel" },
  ],
};

export default function SaleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState("");
  const [sale, setSale] = useState<Sale | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  useEffect(() => {
    params.then(({ id: resolvedId }) => {
      setId(resolvedId);
      fetch(`/api/proxy/sales/${resolvedId}`, { cache: "no-store" })
        .then(async (r) => { if (r.ok) { const d = await r.json(); if (d?.id) setSale(d); } })
        .catch(() => {})
        .finally(() => setLoading(false));
    });
  }, [params]);

  function updateStatus(status: string) {
    if (!id) return;
    startTransition(async () => {
      const res = await fetch(`/api/proxy/sales/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes: notes || undefined }),
      });
      if (res.ok) {
        const updated = await res.json();
        setSale((prev) => prev ? { ...prev, status: updated.status, approvedAt: updated.approvedAt } : prev);
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

  if (!sale) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Sale not found.</p>
        <Link href="/sales" className="mt-4 inline-block text-sm text-secondary hover:underline">
          ← Back to sales
        </Link>
      </div>
    );
  }

  const cfg = STATUS_CONFIG[sale.status] ?? { label: sale.status, badgeClass: "bg-gray-100 text-gray-600" };
  const transitions = TRANSITIONS[sale.status] ?? [];
  const customerName = [sale.customer.firstName, sale.customer.lastName].filter(Boolean).join(" ") || "—";
  const agentName = sale.salesAgent
    ? [sale.salesAgent.firstName, sale.salesAgent.lastName].filter(Boolean).join(" ")
    : null;
  const balanceDue = Number(sale.balanceDue);
  const discount = Number(sale.discountAmount);

  return (
    <div className="p-6 space-y-5 max-w-4xl">
      {/* Breadcrumb */}
      <Link href="/sales" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ChevronLeft className="h-4 w-4" />
        Sales
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.badgeClass}`}>
              {cfg.label}
            </span>
            <span className="font-mono text-xs text-muted-foreground">{sale.saleNumber}</span>
          </div>
          <h1 className="text-xl font-bold">{sale.property.title}</h1>
          <p className="text-sm text-muted-foreground">
            {sale.property.city ? `${sale.property.city}, ` : ""}{sale.property.state}
          </p>
        </div>
        <Link
          href={`/properties/${sale.property.id}`}
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
            <p className="text-sm text-muted-foreground">{sale.customer.email}</p>
            <p className="text-sm text-muted-foreground">{sale.customer.phone}</p>
            {sale.customer.whatsapp && (
              <p className="text-sm text-muted-foreground">WhatsApp: {sale.customer.whatsapp}</p>
            )}
            <p className="text-xs text-muted-foreground font-mono">{sale.customer.customerNumber}</p>
          </div>
          <Link href={`/customers/${sale.customer.id}`} className="text-sm text-secondary hover:underline">
            View customer profile →
          </Link>
        </div>

        {/* Financials */}
        <div className="rounded-xl border bg-card p-5 space-y-3">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Financials</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sale price</span>
              <span>{formatCurrency(sale.salePrice)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-red-500">- {formatCurrency(sale.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Final price</span>
              <span className="text-primary">{formatCurrency(sale.finalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total paid</span>
              <span className="text-green-600 dark:text-green-400">{formatCurrency(sale.totalPaid)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-muted-foreground">Balance due</span>
              <span className={balanceDue > 0 ? "text-amber-600 dark:text-amber-400" : "text-green-600 dark:text-green-400"}>
                {balanceDue > 0 ? formatCurrency(sale.balanceDue) : "Fully paid"}
              </span>
            </div>
            {sale.downPayment && Number(sale.downPayment) > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Down payment</span>
                <span>{formatCurrency(sale.downPayment)}</span>
              </div>
            )}
            {sale.installmentMonths && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Installment period</span>
                <span>{sale.installmentMonths} months</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sale details */}
      <div className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Sale Details</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Type</p>
            <p className="font-medium capitalize">{sale.type.toLowerCase()}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Created</p>
            <p className="font-medium">{formatDate(sale.createdAt)}</p>
          </div>
          {sale.approvedAt && (
            <div>
              <p className="text-muted-foreground text-xs mb-0.5">Approved</p>
              <p className="font-medium text-green-600 dark:text-green-400">{formatDate(sale.approvedAt)}</p>
            </div>
          )}
          {sale.contractDate && (
            <div>
              <p className="text-muted-foreground text-xs mb-0.5">Contract date</p>
              <p className="font-medium">{formatDate(sale.contractDate)}</p>
            </div>
          )}
          {agentName && (
            <div>
              <p className="text-muted-foreground text-xs mb-0.5">Sales agent</p>
              <p className="font-medium">{agentName}</p>
              {sale.salesAgent?.jobTitle && (
                <p className="text-xs text-muted-foreground">{sale.salesAgent.jobTitle}</p>
              )}
            </div>
          )}
          {sale.reservation && (
            <div>
              <p className="text-muted-foreground text-xs mb-0.5">From reservation</p>
              <Link
                href={`/reservations/${sale.reservation.id}`}
                className="font-mono text-xs text-secondary hover:underline"
              >
                {sale.reservation.reservationNumber}
              </Link>
            </div>
          )}
        </div>
        {sale.notes && (
          <div className="border-t pt-3">
            <p className="text-xs text-muted-foreground mb-1">Notes</p>
            <p className="text-sm">{sale.notes}</p>
          </div>
        )}
      </div>

      {/* Payments */}
      {sale.payments.length > 0 && (
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="px-5 py-4 flex items-center gap-2 border-b">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold text-sm">Payment History</h2>
            <span className="ml-auto text-xs text-muted-foreground">{sale.payments.length} payment{sale.payments.length !== 1 ? "s" : ""}</span>
          </div>
          <div className="divide-y">
            {sale.payments.map((p) => (
              <div key={p.id} className="px-5 py-3 flex items-center justify-between gap-4 text-sm">
                <div>
                  <p className="font-medium">{formatCurrency(p.amount)}</p>
                  <p className="text-xs text-muted-foreground">{p.method}{p.reference ? ` · ${p.reference}` : ""}</p>
                  {p.notes && <p className="text-xs text-muted-foreground">{p.notes}</p>}
                </div>
                <p className="text-xs text-muted-foreground shrink-0">{formatDate(p.transactionDate)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status transitions */}
      {transitions.length > 0 && (
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <h2 className="font-semibold">Update Status</h2>
          <div className="space-y-2">
            <label className="block text-sm text-muted-foreground">
              Notes (optional — recorded with the status change)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Reason for decision, next steps, additional context…"
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
                    : t.variant === "warn"
                    ? "bg-orange-500 text-white hover:bg-orange-600"
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
