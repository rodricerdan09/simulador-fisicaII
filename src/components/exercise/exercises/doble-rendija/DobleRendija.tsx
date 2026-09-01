"use client";

import { useEffect, useMemo, useRef } from "react";
import { VisualizationCanvas } from "../../VisualizationCanvas";
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

  // Para m = 0 no se determina λ; se usa un valor representativo solo para la visualización.
  const visualLambdaM = lambdaM || 550e-9;

  const fringeSpacingM = useMemo(() => {
    if (dM === 0) return 0;
    return (visualLambdaM * LM) / dM;
  }, [visualLambdaM, LM, dM]);

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
    const visualLambdaNm = lambdaNm || 550;
    for (let i = 1; i <= waveCount; i++) {
      out.push(i * (visualLambdaNm / 700) * 18 + 4);
    }
    return out;
  }, [lambdaNm]);

  const screenCanvasRef = useRef<HTMLCanvasElement>(null);
  const yRangeM = 5 * fringeSpacingM;
  // Ancho efectivo de rendija usado solo para modelar la envolvente de difracción.
  const slitWidthM = dM / 5;

  useEffect(() => {
    const canvas = screenCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;

    ctx.clearRect(0, 0, w, h);

    if (dM === 0 || visualLambdaM === 0 || LM === 0 || fringeSpacingM === 0) {
      return;
    }

    const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    const rBase = rgbMatch ? parseInt(rgbMatch[1], 10) : 34;
    const gBase = rgbMatch ? parseInt(rgbMatch[2], 10) : 211;
    const bBase = rgbMatch ? parseInt(rgbMatch[3], 10) : 238;

    for (let row = 0; row < h; row++) {
      const yM = ((row / h) * 2 - 1) * yRangeM;
      const phase = (Math.PI * dM * yM) / (visualLambdaM * LM);
      const interference = Math.cos(phase) ** 2;

      // Envolvente de difracción por una sola rendija: (sin β / β)².
      const beta = (Math.PI * slitWidthM * yM) / (visualLambdaM * LM);
      const envelope = beta === 0 ? 1 : (Math.sin(beta) / beta) ** 2;
      const intensity = interference * envelope;

      const r = Math.min(255, Math.round(rBase * intensity + 15 * (1 - intensity)));
      const g = Math.min(255, Math.round(gBase * intensity + 23 * (1 - intensity)));
      const b = Math.min(255, Math.round(bBase * intensity + 42 * (1 - intensity)));

      for (let col = 0; col < w; col++) {
        const idx = (row * w + col) * 4;
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // Calcular el orden máximo visible
    const maxOrder = Math.floor(yRangeM / fringeSpacingM);

    // Dibujar líneas y etiquetas para cada franja brillante (máximo)
    ctx.font = "bold 11px monospace";
    ctx.textAlign = "left";

    for (let m = -maxOrder; m <= maxOrder; m++) {
      const yM = m * fringeSpacingM;
      if (Math.abs(yM) > yRangeM * 1.05) continue;

      const markerY = ((-yM / yRangeM) * 0.5 + 0.5) * h;

      // Línea horizontal para cada máximo
      ctx.strokeStyle = m === 0 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)";
      ctx.lineWidth = m === 0 ? 2 : 1.5;
      ctx.setLineDash(m === 0 ? [] : [4, 3]);
      ctx.beginPath();
      ctx.moveTo(0, markerY);
      ctx.lineTo(w, markerY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Etiqueta con el orden m
      ctx.fillStyle = m === 0 ? "#ffffff" : "rgba(255,255,255,0.8)";
      const label = `m=${m}`;
      ctx.fillText(label, 4, markerY - 4);
    }

    // Resaltar la franja de orden m seleccionada con línea más gruesa
    const ySelected = orderM * fringeSpacingM;
    if (Math.abs(ySelected) <= yRangeM * 1.05) {
      const markerY = ((-ySelected / yRangeM) * 0.5 + 0.5) * h;

      // Línea cyan más visible para el orden seleccionado
      ctx.strokeStyle = "#22d3ee";
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(0, markerY);
      ctx.lineTo(w, markerY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Etiqueta destacada con fondo
      ctx.font = "bold 12px monospace";
      const yM_cm = (ySelected * 100).toFixed(2);
      const label = `m=${orderM}, y=${yM_cm} cm`;
      const textWidth = ctx.measureText(label).width;

      ctx.fillStyle = "rgba(34, 211, 238, 0.95)";
      ctx.fillRect(4, markerY - 18, textWidth + 10, 20);

      ctx.fillStyle = "#0f172a";
      ctx.fillText(label, 9, markerY - 4);
    }
  }, [visualLambdaM, dM, LM, orderM, fringeSpacingM, yRangeM, slitWidthM, color]);

  return (
    <VisualizationCanvas title="Visualización: patrón de interferencia">
      <div className="flex items-center justify-center gap-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full max-w-full"
          aria-label="Doble rendija"
        >
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

          {/* Marco de la pantalla (el patrón se dibuja en el canvas) */}
          <rect
            x={screenX}
            y={20}
            width={120}
            height={height - 40}
            fill="#0f172a"
            stroke={color}
            strokeWidth={1}
            opacity={0.6}
          />

          {/* Etiquetas */}
          <text x={barrierX - 10} y={midY - slitGapPx / 2 - 10} textAnchor="end" style={{ fontSize: "15px", fill: "#a7bedf" }}>
            Rendija 1
          </text>
          <text x={barrierX + 10} y={midY + slitGapPx / 2 + 18} textAnchor="start" style={{ fontSize: "15px", fill: "#a7bedf" }}>
            Rendija 2
          </text>
          <text x={screenX + 60} y={height - 4} textAnchor="middle" style={{ fontSize: "15px", fill: "#a7bedf" }}>
            Pantalla
          </text>
        </svg>

        <canvas
          ref={screenCanvasRef}
          width={120}
          height={320}
          className="w-[120px] h-[270px] rounded-sm"
          aria-label="Patrón de intensidad cos² con envolvente de difracción"
        />
      </div>

      <div className="mt-4 flex justify-center pl-3">
        <div className="grid grid-cols-2 gap-3 text-center text-xs text-slate-400 sm:grid-cols-4">
          <div className="max-w-[110px] rounded-lg border border-slate-800 bg-slate-950/50 p-2">
            <p className="text-slate-500">λ</p>
            <p className="font-mono text-cyan-400" style={{ color: color }}>{lambdaNm.toFixed(1)} nm</p>
          </div>
          <div className="max-w-[110px] rounded-lg border border-slate-800 bg-slate-950/50 p-2">
            <p className="text-slate-500">d</p>
            <p className="font-mono text-cyan-400">{slitDistanceMm.toFixed(3)} mm</p>
          </div>
          <div className="max-w-[110px] rounded-lg border border-slate-800 bg-slate-950/50 p-2">
            <p className="text-slate-500">L</p>
            <p className="font-mono text-cyan-400">{screenDistanceM.toFixed(2)} m</p>
          </div>
          <div className="max-w-[110px] rounded-lg border border-slate-800 bg-slate-950/50 p-2">
            <p className="text-slate-500">Δy</p>
            <p className="font-mono text-cyan-400">{(fringeSpacingM * 1000).toFixed(2)} mm</p>
          </div>
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
  // Para m = 0 la posición central no permite determinar λ (cualquier λ da y = 0).
  const lambda = m === 0 ? 0 : (y_m * d) / (m * L);
  const lambdaNm = lambda * 1e9;

  // b) Calcular separación entre franjas: Δy = λ * L / d
  const fringeSpacing = d === 0 ? 0 : (lambda * L) / d;
  const fringeSpacingMm = fringeSpacing * 1000;

  return [
    { label: "Longitud de onda (λ)", value: lambda, unit: "m", precision: 4, scientific: true },
    { label: "Longitud de onda (λ)", value: lambdaNm, unit: "nm", precision: 1 },
    { label: "Separación entre franjas (Δy)", value: fringeSpacing, unit: "m", precision: 4, scientific: true },
    { label: "Separación entre franjas (Δy)", value: fringeSpacingMm, unit: "mm", precision: 2 },
  ];
}
