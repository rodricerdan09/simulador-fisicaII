"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PageVisit } from "@/types";
import { getCarreraAbreviatura } from "@/lib/catalogs/carreraAbbreviations";

interface VisitsChartProps {
  visits: PageVisit[];
  carreraFilter?: string;
  comisionFilter?: string;
}

interface ChartRow {
  key: string;
  carrera: string;
  comision: string;
  visitas: number;
  estudiantes: number;
}

export function VisitsChart({
  visits,
  carreraFilter,
  comisionFilter,
}: VisitsChartProps) {
  const data = useMemo(() => {
    const groups = new Map<string, { users: Set<string>; count: number }>();

    for (const visit of visits) {
      if (!visit.carrera || !visit.comision) continue;

      if (carreraFilter && carreraFilter !== "all" && visit.carrera !== carreraFilter) {
        continue;
      }
      if (comisionFilter && comisionFilter !== "all" && visit.comision !== comisionFilter) {
        continue;
      }

      const key = `${getCarreraAbreviatura(visit.carrera)} — ${visit.comision}`;
      const current = groups.get(key) ?? {
        users: new Set<string>(),
        count: 0,
      };
      current.count += 1;
      if (visit.user_id) current.users.add(visit.user_id);
      groups.set(key, current);
    }

    return Array.from(groups.entries())
      .map(([key, value]) => ({
        key,
        carrera: key.split(" — ")[0],
        comision: key.split(" — ")[1],
        visitas: value.count,
        estudiantes: value.users.size,
      }))
      .sort((a, b) => b.visitas - a.visitas);
  }, [visits, carreraFilter, comisionFilter]);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 py-16 text-slate-400 backdrop-blur-md">
        <p className="text-sm">No hay visitas registradas para los filtros seleccionados.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md md:p-5">
      <h3 className="mb-4 text-sm font-semibold text-slate-50">
        Visitas por carrera y comisión
      </h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="key"
              tick={{ fill: "#a3c6ee", fontSize: 12 }}
              axisLine={{ stroke: "#334155" }}
              tickLine={{ stroke: "#334155" }}
              interval={0}
              angle={-25}
              textAnchor="end"
              height={80}
            />
            <YAxis
              tick={{ fill: "#a3c6ee", fontSize: 12 }}
              axisLine={{ stroke: "#334155" }}
              tickLine={{ stroke: "#334155" }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#1e293b",
                borderRadius: "0.5rem",
                color: "#f8fafc",
              }}
              itemStyle={{ color: "#22d3ee" }}
              formatter={(value: number, name: string) => {
                if (name === "visitas") return [value, "Visitas"];
                if (name === "estudiantes") return [value, "Estudiantes únicos"];
                return [value, name];
              }}
            />
            <Bar dataKey="visitas" radius={[4, 4, 0, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index % 2 === 0 ? "#22d3ee" : "#0891b2"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
