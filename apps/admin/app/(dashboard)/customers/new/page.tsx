"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ChevronLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createCustomer } from "@/lib/actions";

const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
  "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa",
  "Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba",
  "Yobe","Zamfara",
];

const LEAD_SOURCES = [
  "Walk-in", "Referral", "Social media", "Website", "Email campaign",
  "Phone inquiry", "Property exhibition", "Agent", "Billboard", "Other",
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Creating…" : "Create customer"}
    </Button>
  );
}

function CustomerForm() {
  const [state, action] = useActionState(createCustomer, { error: null });

  return (
    <form action={action} className="space-y-8 max-w-2xl">
      {state.error && (
        <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
          {state.error}
        </div>
      )}

      {/* Type */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold border-b pb-2">Customer type</h2>
        <div className="grid gap-2">
          <Label htmlFor="type">Type</Label>
          <select name="type" id="type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <option value="INDIVIDUAL">Individual</option>
            <option value="CORPORATE">Corporate</option>
            <option value="INVESTOR">Investor</option>
            <option value="AGENT">Agent</option>
          </select>
        </div>
      </div>

      {/* Identity */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold border-b pb-2">Identity</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" name="firstName" placeholder="First name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="middleName">Middle name</Label>
            <Input id="middleName" name="middleName" placeholder="Middle name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" name="lastName" placeholder="Last name" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="companyName">Company name</Label>
          <Input id="companyName" name="companyName" placeholder="For corporate customers" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input id="occupation" name="occupation" placeholder="e.g. Business owner, Engineer" />
        </div>
      </div>

      {/* Contact */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold border-b pb-2">Contact</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" type="email" required placeholder="email@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input id="phone" name="phone" required placeholder="080XXXXXXXX" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input id="whatsapp" name="whatsapp" placeholder="080XXXXXXXX" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="alternatePhone">Alternate phone</Label>
            <Input id="alternatePhone" name="alternatePhone" placeholder="080XXXXXXXX" />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold border-b pb-2">Location</h2>
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" placeholder="Street address" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" placeholder="City" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="state">State</Label>
            <select name="state" id="state" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option value="">Select a state…</option>
              {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* CRM */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold border-b pb-2">Lead information</h2>
        <div className="grid gap-2">
          <Label htmlFor="leadSource">Lead source</Label>
          <select name="leadSource" id="leadSource" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <option value="">Select source…</option>
            {LEAD_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" rows={3} placeholder="Internal notes about this customer…" />
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

export default function NewCustomerPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="New customer">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/customers">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to customers
          </Link>
        </Button>
      </Header>
      <div className="flex-1 p-6">
        <CustomerForm />
      </div>
    </div>
  );
}
