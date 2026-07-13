import { Exercise } from "@/types";

export const EXERCISES: Exercise[] = [
  {
    slug: "doble-rendija",
    title: "1. Doble Rendija",
    description: "Calculá la longitud de onda y la separación entre franjas a partir de la posición de una franja brillante de orden conocido.",
    icon: "waves",
  },
  {
    slug: "espectro",
    title: "2. Comparación de Espectros",
    description: "Compará las posiciones de las franjas brillantes para dos longitudes de onda diferentes en un experimento de doble rendija.",
    icon: "rainbow",
  },
  {
    slug: "minimos",
    title: "3. Mínimos de Interferencia",
    description: "Determiná la longitud de onda de la luz a partir de la distancia entre mínimos consecutivos en un patrón de interferencia.",
    icon: "scan",
  },
  {
    slug: "pelicula-delgada",
    title: "4. Película Delgada",
    description: "Calculá el espesor mínimo de una película de jabón para observar interferencia constructiva en la luz reflejada.",
    icon: "layers",
  },
  {
    slug: "intensidad",
    title: "5. Distribución de Intensidad",
    description: "Analizá y graficá la distribución de intensidad en función de la posición, determinando mínimos y máximos para distintos parámetros.",
    icon: "sun",
  },
];
