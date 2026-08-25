import { notFound } from "next/navigation";

import { EXERCISES } from "@/constants/exercises";
import { DobleRendijaPage } from "@/components/exercise/exercises/doble-rendija";
import { ComparacionEspectrosPage } from "@/components/exercise/exercises/comparacion-espectros";
import { MinimosPage } from "@/components/exercise/exercises/minimos";
import { PeliculaDelgadaPage } from "@/components/exercise/exercises/pelicula-delgada";
import { IntensidadPage } from "@/components/exercise/exercises/intensidad";

interface ExercisePageProps {
  params: { slug: string };
}

const pageBySlug: Record<
  string,
  React.ComponentType<{ exercise: (typeof EXERCISES)[number] }>
> = {
  "doble-rendija": DobleRendijaPage,
  "espectro": ComparacionEspectrosPage,
  "minimos": MinimosPage,
  "pelicula-delgada": PeliculaDelgadaPage,
  "intensidad": IntensidadPage,
};

export default function ExercisePage({ params }: ExercisePageProps) {
  const exercise = EXERCISES.find((e) => e.slug === params.slug);
  if (!exercise) notFound();

  const Page = pageBySlug[params.slug];
  if (!Page) notFound();

  return <Page exercise={exercise} />;
}
