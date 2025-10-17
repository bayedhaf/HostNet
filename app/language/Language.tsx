"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Language({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: (lang: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm font-medium hover:bg-cyan-100 text-cyan-700 border border-cyan-300"
        >
          {language === "Oromo" ? "Afaan Oromo" : "English"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-40 border border-cyan-300 shadow-lg bg-white"
      >
        <DropdownMenuLabel className="text-xs text-cyan-600">
          Select Language
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setLanguage("Oromo")}
          className="cursor-pointer text-cyan-700 hover:bg-cyan-50"
        >
          Afaan Oromo
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("English")}
          className="cursor-pointer text-cyan-700 hover:bg-cyan-50"
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
