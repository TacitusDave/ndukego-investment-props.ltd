"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const STORAGE_KEY = "nhgp_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage blocked (private mode etc.) — don't show banner
    }
  }, []);

  function accept() {
    try { localStorage.setItem(STORAGE_KEY, "accepted"); } catch { /* ignore */ }
    setVisible(false);
  }

  function decline() {
    try { localStorage.setItem(STORAGE_KEY, "declined"); } catch { /* ignore */ }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-sm shadow-2xl shadow-black/10 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              We use cookies
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              This site uses cookies to improve your experience and comply with
              Nigeria&apos;s Data Protection Act (NDPA).{" "}
              <Link href="/privacy" className="text-[#A0111C] underline underline-offset-2 hover:text-[#B41523]">
                Privacy Policy
              </Link>
            </p>
          </div>
          <button
            onClick={decline}
            aria-label="Dismiss"
            className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mt-4">
          <button
            onClick={accept}
            className="flex-1 sm:flex-none rounded-xl bg-[#A0111C] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#B41523] transition-colors"
          >
            Accept all
          </button>
          <button
            onClick={decline}
            className="flex-1 sm:flex-none rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Essential only
          </button>
          <Link
            href="/privacy"
            className="flex-1 sm:flex-none text-center px-6 py-2.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
}
