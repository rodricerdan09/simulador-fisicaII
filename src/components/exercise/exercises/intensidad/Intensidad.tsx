"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { VisualizationCanvas } from "../../VisualizationCanvas";
import { wavelengthToCss } from "@/lib/physics/wavelengthToColor";

interface IntensidadProps {
  lambdaNm: number;
  slitDistanceMm: number;
  screenDistanceM: number;
  intensityI0: number;
}

export function Intensidad({
  lambdaNm,
  slitDistanceMm,
  screenDistanceM,
  intensityI0,
}: IntensidadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const lambdaM = lambdaNm * 1e-9;
  const dM = slitDistanceMm * 1e-3;
  const LM = screenDistanceM;
  const I0 = intensityI0;

  const fringeSpacingM = useMemo(() => {
    if (dM === 0) return 0;
    return (lambdaM * LM) / dM;
  }, [lambdaM, LM, dM]);

  // Rango dinámico: mostrar al menos 3 franjas a cada lado, pero con mínimo de 2mm
  const yRangeM = useMemo(() => {
    if (fringeSpacingM === 0) return 2e-3;
    return Math.max(2e-3, 3 * fringeSpacingM);
  }, [fringeSpacingM]);

  const color = wavelengthToCss(lambdaNm);

  // Forzar re-renderizado del gráfico cuando cambien los parámetros
  const [chartKey, setChartKey] = useState(0);
  useEffect(() => {
    setChartKey(prev => prev + 1);
  }, [lambdaNm, slitDistanceMm, screenDistanceM, intensityI0]);

  // Draw intensity pattern on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (dM === 0 || lambdaM === 0 || LM === 0) {
      return;
    }

    const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    const rBase = rgbMatch ? parseInt(rgbMatch[1], 10) : 34;
    const gBase = rgbMatch ? parseInt(rgbMatch[2], 10) : 211;
    const bBase = rgbMatch ? parseInt(rgbMatch[3], 10) : 238;

    // Draw intensity pattern as vertical fringes
    for (let x = 0; x < width; x++) {
      const yM = ((x / width) * 2 - 1) * yRangeM;
      const phase = (Math.PI * dM * yM) / (lambdaM * LM);
      const intensity = I0 * Math.cos(phase) ** 2;

      const brightness = Math.round(intensity * 255);
      ctx.fillStyle = `rgb(${Math.round(rBase * intensity)}, ${Math.round(gBase * intensity)}, ${Math.round(bBase * intensity)})`;
      ctx.fillRect(x, 0, 1, height);
    }

    // Draw center line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [lambdaM, dM, LM, I0, yRangeM, color]);

  // Data for the Recharts plot.
  const { curveData, maximaData, minimaData } = useMemo(() => {
    if (dM === 0 || lambdaM === 0 || LM === 0) {
      return { curveData: [], maximaData: [], minimaData: [] };
    }

    const points = 300;
    const curveData = [];
    for (let i = 0; i <= points; i++) {
      const yM = ((i / points) * 2 - 1) * yRangeM;
      const phase = (Math.PI * dM * yM) / (lambdaM * LM);
      const intensity = I0 * Math.cos(phase) ** 2;
      curveData.push({ y: yM * 1000, I: intensity });
    }

    const maximaData = [];
    const minimaData = [];
    const maxOrder = Math.floor(yRangeM / fringeSpacingM);
    for (let m = -maxOrder; m <= maxOrder; m++) {
      const yMax = m * fringeSpacingM;
      if (Math.abs(yMax) <= yRangeM * 1.01) {
        maximaData.push({ y: yMax * 1000, I: I0 });
      }
      const yMin = (m + 0.5) * fringeSpacingM;
      if (Math.abs(yMin) <= yRangeM * 1.01) {
        minimaData.push({ y: yMin * 1000, I: 0 });
      }
    }

    return { curveData, maximaData, minimaData };
  }, [lambdaM, dM, LM, I0, yRangeM, fringeSpacingM]);

  return (
    <VisualizationCanvas title="Visualización: distribución de intensidad">
      <div className="flex gap-4">
        <div className="flex-1">
          <canvas
            ref={canvasRef}
            width={800}
            height={150}
            className="h-auto w-full rounded-lg"
            aria-label="Patrón de intensidad"
          />

          <div className="mt-4">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                key={`chart-${chartKey}`}
                data={curveData}
                margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
              >
                <defs>
                  <linearGradient id="colorI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis
                  dataKey="y"
                  type="number"
                  domain={[-yRangeM * 1000, yRangeM * 1000]}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  stroke="#334155"
                  label={{
                    value: "Posición y (mm)",
                    position: "insideBottom",
                    offset: -5,
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                  ticks={[-yRangeM * 1000, -yRangeM * 500, 0, yRangeM * 500, yRangeM * 1000]}
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  stroke="#334155"
                  domain={[0, I0 * 1.1]}
                  label={{
                    value: "Intensidad I",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#22d3ee",
                    borderWidth: 1,
                    color: "#f1f5f9",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [value.toFixed(3), "Intensidad"]}
                  labelFormatter={(label: number) => `y = ${label.toFixed(3)} mm`}
                />
                <Area
                  type="monotone"
                  dataKey="I"
                  stroke="#22d3ee"
                  strokeWidth={2}
                  fill="url(#colorI)"
                />
                {maximaData.map((max, idx) => (
                  <ReferenceLine
                    key={`max-${idx}`}
                    x={max.y}
                    stroke="#22c55e"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                  />
                ))}
                {minimaData.map((min, idx) => (
                  <ReferenceLine
                    key={`min-${idx}`}
                    x={min.y}
                    stroke="#f43f5e"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-32">
          <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2 text-center">
            <p className="text-xs text-slate-500">λ</p>
            <p className="font-mono text-sm" style={{ color }}>{lambdaNm} nm</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2 text-center">
            <p className="text-xs text-slate-500">d</p>
            <p className="font-mono text-sm text-cyan-400">{slitDistanceMm.toFixed(4)} mm</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2 text-center">
            <p className="text-xs text-slate-500">L</p>
            <p className="font-mono text-sm text-cyan-400">{screenDistanceM.toFixed(2)} m</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2 text-center">
            <p className="text-xs text-slate-500">I₀</p>
            <p className="font-mono text-sm text-cyan-400">{intensityI0.toFixed(1)}</p>
          </div>
        </div>
      </div>
    </VisualizationCanvas>
  );
}

export function computeIntensidad(
  lambdaNm: number,
  slitDistanceMm: number,
  screenDistanceM: number,
  intensityI0: number
) {
  const lambdaM = lambdaNm * 1e-9;
  const dM = slitDistanceMm * 1e-3;
  const L = screenDistanceM;

  if (dM === 0 || lambdaM === 0 || L === 0) {
    return [
      { label: "Separación entre franjas", value: 0, unit: "mm", precision: 2 },
      { label: "Intensidad máxima", value: intensityI0, precision: 1 },
    ];
  }

  const fringeSpacing = (lambdaM * L) / dM;
  return [
    { label: "Separación entre franjas (Δy)", value: fringeSpacing, unit: "m", precision: 4, scientific: true },
    { label: "Separación entre franjas (Δy)", value: fringeSpacing * 1000, unit: "mm", precision: 2 },
    { label: "Intensidad máxima (I₀)", value: intensityI0, unit: "W/m²", precision: 1 },
  ];
}
