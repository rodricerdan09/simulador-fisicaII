import { UtnLogo } from "@/components/icons/UtnLogo";
import packageInfo from "../../../package.json";

export function Footer() {
  const version = packageInfo.version;

  return (
    <footer className="border-t border-slate-800/50 bg-slate-950/80 px-4 py-4 backdrop-blur-sm md:px-6">
      <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2">
          <UtnLogo size={16} />
          <span className="text-[11px] font-medium text-slate-500">
            Física II - Unidad 12 - Interferencia
          </span>
        </div>
        <p className="text-[11px] text-slate-600">
          Desarrollado por: CERDAN, Rodrigo Daniel
        </p>
        <p className="text-[11px] text-slate-600">
          UTN FRRE - 2026
          {version && (
            <span className="ml-2 text-slate-700">v{version}</span>
          )}
        </p>
      </div>
    </footer>
  );
}
