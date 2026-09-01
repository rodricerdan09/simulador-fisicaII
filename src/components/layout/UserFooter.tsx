"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, UserRound, GraduationCap, LogIn } from "lucide-react";

import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { isFeatureEnabled } from "@/lib/features";
import { clearSesion, getSesion, subscribeToRoleChange } from "@/lib/role";

export function UserFooter() {
  const router = useRouter();
  const { user, profile, loading } = useUser();
  const [hasSesion, setHasSesion] = useState(false);

  const isSupabaseEnabled = isFeatureEnabled("supabase.enabled");

  useEffect(() => {
    const check = () => setHasSesion(Boolean(getSesion()));
    check();
    return subscribeToRoleChange(check);
  }, []);

  async function handleLogout() {
    if (isSupabaseEnabled) {
      const supabase = createClient();
      await supabase.auth.signOut();
      window.location.href = "/login";
    } else {
      clearSesion();
      window.location.href = "/acceso";
    }
  }

  if (!user) {
    return (
      <div className="border-t border-slate-800 p-4 transition-opacity duration-200">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 animate-pulse rounded-full border border-slate-700 bg-slate-800" />
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-800" />
            <div className="h-3 w-14 animate-pulse rounded bg-slate-800" />
          </div>
        </div>
      </div>
    );
  }

  const displayName = profile
    ? `${profile.nombre} ${profile.apellido}`.trim()
    : user.email ?? "Usuario";

  const fallbackLetter = displayName.charAt(0).toUpperCase() || "U";
  const roleLabel = profile?.role === "profesor" ? "Docente" : "Alumno";
  const isProfesor = profile?.role === "profesor";

  return (
    <div
      className="border-t border-slate-800 p-4 transition-opacity duration-200"
      style={{ opacity: loading ? 0.6 : 1 }}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9 border border-slate-700 bg-slate-800">
          <AvatarFallback className="bg-slate-800 text-xs font-semibold text-cyan-400">
            {fallbackLetter}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-50">
            {displayName || "Invitado"}
          </p>
          <p className="text-[11px] font-medium text-cyan-700">
            {roleLabel}
          </p>
        </div>
        {!isSupabaseEnabled ? (
          <>
            {hasSesion ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="shrink-0 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/acceso")}
                className="shrink-0 text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-400"
                aria-label="Ingresar"
                title="Ingresar"
              >
                <LogIn className="h-4 w-4" />
              </Button>
            )}
            <span
              className="shrink-0 text-slate-400"
              title={isProfesor ? "Docente" : "Alumno"}
            >
              {isProfesor ? (
                <GraduationCap className="h-4 w-4" />
              ) : (
                <UserRound className="h-4 w-4" />
              )}
            </span>
          </>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="shrink-0 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
            aria-label="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
