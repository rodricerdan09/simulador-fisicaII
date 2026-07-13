"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";

import { cn } from "@/lib/utils";

export interface TheoryPanelProps {
  title?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function TheoryPanel({
  title = "Desarrollo del Ejercicio",
  children,
  defaultOpen = false,
  onOpenChange,
}: TheoryPanelProps) {
  const [open, setOpen] = useState(defaultOpen);
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-slate-800/50"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-slate-500 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-200",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-800 px-4 py-4 text-sm leading-relaxed text-slate-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
