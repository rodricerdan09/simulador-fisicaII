import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import features from "@/config/features.json";

const supabaseEnabled = features.features.supabase.enabled;
const loginEnabled = features.features.auth.login;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Si supabase/auth está deshabilitado, no verificar sesión
  if (!supabaseEnabled || !loginEnabled) {
    // Redirigir /login y /register al inicio
    if (pathname === "/login" || pathname === "/register") {
      const homeUrl = new URL("/inicio", request.url);
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }

  const publicRoutes = ["/login", "/register"];
  const isPublicRoute = publicRoutes.some((route) => pathname === route);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!isPublicRoute && !user) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicRoute && user) {
    const homeUrl = new URL("/inicio", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
