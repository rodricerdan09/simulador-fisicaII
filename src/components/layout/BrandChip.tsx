import { UtnLogo } from "@/components/icons/UtnLogo";
import { UtnShield } from "@/components/icons/UtnShield";

export function BrandChip() {
  return (
    <div className="flex items-center gap-3 px-2">
      <div className="flex h-9 w-9 items-center justify-center">
        <UtnShield size={20} />
      </div>
{/*       <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
        <UtnShield size={20} />
      </div> */}
      <div className="flex flex-col">
        <span className="text-base font-bold text-cyan-400">
          Simulador Física II
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-700">
          Interferencia
        </span>
      </div>
    </div>
  );
}
