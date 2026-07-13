/**
 * Configuración de qué páginas contar como "visitas al simulador"
 * El profesor puede modificar este array para cambiar qué páginas se cuentan
 */
export const VISIT_PAGES_TO_COUNT = [
  "/ejercicios",
  "/teoria",
];

/**
 * Configuración de columnas opcionales en la tabla de estudiantes
 * El profesor puede activar/desactivar estas columnas según necesite
 */
export const STUDENT_TABLE_CONFIG = {
  showLastAccess: false, // Cambiar a true para mostrar columna "Último acceso"
  showVisitCount: true,  // Cambiar a false para ocultar columna "Visitas"
};

/**
 * Verifica si una ruta debe ser contada como visita al simulador
 */
export function isSimulatorVisit(pagePath: string): boolean {
  return VISIT_PAGES_TO_COUNT.some((page) => pagePath.startsWith(page));
}
