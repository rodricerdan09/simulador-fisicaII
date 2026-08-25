"use client";

import { useEffect, useState } from "react";
import {
  Home,
  BookOpen,
  LayoutDashboard,
  Waves,
  Layers,
  ScanLine,
  Sun,
  Rainbow,
  FlaskConical,
  LogIn,
} from "lucide-react";

import { useUser } from "@/hooks/useUser";
import { getSesion, subscribeToRoleChange } from "@/lib/role";
import { EXERCISES } from "@/constants/exercises";
import { NavItem } from "./NavItem";
import { BrandChip } from "./BrandChip";
import { UserFooter } from "./UserFooter";

const exerciseIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  waves: Waves,
  layers: Layers,
  scan: ScanLine,
  sun: Sun,
  rainbow: Rainbow,
};

interface NavContentProps {
  onClose?: () => void;
}

export function NavContent({ onClose }: NavContentProps) {
  const { profile } = useUser();
  const [hasSesion, setHasSesion] = useState(false);

  useEffect(() => {
    const check = () => setHasSesion(Boolean(getSesion()));
    check();
    return subscribeToRoleChange(check);
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <BrandChip />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        <NavItem
          href="/inicio"
          icon={Home}
          label="Inicio"
          onClick={onClose}
        />
        <NavItem
          href="/teoria"
          icon={BookOpen}
          label="Teoría"
          onClick={onClose}
        />
        <NavItem
          href="/laboratorios"
          icon={FlaskConical}
          label="Laboratorios"
          onClick={onClose}
        />
        {profile?.role === "profesor" && (
          <NavItem
            href="/dashboard"
            icon={LayoutDashboard}
            label="Panel Docente"
            onClick={onClose}
          />
        )}
        {!hasSesion && (
          <NavItem
            href="/acceso"
            icon={LogIn}
            label="Ingresar"
            onClick={onClose}
          />
        )}

        <div className="pt-6">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-700">
            Ejercicios
          </p>
          <div className="space-y-1">
            {EXERCISES.map((ex) => {
              const Icon = exerciseIconMap[ex.icon] ?? Waves;
              return (
                <NavItem
                  key={ex.slug}
                  href={`/ejercicios/${ex.slug}`}
                  icon={Icon}
                  label={ex.title}
                  onClick={onClose}
                />
              );
            })}
          </div>
        </div>
      </nav>

      <UserFooter />
    </div>
  );
}
