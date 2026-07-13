"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";

import { Profile } from "@/types";
import { Button } from "@/components/ui/button";
import { getCarreraAbreviatura } from "@/lib/catalogs/carreraAbbreviations";

interface StudentTableProps {
  students: Profile[];
  pageSize?: number;
  visitCounts?: Map<string, number>;
  showLastAccess?: boolean;
}

export function StudentTable({ 
  students, 
  pageSize = 15,
  visitCounts = new Map(),
  showLastAccess = false,
}: StudentTableProps) {
  const [page, setPage] = useState(0);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(students.length / pageSize)),
    [students.length, pageSize]
  );

  const pageStart = page * pageSize;
  const pageEnd = Math.min(pageStart + pageSize, students.length);
  const pageStudents = students.slice(pageStart, pageEnd);

  const goTo = (newPage: number) => {
    setPage(Math.max(0, Math.min(newPage, totalPages - 1)));
  };

  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 py-12 text-slate-400 backdrop-blur-md">
        <Users className="mb-3 h-10 w-10 text-slate-600" />
        <p className="text-sm">No se encontraron estudiantes.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800/50 text-slate-400">
            <tr>
              <th className="px-4 py-3 font-medium">Apellido</th>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Legajo</th>
              <th className="px-4 py-3 font-medium">Carrera</th>
              <th className="px-4 py-3 font-medium">Comisión</th>
              <th className="px-4 py-3 font-medium">Visitas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {pageStudents.map((student) => (
              <tr
                key={student.id}
                className="transition-colors hover:bg-slate-800/30"
              >
                <td className="px-4 py-3 font-medium text-slate-50">
                  {student.apellido}
                </td>
                <td className="px-4 py-3" style={{ color: "#a3c6ee" }}>{student.nombre}</td>
                <td className="px-4 py-3" style={{ color: "#a3c6ee" }}>{student.legajo}</td>
                <td className="px-4 py-3" style={{ color: "#a3c6ee" }}>
                  {getCarreraAbreviatura(student.carrera)}
                </td>
                <td className="px-4 py-3" style={{ color: "#a3c6ee" }}>
                  {student.comision}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center justify-center rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-400">
                    {visitCounts.get(student.id) ?? 0}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-800 px-4 py-3">
        <p className="text-xs text-slate-500" style={{ color: "#a3aab4" }}>
          Mostrando {pageStart + 1}-{pageEnd} de {students.length} estudiantes
        </p>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs text-slate-400">
            Página {page + 1} de {totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => goTo(page + 1)}
            disabled={page >= totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
