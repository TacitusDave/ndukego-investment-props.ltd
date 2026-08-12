"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { LogoIcon } from "@nhgp/assets";
import { superLogin } from "@/lib/auth";

export default function SuperLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const codeRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const code = (form.elements.namedItem("code") as HTMLInputElement).value.replace(/\s/g, "");

    startTransition(async () => {
      const result = await superLogin(email, code);
      if (result.error) {
        setError(result.error);
        if (codeRef.current) {
          codeRef.current.value = "";
          codeRef.current.focus();
        }
        return;
      }
      router.push("/dashboard");
      router.refresh();
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] px-4">
      <div className="w-full max-w-xs">
        <div className="flex justify-center mb-10">
          <LogoIcon width={40} height={40} />
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
            <label htmlFor="code" className="block text-xs font-medium text-white/40 uppercase tracking-widest">
              Authenticator Code
            </label>
            <input
              ref={codeRef}
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              pattern="[0-9\s]{6,7}"
              maxLength={7}
              required
              autoComplete="one-time-code"
              placeholder="000 000"
              className="w-full rounded-sm border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/25 transition-colors text-center tracking-[0.3em] font-mono"
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
            className="w-full flex items-center justify-center gap-2 rounded-sm bg-white/10 border border-white/15 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/15 transition-colors disabled:opacity-50 mt-2"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Authenticate"}
          </button>
        </form>
      </div>
    </div>
  );
}
