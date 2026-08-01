"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function Header({ title, children }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white border-[#E3E3E3] px-6">
      <h1
        className="text-lg font-semibold tracking-tight text-gray-900"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h1>
      <div className="flex items-center gap-2">
        {children}
        <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-gray-900">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#C1121F]" />
        </Button>
      </div>
    </header>
  );
}
