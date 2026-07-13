"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CARRERAS } from "@/lib/catalogs/carreras";
import { COMISIONES } from "@/lib/catalogs/comisiones";

interface StudentFilterProps {
  carrera: string;
  comision: string;
  onCarreraChange: (value: string) => void;
  onComisionChange: (value: string) => void;
}

export function StudentFilter({
  carrera,
  comision,
  onCarreraChange,
  onComisionChange,
}: StudentFilterProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md sm:flex-row">
      <div className="flex-1 space-y-1.5">
        <label className="text-xs font-medium text-slate-400">Carrera</label>
        <Select value={carrera} onValueChange={onCarreraChange}>
          <SelectTrigger aria-label="Filtrar por carrera">
            <SelectValue placeholder="Todas las carreras" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las carreras</SelectItem>
            {CARRERAS.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 space-y-1.5">
        <label className="text-xs font-medium text-slate-400">Comisión</label>
        <Select value={comision} onValueChange={onComisionChange}>
          <SelectTrigger aria-label="Filtrar por comisión">
            <SelectValue placeholder="Todas las comisiones" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las comisiones</SelectItem>
            {COMISIONES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
