"use client";

import { useEffect, useRef } from "react";
import { getSesion } from "@/lib/role";

const DEBOUNCE_MS = 24 * 60 * 60 * 1000; // 24 horas

export function useVisit(pagePath: string) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    if (!pagePath) return;
    if (typeof window === "undefined") return;

    const sesion = getSesion();

    // Solo registrar visitas de alumnos logueados (no docentes ni invitados)
    if (!sesion || sesion.role !== "alumno" || !sesion.alumnoId) return;

    const lastVisitKey = `visit:${pagePath}`;
    const lastVisit = localStorage.getItem(lastVisitKey);
    const now = Date.now();

    if (lastVisit && now - parseInt(lastVisit, 10) < DEBOUNCE_MS) return;

    localStorage.setItem(lastVisitKey, now.toString());

    fetch("/api/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page_path: pagePath,
        alumnoId: sesion.alumnoId,
      }),
    }).catch((error) => {
      console.error("useVisit failed:", error);
    });
  }, [pagePath]);
}
