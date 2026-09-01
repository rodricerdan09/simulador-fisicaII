"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isGuest, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (isGuest && pathname !== "/acceso") {
      router.replace("/acceso");
    }
  }, [isGuest, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
