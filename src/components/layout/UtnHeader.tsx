import { UtnLogo } from "@/components/icons/UtnLogo";

export function UtnHeader() {
  return (
    <header className="flex items-center justify-end gap-2 border-b border-slate-800/50 bg-slate-950/80 px-4 py-2.5 backdrop-blur-sm md:px-6">
      <UtnLogo size={20} />
      <span className="text-[12px] font-medium text-slate-400 md:text-[13px]">
        Universidad Tecnológica Nacional - Facultad Regional Resistencia
      </span>
    </header>
  );
}
