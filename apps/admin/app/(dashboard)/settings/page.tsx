"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsTabs = [
  { label: "Company", href: "/settings" },
  { label: "Password", href: "/settings/password" },
];

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT — Abuja",
];

interface Company {
  id: string;
  name: string;
  legalName: string;
  registrationNumber: string | null;
  taxId: string | null;
  email: string;
  phone: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string;
  description: string | null;
  missionStatement: string | null;
  visionStatement: string | null;
  status: string;
  branches: Branch[];
}

interface Branch {
  id: string;
  name: string;
  code: string;
  address: string | null;
  city: string | null;
  state: string | null;
  phone: string | null;
  email: string | null;
  isHeadOffice: boolean;
}

export default function SettingsPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [form, setForm] = useState({
    name: "", legalName: "", registrationNumber: "", taxId: "",
    email: "", phone: "", website: "", address: "", city: "",
    state: "", postalCode: "", description: "", missionStatement: "", visionStatement: "",
  });

  // Branch form
  const [showBranchForm, setShowBranchForm] = useState(false);
  const [branchForm, setBranchForm] = useState({
    name: "", code: "", address: "", city: "", state: "", phone: "", email: "", isHeadOffice: false,
  });
  const [addingBranch, setAddingBranch] = useState(false);

  useEffect(() => {
    fetch("/api/proxy/companies?limit=1")
      .then((r) => r.json())
      .then((data) => {
        const c: Company = data.items?.[0];
        if (c) {
          setCompany(c);
          setForm({
            name: c.name ?? "",
            legalName: c.legalName ?? "",
            registrationNumber: c.registrationNumber ?? "",
            taxId: c.taxId ?? "",
            email: c.email ?? "",
            phone: c.phone ?? "",
            website: c.website ?? "",
            address: c.address ?? "",
            city: c.city ?? "",
            state: c.state ?? "",
            postalCode: c.postalCode ?? "",
            description: c.description ?? "",
            missionStatement: c.missionStatement ?? "",
            visionStatement: c.visionStatement ?? "",
          });
        }
      })
      .catch(() => setFeedback({ type: "error", message: "Failed to load company data." }))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!company) return;
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/proxy/companies/${company.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          legalName: form.legalName,
          registrationNumber: form.registrationNumber || null,
          taxId: form.taxId || null,
          email: form.email,
          phone: form.phone || null,
          website: form.website || null,
          address: form.address || null,
          city: form.city || null,
          state: form.state || null,
          postalCode: form.postalCode || null,
          description: form.description || null,
          missionStatement: form.missionStatement || null,
          visionStatement: form.visionStatement || null,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      setFeedback({ type: "success", message: "Company settings saved successfully." });
    } catch {
      setFeedback({ type: "error", message: "Failed to save changes. Please try again." });
    } finally {
      setSaving(false);
    }
  }

  async function handleAddBranch(e: React.FormEvent) {
    e.preventDefault();
    if (!company) return;
    setAddingBranch(true);
    try {
      const res = await fetch(`/api/proxy/companies/${company.id}/branches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: branchForm.name,
          code: branchForm.code.toUpperCase(),
          address: branchForm.address || null,
          city: branchForm.city || null,
          state: branchForm.state || null,
          phone: branchForm.phone || null,
          email: branchForm.email || null,
          isHeadOffice: branchForm.isHeadOffice,
        }),
      });
      if (!res.ok) throw new Error("Failed to add branch");
      const newBranch: Branch = await res.json();
      setCompany((prev) => prev ? { ...prev, branches: [...prev.branches, newBranch] } : prev);
      setBranchForm({ name: "", code: "", address: "", city: "", state: "", phone: "", email: "", isHeadOffice: false });
      setShowBranchForm(false);
      setFeedback({ type: "success", message: "Branch added successfully." });
    } catch {
      setFeedback({ type: "error", message: "Failed to add branch." });
    } finally {
      setAddingBranch(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <Header title="Settings" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header title="Settings" />
      <div className="flex-1 overflow-auto p-6 max-w-4xl">

        {/* Tab nav */}
        <div className="flex gap-1 border-b border-border mb-6">
          {settingsTabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
                tab.href === "/settings"
                  ? "border-secondary text-secondary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {feedback && (
          <div className={cn(
            "mb-6 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm",
            feedback.type === "success"
              ? "border-green-700/30 bg-green-900/20 text-green-400"
              : "border-destructive/30 bg-destructive/10 text-destructive",
          )}>
            {feedback.type === "success"
              ? <CheckCircle className="h-4 w-4 shrink-0" />
              : <AlertCircle className="h-4 w-4 shrink-0" />}
            {feedback.message}
          </div>
        )}

        {/* Company profile */}
        <form onSubmit={handleSave}>
          <div className="rounded-xl border bg-card mb-6">
            <div className="flex items-center gap-3 px-6 py-4 border-b">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-base font-semibold">Company Information</h2>
            </div>
            <div className="p-6 space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Display Name <span className="text-destructive">*</span></Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Ndukego Homes Gallery" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="legalName">Legal Name <span className="text-destructive">*</span></Label>
                  <Input id="legalName" value={form.legalName} onChange={(e) => setForm({ ...form, legalName: e.target.value })} required placeholder="Ndukego Investments & Properties Limited" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="registrationNumber">RC Number (CAC)</Label>
                  <Input id="registrationNumber" value={form.registrationNumber} onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })} placeholder="RC 000000" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="taxId">Tax Identification Number (TIN)</Label>
                  <Input id="taxId" value={form.taxId} onChange={(e) => setForm({ ...form, taxId: e.target.value })} placeholder="00000000-0001" />
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Contact Details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Company Email <span className="text-destructive">*</span></Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="info@ndukegohomes.com" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+234 903 550 6563" />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://ndukegohomes.com" />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Address</p>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="House/Plot number, street name" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Lagos" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="state">State</Label>
                      <select
                        id="state"
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="">Select state</option>
                        {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input id="postalCode" value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} placeholder="100001" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">About the Company</p>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="description">Company Description</Label>
                    <Textarea id="description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description of the company and its services..." />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="missionStatement">Mission Statement</Label>
                    <Textarea id="missionStatement" rows={2} value={form.missionStatement} onChange={(e) => setForm({ ...form, missionStatement: e.target.value })} placeholder="Our mission is to..." />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="visionStatement">Vision Statement</Label>
                    <Textarea id="visionStatement" rows={2} value={form.visionStatement} onChange={(e) => setForm({ ...form, visionStatement: e.target.value })} placeholder="Our vision is to..." />
                  </div>
                </div>
              </div>

            </div>
            <div className="px-6 py-4 border-t flex justify-end">
              <Button type="submit" disabled={saving}>
                {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving…</> : "Save changes"}
              </Button>
            </div>
          </div>
        </form>

        {/* Branches */}
        <div className="rounded-xl border bg-card">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-base font-semibold">Office Branches</h2>
            <Button variant="outline" size="sm" onClick={() => setShowBranchForm(!showBranchForm)}>
              <Plus className="mr-1.5 h-4 w-4" />
              Add branch
            </Button>
          </div>

          {showBranchForm && (
            <form onSubmit={handleAddBranch} className="px-6 py-5 border-b bg-muted/30">
              <p className="text-sm font-medium mb-4">New Branch</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Branch Name <span className="text-destructive">*</span></Label>
                  <Input required value={branchForm.name} onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })} placeholder="Head Office" />
                </div>
                <div className="space-y-1.5">
                  <Label>Branch Code <span className="text-destructive">*</span></Label>
                  <Input required value={branchForm.code} onChange={(e) => setBranchForm({ ...branchForm, code: e.target.value })} placeholder="HQ" maxLength={10} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Address</Label>
                  <Input value={branchForm.address} onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })} placeholder="Street address" />
                </div>
                <div className="space-y-1.5">
                  <Label>City</Label>
                  <Input value={branchForm.city} onChange={(e) => setBranchForm({ ...branchForm, city: e.target.value })} placeholder="Lagos" />
                </div>
                <div className="space-y-1.5">
                  <Label>State</Label>
                  <select
                    value={branchForm.state}
                    onChange={(e) => setBranchForm({ ...branchForm, state: e.target.value })}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="">Select state</option>
                    {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label>Phone</Label>
                  <Input value={branchForm.phone} onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })} placeholder="+234..." />
                </div>
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input type="email" value={branchForm.email} onChange={(e) => setBranchForm({ ...branchForm, email: e.target.value })} placeholder="branch@ndukegohomes.com" />
                </div>
                <div className="sm:col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isHeadOffice"
                    checked={branchForm.isHeadOffice}
                    onChange={(e) => setBranchForm({ ...branchForm, isHeadOffice: e.target.checked })}
                    className="h-4 w-4 rounded border-input"
                  />
                  <Label htmlFor="isHeadOffice">This is the head office</Label>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button type="submit" size="sm" disabled={addingBranch}>
                  {addingBranch ? <><Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />Adding…</> : "Add branch"}
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setShowBranchForm(false)}>Cancel</Button>
              </div>
            </form>
          )}

          {company?.branches && company.branches.length > 0 ? (
            <div className="divide-y">
              {company.branches.map((branch) => (
                <div key={branch.id} className="px-6 py-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{branch.name}</p>
                      <span className="text-xs text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">{branch.code}</span>
                      {branch.isHeadOffice && <Badge variant="outline" className="text-xs">Head Office</Badge>}
                    </div>
                    {(branch.address || branch.city || branch.state) && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {[branch.address, branch.city, branch.state].filter(Boolean).join(", ")}
                      </p>
                    )}
                    {(branch.phone || branch.email) && (
                      <p className="text-xs text-muted-foreground">
                        {[branch.phone, branch.email].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-8 text-center text-sm text-muted-foreground">
              No branches added yet. Add your office locations above.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
