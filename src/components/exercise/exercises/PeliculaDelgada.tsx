"use client";

import { useMemo } from "react";
import { VisualizationCanvas } from "../VisualizationCanvas";
import { wavelengthToCss } from "@/lib/physics/wavelengthToColor";

interface PeliculaDelgadaProps {
  refractiveIndex: number;
  lambdaNm: number;
  orderM: number;
}

export function PeliculaDelgada({
  refractiveIndex,
  lambdaNm,
  orderM,
}: PeliculaDelgadaProps) {
  const n = refractiveIndex;
  const lambdaM = lambdaNm * 1e-9;

  const tM = useMemo(() => {
    if (n === 0) return 0;
    return ((orderM + 0.5) * lambdaM) / (2 * n);
  }, [orderM, lambdaM, n]);

  const tNm = tM * 1e9;
  const color = wavelengthToCss(lambdaNm);

  const width = 640;
  const height = 450;
  const filmX = 150;
  const filmY = 220;
  const filmW = 340;
  const filmH = Math.max(60, Math.min(100, tNm / 2));
  const centerX = filmX + filmW / 2;
  const topY = filmY;
  const bottomY = filmY + filmH;
  
  // Desplazamiento horizontal pequeño para distinguir los rayos (pero todos van en dirección normal)
  const incidentOffset = 0;
  const reflected1Offset = -35;
  const reflected2Offset = 35;

  return (
    <VisualizationCanvas title="Visualización: película delgada">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full max-w-full md:max-w-xl mx-auto"
        aria-label="Película delgada"
      >
        <defs>
          <linearGradient id="filmGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="50%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity="0.25" />
          </linearGradient>
          <marker id="arrowYellow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#fbbf24" />
          </marker>
          <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#f43f5e" />
          </marker>
          <marker id="arrowCyan" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={color} />
          </marker>
        </defs>

        {/* Medio superior (aire) */}
        <rect x={0} y={0} width={width} height={filmY} fill="#0f172a" />

        {/* Medio inferior (aire) */}
        <rect x={0} y={bottomY} width={width} height={height - bottomY} fill="#0f172a" />

        {/* Película delgada */}
        <rect
          x={filmX}
          y={filmY}
          width={filmW}
          height={filmH}
          fill="url(#filmGradient)"
          stroke={color}
          strokeWidth={1.5}
          opacity={0.9}
        />

        {/* Líneas de interfaz */}
        <line x1={filmX} y1={topY} x2={filmX + filmW} y2={topY} stroke={color} strokeWidth={1.5} />
        <line x1={filmX} y1={bottomY} x2={filmX + filmW} y2={bottomY} stroke={color} strokeWidth={1.5} />

        {/* Rayo incidente (amarillo) — dirección normal hacia abajo */}
        <line
          x1={centerX + incidentOffset}
          y1={50}
          x2={centerX + incidentOffset}
          y2={topY - 8}
          stroke="#fbbf24"
          strokeWidth={3}
          markerEnd="url(#arrowYellow)"
        />

        {/* Rayo reflejado 1 (rojo) — sale hacia arriba con cambio de fase π, ligeramente desplazado */}
        <line
          x1={centerX + reflected1Offset}
          y1={topY}
          x2={centerX + reflected1Offset}
          y2={60}
          stroke="#f43f5e"
          strokeWidth={3}
          markerEnd="url(#arrowRed)"
        />

        {/* Rayo transmitido atraviesa la película (cyan punteado) */}
        <line
          x1={centerX}
          y1={topY + 8}
          x2={centerX}
          y2={bottomY - 8}
          stroke={color}
          strokeWidth={3}
          strokeDasharray="6 4"
          markerEnd="url(#arrowCyan)"
        />

        {/* Rayo reflejado 2 (cyan) — reflejado en superficie inferior sin cambio de fase, sale hacia arriba */}
        <line
          x1={centerX + reflected2Offset}
          y1={bottomY}
          x2={centerX + reflected2Offset}
          y2={60}
          stroke={color}
          strokeWidth={3}
          markerEnd="url(#arrowCyan)"
        />

        {/* Indicador de cambio de fase π en la reflexión superior */}
        <g transform={`translate(${centerX + reflected1Offset - 15}, ${topY - 20})`}>
          <text x={0} y={0} textAnchor="middle" style={{ fontSize: "16px", fontWeight: "bold", fill: "#f43f5e" }}>
            π
          </text>
        </g>

        {/* Indicador de espesor t (línea vertical punteada a la derecha de la película) */}
        <line
          x1={filmX + filmW + 30}
          y1={topY}
          x2={filmX + filmW + 30}
          y2={bottomY}
          stroke="#a7bedf"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        <line
          x1={filmX + filmW + 24}
          y1={topY + 8}
          x2={filmX + filmW + 30}
          y2={topY}
          stroke="#a7bedf"
          strokeWidth={1.5}
        />
        <line
          x1={filmX + filmW + 36}
          y1={topY + 8}
          x2={filmX + filmW + 30}
          y2={topY}
          stroke="#a7bedf"
          strokeWidth={1.5}
        />
        <line
          x1={filmX + filmW + 24}
          y1={bottomY - 8}
          x2={filmX + filmW + 30}
          y2={bottomY}
          stroke="#a7bedf"
          strokeWidth={1.5}
        />
        <line
          x1={filmX + filmW + 36}
          y1={bottomY - 8}
          x2={filmX + filmW + 30}
          y2={bottomY}
          stroke="#a7bedf"
          strokeWidth={1.5}
        />
        <text
          x={filmX + filmW + 50}
          y={topY + filmH / 2 + 5}
          style={{ fontSize: "16px", fontWeight: "bold", fill: "#a7bedf" }}
        >
          t
        </text>

        {/* Etiquetas de rayos */}
        <text x={centerX + incidentOffset} y={40} textAnchor="middle" style={{ fontSize: "13px", fontWeight: "bold", fill: "#fbbf24" }}>
          Incidente
        </text>
        <text x={centerX + reflected1Offset - 8} y={50} textAnchor="end" style={{ fontSize: "12px", fontWeight: "bold", fill: "#f43f5e" }}>
          Reflejado 1
        </text>
        <text x={centerX + reflected2Offset + 8} y={50} textAnchor="start" style={{ fontSize: "12px", fontWeight: "bold", fill: color }}>
          Reflejado 2
        </text>

        {/* Etiqueta de la película */}
        <text x={filmX + filmW / 2} y={filmY + filmH + 25} textAnchor="middle" style={{ fontSize: "14px", fontWeight: "bold", fill: "#a7bedf" }}>
          Película (n = {n.toFixed(2)})
        </text>
      </svg>

      <div className="mt-4 grid w-full grid-cols-2 gap-3 text-center text-xs text-slate-400 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
          <p className="text-slate-500">n</p>
          <p className="font-mono text-cyan-400">{n.toFixed(2)}</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
          <p className="text-slate-500">λ</p>
          <p className="font-mono" style={{ color }}>{lambdaNm} nm</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
          <p className="text-slate-500">m</p>
          <p className="font-mono text-cyan-400">{orderM}</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2">
          <p className="text-slate-500">t</p>
          <p className="font-mono text-cyan-400">{tNm.toFixed(1)} nm</p>
        </div>
      </div>
    </VisualizationCanvas>
  );
}

export function computePeliculaDelgada(
  refractiveIndex: number,
  lambdaNm: number,
  orderM: number
) {
  const n = refractiveIndex;
  const lambda = lambdaNm * 1e-9;
  const m = orderM;

  const t = n === 0 ? 0 : ((m + 0.5) * lambda) / (2 * n);
  const tNm = t * 1e9;

  return [
    { label: "Índice de refracción (n)", value: n, unit: "", precision: 2 },
    { label: "Longitud de onda (λ)", value: lambda, unit: "m", precision: 4, scientific: true },
    { label: "Longitud de onda (λ)", value: lambdaNm, unit: "nm", precision: 0 },
    { label: "Orden de interferencia (m)", value: m, unit: "", precision: 0 },
    { label: "Espesor mínimo (t)", value: t, unit: "m", precision: 4, scientific: true },
    { label: "Espesor mínimo (t)", value: tNm, unit: "nm", precision: 1 },
  ];
}
