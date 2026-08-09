"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { VisualizationCanvas } from "../VisualizationCanvas";
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

  const yMaxM = useMemo(() => {
    if (fringeSpacingM === 0) return 0;
    return 5 * fringeSpacingM;
  }, [fringeSpacingM]);

  const color = wavelengthToCss(lambdaNm);

  // Draw the interference pattern on a horizontal canvas strip.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);

    if (dM === 0 || lambdaM === 0 || LM === 0) {
      return;
    }

    const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    const rBase = rgbMatch ? parseInt(rgbMatch[1], 10) : 34;
    const gBase = rgbMatch ? parseInt(rgbMatch[2], 10) : 211;
    const bBase = rgbMatch ? parseInt(rgbMatch[3], 10) : 238;

    for (let x = 0; x < width; x++) {
      const yM = ((x / width) * 2 - 1) * yMaxM;
      const phase = (Math.PI * dM * yM) / (lambdaM * LM);
      const intensity = I0 * Math.cos(phase) ** 2;

      const r = Math.min(255, Math.round(rBase * intensity + 15 * (1 - intensity)));
      const g = Math.min(255, Math.round(gBase * intensity + 23 * (1 - intensity)));
      const b = Math.min(255, Math.round(bBase * intensity + 42 * (1 - intensity)));

      for (let row = 0; row < height; row++) {
        const idx = (row * width + x) * 4;
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [lambdaM, dM, LM, I0, yMaxM, color]);

  // Data for the Recharts plot.
  const { curveData, maximaData, minimaData } = useMemo(() => {
    if (dM === 0 || lambdaM === 0 || LM === 0) {
      return { curveData: [], maximaData: [], minimaData: [] };
    }

    const points = 200;
    const curveData = [];
    for (let i = 0; i <= points; i++) {
      const yM = ((i / points) * 2 - 1) * yMaxM;
      const phase = (Math.PI * dM * yM) / (lambdaM * LM);
      const intensity = I0 * Math.cos(phase) ** 2;
      curveData.push({ y: yM * 1000, I: intensity });
    }

    const maximaData = [];
    const minimaData = [];
    const maxOrder = Math.floor(yMaxM / fringeSpacingM);
    for (let m = -maxOrder; m <= maxOrder; m++) {
      const yMax = m * fringeSpacingM;
      if (Math.abs(yMax) <= yMaxM * 1.01) {
        maximaData.push({ y: yMax * 1000, I: I0 });
      }
      const yMin = (m + 0.5) * fringeSpacingM;
      if (Math.abs(yMin) <= yMaxM * 1.01) {
        minimaData.push({ y: yMin * 1000, I: 0 });
      }
    }

    return { curveData, maximaData, minimaData };
  }, [lambdaM, dM, LM, I0, yMaxM, fringeSpacingM]);

  return (
    <VisualizationCanvas title="Visualización: distribución de intensidad">
      <div className="w-full space-y-4">
        <canvas
          ref={canvasRef}
          width={640}
          height={80}
          className="h-auto w-full max-w-full md:max-w-xl mx-auto rounded-lg"
          aria-label="Patrón de interferencia"
        />

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              key={`chart-${lambdaNm}-${slitDistanceMm}-${screenDistanceM}-${intensityI0}`}
              data={curveData}
              margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
            >
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis
                dataKey="y"
                type="number"
                domain={[-yMaxM * 1000, yMaxM * 1000]}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                stroke="#334155"
                label={{
                  value: "Posición y (mm)",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#94a3b8",
                  fontSize: 12,
                }}
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                stroke="#334155"
                domain={[0, Math.max(I0 * 1.05, 0.1)]}
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
                labelFormatter={(label: number) => `y = ${label.toFixed(2)} mm`}
              />
              <Line
                type="monotone"
                dataKey="I"
                stroke="#3cc3d8"
                strokeWidth={3}
                dot={false}
                isAnimationActive={false}
              />
              {/* Líneas de referencia para máximos */}
              {maximaData.map((max, idx) => (
                <ReferenceLine
                  key={`max-${idx}`}
                  x={max.y}
                  stroke="#28f50c"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  opacity={0.5}
                />
              ))}
              {/* Líneas de referencia para mínimos */}
              {minimaData.map((min, idx) => (
                <ReferenceLine
                  key={`min-${idx}`}
                  x={min.y}
                  stroke="#f43f5e"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  opacity={0.5}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 grid w-full grid-cols-2 gap-3 text-center text-xs text-slate-400 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
          <p className="text-slate-500">λ</p>
          <p className="font-mono" style={{ color }}>{lambdaNm} nm</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
          <p className="text-slate-500">d</p>
          <p className="font-mono text-cyan-400">{slitDistanceMm.toFixed(4)} mm</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
          <p className="text-slate-500">L</p>
          <p className="font-mono text-cyan-400">{screenDistanceM.toFixed(2)} m</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
          <p className="text-slate-500">I₀</p>
          <p className="font-mono text-cyan-400">{intensityI0.toFixed(1)}</p>
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
    { label: "Separación entre franjas", value: fringeSpacing * 1000, unit: "mm", precision: 2 },
    { label: "Intensidad máxima", value: intensityI0, precision: 1 },
  ];
}
