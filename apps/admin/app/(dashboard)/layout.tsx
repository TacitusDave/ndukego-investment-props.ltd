import { redirect } from "next/navigation";
import { Shell } from "@/components/layout/shell";
import { getSession } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return <Shell>{children}</Shell>;
}
