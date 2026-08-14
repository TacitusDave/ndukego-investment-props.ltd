import { Header } from "@/components/layout/header";
import { DocumentUploadForm } from "./upload-form";

export default function UploadDocumentPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Upload Document" />

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl">
          <DocumentUploadForm />
        </div>
      </div>
    </div>
  );
}
