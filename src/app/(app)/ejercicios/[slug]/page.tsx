import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

import { EXERCISES } from "@/constants/exercises";

interface ExercisePageProps {
  params: { slug: string };
}

function ExerciseLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
    </div>
  );
}

const pageBySlug: Record<
  string,
  React.ComponentType<{ exercise: (typeof EXERCISES)[number] }>
> = {
  "doble-rendija": dynamic(
    () =>
      import("@/components/exercise/exercises/doble-rendija").then(
        (m) => ({ default: m.DobleRendijaPage })
      ),
    { ssr: false, loading: ExerciseLoading }
  ),
  "espectro": dynamic(
    () =>
      import("@/components/exercise/exercises/comparacion-espectros").then(
        (m) => ({ default: m.ComparacionEspectrosPage })
      ),
    { ssr: false, loading: ExerciseLoading }
  ),
  "minimos": dynamic(
    () =>
      import("@/components/exercise/exercises/minimos").then((m) => ({
        default: m.MinimosPage,
      })),
    { ssr: false, loading: ExerciseLoading }
  ),
  "pelicula-delgada": dynamic(
    () =>
      import("@/components/exercise/exercises/pelicula-delgada").then((m) => ({
        default: m.PeliculaDelgadaPage,
      })),
    { ssr: false, loading: ExerciseLoading }
  ),
  "intensidad": dynamic(
    () =>
      import("@/components/exercise/exercises/intensidad").then((m) => ({
        default: m.IntensidadPage,
      })),
    { ssr: false, loading: ExerciseLoading }
  ),
};

export default function ExercisePage({ params }: ExercisePageProps) {
  const exercise = EXERCISES.find((e) => e.slug === params.slug);
  if (!exercise) notFound();

  const Page = pageBySlug[params.slug];
  if (!Page) notFound();

  return <Page exercise={exercise} />;
}
