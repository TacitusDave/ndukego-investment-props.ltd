"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createEstate } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
  "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa",
  "Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba",
  "Yobe","Zamfara",
];

interface Company {
  id: string;
  name: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Creating…" : "Create estate"}
    </Button>
  );
}

export function EstateForm({ companies }: { companies: Company[] }) {
  const [state, action] = useActionState(createEstate, { error: null });

  return (
    <form action={action} className="space-y-8 max-w-2xl">
      {state.error && (
        <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
          {state.error}
        </div>
      )}

      {/* Company */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground border-b pb-2">Company</h2>
        <div className="grid gap-2">
          <Label htmlFor="companyId">Company *</Label>
          <select
            name="companyId"
            id="companyId"
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select a company…</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Identity */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground border-b pb-2">Identity</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Estate name *</Label>
            <Input id="name" name="name" required placeholder="e.g. Sunrise Gardens" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="code">Estate code *</Label>
            <Input id="code" name="code" required placeholder="e.g. SGE-01" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="shortDescription">Short description</Label>
          <Input id="shortDescription" name="shortDescription" placeholder="One-line summary (optional)" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Full description</Label>
          <Textarea id="description" name="description" rows={4} placeholder="Detailed description of the estate…" />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground border-b pb-2">Location</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="state">State *</Label>
            <select
              name="state"
              id="state"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select a state…</option>
              {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lga">LGA</Label>
            <Input id="lga" name="lga" placeholder="Local government area" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="city">City / Town</Label>
            <Input id="city" name="city" placeholder="City or town" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="district">District</Label>
            <Input id="district" name="district" placeholder="District (optional)" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="community">Community</Label>
            <Input id="community" name="community" placeholder="Community name" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Full address</Label>
          <Input id="address" name="address" placeholder="Street address" />
        </div>
      </div>

      {/* Land info */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground border-b pb-2">Land information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="totalLandSize">Total land size (sqm)</Label>
            <Input id="totalLandSize" name="totalLandSize" type="number" min="0" placeholder="0" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="totalPlots">Total plots</Label>
            <Input id="totalPlots" name="totalPlots" type="number" min="0" placeholder="0" />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <SubmitButton />
        <Button type="button" variant="outline" onClick={() => history.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
