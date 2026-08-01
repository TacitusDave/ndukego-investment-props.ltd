"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";

interface Department { id: string; name: string; code: string }

export default function NewEmployeePage() {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    jobTitle: "", departmentId: "", hireDate: "", password: "",
  });

  useEffect(() => {
    fetch("/api/proxy/employees/departments")
      .then(async (r) => {
        if (!r.ok) return;
        const data = await r.json();
        if (Array.isArray(data)) setDepartments(data);
      })
      .catch(() => {});
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.jobTitle || !form.password) {
      setError("First name, last name, email, job title, and password are required.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    startTransition(async () => {
      const res = await fetch("/api/proxy/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone || undefined,
          jobTitle: form.jobTitle,
          departmentId: form.departmentId || undefined,
          hireDate: form.hireDate || undefined,
          password: form.password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/employees/${data.id}`);
      } else {
        const body = await res.json().catch(() => ({}));
        setError(Array.isArray(body.message) ? body.message.join(", ") : (body.message ?? "Failed to create employee"));
      }
    });
  }

  return (
    <div className="p-6 max-w-2xl space-y-5">
      <Link href="/employees" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-4 w-4" />
        Employees
      </Link>

      <div>
        <h1 className="text-xl font-bold">Add employee</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Create a staff account with login credentials</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="font-semibold">Personal information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium">First name *</label>
              <input name="firstName" value={form.firstName} onChange={handleChange}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium">Last name *</label>
              <input name="lastName" value={form.lastName} onChange={handleChange}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium">Email address * <span className="text-xs text-muted-foreground">(used to log in)</span></label>
            <input name="email" type="email" value={form.email} onChange={handleChange}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium">Phone number</label>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="font-semibold">Role & department</h2>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium">Job title *</label>
            <input name="jobTitle" value={form.jobTitle} onChange={handleChange}
              placeholder="e.g. Sales Executive"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium">Department</label>
            <select name="departmentId" value={form.departmentId} onChange={handleChange}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">No department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium">Hire date</label>
            <input name="hireDate" type="date" value={form.hireDate} onChange={handleChange}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="font-semibold">Login credentials</h2>
          <p className="text-sm text-muted-foreground">The employee will use their email and this password to log into the admin portal.</p>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium">Temporary password *</label>
            <input name="password" type="password" value={form.password} onChange={handleChange}
              placeholder="Minimum 8 characters"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3">{error}</p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Create employee
          </button>
          <Link href="/employees" className="text-sm text-muted-foreground hover:text-foreground">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
