import { notFound } from "next/navigation";

import { EXERCISES } from "@/constants/exercises";
import { DobleRendijaPage } from "@/components/exercise/exercises/DobleRendijaPage";
import { ComparacionEspectrosPage } from "@/components/exercise/exercises/ComparacionEspectrosPage";
import { MinimosPage } from "@/components/exercise/exercises/MinimosPage";
import { PeliculaDelgadaPage } from "@/components/exercise/exercises/PeliculaDelgadaPage";
import { IntensidadPage } from "@/components/exercise/exercises/IntensidadPage";

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
