import { cn } from "@/lib/utils";

interface VisualizationCanvasProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function VisualizationCanvas({
  title,
  children,
  className,
}: VisualizationCanvasProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md",
        className
      )}
    >
      {title && (
        <div className="border-b border-slate-800 px-4 py-3">
          <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
        </div>
      )}
      <div className="relative flex w-full items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
