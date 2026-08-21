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
  latitude: string | null;
  longitude: string | null;
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
  const [state, action] = useActionState(boundAction, { error: null, success: false });

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
      {!state.error && state.success && (
        <div className="rounded-md bg-green-50 border border-green-200 p-4 text-sm text-green-700">
          Changes saved successfully.
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

      {/* Location */}
      <div className="space-y-3 rounded-md border bg-muted/30 p-4">
        <div>
          <p className="text-sm font-medium">Location &amp; Map</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Enter coordinates directly, or paste a Google Maps URL and they will be auto-extracted.
            Coordinates take priority over the URL when both are filled in.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              name="latitude"
              type="text"
              placeholder="e.g. 9.0538"
              defaultValue={property.latitude ?? ""}
              className="bg-background"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              name="longitude"
              type="text"
              placeholder="e.g. 7.4928"
              defaultValue={property.longitude ?? ""}
              className="bg-background"
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="mapUrl">Google Maps URL <span className="text-muted-foreground font-normal">(optional)</span></Label>
          <Input
            id="mapUrl"
            name="mapUrl"
            placeholder="Paste a Google Maps link to this location…"
            defaultValue={property.mapUrl ?? ""}
            className="bg-background"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          To get coordinates: open Google Maps, right-click on the exact location, and copy the lat/lng shown at the top of the menu.
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
