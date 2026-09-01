"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

interface VisitCounterProps {
  pagePath: string;
}

export function VisitCounter({ pagePath }: VisitCounterProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchCount() {
      try {
        const response = await fetch("/api/visits/stats");
        if (!response.ok) {
          setCount(null);
          return;
        }
        const data = (await response.json()) as {
          byPage?: Record<string, number>;
        };
        if (cancelled) return;
        setCount(data.byPage?.[pagePath] ?? 0);
      } catch (error) {
        console.error("VisitCounter fetch failed:", error);
        if (!cancelled) setCount(null);
      }
    }

    fetchCount();

    return () => {
      cancelled = true;
    };
  }, [pagePath]);

  const display = count === null ? "—" : count.toLocaleString("es-AR");

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/50 px-2.5 py-1 text-xs text-slate-400 backdrop-blur-md">
      <Eye className="h-3.5 w-3.5 text-cyan-400" />
      <span>Visitas: {display}</span>
    </div>
  );
}
