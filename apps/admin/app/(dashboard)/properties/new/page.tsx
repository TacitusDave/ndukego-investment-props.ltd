import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { PropertyForm } from "./property-form";

interface Estate {
  id: string;
  name: string;
  code: string;
}

export default async function NewPropertyPage() {
  const { data } = await apiFetch<{ items: Estate[] }>("/estates?limit=200");
  const estates = data?.items ?? [];

  return (
    <div className="flex flex-col h-full">
      <Header title="New property">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/properties">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to properties
          </Link>
        </Button>
      </Header>

      <div className="flex-1 p-6">
        <PropertyForm estates={estates} />
      </div>
    </div>
  );
}
