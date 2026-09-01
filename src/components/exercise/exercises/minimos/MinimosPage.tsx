"use client";

import { useState } from "react";
import { ExerciseModule } from "../../ExerciseModule";
import { ParameterControl } from "../../ParameterControl";
import { ResultsPanel } from "../../ResultsPanel";
import { TheoryPanel } from "../../TheoryPanel";
import { Minimos, computeMinimos } from "./Minimos";
import { Exercise } from "@/types";
import { Formula } from "@/lib/katex/render";

export function MinimosPage({ exercise }: { exercise: Exercise }) {
  const [slitDistance, setSlitDistance] = useState(2.0);
  const [screenDistance, setScreenDistance] = useState(0.5);
  const [fringeSpacing, setFringeSpacing] = useState(0.6);

  // Calcular λ a partir de Δy, d, L según la fórmula del profesor:
  // Δy = λ·L/d · (3/2)  →  λ = Δy·2·d/(L·3)
  const dM = slitDistance * 1e-3;
  const LM = screenDistance;
  const deltaYM = fringeSpacing * 1e-3;
  const lambdaM = LM === 0 ? 0 : (deltaYM * 2 * dM) / (LM * 3);
  const lambdaNm = lambdaM * 1e9;

  const results = [
    { label: "Separación entre rendijas (d)", value: slitDistance, unit: "mm", precision: 1 },
    { label: "Distancia a la pantalla (L)", value: screenDistance, unit: "m", precision: 1 },
    { label: "Separación entre mínimos (Δy)", value: fringeSpacing, unit: "mm", precision: 1 },
    { label: "Longitud de onda (λ)", value: lambdaM, unit: "m", precision: 4, scientific: true },
    { label: "Longitud de onda (λ)", value: lambdaNm, unit: "nm", precision: 0 },
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
            label="Separación entre mínimos (Δy)"
            value={fringeSpacing}
            min={0.1}
            max={2.0}
            step={0.1}
            unit="mm"
            onChange={setFringeSpacing}
          />
        </>
      }
      visualization={
        <Minimos
          slitDistanceMm={slitDistance}
          screenDistanceM={screenDistance}
          fringeSpacingMm={fringeSpacing}
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
            <li>Distancia entre dos mínimos consecutivos: <Formula math="\Delta y = 0.6 \text{ mm} = 0.6 \times 10^{-3} \text{ m}" /></li>
          </ul>

          <p className="mb-2">
            <strong className="text-slate-200">Condición para franjas oscuras (mínimos):</strong>
          </p>
          <p className="mb-2 text-sm text-slate-400">
            La posición de una franja oscura está dada por:
          </p>
          <Formula math="y = \frac{\lambda L}{d} \left(m + \frac{1}{2}\right)" block />

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Distancia entre mínimos consecutivos:</strong>
          </p>
          <p className="mb-2 text-sm text-slate-400">
            La separación entre dos franjas oscuras consecutivas es:
          </p>
          <Formula math="\Delta y = \frac{\lambda L}{d} \cdot \Delta\left(m + \frac{1}{2}\right)" block />
          <p className="mb-2 text-sm text-slate-400">
            Como <Formula math="\Delta m = 1" />, entonces:
          </p>
          <Formula math="\Delta y = \frac{\lambda L}{d} \cdot \frac{3}{2}" block />

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Despejando la longitud de onda:</strong>
          </p>
          <Formula math="\lambda = \frac{\Delta y \cdot 2 \cdot d}{L \cdot 3}" block />

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Sustitución:</strong>
          </p>
          <Formula math="\lambda = \frac{0.6 \times 10^{-3} \times 2 \times 2 \times 10^{-3}}{0.5 \times 3}" block />
          <Formula math="\lambda = \frac{2.4 \times 10^{-6}}{1.5}" block />
          <Formula math="\lambda = 1.6 \times 10^{-6} \text{ m} = 1600 \text{ nm}" block />

          <p className="mt-4 text-sm text-slate-400">
            <strong className="text-slate-200">Resultado:</strong> La longitud de onda de la luz es <Formula math="\lambda = 1.6 \times 10^{-6} \text{ m}" /> (equivalente a <Formula math="1600 \text{ nm}" />). Este valor corresponde a radiación infrarroja.
          </p>

          <div className="mt-3 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
            <p className="text-sm text-cyan-300">
              <strong>📺 Explicación oficial:</strong> Podés complementar este desarrollo mirando el video de resolución de la cátedra{" "}
              <a href="https://www.youtube.com/watch?v=DuTwwXkKp2k" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-cyan-200">accediendo aquí</a>.
            </p>
          </div>
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

          <div className="mt-3 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
            <p className="text-sm text-cyan-300">
              <strong>Relación con la separación entre rendijas (d):</strong> La posición de los mínimos depende inversamente de <Formula math="d" />. Al aumentar la separación entre rendijas, los mínimos se acercan entre sí (menor <Formula math="\Delta y" />). Al disminuir <Formula math="d" />, los mínimos se separan más. Esta dependencia es crucial para entender cómo la geometría del experimento afecta el patrón de interferencia.
            </p>
          </div>

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
              <strong className="text-cyan-400">Líneas punteadas con etiquetas:</strong> Cada línea horizontal punteada representa un <strong>mínimo de interferencia</strong> (franja oscura). Son las posiciones donde las ondas llegan en oposición de fase y se cancelan mutuamente. Las etiquetas <Formula math="m=0, m=1, m=-1" />, etc., identifican el orden de cada mínimo.
            </li>
            <li>
              <strong className="text-cyan-400">Indicador Δy con flechas:</strong> La línea vertical con flechas en ambos extremos muestra la <strong>distancia entre dos mínimos consecutivos</strong>. Esta es la medida <Formula math="\Delta y" /> que se calcula automáticamente según los parámetros ingresados.
            </li>
          </ul>

          <p className="text-sm leading-relaxed text-slate-400">
            <strong className="text-slate-300">¿Qué observar cuando modificás los parámetros?</strong> Al aumentar la separación <Formula math="d" /> entre rendijas, los mínimos se acercan entre sí (menor <Formula math="\Delta y" />). Al aumentar la distancia <Formula math="L" /> a la pantalla, los mínimos se separan más. Al modificar la longitud de onda <Formula math="\lambda" />, la separación entre mínimos cambia proporcionalmente: mayor longitud de onda implica mayor separación entre mínimos.
          </p>

          <div className="mt-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
            <p className="text-sm text-cyan-300">
              <strong> Para mayor detalle:</strong> Visitá la sección de{" "}
              <a href="/teoria#interferencia" className="font-semibold underline hover:text-cyan-200">
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
