export const CARRERAS = [
  "Ingeniería en Sistemas",
  "Ingeniería Química",
  "Ingeniería Electromecánica",
] as const;

export type Carrera = (typeof CARRERAS)[number];
