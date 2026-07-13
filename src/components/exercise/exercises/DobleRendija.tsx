"use client";

import { useMemo } from "react";
import { VisualizationCanvas } from "../VisualizationCanvas";
import { wavelengthToCss } from "@/lib/physics/wavelengthToColor";

interface DobleRendijaProps {
  lambdaNm: number;
  slitDistanceMm: number;
  screenDistanceM: number;
  orderM: number;
  fringePositionCm: number;
}

export function DobleRendija({
  lambdaNm,
  slitDistanceMm,
  screenDistanceM,
  orderM,
  fringePositionCm,
}: DobleRendijaProps) {
  const lambdaM = lambdaNm * 1e-9;
  const dM = slitDistanceMm * 1e-3;
  const LM = screenDistanceM;

  const fringeSpacingM = useMemo(() => {
    if (dM === 0) return 0;
    return (lambdaM * LM) / dM;
  }, [lambdaM, LM, dM]);

  const color = wavelengthToCss(lambdaNm);
  const width = 640;
  const height = 320;
  const barrierX = 120;
  const screenX = 540;
  const midY = height / 2;
  const slitGapPx = Math.min(80, (slitDistanceMm / 0.1) * 8);

  const waveCount = 8;
  const waves = useMemo(() => {
    const out = [];
    for (let i = 1; i <= waveCount; i++) {
      out.push(i * (lambdaNm / 700) * 18 + 4);
    }
    return out;
  }, [lambdaNm]);

  const screenBars = useMemo(() => {
    const bars = [];
    const maxOrder = Math.floor(dM / lambdaM);
    const clampedOrder = Math.min(maxOrder, 12);
    for (let m = -clampedOrder; m <= clampedOrder; m++) {
      const yM = m * fringeSpacingM;
      const yPx = midY + (yM / 0.01) * 120;
      if (yPx < 10 || yPx > height - 10) continue;
      const intensity = Math.cos((Math.PI * dM * yM) / (lambdaM * LM)) ** 2;
      bars.push({ m, yPx, intensity });
    }
    return bars;
  }, [dM, lambdaM, LM, fringeSpacingM, midY, height]);

  return (
    <VisualizationCanvas title="Visualización: patrón de interferencia">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full max-w-full md:max-w-xl mx-auto"
        aria-label="Doble rendija"
      >
        <defs>
          <linearGradient id="screenGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.05" />
            <stop offset="50%" stopColor={color} stopOpacity="0.4" />
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
          fill="url(#screenGradient)"
          stroke={color}
          strokeWidth={1}
          opacity={0.8}
        />

        {/* Franjas de interferencia */}
        {screenBars.map((bar) => (
          <line
            key={bar.m}
            x1={screenX}
            y1={bar.yPx}
            x2={screenX + 12}
            y2={bar.yPx}
            stroke={color}
            strokeWidth={2 + bar.intensity * 4}
            opacity={0.3 + bar.intensity * 0.7}
          />
        ))}

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
          <p className="text-slate-500">λ</p>
          <p className="font-mono text-cyan-400" style={{ color: color }}>{lambdaNm.toFixed(1)} nm</p>
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
          <p className="text-slate-500">Δy</p>
          <p className="font-mono text-cyan-400">{(fringeSpacingM * 1000).toFixed(2)} mm</p>
        </div>
      </div>
    </VisualizationCanvas>
  );
}

export function computeDobleRendija(
  screenDistanceM: number,
  slitDistanceMm: number,
  orderM: number,
  fringePositionCm: number
) {
  const L = screenDistanceM;
  const d = slitDistanceMm * 1e-3;
  const m = orderM;
  const y_m = fringePositionCm * 1e-2;

  // a) Calcular longitud de onda: λ = y_m * d / (m * L)
  const lambda = (y_m * d) / (m * L);
  const lambdaNm = lambda * 1e9;

  // b) Calcular separación entre franjas: Δy = λ * L / d
  const fringeSpacing = (lambda * L) / d;
  const fringeSpacingMm = fringeSpacing * 1000;

  return [
    { label: "Longitud de onda (λ)", value: lambda, unit: "m", precision: 4, scientific: true },
    { label: "Longitud de onda (λ)", value: lambdaNm, unit: "nm", precision: 1 },
    { label: "Separación entre franjas (Δy)", value: fringeSpacing, unit: "m", precision: 4, scientific: true },
    { label: "Separación entre franjas (Δy)", value: fringeSpacingMm, unit: "mm", precision: 2 },
  ];
}
