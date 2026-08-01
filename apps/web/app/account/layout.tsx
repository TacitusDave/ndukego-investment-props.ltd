import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, CalendarCheck, Heart, User, LogOut } from "lucide-react";
import { getWebSession, webLogout } from "@/lib/auth";

const navItems = [
  { label: "Overview", href: "/account", icon: LayoutDashboard, exact: true },
  { label: "My Reservations", href: "/account/reservations", icon: CalendarCheck },
  { label: "Saved Properties", href: "/account/favorites", icon: Heart },
  { label: "Profile", href: "/account/profile", icon: User },
];

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await getWebSession();
  if (!session) redirect("/login");

  const name = [session.user.firstName, session.user.lastName].filter(Boolean).join(" ") || session.user.email;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-56 shrink-0">
            <div className="rounded-xl border bg-card p-5 space-y-4">
              <div className="space-y-1">
                <p className="font-semibold text-foreground truncate">{name}</p>
                <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="border-t pt-3">
                <form action={webLogout}>
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <LogOut className="h-4 w-4 shrink-0" />
                    Sign out
                  </button>
                </form>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
