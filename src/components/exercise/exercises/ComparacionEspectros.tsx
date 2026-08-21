"use client";

import { useMemo } from "react";
import { VisualizationCanvas } from "../VisualizationCanvas";
import { wavelengthToCss } from "@/lib/physics/wavelengthToColor";

interface ComparacionEspectrosProps {
  lambda1Nm: number;
  lambda2Nm: number;
  slitDistanceMm: number;
  screenDistanceM: number;
  orderM1: number;
  orderM2: number;
}

export function ComparacionEspectros({
  lambda1Nm,
  lambda2Nm,
  slitDistanceMm,
  screenDistanceM,
  orderM1,
  orderM2,
}: ComparacionEspectrosProps) {
  const lambda1M = lambda1Nm * 1e-9;
  const lambda2M = lambda2Nm * 1e-9;
  const dM = slitDistanceMm * 1e-3;
  const LM = screenDistanceM;

  const y1M = useMemo(() => {
    if (dM === 0) return 0;
    return (orderM1 * lambda1M * LM) / dM;
  }, [orderM1, lambda1M, LM, dM]);

  const y2M = useMemo(() => {
    if (dM === 0) return 0;
    return (orderM2 * lambda2M * LM) / dM;
  }, [orderM2, lambda2M, LM, dM]);

  const color1 = wavelengthToCss(lambda1Nm);
  const color2 = wavelengthToCss(lambda2Nm);

  const width = 640;
  const height = 400;
  const barrierX = 120;
  const screenX = 540;
  const midY = height / 2;
  const slitGapPx = Math.min(80, (slitDistanceMm / 0.1) * 8);

  const waveCount = 8;
  const waves1 = useMemo(() => {
    const out = [];
    for (let i = 1; i <= waveCount; i++) {
      out.push(i * (lambda1Nm / 700) * 18 + 4);
    }
    return out;
  }, [lambda1Nm]);

  const waves2 = useMemo(() => {
    const out = [];
    for (let i = 1; i <= waveCount; i++) {
      out.push(i * (lambda2Nm / 700) * 18 + 4);
    }
    return out;
  }, [lambda2Nm]);

  // Escala dinámica para que las franjas siempre sean visibles
  const maxYM = Math.max(Math.abs(y1M), Math.abs(y2M));
  const scalePxPerM = maxYM > 0 ? (height / 2 - 40) / maxYM : 10000;
  const y1Px = midY - y1M * scalePxPerM;
  const y2Px = midY - y2M * scalePxPerM;

  return (
    <VisualizationCanvas title="Visualización: comparación de dos longitudes de onda">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full max-w-full md:max-w-xl mx-auto"
        aria-label="Comparación de espectros"
      >
        {/* Ondas desde rendija superior - λ1 */}
        {waves1.map((r, i) => (
          <circle
            key={`top1-${i}`}
            cx={barrierX}
            cy={midY - slitGapPx / 2}
            r={r}
            fill="none"
            stroke={color1}
            strokeWidth={1.5}
            opacity={0.35}
          />
        ))}

        {/* Ondas desde rendija inferior - λ1 */}
        {waves1.map((r, i) => (
          <circle
            key={`bottom1-${i}`}
            cx={barrierX}
            cy={midY + slitGapPx / 2}
            r={r}
            fill="none"
            stroke={color1}
            strokeWidth={1.5}
            opacity={0.35}
          />
        ))}

        {/* Ondas desde rendija superior - λ2 */}
        {waves2.map((r, i) => (
          <circle
            key={`top2-${i}`}
            cx={barrierX}
            cy={midY - slitGapPx / 2}
            r={r}
            fill="none"
            stroke={color2}
            strokeWidth={1.5}
            opacity={0.25}
          />
        ))}

        {/* Ondas desde rendija inferior - λ2 */}
        {waves2.map((r, i) => (
          <circle
            key={`bottom2-${i}`}
            cx={barrierX}
            cy={midY + slitGapPx / 2}
            r={r}
            fill="none"
            stroke={color2}
            strokeWidth={1.5}
            opacity={0.25}
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
          fill="#0f172a"
          stroke="#334155"
          strokeWidth={1}
        />

        {/* Franja de orden m1 para λ1 */}
        {y1Px > 20 && y1Px < height - 20 && (
          <>
            <line
              x1={screenX - 20}
              y1={y1Px}
              x2={screenX + 32}
              y2={y1Px}
              stroke={color1}
              strokeWidth={3}
              opacity={0.9}
            />
            <text
              x={screenX + 35}
              y={y1Px + 4}
              style={{ fontSize: "17px", fill: color1 }}
            >
              λ₁(m={orderM1})
            </text>
          </>
        )}

        {/* Franja de orden m2 para λ2 */}
        {y2Px > 20 && y2Px < height - 20 && (
          <>
            <line
              x1={screenX - 20}
              y1={y2Px}
              x2={screenX + 32}
              y2={y2Px}
              stroke={color2}
              strokeWidth={3}
              opacity={0.9}
            />
            <text
              x={screenX + 35}
              y={y2Px + 4}
              style={{ fontSize: "17px", fill: color2 }}
            >
              λ₂(m={orderM2})
            </text>
          </>
        )}

        {/* Línea central (m=0) */}
        <line
          x1={screenX - 5}
          y1={midY}
          x2={screenX + 17}
          y2={midY}
          stroke="#64748b"
          strokeWidth={1}
          strokeDasharray="4 4"
        />

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

      <div className="mt-4 p-1 grid w-full grid-cols-2 gap-3 text-center text-xs text-slate-400 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
          <p className="text-slate-500">λ₁</p>
          <p className="font-mono" style={{ color: color1 }}>{lambda1Nm} nm</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
          <p className="text-slate-500">λ₂</p>
          <p className="font-mono" style={{ color: color2 }}>{lambda2Nm} nm</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
          <p className="text-slate-500">d</p>
          <p className="font-mono text-cyan-400">{slitDistanceMm.toFixed(3)} mm</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
          <p className="text-slate-500">L</p>
          <p className="font-mono text-cyan-400">{screenDistanceM.toFixed(2)} m</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
          <p className="text-slate-500">m₁</p>
          <p className="font-mono text-cyan-400">{orderM1}</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
          <p className="text-slate-500">m₂</p>
          <p className="font-mono text-cyan-400">{orderM2}</p>
        </div>
      </div>
    </VisualizationCanvas>
  );
}

export function computeComparacionEspectros(
  lambda1Nm: number,
  lambda2Nm: number,
  slitDistanceMm: number,
  screenDistanceM: number,
  orderM1: number,
  orderM2: number
) {
  const lambda1 = lambda1Nm * 1e-9;
  const lambda2 = lambda2Nm * 1e-9;
  const d = slitDistanceMm * 1e-3;
  const L = screenDistanceM;

  const y1 = (orderM1 * lambda1 * L) / d;
  const y2 = (orderM2 * lambda2 * L) / d;
  const deltaY = Math.abs(y2 - y1);

  return [
    { label: "λ₁ (Notación Científica)", value: lambda1, unit: "m", precision: 4, scientific: true },
    { label: "λ₁ (Nanómetros)", value: lambda1Nm, unit: "nm", precision: 0 },
    { label: "λ₂ (Notación Científica)", value: lambda2, unit: "m", precision: 4, scientific: true },
    { label: "λ₂ (Nanómetros)", value: lambda2Nm, unit: "nm", precision: 0 },
    { label: `y₁ (posición franja λ₁, m=${orderM1})`, value: y1, unit: "m", precision: 4, scientific: true },
    { label: `y₁ (posición franja λ₁, m=${orderM1})`, value: y1 * 1000, unit: "mm", precision: 2 },
    { label: `y₂ (posición franja λ₂, m=${orderM2})`, value: y2, unit: "m", precision: 4, scientific: true },
    { label: `y₂ (posición franja λ₂, m=${orderM2})`, value: y2 * 1000, unit: "mm", precision: 2 },
    { label: "Separación Δy (Notación Científica)", value: deltaY, unit: "m", precision: 4, scientific: true },
    { label: "Separación Δy (Milímetros)", value: deltaY * 1000, unit: "mm", precision: 2 },
  ];
}
