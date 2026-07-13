import Link from "next/link";
import { BrainCircuit, Waves, Layers, ScanLine, Sun, Rainbow, BookOpen, Lightbulb, BarChart3 } from "lucide-react";

import { EXERCISES } from "@/constants/exercises";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  waves: Waves,
  layers: Layers,
  scan: ScanLine,
  sun: Sun,
  rainbow: Rainbow,
};

export default function InicioPage() {
  return (
    <div className="space-y-8 p-4 pb-12 md:p-6 md:pb-12">
      {/* Sección de Bienvenida */}
      <section className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-slate-900/50 to-purple-500/5 p-6 backdrop-blur-md md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          {/* Logo e icono */}
          <div className="flex shrink-0 items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 shadow-lg shadow-cyan-500/10">
              <BrainCircuit className="h-10 w-10 text-cyan-400" />
            </div>
          </div>

          {/* Contenido de bienvenida */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-50 md:text-3xl">
                Bienvenidos al Simulador de la Unidad XII: Interferencia
              </h1>
              <p className="mt-1 text-sm font-medium text-cyan-400">
                Física II — Universidad Tecnológica Nacional, Facultad Regional Resistencia
              </p>
            </div>

            <p className="text-sm leading-relaxed text-slate-300 md:text-base">
              Esta herramienta fue desarrollada como recurso didáctico de apoyo para la asignatura{" "}
              <strong className="text-slate-50">Física II</strong> de la UTN FRRE. Aquí encontrarás
              simulaciones interactivas que te permitirán visualizar y comprender los fenómenos de{" "}
              <strong className="text-cyan-400">interferencia y difracción de la luz</strong>, desde
              el clásico experimento de Young hasta la interferencia en películas delgadas.
            </p>

            {/* Características */}
            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
              <div className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-3">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                <div>
                  <p className="text-sm font-medium text-slate-50">Simulación Interactiva</p>
                  <p className="text-xs text-slate-400">
                    Modificá parámetros y observá los resultados en tiempo real
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-3">
                <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                <div>
                  <p className="text-sm font-medium text-slate-50">Base Teórica</p>
                  <p className="text-xs text-slate-400">
                    Fórmulas y explicaciones detalladas para cada fenómeno
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-3">
                <BarChart3 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                <div>
                  <p className="text-sm font-medium text-slate-50">Análisis Visual</p>
                  <p className="text-xs text-slate-400">
                    Gráficos y patrones de interferencia representados con precisión
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Ejercicios */}
      <section className="space-y-4">
        <header className="space-y-1">
          <h2 className="text-xl font-bold text-slate-50 md:text-2xl">
            Módulos Interactivos
          </h2>
          <p className="text-slate-400">
            Seleccioná un ejercicio para explorar los fenómenos de óptica ondulatoria.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {EXERCISES.map((exercise) => {
            const Icon = iconMap[exercise.icon] ?? Waves;
            return (
              <Link key={exercise.slug} href={`/ejercicios/${exercise.slug}`}>
                <Card className="group h-full border-slate-800 bg-slate-900/50 backdrop-blur-md transition-all hover:border-cyan-500/40 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-cyan-500/5">
                  <CardHeader className="pb-3">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 transition-colors group-hover:bg-cyan-500/20">
                      <Icon className="h-5 w-5 text-cyan-400" />
                    </div>
                    <CardTitle className="text-lg text-slate-50">
                      {exercise.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-slate-400">
                      {exercise.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
