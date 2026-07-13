"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Zap, BarChart3, FlaskConical } from "lucide-react";

import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const baseItems: NavItem[] = [
  { href: "/inicio", label: "Inicio", icon: Home },
  { href: "/teoria", label: "Teoría", icon: BookOpen },
  { href: "/ejercicios", label: "Ejercicios", icon: Zap },
  { href: "/laboratorios", label: "Laboratorios", icon: FlaskConical },
];

function isActive(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  if (href === "/") return false;
  return pathname.startsWith(`${href}/`);
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const { profile } = useUser();

  const items: NavItem[] = [...baseItems];

  if (profile?.role === "profesor") {
    items.push({ href: "/dashboard", label: "Panel Docente", icon: BarChart3 });
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-slate-800 bg-slate-900/80 px-2 backdrop-blur-md md:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-2 py-2 text-[10px] transition-colors",
              active
                ? "text-cyan-400"
                : "text-slate-400 hover:text-slate-50"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-center leading-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
