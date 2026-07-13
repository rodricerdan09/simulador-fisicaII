/**
 * Mapeo de nombres completos de carreras a sus abreviaturas
 */
export const CARRERA_ABBREVIATIONS: Record<string, string> = {
  "Ingeniería en Sistemas": "ISI",
  "Ingeniería Electromecánica": "IEM",
  "Ingeniería Química": "IQ",
};

/**
 * Convierte un nombre completo de carrera a su abreviatura
 * Si no encuentra coincidencia, devuelve el nombre original
 */
export function getCarreraAbreviatura(carrera: string): string {
  return CARRERA_ABBREVIATIONS[carrera] ?? carrera;
}
