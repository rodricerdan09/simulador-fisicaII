import Link from "next/link";
import { Waves, Layers, ScanLine, Sun, Rainbow } from "lucide-react";

import { EXERCISES } from "@/constants/exercises";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  waves: Waves,
  layers: Layers,
  scan: ScanLine,
  sun: Sun,
  rainbow: Rainbow,
};

export default function EjerciciosPage() {
  return (
    <div className="space-y-4 p-4 pb-12 md:p-6 md:pb-12">
      <header className="space-y-1">
        <h1 className="text-xl font-bold text-slate-50 md:text-2xl">
          Módulos Interactivos
        </h1>
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
    </div>
  );
}
