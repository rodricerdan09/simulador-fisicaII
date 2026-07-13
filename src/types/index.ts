export type Role = "alumno" | "profesor";

export interface Profile {
  id: string;
  role: Role;
  nombre: string;
  apellido: string;
  legajo: string;
  carrera: string;
  comision: string;
  created_at: string;
}

export interface PageVisit {
  id: string;
  page_path: string;
  user_id: string | null;
  visited_at: string;
  carrera: string | null;
  comision: string | null;
}

export interface User {
  id: string;
  email?: string;
}

export interface Exercise {
  slug: string;
  title: string;
  description: string;
  icon: string;
}
