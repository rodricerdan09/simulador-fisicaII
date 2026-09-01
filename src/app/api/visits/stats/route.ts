import { NextResponse } from "next/server";
import { getVisitsWithAlumno } from "@/lib/db/sqlite";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const visitRows = await getVisitsWithAlumno();

    const visits = visitRows.map((row) => ({
      id: String(row.id),
      page_path: row.page_path,
      user_id: row.user_id ? String(row.user_id) : null,
      visited_at: row.visited_at,
      carrera: row.carrera,
      comision: row.comision,
    }));

    const byAlumno = new Map<string, number>();
    const byCarrera = new Map<string, number>();
    const byComision = new Map<string, number>();
    const byPage = new Map<string, number>();

    for (const visit of visits) {
      if (visit.user_id) {
        byAlumno.set(visit.user_id, (byAlumno.get(visit.user_id) ?? 0) + 1);
      }
      if (visit.carrera) {
        byCarrera.set(visit.carrera, (byCarrera.get(visit.carrera) ?? 0) + 1);
      }
      if (visit.comision) {
        byComision.set(visit.comision, (byComision.get(visit.comision) ?? 0) + 1);
      }
      byPage.set(visit.page_path, (byPage.get(visit.page_path) ?? 0) + 1);
    }

    return NextResponse.json(
      {
        visits,
        byAlumno: Object.fromEntries(byAlumno),
        byCarrera: Object.fromEntries(byCarrera),
        byComision: Object.fromEntries(byComision),
        byPage: Object.fromEntries(byPage),
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("GET /api/visits/stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
