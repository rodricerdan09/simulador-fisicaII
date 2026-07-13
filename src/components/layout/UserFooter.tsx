"use client";

import { LogOut } from "lucide-react";

import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function UserFooter() {
  const { user, profile, loading } = useUser();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
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
    ? `${profile.nombre} ${profile.apellido}`
    : user.email ?? "Usuario";

  const fallbackLetter = (user.email ?? "U").charAt(0).toUpperCase();
  const roleLabel = profile?.role === "profesor" ? "Docente" : "Alumno";

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
            {displayName}
          </p>
          <p className="text-[11px] font-medium text-cyan-700">
            {roleLabel}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="shrink-0 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
          aria-label="Cerrar sesión"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
