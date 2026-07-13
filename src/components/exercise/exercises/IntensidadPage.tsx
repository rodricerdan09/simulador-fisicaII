"use client";

import { useMemo, useState } from "react";
import { ExerciseModule } from "../ExerciseModule";
import { ParameterControl } from "../ParameterControl";
import { ResultsPanel } from "../ResultsPanel";
import { TheoryPanel } from "../TheoryPanel";
import { Intensidad, computeIntensidad } from "./Intensidad";
import { Exercise } from "@/types";
import { Formula } from "@/lib/katex/render";
import { cn } from "@/lib/utils";

type ComparisonTab = "current" | "doubleD" | "lambda400";

export function IntensidadPage({ exercise }: { exercise: Exercise }) {
  const [lambda, setLambda] = useState(580);
  const [slitDistance, setSlitDistance] = useState(0.001);
  const [screenDistance, setScreenDistance] = useState(1.0);
  const [intensityI0, setIntensityI0] = useState(1.0);
  const [tab, setTab] = useState<ComparisonTab>("current");

  const results = computeIntensidad(lambda, slitDistance, screenDistance, intensityI0);

  const lambdaM = lambda * 1e-9;
  const dM = slitDistance * 1e-3;
  const L = screenDistance;

  const fringeSpacingM = useMemo(() => {
    if (dM === 0) return 0;
    return (lambdaM * L) / dM;
  }, [lambdaM, L, dM]);

  const yRangeM = useMemo(() => 5 * fringeSpacingM, [fringeSpacingM]);

  const maxima = useMemo(() => {
    if (fringeSpacingM === 0) return [];
    const out = [];
    const maxOrder = Math.floor(yRangeM / fringeSpacingM);
    for (let m = -maxOrder; m <= maxOrder; m++) {
      const y = m * fringeSpacingM;
      out.push({ m, y });
    }
    return out;
  }, [fringeSpacingM, yRangeM]);

  const minima = useMemo(() => {
    if (fringeSpacingM === 0) return [];
    const out = [];
    const maxOrder = Math.floor(yRangeM / fringeSpacingM);
    for (let m = -maxOrder; m <= maxOrder; m++) {
      const y = (m + 0.5) * fringeSpacingM;
      if (Math.abs(y) <= yRangeM * 1.01) {
        out.push({ m, y });
      }
    }
    return out;
  }, [fringeSpacingM, yRangeM]);

  const comparisonLabel = {
    current: "Actual",
    doubleD: "d × 2",
    lambda400: "λ = 400 nm",
  }[tab];

  const visParams = {
    current: { lambdaNm: lambda, slitDistanceMm: slitDistance, screenDistanceM: screenDistance, intensityI0 },
    doubleD: { lambdaNm: lambda, slitDistanceMm: slitDistance * 2, screenDistanceM: screenDistance, intensityI0 },
    lambda400: { lambdaNm: 400, slitDistanceMm: slitDistance, screenDistanceM: screenDistance, intensityI0 },
  }[tab];

  const comparisonResults = computeIntensidad(
    visParams.lambdaNm,
    visParams.slitDistanceMm,
    visParams.screenDistanceM,
    visParams.intensityI0
  );

  return (
    <ExerciseModule
      exercise={exercise}
      params={
        <>
          <ParameterControl
            label="Longitud de onda (λ)"
            value={lambda}
            min={380}
            max={750}
            step={5}
            unit="nm"
            onChange={setLambda}
          />
          <ParameterControl
            label="Separación entre rendijas (d)"
            value={slitDistance}
            min={0.0001}
            max={0.005}
            step={0.0001}
            unit="m"
            onChange={setSlitDistance}
          />
          <ParameterControl
            label="Distancia a la pantalla (L)"
            value={screenDistance}
            min={0.5}
            max={3.0}
            step={0.1}
            unit="m"
            onChange={setScreenDistance}
          />
          <ParameterControl
            label="Intensidad máxima (I₀)"
            value={intensityI0}
            min={0.1}
            max={2.0}
            step={0.1}
            unit=""
            onChange={setIntensityI0}
          />
        </>
      }
      visualization={
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {(["current", "doubleD", "lambda400"] as ComparisonTab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                  tab === t
                    ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
                    : "border-slate-800 bg-slate-900/50 text-slate-400 hover:bg-slate-800/50"
                )}
              >
                {{
                  current: "Actual",
                  doubleD: "d × 2",
                  lambda400: "λ = 400 nm",
                }[t]}
              </button>
            ))}
          </div>
          <Intensidad key={tab} {...visParams} />
          {tab !== "current" && (
            <p className="text-center text-xs text-slate-400">
              Comparando con: <strong className="text-slate-200">{comparisonLabel}</strong>
              {" "}- separación entre franjas{" "}
              <span className="font-mono text-cyan-400">
                {comparisonResults[0]?.value.toFixed(2)} mm
              </span>
            </p>
          )}
        </div>
      }
      results={<ResultsPanel results={results} />}
      theory={
        <TheoryPanel>
          <p className="mb-2">
            <strong className="text-slate-200">Datos del problema:</strong>
          </p>
          <ul className="mb-3 ml-4 list-disc text-sm text-slate-400">
            <li>Longitud de onda: <Formula math="\lambda = 580 \text{ nm} = 5.80 \times 10^{-7} \text{ m}" /></li>
            <li>Separación entre rendijas: <Formula math="d = 1 \text{ mm} = 1 \times 10^{-3} \text{ m}" /></li>
            <li>Distancia a la pantalla: <Formula math="L = 1 \text{ m}" /></li>
            <li>Intensidad máxima: <Formula math="I_0 = 1" /></li>
          </ul>

          <p className="mb-2">
            <strong className="text-slate-200">Distribución de intensidad:</strong>
          </p>
          <Formula math="I = I_0 \cos^2\left(\frac{\pi d y}{\lambda L}\right)" block />

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Condición de máximos:</strong>
          </p>
          <p className="mb-2 text-sm text-slate-400">
            Para ángulos pequeños <Formula math="\sin \theta \approx y / L" />, la condición de constructiva es
          </p>
          <Formula math="d \sin \theta = m \lambda \quad \Rightarrow \quad y_m = \frac{m \lambda L}{d}" block />

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Condición de mínimos:</strong>
          </p>
          <Formula math="d \sin \theta = \left(m + \frac{1}{2}\right) \lambda \quad \Rightarrow \quad y_m = \left(m + \frac{1}{2}\right) \frac{\lambda L}{d}" block />

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Cálculo de la separación entre franjas:</strong>
          </p>
          <Formula math="\Delta y = \frac{\lambda L}{d} = \frac{5.80 \times 10^{-7} \times 1}{1 \times 10^{-3}} = 5.80 \times 10^{-4} \text{ m} = 0.58 \text{ mm}" block />

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Primeros máximos:</strong>
          </p>
          <ul className="mb-3 ml-4 list-disc text-sm text-slate-400">
            {maxima.slice(0, 7).map((max) => (
              <li key={`max-${max.m}`}>
                <Formula math={`m = ${max.m}:`} />{" "}
                <Formula math={`y_${max.m} = ${(max.y * 1000).toFixed(2)} \text{  mm}`} />
              </li>
            ))}
          </ul>

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Primeros mínimos:</strong>
          </p>
          <ul className="mb-3 ml-4 list-disc text-sm text-slate-400">
            {minima.slice(0, 6).map((min) => (
              <li key={`min-${min.m}`}>
                <Formula math={`m = ${min.m}:`} />{" "}
                <Formula math={`y = ${(min.y * 1000).toFixed(2)} \text{ mm}`} />
              </li>
            ))}
          </ul>

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Efecto de duplicar d:</strong>
          </p>
          <p className="text-sm text-slate-400">
            Si <Formula math="d' = 2d" />, la separación entre franjas se reduce a la mitad: <Formula math="\Delta y' = \Delta y / 2" />. El patrón se vuelve más denso cerca del centro.
          </p>

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Efecto de cambiar λ a 400 nm:</strong>
          </p>
          <p className="text-sm text-slate-400">
            Para una longitud de onda menor, la separación entre franjas también es menor: <Formula math="\Delta y \propto \lambda" />. Con <Formula math="\lambda = 400 \text{ nm}" /> la separación sería <Formula math="\Delta y = 0.40 \text{ mm}" /> (manteniendo <Formula math="d = 1 \text{ mm}" /> y <Formula math="L = 1 \text{ m}" />).
          </p>

          <p className="mt-4 text-sm text-slate-400">
            <strong className="text-slate-200">Resultado:</strong> La separación entre máximos consecutivos es <Formula math="\Delta y = 0.58 \text{ mm}" />. Los máximos ocurren en múltiplos enteros de este valor y los mínimos en medios enteros.
          </p>
        </TheoryPanel>
      }
      context={
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md">
          <h3 className="mb-2 text-sm font-semibold text-slate-50">
            Contexto pedagógico
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            La distribución de intensidad de doble rendija es fundamental para entender la resolución espectral y el contraste de patrones de interferencia. Variar la separación entre rendijas o la longitud de onda permite controlar la densidad del patrón, un concepto clave en interferometría y espectroscopía.
          </p>

          <h4 className="mb-2 mt-4 text-sm font-semibold text-slate-50">
            Interpretación de la visualización
          </h4>
          <p className="text-sm leading-relaxed text-slate-400">
            El gráfico dinámico que observás tiene <strong className="text-slate-300">dos partes complementarias</strong> que representan la distribución de intensidad de la luz en la pantalla. Cada elemento tiene un propósito específico:
          </p>

          <ul className="my-3 ml-4 list-disc space-y-2 text-sm text-slate-400">
            <li>
              <strong className="text-cyan-400">Canvas superior (patrón de franjas):</strong> Representa visualmente cómo se vería el patrón de interferencia en la pantalla real. Las zonas más brillantes (color más intenso) corresponden a los máximos de intensidad, y las zonas más oscuras corresponden a los mínimos. El color del patrón cambia según la longitud de onda <Formula math="\lambda" /> que seleccionás.
            </li>
            <li>
              <strong className="text-cyan-400">Gráfico inferior (curva I(y)):</strong> Es la representación matemática de la intensidad en función de la posición <Formula math="y" /> en la pantalla. La curva sigue la función <Formula math="I = I_0 \cos^2\left(\frac{\pi d y}{\lambda L}\right)" />. El eje horizontal es la posición <Formula math="y" /> en milímetros, y el eje vertical es la intensidad <Formula math="I" /> normalizada.
            </li>
            <li>
              <strong className="text-cyan-400">Puntos verdes (máximos):</strong> Marcan las posiciones donde la intensidad es máxima (<Formula math="I = I_0" />). Corresponden a las franjas brillantes del patrón. Las líneas verticales punteadas verdes te ayudan a identificar visualmente dónde caen estos picos.
            </li>
            <li>
              <strong className="text-cyan-400">Puntos rojos (mínimos):</strong> Marcan las posiciones donde la intensidad es nula (<Formula math="I = 0" />). Corresponden a las franjas oscuras del patrón. Las líneas verticales punteadas rojas indican dónde la luz se cancela completamente.
            </li>
            <li>
              <strong className="text-cyan-400">Tabs de comparación (Actual, d×2, λ=400nm):</strong> Permiten comparar cómo cambia el patrón al modificar parámetros. "Actual" muestra los valores que ingresaste. "d×2" duplica la separación entre rendijas (franjas más juntas). "λ=400nm" cambia la longitud de onda a 400 nm (patrón más comprimido).
            </li>
          </ul>

          <p className="text-sm leading-relaxed text-slate-400">
            <strong className="text-slate-300">¿Qué observar cuando modificás los parámetros?</strong> Al aumentar la distancia <Formula math="L" /> a la pantalla, la curva se "estira" horizontalmente (mayor separación entre máximos). Al aumentar la separación <Formula math="d" /> entre rendijas, la curva se "comprime" (más picos en el mismo rango). Al cambiar la longitud de onda <Formula math="\lambda" />, el espaciado entre picos cambia proporcionalmente. Al modificar la intensidad máxima <Formula math="I_0" />, solo cambia la altura de los picos, no su posición.
          </p>

          <div className="mt-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
            <p className="text-sm text-cyan-300">
              <strong>📚 Para mayor detalle:</strong> Visitá la sección de{" "}
              <a href="/teoria" className="font-semibold underline hover:text-cyan-200">
                Teoría → Análisis de la Intensidad Luminosa
              </a>{" "}
              donde encontrarás el desarrollo matemático completo de la función <Formula math="\cos^2" />, la explicación de por qué la intensidad varía suavemente entre máximos y mínimos, y cómo se relaciona esto con el vector de Poynting.
            </p>
          </div>
        </div>
      }
    />
  );
}
