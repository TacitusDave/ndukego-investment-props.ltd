"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Copy, Check } from "lucide-react";
import { LogoIcon } from "@nhgp/assets";
import { setupTotp } from "@/lib/auth";

type Phase = "form" | "qr";

export default function SuperSetupPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("form");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    startTransition(async () => {
      const result = await setupTotp(email, password);
      if (result.error) {
        setError(result.error);
        return;
      }
      setQrDataUrl(result.data!.qrDataUrl);
      setSecret(result.data!.secret);
      setPhase("qr");
    });
  }

  function copySecret() {
    navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ── Phase 2: Show QR code ────────────────────────────────────────
  if (phase === "qr") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] px-4">
        <div className="w-full max-w-sm text-center space-y-6">
          <div className="flex justify-center">
            <LogoIcon width={36} height={36} />
          </div>

          <div>
            <h1 className="text-white font-semibold text-base mb-1">Scan with Google Authenticator</h1>
            <p className="text-white/40 text-xs leading-relaxed">
              Open Google Authenticator → tap <strong className="text-white/60">+</strong> → <strong className="text-white/60">Scan a QR code</strong>
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrDataUrl}
              alt="TOTP QR Code"
              className="rounded-lg border border-white/10 bg-white p-3"
              width={200}
              height={200}
            />
          </div>

          {/* Manual entry key */}
          <div className="rounded-sm border border-white/10 bg-white/5 p-4 text-left space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
              Or enter manually in the app
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs font-mono text-white/70 break-all leading-relaxed">
                {secret}
              </code>
              <button
                onClick={copySecret}
                className="shrink-0 flex items-center justify-center h-7 w-7 rounded-sm border border-white/10 bg-white/5 text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] text-white/25 leading-relaxed">
              After scanning, Google Authenticator will show a 6-digit code that refreshes every 30 seconds.
              Keep this secret key safe — you will need it if you change phones.
            </p>
            <button
              onClick={() => router.push("/super")}
              className="w-full rounded-sm border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/15 transition-colors"
            >
              Done — go to login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Phase 1: Verify identity ─────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] px-4">
      <div className="w-full max-w-xs space-y-8">
        <div className="flex justify-center">
          <LogoIcon width={40} height={40} />
        </div>

        <div className="text-center">
          <h1 className="text-white font-semibold text-base mb-1">Set up authenticator</h1>
          <p className="text-white/35 text-xs leading-relaxed">
            Enter your account credentials to generate your Google Authenticator QR code.
            You only need to do this once.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-medium text-white/40 uppercase tracking-widest">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@ndukego.com"
              className="w-full rounded-sm border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/25 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-xs font-medium text-white/40 uppercase tracking-widest">
              Current Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-sm border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/25 transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/40 rounded-sm px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 rounded-sm bg-white/10 border border-white/15 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/15 transition-colors disabled:opacity-50"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Generate QR Code"}
          </button>
        </form>
      </div>
    </div>
  );
}
