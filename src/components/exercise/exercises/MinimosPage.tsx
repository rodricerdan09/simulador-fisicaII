"use client";

import { useState } from "react";
import { ExerciseModule } from "../ExerciseModule";
import { ParameterControl } from "../ParameterControl";
import { ResultsPanel } from "../ResultsPanel";
import { TheoryPanel } from "../TheoryPanel";
import { Minimos, computeMinimos } from "./Minimos";
import { Exercise } from "@/types";
import { Formula } from "@/lib/katex/render";

export function MinimosPage({ exercise }: { exercise: Exercise }) {
  const [slitDistance, setSlitDistance] = useState(2.0);
  const [screenDistance, setScreenDistance] = useState(0.5);
  const [lambda, setLambda] = useState(550);

  // Calcular Δy a partir de λ, d, L
  const lambdaM = lambda * 1e-9;
  const dM = slitDistance * 1e-3;
  const LM = screenDistance;
  const fringeSpacingM = dM === 0 ? 0 : (lambdaM * LM) / dM;
  const fringeSpacingMm = fringeSpacingM * 1000;

  const results = [
    { label: "Separación entre rendijas (d)", value: slitDistance, unit: "mm", precision: 1 },
    { label: "Distancia a la pantalla (L)", value: screenDistance, unit: "m", precision: 1 },
    { label: "Longitud de onda (λ)", value: lambdaM, unit: "m", precision: 4, scientific: true },
    { label: "Longitud de onda (λ)", value: lambda, unit: "nm", precision: 0 },
    { label: "Separación entre mínimos (Δy)", value: fringeSpacingM, unit: "m", precision: 4, scientific: true },
    { label: "Separación entre mínimos (Δy)", value: fringeSpacingMm, unit: "mm", precision: 2 },
  ];

  return (
    <ExerciseModule
      exercise={exercise}
      params={
        <>
          <ParameterControl
            label="Separación entre rendijas (d)"
            value={slitDistance}
            min={0.5}
            max={5.0}
            step={0.1}
            unit="mm"
            onChange={setSlitDistance}
          />
          <ParameterControl
            label="Distancia a la pantalla (L)"
            value={screenDistance}
            min={0.1}
            max={2.0}
            step={0.1}
            unit="m"
            onChange={setScreenDistance}
          />
          <ParameterControl
            label="Longitud de onda (λ)"
            value={lambda}
            min={380}
            max={750}
            step={5}
            unit="nm"
            onChange={setLambda}
          />
        </>
      }
      visualization={
        <Minimos
          slitDistanceMm={slitDistance}
          screenDistanceM={screenDistance}
          fringeSpacingMm={fringeSpacingMm}
        />
      }
      results={<ResultsPanel results={results} />}
      theory={
        <TheoryPanel>
          <p className="mb-2">
            <strong className="text-slate-200">Datos del problema:</strong>
          </p>
          <ul className="mb-3 ml-4 list-disc text-sm text-slate-400">
            <li>Separación entre rendijas: <Formula math="d = 2 \text{ mm} = 2 \times 10^{-3} \text{ m}" /></li>
            <li>Distancia a la pantalla: <Formula math="L = 50 \text{ cm} = 0.5 \text{ m}" /></li>
            <li>Longitud de onda de la fuente: <Formula math="\lambda = 550 \text{ nm} = 5.50 \times 10^{-7} \text{ m}" /></li>
          </ul>

          <p className="mb-2">
            <strong className="text-slate-200">Fórmula de la separación entre mínimos consecutivos:</strong>
          </p>
          <p className="mb-2 text-sm text-slate-400">
            Para la doble rendija, la distancia entre mínimos (o máximos) consecutivos es:
          </p>
          <Formula math="\Delta y = \frac{\lambda L}{d}" block />

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Sustitución paso a paso:</strong>
          </p>
          <Formula math="\Delta y = \frac{5.50 \times 10^{-7} \text{ m} \times 0.5 \text{ m}}{2 \times 10^{-3} \text{ m}}" block />
          <Formula math="\Delta y = \frac{2.75 \times 10^{-7} \text{ m}^2}{2 \times 10^{-3} \text{ m}}" block />
          <Formula math="\Delta y = 1.375 \times 10^{-4} \text{ m} = 0.1375 \text{ mm}" block />

          <p className="mt-4 text-sm text-slate-400">
            <strong className="text-slate-200">Resultado:</strong> La separación entre mínimos consecutivos es <Formula math="\Delta y = 0.1375 \text{ mm}" />. Al modificar la separación entre rendijas <Formula math="d" />, la distancia a la pantalla <Formula math="L" />, o la longitud de onda <Formula math="\lambda" />, el patrón de interferencia cambia dinámicamente.
          </p>
        </TheoryPanel>
      }
      context={
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md">
          <h3 className="mb-2 text-sm font-semibold text-slate-50">
            Contexto pedagógico
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            Los mínimos de interferencia aparecen donde la diferencia de camino óptico es un múltiplo semi-entero de la longitud de onda.
            Medir la separación entre mínimos consecutivos permite determinar λ de forma experimental, una técnica fundamental en interferometría.
          </p>

          <h4 className="mb-2 mt-4 text-sm font-semibold text-slate-50">
            Interpretación de la visualización
          </h4>
          <p className="text-sm leading-relaxed text-slate-400">
            El gráfico dinámico que observás representa el <strong className="text-slate-300">patrón de interferencia con los mínimos marcados</strong>. Cada elemento tiene un propósito específico:
          </p>

          <ul className="my-3 ml-4 list-disc space-y-2 text-sm text-slate-400">
            <li>
              <strong className="text-cyan-400">Círculos concéntricos (ondas):</strong> Representan los frentes de onda que emanan desde cada rendija (S₁ y S₂). Cuando estas ondas se superponen en la pantalla, crean zonas de interferencia constructiva (máximos brillantes) y destructiva (mínimos oscuros).
            </li>
            <li>
              <strong className="text-cyan-400">Barrera vertical con rendijas:</strong> Simula la pantalla opaca con las dos rendijas estrechas separadas una distancia <Formula math="d" />.
            </li>
            <li>
              <strong className="text-cyan-400">Pantalla (lado derecho):</strong> Es donde se proyecta el patrón de interferencia. En un experimento real verías franjas brillantes y oscuras alternadas.
            </li>
            <li>
              <strong className="text-cyan-400">Líneas punteadas rojas:</strong> Cada línea horizontal punteada representa un <strong>mínimo de interferencia</strong> (franja oscura). Son las posiciones donde las ondas llegan en oposición de fase y se cancelan mutuamente.
            </li>
            <li>
              <strong className="text-cyan-400">Etiquetas m=0, m=1, m=-1, etc.:</strong> Identifican el orden de cada mínimo. El mínimo central es <Formula math="m=0" />, y los mínimos se numeran simétricamente a ambos lados del centro (<Formula math="m=\pm 1" />, <Formula math="m=\pm 2" />, etc.).
            </li>
            <li>
              <strong className="text-cyan-400">Indicador Δy con flechas:</strong> La línea vertical con flechas en ambos extremos muestra la <strong>distancia entre dos mínimos consecutivos</strong>. Esta es la medida <Formula math="\Delta y" /> que usás para calcular la longitud de onda.
            </li>
          </ul>

          <p className="text-sm leading-relaxed text-slate-400">
            <strong className="text-slate-300">¿Qué observar cuando modificás los parámetros?</strong> Al aumentar la separación <Formula math="d" /> entre rendijas, los mínimos se acercan entre sí (menor <Formula math="\Delta y" />). Al aumentar la distancia <Formula math="L" /> a la pantalla, los mínimos se separan más. Al modificar <Formula math="\Delta y" /> directamente, la longitud de onda calculada cambia proporcionalmente: mayor separación entre mínimos implica mayor longitud de onda.
          </p>

          <div className="mt-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
            <p className="text-sm text-cyan-300">
              <strong>📚 Para mayor detalle:</strong> Visitá la sección de{" "}
              <a href="/teoria" className="font-semibold underline hover:text-cyan-200">
                Teoría → Interferencia Constructiva y Destructiva
              </a>{" "}
              donde encontrarás la explicación matemática de cuándo se forman los mínimos (franjas oscuras) y cómo se relacionan con la diferencia de camino óptico.
            </p>
          </div>
        </div>
      }
    />
  );
}
