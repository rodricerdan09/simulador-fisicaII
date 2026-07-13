import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json().catch(() => ({}))) as {
      page_path?: string;
    };

    const pagePath = body.page_path?.trim();
    if (!pagePath) {
      return NextResponse.json(
        { error: "page_path is required" },
        { status: 400 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("carrera, comision")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Failed to load profile for visit:", profileError);
    }

    const { error: insertError } = await supabase.from("page_visits").insert({
      page_path: pagePath,
      user_id: user.id,
      carrera: profile?.carrera ?? null,
      comision: profile?.comision ?? null,
    });

    if (insertError) {
      console.error("Failed to insert visit:", insertError);
      return NextResponse.json(
        { error: "Failed to record visit" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/visits error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
