import { FlaskConical } from "lucide-react";

export default function LaboratoriosPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10">
          <FlaskConical className="h-12 w-12 text-cyan-400" />
        </div>
        <h1 className="mb-3 text-3xl font-bold text-slate-50">Laboratorios</h1>
        <p className="text-lg text-slate-400">Próximamente</p>
        <p className="mt-2 text-sm text-slate-500">
          Esta sección estará disponible en una próxima actualización.
        </p>
      </div>
    </div>
  );
}
