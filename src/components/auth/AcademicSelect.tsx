"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CARRERAS } from "@/lib/catalogs/carreras";
import { COMISIONES } from "@/lib/catalogs/comisiones";

interface AcademicSelectProps {
  carrera: string;
  comision: string;
  onCarreraChange: (value: string) => void;
  onComisionChange: (value: string) => void;
  errors?: {
    carrera?: string;
    comision?: string;
  };
}

export function AcademicSelect({
  carrera,
  comision,
  onCarreraChange,
  onComisionChange,
  errors,
}: AcademicSelectProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="carrera">Carrera</Label>
        <Select value={carrera} onValueChange={onCarreraChange} required>
          <SelectTrigger id="carrera" aria-invalid={!!errors?.carrera}>
            <SelectValue placeholder="Seleccioná tu carrera" />
          </SelectTrigger>
          <SelectContent>
            {CARRERAS.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.carrera && (
          <p className="text-xs text-red-400">{errors.carrera}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="comision">Comisión</Label>
        <Select value={comision} onValueChange={onComisionChange} required>
          <SelectTrigger id="comision" aria-invalid={!!errors?.comision}>
            <SelectValue placeholder="Seleccioná tu comisión" />
          </SelectTrigger>
          <SelectContent>
            {COMISIONES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.comision && (
          <p className="text-xs text-red-400">{errors.comision}</p>
        )}
      </div>
    </div>
  );
}
