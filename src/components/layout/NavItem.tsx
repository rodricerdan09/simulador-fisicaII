"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function NavItem({
  href,
  icon: Icon,
  label,
  active = false,
  onClick,
}: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 rounded-md border-l-4 px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "border-cyan-400 bg-slate-800/80 text-cyan-400"
          : "border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-50"
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 shrink-0 transition-colors",
          active ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"
        )}
      />
      <span>{label}</span>
    </Link>
  );
}
