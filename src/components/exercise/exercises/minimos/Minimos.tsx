"use client";

import { useMemo } from "react";
import { VisualizationCanvas } from "../../VisualizationCanvas";
import { wavelengthToCss } from "@/lib/physics/wavelengthToColor";

interface MinimosProps {
  slitDistanceMm: number;
  screenDistanceM: number;
  fringeSpacingMm: number;
}

export function Minimos({
  slitDistanceMm,
  screenDistanceM,
  fringeSpacingMm,
}: MinimosProps) {
  const dM = slitDistanceMm * 1e-3;
  const LM = screenDistanceM;
  const deltaYM = fringeSpacingMm * 1e-3;

  // Calcular λ a partir de Δy según la fórmula del profesor
  const lambdaM = LM === 0 ? 0 : (deltaYM * 2 * dM) / (LM * 3);
  const lambdaNm = lambdaM * 1e9;
  const color = wavelengthToCss(lambdaNm || 550);

  const width = 640;
  const height = 400;
  const barrierX = 120;
  const screenX = 540;
  const midY = height / 2;
  const slitGapPx = Math.min(80, (slitDistanceMm / 0.1) * 8);

  const waveCount = 8;
  const waves = useMemo(() => {
    const out = [];
    const visualLambdaNm = lambdaNm > 0 && lambdaNm < 1000 ? lambdaNm : 550;
    for (let i = 1; i <= waveCount; i++) {
      out.push(i * (visualLambdaNm / 700) * 18 + 4);
    }
    return out;
  }, [lambdaNm]);

  // Usar directamente deltaYM como la separación entre mínimos
  const minSpacingM = deltaYM;

  // Escala FIJA basada en valores de referencia para que los mínimos se muevan visualmente
  // Valores de referencia: Δy_ref = 0.6mm (valor del enunciado)
  const refDeltaYM = 0.6e-3;
  const scalePxPerM = refDeltaYM > 0 ? (height / 2 - 60) / (refDeltaYM * 5) : 10000;

  const minima = useMemo(() => {
    const items = [];
    for (let m = -5; m <= 4; m++) {
      const yM = (m + 0.5) * minSpacingM;
      const yPx = midY - yM * scalePxPerM;
      if (yPx >= 20 && yPx <= height - 20) {
        items.push({ m, yPx, yM });
      }
    }
    return items;
  }, [minSpacingM, midY, height, scalePxPerM]);

  const yTopMin = minima.find((m) => m.m === -1);
  const yBottomMin = minima.find((m) => m.m === 0);

  return (
    <VisualizationCanvas title="Visualización: mínimos de interferencia">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full max-w-full md:max-w-xl mx-auto"
        aria-label="Mínimos de interferencia"
      >
        <defs>
          <linearGradient id="minimaScreenGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.05" />
            <stop offset="50%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Ondas desde rendija superior */}
        {waves.map((r, i) => (
          <circle
            key={`top-${i}`}
            cx={barrierX}
            cy={midY - slitGapPx / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            opacity={0.35}
          />
        ))}

        {/* Ondas desde rendija inferior */}
        {waves.map((r, i) => (
          <circle
            key={`bottom-${i}`}
            cx={barrierX}
            cy={midY + slitGapPx / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            opacity={0.35}
          />
        ))}

        {/* Barrera con rendijas */}
        <rect
          x={barrierX - 4}
          y={0}
          width={8}
          height={midY - slitGapPx / 2 - 2}
          fill="#1e293b"
          stroke="#334155"
        />
        <rect
          x={barrierX - 4}
          y={midY + slitGapPx / 2 + 2}
          width={8}
          height={height - (midY + slitGapPx / 2 + 2)}
          fill="#1e293b"
          stroke="#334155"
        />

        {/* Pantalla */}
        <rect
          x={screenX}
          y={20}
          width={12}
          height={height - 40}
          fill="url(#minimaScreenGradient)"
          stroke={color}
          strokeWidth={1}
          opacity={0.8}
        />

        {/* Franjas de interferencia (máximos) */}
        {[-2, -1, 0, 1, 2].map((m) => {
          const yM = m * minSpacingM;
          const yPx = midY - yM * scalePxPerM;
          if (yPx < 20 || yPx > height - 20) return null;
          return (
            <line
              key={`max-${m}`}
              x1={screenX}
              y1={yPx}
              x2={screenX + 12}
              y2={yPx}
              stroke={color}
              strokeWidth={3}
              opacity={0.6}
            />
          );
        })}

        {/* Mínimos marcados */}
        {minima.map((min) => (
          <g key={`min-${min.m}`}>
            <line
              x1={screenX - 8}
              y1={min.yPx}
              x2={screenX + 20}
              y2={min.yPx}
              stroke="#0f172a"
              strokeWidth={4}
            />
            <line
              x1={screenX - 8}
              y1={min.yPx}
              x2={screenX + 20}
              y2={min.yPx}
              stroke="#a7bedf"
              strokeWidth={2}
              strokeDasharray="4 3"
            />
            <text
              x={screenX + 26}
              y={min.yPx + 4}
              style={{ fontSize: "12px", fill: "#a7bedf" }}
            >
              m={min.m}
            </text>
          </g>
        ))}

        {/* Indicación de separación entre mínimos consecutivos */}
        {yTopMin && yBottomMin && (
          <>
            <line
              x1={screenX + 60}
              y1={yTopMin.yPx}
              x2={screenX + 60}
              y2={yBottomMin.yPx}
              stroke="#a7bedf"
              strokeWidth={1.5}
              strokeDasharray="3 3"
            />
            <polygon
              points={`${screenX + 57},${yTopMin.yPx + 6} ${screenX + 63},${yTopMin.yPx + 6} ${screenX + 60},${yTopMin.yPx}`}
              fill="#a7bedf"
            />
            <polygon
              points={`${screenX + 57},${yBottomMin.yPx - 6} ${screenX + 63},${yBottomMin.yPx - 6} ${screenX + 60},${yBottomMin.yPx}`}
              fill="#a7bedf"
            />
            <text
              x={screenX + 67}
              y={(yTopMin.yPx + yBottomMin.yPx) / 2 + 4}
              style={{ fontSize: "13px", fill: "#a7bedf" }}
            >
              Δy
            </text>
          </>
        )}

        {/* Etiquetas */}
        <text x={barrierX - 10} y={midY - slitGapPx / 2 - 10} textAnchor="end" style={{ fontSize: "15px", fill: "#a7bedf" }}>
          Rendija 1
        </text>
        <text x={barrierX + 10} y={midY + slitGapPx / 2 + 18} textAnchor="start" style={{ fontSize: "15px", fill: "#a7bedf" }}>
          Rendija 2
        </text>
        <text x={screenX + 6} y={height - 4} textAnchor="middle" style={{ fontSize: "15px", fill: "#a7bedf" }}>
          Pantalla
        </text>
      </svg>

      <div className="mt-4 grid w-full grid-cols-2 gap-3 text-center text-xs text-slate-400 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
          <p className="text-slate-500">d</p>
          <p className="font-mono text-cyan-400">{slitDistanceMm.toFixed(3)} mm</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
          <p className="text-slate-500">L</p>
          <p className="font-mono text-cyan-400">{screenDistanceM.toFixed(2)} m</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
          <p className="text-slate-500">Δy</p>
          <p className="font-mono text-cyan-400">{fringeSpacingMm.toFixed(2)} mm</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
          <p className="text-slate-500">λ</p>
          <p className="font-mono" style={{ color }}>{lambdaNm.toFixed(1)} nm</p>
        </div>
      </div>
    </VisualizationCanvas>
  );
}

export function computeMinimos(
  slitDistanceMm: number,
  screenDistanceM: number,
  fringeSpacingMm: number
) {
  const d = slitDistanceMm * 1e-3;
  const L = screenDistanceM;
  const deltaY = fringeSpacingMm * 1e-3;

  const lambda = L === 0 ? 0 : (deltaY * d) / L;
  const lambdaNm = lambda * 1e9;

  return [
    { label: "Separación entre mínimos (Δy)", value: deltaY, unit: "m", precision: 4, scientific: true },
    { label: "Separación entre mínimos (Δy)", value: deltaY * 1000, unit: "mm", precision: 2 },
    { label: "Longitud de onda (λ)", value: lambda, unit: "m", precision: 4, scientific: true },
    { label: "Longitud de onda (λ)", value: lambdaNm, unit: "nm", precision: 1 },
  ];
}
