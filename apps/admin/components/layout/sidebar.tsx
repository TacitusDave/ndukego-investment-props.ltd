"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Home, MapPin, CalendarCheck, TrendingUp,
  Users, MessageSquare, UserCog, FileText, BarChart3, Settings, LogOut,
} from "lucide-react";
import { LogoIcon } from "@nhgp/assets";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/auth";

const NAV_GROUPS: {
  label: string;
  items: { label: string; href: string; icon: React.ElementType; exact?: boolean }[];
}[] = [
  {
    label: "MAIN",
    items: [
      { label: "Dashboard",    href: "/dashboard",    icon: LayoutDashboard, exact: true },
      { label: "Properties",   href: "/properties",   icon: Home },
      { label: "Estates",      href: "/estates",      icon: MapPin },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      { label: "Reservations", href: "/reservations", icon: CalendarCheck },
      { label: "Sales",        href: "/sales",        icon: TrendingUp },
      { label: "Customers",    href: "/customers",    icon: Users },
      { label: "Inquiries",    href: "/inquiries",    icon: MessageSquare },
      { label: "Documents",    href: "/documents",    icon: FileText },
    ],
  },
  {
    label: "ORGANISATION",
    items: [
      { label: "Employees",    href: "/employees",    icon: UserCog },
      { label: "Reports",      href: "/reports",      icon: BarChart3 },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logout();
      router.push("/login");
    });
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  const isSettings = isActive("/settings");

  return (
    <aside className="flex h-full w-60 flex-col bg-[#111111] border-r border-[#212121]">
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 px-4 border-b border-[#212121]">
        <LogoIcon width={28} height={28} className="shrink-0" />
        <div className="flex flex-col min-w-0">
          <span
            className="text-[11.5px] font-semibold text-[#EBEBEB] leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ndukego Investment
          </span>
          <span className="text-[10px] text-[#5A5A5A] leading-tight">
            & Properties Ltd — Admin
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-1.5 text-[9.5px] font-bold tracking-widest text-[#3A3A3A] uppercase select-none">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                      active
                        ? "bg-[#C1121F]/15 text-white"
                        : "text-[#7A7A7A] hover:bg-white/6 hover:text-[#EBEBEB]",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-colors",
                        active ? "text-[#C1121F]" : "text-[#5A5A5A] group-hover:text-[#9A9A9A]",
                      )}
                    />
                    {item.label}
                    {active && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#C1121F]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom: settings + sign out */}
      <div className="px-2 py-3 border-t border-[#212121] space-y-0.5">
        <Link
          href="/settings"
          className={cn(
            "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
            isSettings
              ? "bg-[#C1121F]/15 text-white"
              : "text-[#7A7A7A] hover:bg-white/6 hover:text-[#EBEBEB]",
          )}
        >
          <Settings
            className={cn(
              "h-4 w-4 shrink-0 transition-colors",
              isSettings ? "text-[#C1121F]" : "text-[#5A5A5A] group-hover:text-[#9A9A9A]",
            )}
          />
          Settings
          {isSettings && (
            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#C1121F]" />
          )}
        </Link>

        <button
          onClick={handleLogout}
          disabled={isPending}
          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#7A7A7A] hover:bg-white/6 hover:text-[#EBEBEB] transition-all duration-150 disabled:opacity-50"
        >
          <LogOut className="h-4 w-4 shrink-0 text-[#5A5A5A] group-hover:text-[#9A9A9A] transition-colors" />
          {isPending ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </aside>
  );
}
