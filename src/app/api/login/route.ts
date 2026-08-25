import { NextResponse } from "next/server";
import { getAlumnoByLegajo } from "@/lib/db/sqlite";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      type?: "alumno" | "profesor";
      legajo?: string;
      apellido?: string;
      code?: string;
    };

    const { type } = body;

    if (type === "alumno") {
      const legajo = body.legajo?.trim();
      const apellido = body.apellido?.trim();

      if (!legajo || !apellido) {
        return NextResponse.json(
          { error: "Legajo y apellido son obligatorios" },
          { status: 400 }
        );
      }

      const alumno = getAlumnoByLegajo(legajo);

      if (!alumno) {
        return NextResponse.json(
          { error: "Alumno no encontrado" },
          { status: 404 }
        );
      }

      if (alumno.apellido.toLowerCase() !== apellido.toLowerCase()) {
        return NextResponse.json(
          { error: "Apellido incorrecto" },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        sesion: {
          role: "alumno",
          legajo: alumno.legajo,
          nombre: alumno.nombre,
          apellido: alumno.apellido,
          alumnoId: alumno.id,
        },
      });
    }

    if (type === "profesor") {
      const professorCode = process.env.PROFESSOR_CODE || "utn2026";
      const providedCode = body.code?.trim();

      if (providedCode !== professorCode) {
        return NextResponse.json(
          { error: "Código de profesor incorrecto" },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        sesion: {
          role: "profesor",
        },
      });
    }

    return NextResponse.json(
      { error: "Tipo de login inválido" },
      { status: 400 }
    );
  } catch (error) {
    console.error("POST /api/login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
