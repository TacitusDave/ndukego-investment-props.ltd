import { Header } from "@/components/layout/header";

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Settings" />
      <div className="flex-1 p-6">
        <p className="text-muted-foreground text-sm">Settings — coming soon.</p>
      </div>
    </div>
  );
}
