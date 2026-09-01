"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, BookOpen, Zap, BarChart3, FlaskConical } from "lucide-react";

import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";
import { isFeatureEnabled } from "@/lib/features";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const baseItems: NavItem[] = [
  { href: "/inicio", label: "Inicio", icon: Home },
  { href: "/teoria", label: "Teoría", icon: BookOpen },
  { href: "/ejercicios", label: "Ejercicios", icon: Zap },
  ...(isFeatureEnabled("laboratorio")
    ? [{ href: "/laboratorios", label: "Laboratorios", icon: FlaskConical }]
    : []),
];

function isActive(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  if (href === "/") return false;
  return pathname.startsWith(`${href}/`);
}

function NavSkeleton() {
  return (
    <>
      {baseItems.map((item) => (
        <div
          key={item.label}
          aria-hidden="true"
          className="flex flex-1 flex-col items-center justify-center gap-1 px-1 py-2"
        >
          <div className="h-5 w-5 animate-pulse rounded-md bg-slate-700" />
          <div className="h-2 w-10 animate-pulse rounded-md bg-slate-700" />
        </div>
      ))}
      <div
        aria-hidden="true"
        className="flex flex-1 flex-col items-center justify-center gap-1 px-1 py-2"
      >
        <div className="h-5 w-5 animate-pulse rounded-md bg-slate-700" />
        <div className="h-2 w-12 animate-pulse rounded-md bg-slate-700" />
      </div>
    </>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const { profile } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const items: NavItem[] = [...baseItems];

  if (profile?.role === "profesor") {
    items.push({ href: "/dashboard", label: "Panel Docente", icon: BarChart3 });
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-evenly border-t border-slate-800 bg-slate-900/80 backdrop-blur-md md:hidden">
      {!mounted ? (
        <NavSkeleton />
      ) : (
        items.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 px-1 py-2 text-[10px] transition-colors",
                active
                  ? "text-cyan-400"
                  : "text-slate-400 hover:text-slate-50"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-center leading-tight">{item.label}</span>
            </Link>
          );
        })
      )}
    </nav>
  );
}
