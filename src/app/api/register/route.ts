import { NextResponse } from "next/server";
import { getAlumnoByLegajo, insertAlumno } from "@/lib/db/sqlite";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      nombre?: string;
      apellido?: string;
      legajo?: string;
      carrera?: string;
      comision?: string;
    };

    const nombre = body.nombre?.trim();
    const apellido = body.apellido?.trim();
    const legajo = body.legajo?.trim();
    const carrera = body.carrera?.trim();
    const comision = body.comision?.trim();

    if (!nombre || !apellido || !legajo || !carrera || !comision) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const existing = await getAlumnoByLegajo(legajo);
    if (existing) {
      return NextResponse.json(
        { error: "El legajo ya está registrado" },
        { status: 409 }
      );
    }

    const alumno = await insertAlumno({
      nombre,
      apellido,
      legajo,
      carrera,
      comision,
    });

    return NextResponse.json({ success: true, alumno });
  } catch (error) {
    console.error("POST /api/register error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
