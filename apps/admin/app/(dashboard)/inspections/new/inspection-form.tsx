"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const INSPECTION_TYPES = [
  { value: "INITIAL",     label: "Initial" },
  { value: "FOLLOW_UP",   label: "Follow-up" },
  { value: "PRE_SALE",    label: "Pre-sale" },
  { value: "POST_SALE",   label: "Post-sale" },
  { value: "MAINTENANCE", label: "Maintenance" },
  { value: "COMPLIANCE",  label: "Compliance" },
];

const selectCls =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

export function InspectionForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const [form, setForm] = useState({
    propertyId:  "",
    inspectorId: "",
    customerId:  "",
    type:        "INITIAL",
    scheduledAt: "",
    notes:       "",
  });

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.propertyId.trim() || !form.inspectorId.trim() || !form.scheduledAt) {
      setError("Property ID, inspector ID, and scheduled date are required.");
      return;
    }

    setLoading(true);
    try {
      const body: Record<string, unknown> = {
        propertyId:  form.propertyId.trim(),
        inspectorId: form.inspectorId.trim(),
        type:        form.type,
        scheduledAt: new Date(form.scheduledAt).toISOString(),
      };
      if (form.customerId.trim()) body.customerId = form.customerId.trim();
      if (form.notes.trim())      body.notes      = form.notes.trim();

      const res = await fetch("/api/proxy/inspections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Failed to schedule inspection.");
        return;
      }

      router.push(`/inspections/${data.id}`);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-lg border bg-card p-6 space-y-5">
        <h2 className="text-sm font-semibold text-foreground">Inspection details</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="type">Inspection type</Label>
            <select
              id="type"
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
              className={selectCls}
            >
              {INSPECTION_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="scheduledAt">Scheduled date &amp; time</Label>
            <Input
              id="scheduledAt"
              type="datetime-local"
              value={form.scheduledAt}
              onChange={(e) => set("scheduledAt", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="propertyId">Property ID</Label>
          <Input
            id="propertyId"
            placeholder="e.g. clx1abc2def…"
            value={form.propertyId}
            onChange={(e) => set("propertyId", e.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">UUID of the property to be inspected.</p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="inspectorId">Inspector (Employee ID)</Label>
          <Input
            id="inspectorId"
            placeholder="e.g. clx9xyz…"
            value={form.inspectorId}
            onChange={(e) => set("inspectorId", e.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">UUID of the employee conducting the inspection.</p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="customerId">Customer ID <span className="text-muted-foreground">(optional)</span></Label>
          <Input
            id="customerId"
            placeholder="e.g. clx5cde…"
            value={form.customerId}
            onChange={(e) => set("customerId", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Leave blank if no specific customer is attending.</p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="notes">Notes</Label>
          <textarea
            id="notes"
            rows={3}
            placeholder="Access instructions, preparation notes…"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Scheduling…" : "Schedule inspection"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
