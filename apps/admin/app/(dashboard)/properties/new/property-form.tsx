"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createProperty } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
  "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa",
  "Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba",
  "Yobe","Zamfara",
];

const CATEGORIES = [
  { value: "LAND", label: "Land" },
  { value: "HOUSE", label: "House" },
  { value: "DUPLEX", label: "Duplex" },
  { value: "BUNGALOW", label: "Bungalow" },
  { value: "APARTMENT", label: "Apartment" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "WAREHOUSE", label: "Warehouse" },
  { value: "OFFICE", label: "Office" },
  { value: "SHOP", label: "Shop" },
  { value: "HOTEL", label: "Hotel" },
  { value: "ESTATE_PLOT", label: "Estate Plot" },
  { value: "FARM_LAND", label: "Farm Land" },
  { value: "MIXED_USE", label: "Mixed Use" },
  { value: "INDUSTRIAL", label: "Industrial" },
  { value: "LUXURY_HOME", label: "Luxury Home" },
  { value: "PROJECT_DEVELOPMENT", label: "Project Development" },
];

const TYPES = [
  { value: "RESIDENTIAL", label: "Residential" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "INDUSTRIAL", label: "Industrial" },
  { value: "AGRICULTURAL", label: "Agricultural" },
  { value: "INVESTMENT", label: "Investment" },
  { value: "MIXED_USE", label: "Mixed Use" },
];

interface Estate {
  id: string;
  name: string;
  code: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Creating…" : "Create property"}
    </Button>
  );
}

export function PropertyForm({ estates }: { estates: Estate[] }) {
  const [state, action] = useActionState(createProperty, { error: null });

  return (
    <form action={action} className="space-y-8 max-w-2xl">
      {state.error && (
        <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
          {state.error}
        </div>
      )}

      {/* Estate association */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground border-b pb-2">Estate</h2>
        <div className="grid gap-2">
          <Label htmlFor="estateId">Estate *</Label>
          <select
            name="estateId"
            id="estateId"
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select an estate…</option>
            {estates.map((e) => (
              <option key={e.id} value={e.id}>{e.name} ({e.code})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Core details */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground border-b pb-2">Details</h2>
        <div className="grid gap-2">
          <Label htmlFor="title">Property title *</Label>
          <Input id="title" name="title" required placeholder="e.g. 3-Bedroom Detached House, Block A Plot 12" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="category">Category *</Label>
            <select
              name="category"
              id="category"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select category…</option>
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Type *</Label>
            <select
              name="type"
              id="type"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select type…</option>
              {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="shortDescription">Short description</Label>
          <Input id="shortDescription" name="shortDescription" placeholder="One-line summary" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Full description</Label>
          <Textarea id="description" name="description" rows={4} placeholder="Full property description…" />
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
        <div className="grid gap-2">
          <Label htmlFor="city">City / Town</Label>
          <Input id="city" name="city" placeholder="City or town" />
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground border-b pb-2">Pricing</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="listingPrice">Listing price (₦)</Label>
            <Input id="listingPrice" name="listingPrice" type="number" min="0" placeholder="0" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reservationAmount">Reservation amount (₦)</Label>
            <Input id="reservationAmount" name="reservationAmount" type="number" min="0" placeholder="0" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="installmentAllowed" name="installmentAllowed" />
          <Label htmlFor="installmentAllowed">Installment payment allowed</Label>
        </div>
      </div>

      {/* Physical */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground border-b pb-2">Physical attributes</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="landSize">Land size (sqm)</Label>
            <Input id="landSize" name="landSize" type="number" min="0" placeholder="0" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input id="bedrooms" name="bedrooms" type="number" min="0" placeholder="0" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input id="bathrooms" name="bathrooms" type="number" min="0" placeholder="0" />
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
