"use client";

import { Label } from "@/components/ui/label";
import { Role } from "@/types";

interface RoleSelectProps {
  value: Role;
  onChange: (role: Role) => void;
}

export function RoleSelect({ value, onChange }: RoleSelectProps) {
  return (
    <div className="space-y-2">
      <Label>Rol</Label>
      <div className="grid grid-cols-2 gap-3">
        <label
          className={`flex cursor-pointer items-center justify-center rounded-lg border px-4 py-3 text-sm transition-colors ${
            value === "alumno"
              ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
              : "border-slate-700 bg-slate-900/50 text-slate-400 hover:bg-slate-800"
          }`}
        >
          <input
            type="radio"
            name="role"
            value="alumno"
            checked={value === "alumno"}
            onChange={() => onChange("alumno")}
            className="sr-only"
          />
          Alumno
        </label>
        <label
          className={`flex cursor-pointer items-center justify-center rounded-lg border px-4 py-3 text-sm transition-colors ${
            value === "profesor"
              ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
              : "border-slate-700 bg-slate-900/50 text-slate-400 hover:bg-slate-800"
          }`}
        >
          <input
            type="radio"
            name="role"
            value="profesor"
            checked={value === "profesor"}
            onChange={() => onChange("profesor")}
            className="sr-only"
          />
          Profesor
        </label>
      </div>
    </div>
  );
}
