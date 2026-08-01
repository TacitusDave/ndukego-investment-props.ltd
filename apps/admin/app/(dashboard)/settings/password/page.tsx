"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, KeyRound, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pr-10"
        autoComplete={id === "current" ? "current-password" : "new-password"}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        tabIndex={-1}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

function strengthScore(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const score = strengthScore(password);
  const labels = ["Very weak", "Weak", "Fair", "Good", "Strong"];
  const colors = [
    "bg-red-500",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-green-500",
  ];
  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              i < score ? colors[score - 1] : "bg-muted",
            )}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{labels[score - 1] ?? "Very weak"}</p>
    </div>
  );
}

const settingsTabs = [
  { label: "Company", href: "/settings" },
  { label: "Password", href: "/settings/password" },
];

export default function PasswordPage() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);

    if (next !== confirm) {
      setFeedback({ type: "error", message: "New passwords do not match." });
      return;
    }
    if (strengthScore(next) < 2) {
      setFeedback({ type: "error", message: "New password is too weak. Use at least 8 characters." });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/proxy/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = Array.isArray(body.message)
          ? body.message.join(", ")
          : (body.message ?? `Error ${res.status}`);
        setFeedback({ type: "error", message: msg });
      } else {
        setFeedback({ type: "success", message: "Password changed successfully." });
        setCurrent("");
        setNext("");
        setConfirm("");
      }
    } catch {
      setFeedback({ type: "error", message: "Cannot reach server. Is the API running?" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Header title="Settings" />

      <div className="flex-1 overflow-auto p-6">
        {/* Tab nav */}
        <div className="flex gap-1 border-b border-border mb-6">
          {settingsTabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
                tab.href === "/settings/password"
                  ? "border-secondary text-secondary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
              <KeyRound className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Change password</h2>
              <p className="text-sm text-muted-foreground">Update your account password.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="current">Current password</Label>
              <PasswordInput
                id="current"
                value={current}
                onChange={setCurrent}
                placeholder="Enter current password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new">New password</Label>
              <PasswordInput
                id="new"
                value={next}
                onChange={setNext}
                placeholder="Enter new password"
              />
              <PasswordStrength password={next} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm new password</Label>
              <PasswordInput
                id="confirm"
                value={confirm}
                onChange={setConfirm}
                placeholder="Re-enter new password"
              />
              {confirm && next !== confirm && (
                <p className="text-xs text-destructive mt-1">Passwords do not match.</p>
              )}
            </div>

            {feedback && (
              <div
                className={cn(
                  "flex items-start gap-2 rounded-lg border p-3 text-sm",
                  feedback.type === "success"
                    ? "border-green-700/30 bg-green-900/20 text-green-400"
                    : "border-destructive/30 bg-destructive/10 text-destructive",
                )}
              >
                {feedback.type === "success" ? (
                  <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                )}
                {feedback.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={saving || !current || !next || !confirm}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full sm:w-auto"
            >
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {saving ? "Changing…" : "Change password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
