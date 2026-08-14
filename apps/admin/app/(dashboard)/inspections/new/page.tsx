import { Header } from "@/components/layout/header";
import { InspectionForm } from "./inspection-form";

export default function NewInspectionPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Schedule Inspection" />
      <div className="flex-1 p-6">
        <div className="max-w-2xl">
          <InspectionForm />
        </div>
      </div>
    </div>
  );
}
