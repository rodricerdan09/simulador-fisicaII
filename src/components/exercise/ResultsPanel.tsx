interface ResultItem {
  label: string;
  value: number;
  unit?: string;
  precision?: number;
  scientific?: boolean;
}

interface ResultsPanelProps {
  results: ResultItem[];
}

function formatValue(value: number, precision = 3, scientific = false): string {
  if (!Number.isFinite(value)) return "—";

  const abs = Math.abs(value);
  if (scientific && (abs >= 1e4 || (abs > 0 && abs < 1e-3))) {
    return value.toExponential(precision);
  }
  return value.toLocaleString("es-AR", {
    maximumFractionDigits: precision,
    minimumFractionDigits: 0,
  });
}

export function ResultsPanel({ results }: ResultsPanelProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md">
      <h3 className="mb-3 text-sm font-semibold text-slate-50">
        Resultados en tiempo real
      </h3>
      <dl className="space-y-2">
        {results.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between border-b border-slate-800/50 pb-2 last:border-0 last:pb-0"
          >
            <dt className="text-xs text-slate-300">{r.label}</dt>
            <dd className="font-mono text-sm text-slate-50">
              {formatValue(r.value, r.precision, r.scientific)}
              {r.unit ? ` ${r.unit}` : ""}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
