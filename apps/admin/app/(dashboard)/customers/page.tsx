import { Header } from "@/components/layout/header";

export default function CustomersPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Customers" />
      <div className="flex-1 p-6">
        <p className="text-muted-foreground text-sm">Customer management — coming soon.</p>
      </div>
    </div>
  );
}
