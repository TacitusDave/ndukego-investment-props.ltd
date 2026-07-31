"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { updateProperty } from "@/lib/actions";
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

export const AMENITY_GROUPS = [
  {
    label: "Utilities",
    items: [
      "Road Access",
      "Electricity",
      "Solar Power",
      "Generator Backup",
      "Water Supply / Borehole",
      "Drainage System",
      "Internet / Fibre",
    ],
  },
  {
    label: "Security",
    items: [
      "Perimeter Fencing",
      "Security Gate",
      "CCTV Surveillance",
      "Security Post",
      "24/7 Security",
    ],
  },
  {
    label: "Property Features",
    items: [
      "Swimming Pool",
      "Garden / Landscaping",
      "Balcony / Terrace",
      "Garage / Car Park",
      "Gym / Fitness Centre",
      "Air Conditioning",
      "Elevator / Lift",
      "Smart Home System",
      "BQ / Servant Quarters",
    ],
  },
  {
    label: "Community Facilities",
    items: [
      "Golf Course",
      "Club House",
      "Children's Playground",
      "Sports Court",
      "Shopping Complex",
      "School",
      "Place of Worship",
      "Hospital / Clinic",
    ],
  },
  {
    label: "Services",
    items: ["Waste Management", "Estate Management"],
  },
];

interface Property {
  id: string;
  title: string;
  state: string;
  lga: string | null;
  city: string | null;
  description: string | null;
  shortDescription: string | null;
  listingPrice: string | null;
  landSize: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  installmentAllowed: boolean;
  reservationAmount: string | null;
  amenities: string[];
  mapUrl: string | null;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving…" : "Save changes"}
    </Button>
  );
}

export function PropertyEditForm({ property }: { property: Property }) {
  const [amenities, setAmenities] = useState<Set<string>>(
    new Set(property.amenities ?? [])
  );

  const boundAction = updateProperty.bind(null, property.id);
  const [state, action] = useActionState(boundAction, { error: null });

  function toggleAmenity(key: string) {
    setAmenities((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <form action={action} className="space-y-6">
      {state.error && (
        <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
          {state.error}
        </div>
      )}

      {/* Hidden amenities JSON */}
      <input
        type="hidden"
        name="amenitiesJson"
        value={JSON.stringify([...amenities])}
      />

      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={property.title} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="shortDescription">Short description</Label>
        <Input id="shortDescription" name="shortDescription" defaultValue={property.shortDescription ?? ""} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={5} defaultValue={property.description ?? ""} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="state">State</Label>
          <select
            name="state"
            id="state"
            defaultValue={property.state}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lga">LGA</Label>
          <Input id="lga" name="lga" defaultValue={property.lga ?? ""} />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="city">City / Town</Label>
        <Input id="city" name="city" defaultValue={property.city ?? ""} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="listingPrice">Listing price (₦)</Label>
          <Input id="listingPrice" name="listingPrice" type="number" min="0" defaultValue={property.listingPrice ?? ""} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="reservationAmount">Reservation amount (₦)</Label>
          <Input id="reservationAmount" name="reservationAmount" type="number" min="0" defaultValue={property.reservationAmount ?? ""} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="installmentAllowed"
          name="installmentAllowed"
          defaultChecked={property.installmentAllowed}
        />
        <Label htmlFor="installmentAllowed">Installment payment allowed</Label>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="landSize">Land size (sqm)</Label>
          <Input id="landSize" name="landSize" type="number" min="0" defaultValue={property.landSize ?? ""} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input id="bedrooms" name="bedrooms" type="number" min="0" defaultValue={property.bedrooms ?? ""} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input id="bathrooms" name="bathrooms" type="number" min="0" defaultValue={property.bathrooms ?? ""} />
        </div>
      </div>

      {/* Google Maps URL */}
      <div className="space-y-2 rounded-md border bg-muted/30 p-4">
        <Label htmlFor="mapUrl" className="text-sm font-medium">
          Google Maps URL
        </Label>
        <Input
          id="mapUrl"
          name="mapUrl"
          placeholder="Paste the Google Maps URL for this property's location…"
          defaultValue={property.mapUrl ?? ""}
          className="bg-background"
        />
        <p className="text-xs text-muted-foreground">
          Copy the URL from your browser when viewing this property's location on Google Maps.
          Coordinates are auto-extracted and the detail page will show an interactive map.
        </p>
      </div>

      {/* Amenities */}
      <div className="space-y-4 rounded-md border bg-muted/30 p-4">
        <div>
          <p className="text-sm font-medium">Amenities &amp; Features</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Toggle everything available at this property. Checked items appear on the listing.
          </p>
        </div>
        {AMENITY_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              {group.label}
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {group.items.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Checkbox
                    id={`amenity-${item}`}
                    checked={amenities.has(item)}
                    onCheckedChange={() => toggleAmenity(item)}
                  />
                  <Label
                    htmlFor={`amenity-${item}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SubmitButton />
    </form>
  );
}
