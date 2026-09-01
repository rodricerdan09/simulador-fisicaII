export type Role = "profesor" | "alumno";

export interface Sesion {
  role: Role;
  legajo?: string;
  nombre?: string;
  apellido?: string;
  carrera?: string;
  comision?: string;
  alumnoId?: number;
}

const SESSION_KEY = "simulador-sesion";
const ROLE_EVENT = "role-change";

export function getSesion(): Sesion | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(SESSION_KEY);
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored) as Sesion;
    if (parsed.role !== "profesor" && parsed.role !== "alumno") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function setSesion(sesion: Sesion): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(sesion));
  window.dispatchEvent(new Event(ROLE_EVENT));
}

export function clearSesion(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event(ROLE_EVENT));
}

export function getStoredRole(): Role {
  const sesion = getSesion();
  return sesion?.role ?? "alumno";
}

export function setStoredRole(role: Role): void {
  const existing = getSesion();
  setSesion({
    ...existing,
    role,
  });
}

export function subscribeToRoleChange(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(ROLE_EVENT, callback);
  return () => window.removeEventListener(ROLE_EVENT, callback);
}
