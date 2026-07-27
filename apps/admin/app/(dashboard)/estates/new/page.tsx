import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { EstateForm } from "./estate-form";

interface Company {
  id: string;
  name: string;
}

export default async function NewEstatePage() {
  const { data } = await apiFetch<{ items: Company[] }>("/companies?limit=100");
  const companies = data?.items ?? [];

  return (
    <div className="flex flex-col h-full">
      <Header title="New estate">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/estates">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to estates
          </Link>
        </Button>
      </Header>

      <div className="flex-1 p-6">
        {companies.length === 0 && (
          <div className="mb-6 rounded-md bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
            No companies found. A company must exist before you can create an estate.
          </div>
        )}
        <EstateForm companies={companies} />
      </div>
    </div>
  );
}
