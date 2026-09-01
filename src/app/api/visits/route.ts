import { NextResponse } from "next/server";
import { recordVisit } from "@/lib/db/sqlite";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      page_path?: string;
      alumnoId?: number;
    };

    const pagePath = body.page_path?.trim();
    if (!pagePath) {
      return NextResponse.json(
        { error: "page_path is required" },
        { status: 400 }
      );
    }

    const alumnoId = typeof body.alumnoId === "number" ? body.alumnoId : null;

    await recordVisit(pagePath, alumnoId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/visits error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
