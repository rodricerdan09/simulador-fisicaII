"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

interface VisitCounterProps {
  pagePath: string;
}

export function VisitCounter({ pagePath }: VisitCounterProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchCount() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("page_visit_counts")
        .select("visit_count")
        .eq("page_path", pagePath)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("VisitCounter fetch failed:", error);
        setCount(null);
        return;
      }

      setCount(data?.visit_count ?? 0);
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
