"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";

import { cn } from "@/lib/utils";

export interface TheoryPanelProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function TheoryPanel({
  id,
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

  // Si la URL tiene un hash que coincide con este panel, abrirlo
  useEffect(() => {
    if (!id || typeof window === "undefined") return;
    if (window.location.hash === `#${id}`) {
      setOpen(true);
    }
  }, [id]);

  return (
    <div
      id={id}
      className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md"
    >
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
      {open && (
        <div className="animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="overflow-hidden border-t border-slate-800 px-4 py-4 text-sm leading-relaxed text-slate-300">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
