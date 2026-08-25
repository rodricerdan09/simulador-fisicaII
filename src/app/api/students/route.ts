import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db/sqlite";

export const runtime = "nodejs";

export function GET() {
  try {
    const db = getDatabase();
    const rows = db
      .prepare(
        "SELECT id, nombre, apellido, legajo, carrera, comision FROM alumnos ORDER BY apellido, nombre"
      )
      .all();

    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/students error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
