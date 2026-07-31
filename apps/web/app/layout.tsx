import type { Metadata } from "next";
import { Fraunces, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Ndukego Investments & Properties — Real Estate, Financing & Investment in Nigeria",
    template: "%s | Ndukego Investments & Properties",
  },
  description:
    "Nigeria's premier property and investment group. Real estate listings, LPO financing, investment financing, and expert consultancy across Nigeria.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="light">
      <body className={`${fraunces.variable} ${dmSans.variable} ${jetbrainsMono.variable} min-h-screen flex flex-col`}>
        {/* ── Global morphing gradient background (always visible through all pages) ── */}
        <div
          aria-hidden
          className="nhgp-gradient-bg"
        />
        {/* ── Global grid overlay ── */}
        <div
          aria-hidden
          className="nhgp-grid-bg"
        />

        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
