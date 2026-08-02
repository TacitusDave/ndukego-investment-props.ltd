import type { Metadata } from "next";
import { Fraunces, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Ndukego Investment & Properties Ltd — Admin",
  description: "Ndukego Investment & Properties Ltd — Staff Portal",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="h-full">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
