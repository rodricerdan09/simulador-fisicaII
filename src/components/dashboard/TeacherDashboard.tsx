"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { Profile, PageVisit } from "@/types";
import { StudentFilter } from "./StudentFilter";
import { StudentTable } from "./StudentTable";
import { VisitsChart } from "./VisitsChart";
import { isSimulatorVisit } from "@/lib/catalogs/visitConfig";

export function TeacherDashboard() {
  const { profile, loading: userLoading } = useUser();
  const router = useRouter();

  const [students, setStudents] = useState<Profile[]>([]);
  const [visits, setVisits] = useState<PageVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [carreraFilter, setCarreraFilter] = useState("all");
  const [comisionFilter, setComisionFilter] = useState("all");

  useEffect(() => {
    if (userLoading) return;

    if (!profile || profile.role !== "profesor") {
      router.replace("/inicio");
      return;
    }

    let cancelled = false;

    async function fetchData() {
      const supabase = createClient();

      const [studentsResult, visitsResult] = await Promise.all([
        supabase
          .from("profiles")
          .select("*")
          .eq("role", "alumno")
          .order("carrera", { ascending: true })
          .order("comision", { ascending: true })
          .order("apellido", { ascending: true }),
        supabase
          .from("page_visits")
          .select("*")
          .order("visited_at", { ascending: false }),
      ]);

      if (cancelled) return;

      if (studentsResult.error) {
        setError("No se pudieron cargar los estudiantes.");
        console.error(studentsResult.error);
      } else {
        setStudents((studentsResult.data as Profile[]) ?? []);
      }

      if (visitsResult.error) {
        setError("No se pudieron cargar las visitas.");
        console.error(visitsResult.error);
      } else {
        setVisits((visitsResult.data as PageVisit[]) ?? []);
      }

      setLoading(false);
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [profile, userLoading, router]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesCarrera =
        carreraFilter === "all" || student.carrera === carreraFilter;
      const matchesComision =
        comisionFilter === "all" || student.comision === comisionFilter;
      return matchesCarrera && matchesComision;
    });
  }, [students, carreraFilter, comisionFilter]);

  // Calcular conteo de visitas por alumno (solo ejercicios y teoría)
  const visitCountsByStudent = useMemo(() => {
    const counts = new Map<string, number>();
    
    for (const visit of visits) {
      if (!visit.user_id) continue;
      if (!isSimulatorVisit(visit.page_path)) continue;
      
      const current = counts.get(visit.user_id) ?? 0;
      counts.set(visit.user_id, current + 1);
    }
    
    return counts;
  }, [visits]);

  if (userLoading || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-400">
        <Loader2 className="mr-2 h-6 w-6 animate-spin text-cyan-400" />
        <span>Cargando…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6 text-red-200">
        <p className="font-medium">Error</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 pb-12 md:p-6 md:pb-12">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-50 md:text-3xl">
          Panel Docente
        </h1>
        <p className="text-slate-400">
          Seguimiento de estudiantes y visitas por carrera y comisión.
        </p>
      </header>

      <StudentFilter
        carrera={carreraFilter}
        comision={comisionFilter}
        onCarreraChange={setCarreraFilter}
        onComisionChange={setComisionFilter}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-50">
            Estudiantes ({filteredStudents.length})
          </h2>
          <StudentTable 
            students={filteredStudents} 
            visitCounts={visitCountsByStudent}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-50">
            Analytics de visitas
          </h2>
          <VisitsChart
            visits={visits}
            carreraFilter={carreraFilter}
            comisionFilter={comisionFilter}
          />
        </div>
      </div>
    </div>
  );
}
