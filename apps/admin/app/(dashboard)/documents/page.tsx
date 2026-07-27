import { Header } from "@/components/layout/header";

export default function DocumentsPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Documents" />
      <div className="flex-1 p-6">
        <p className="text-muted-foreground text-sm">Document management — coming soon.</p>
      </div>
    </div>
  );
}
