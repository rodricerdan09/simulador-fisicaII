"use client";

import { useState } from "react";
import { ExerciseModule } from "../../ExerciseModule";
import { ParameterControl } from "../../ParameterControl";
import { ResultsPanel } from "../../ResultsPanel";
import { TheoryPanel } from "../../TheoryPanel";
import { ComparacionEspectros, computeComparacionEspectros } from "./ComparacionEspectros";
import { Exercise } from "@/types";
import { Formula } from "@/lib/katex/render";

export function ComparacionEspectrosPage({ exercise }: { exercise: Exercise }) {
  const [lambda1, setLambda1] = useState(430);
  const [lambda2, setLambda2] = useState(510);
  const [slitDistance, setSlitDistance] = useState(0.025);
  const [screenDistance, setScreenDistance] = useState(1.5);
  const [orderM1, setOrderM1] = useState(3);
  const [orderM2, setOrderM2] = useState(3);

  const results = computeComparacionEspectros(lambda1, lambda2, slitDistance, screenDistance, orderM1, orderM2);

  return (
    <ExerciseModule
      exercise={exercise}
      params={
        <>
          <ParameterControl
            label="Longitud de onda 1 (λ₁)"
            value={lambda1}
            min={380}
            max={750}
            step={5}
            unit="nm"
            onChange={setLambda1}
          />
          <ParameterControl
            label="Longitud de onda 2 (λ₂)"
            value={lambda2}
            min={380}
            max={750}
            step={5}
            unit="nm"
            onChange={setLambda2}
          />
          <ParameterControl
            label="Separación entre rendijas (d)"
            value={slitDistance}
            min={0.01}
            max={0.1}
            step={0.005}
            unit="mm"
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
            label="Orden para λ₁ (m₁)"
            value={orderM1}
            min={0}
            max={5}
            step={1}
            unit=""
            onChange={setOrderM1}
          />
          <ParameterControl
            label="Orden para λ₂ (m₂)"
            value={orderM2}
            min={0}
            max={5}
            step={1}
            unit=""
            onChange={setOrderM2}
          />
        </>
      }
      visualization={
        <ComparacionEspectros
          lambda1Nm={lambda1}
          lambda2Nm={lambda2}
          slitDistanceMm={slitDistance}
          screenDistanceM={screenDistance}
          orderM1={orderM1}
          orderM2={orderM2}
        />
      }
      results={<ResultsPanel results={results} />}
      theory={
        <TheoryPanel>
          <p className="mb-2">
            <strong className="text-slate-200">Datos del problema:</strong>
          </p>
          <ul className="mb-3 ml-4 list-disc text-sm text-slate-400">
            <li>Longitud de onda 1: <Formula math="\lambda_1 = 430 \text{ nm} = 4.30 \times 10^{-7} \text{ m}" /></li>
            <li>Longitud de onda 2: <Formula math="\lambda_2 = 510 \text{ nm} = 5.10 \times 10^{-7} \text{ m}" /></li>
            <li>Separación entre rendijas: <Formula math="d = 0.025 \text{ mm} = 2.5 \times 10^{-5} \text{ m}" /></li>
            <li>Distancia a la pantalla: <Formula math="L = 1.5 \text{ m}" /></li>
            <li>Orden de las franjas: <Formula math="m_1 = m_2 = 3" /></li>
          </ul>

          <p className="mb-2">
            <strong className="text-slate-200">Fórmula de separación entre franjas de diferente longitud de onda:</strong>
          </p>
          <Formula math="\Delta y = \frac{\Delta \lambda \cdot L \cdot m}{d}" block />

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Cálculo directo:</strong>
          </p>
          <Formula math="\Delta y = \frac{(510 - 430) \times 10^{-9} \times 1.5 \times 3}{2.5 \times 10^{-5}}" block />
          <Formula math="\Delta y = \frac{80 \times 10^{-9} \times 4.5}{2.5 \times 10^{-5}}" block />
          <Formula math="\Delta y = 14.4 \times 10^{-3} \text{ m} = 14.4 \text{ mm}" block />

          <p className="mt-4 text-sm text-slate-400">
            <strong className="text-slate-200">Resultado:</strong> La separación entre las franjas brillantes de orden 3 es <Formula math="\Delta y = 14.4 \text{ mm}" />. La franja correspondiente a λ₂ (510 nm, verde) se encuentra más alejada del centro que la de λ₁ (430 nm, violeta).
          </p>
        </TheoryPanel>
      }
      context={
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md">
          <h3 className="mb-2 text-sm font-semibold text-slate-50">
            Contexto pedagógico
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            Cuando una fuente emite múltiples longitudes de onda, cada una produce su propio patrón de interferencia.
            Las longitudes de onda más largas (rojo, verde) producen franjas más separadas que las cortas (violeta, azul).
            Este principio se utiliza en espectroscopía para separar y analizar la composición de la luz.
          </p>

          <h4 className="mb-2 mt-4 text-sm font-semibold text-slate-50">
            Interpretación de la visualización
          </h4>
          <p className="text-sm leading-relaxed text-slate-400">
            El gráfico dinámico que observás representa la <strong className="text-slate-300">comparación de dos longitudes de onda</strong> en el mismo experimento de doble rendija. Cada elemento tiene un propósito específico:
          </p>

          <ul className="my-3 ml-4 list-disc space-y-2 text-sm text-slate-400">
            <li>
              <strong className="text-cyan-400">Dos conjuntos de ondas concéntricas:</strong> Representan los frentes de onda de ambas longitudes de onda. El conjunto en color <strong className="text-purple-400">violeta</strong> corresponde a λ₁ (longitud de onda más corta, ~430 nm) y el conjunto en color <strong className="text-green-400">verde</strong> corresponde a λ₂ (longitud de onda más larga, ~510 nm).
            </li>
            <li>
              <strong className="text-cyan-400">Barrera vertical con rendijas:</strong> Simula la pantalla opaca con las dos rendijas estrechas. La separación entre ellas es el parámetro <Formula math="d" /> que podés modificar.
            </li>
            <li>
              <strong className="text-cyan-400">Pantalla (lado derecho):</strong> Es donde se proyectan los patrones de interferencia de ambas longitudes de onda. En un experimento real verías dos conjuntos de franjas superpuestos, cada uno con su propio espaciado.
            </li>
            <li>
              <strong className="text-cyan-400">Dos líneas horizontales de colores:</strong> Cada línea representa la posición de la franja brillante de orden <Formula math="m" /> para cada longitud de onda. La línea <strong className="text-purple-400">violeta</strong> marca la posición <Formula math="y_1" /> de λ₁ con orden <Formula math="m_1" /> y la línea <strong className="text-green-400">verde</strong> marca la posición <Formula math="y_2" /> de λ₂ con orden <Formula math="m_2" />. Las etiquetas muestran <Formula math="\lambda_1(m_1)" /> y <Formula math="\lambda_2(m_2)" /> para identificar cada franja.
            </li>
            <li>
              <strong className="text-cyan-400">Separación entre líneas:</strong> La distancia vertical entre las dos líneas representa <Formula math="\Delta y = |y_2 - y_1|" />, que es el resultado que estás calculando. Notá que λ₂ (mayor longitud de onda) siempre produce una franja más alejada del centro que λ₁ cuando los órdenes son iguales.
            </li>
          </ul>

          <p className="text-sm leading-relaxed text-slate-400">
            <strong className="text-slate-300">¿Qué observar cuando modificás los parámetros?</strong> Al aumentar la distancia <Formula math="L" /> a la pantalla, ambas líneas se separan más entre sí (mayor <Formula math="\Delta y" />). Al aumentar la separación <Formula math="d" /> entre rendijas, ambas líneas se acercan al centro y entre sí. Al cambiar los órdenes <Formula math="m_1" /> o <Formula math="m_2" /> independientemente, solo se mueve la línea correspondiente a esa longitud de onda. Al modificar λ₁ o λ₂, también solo se mueve la línea correspondiente.
          </p>

          <div className="mt-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
            <p className="text-sm text-cyan-300">
              <strong>📚 Para mayor detalle:</strong> Visitá la sección de{" "}
              <a href="/teoria#naturaleza-ondulatoria" className="font-semibold underline hover:text-cyan-200">
                Teoría → Naturaleza Ondulatoria y Longitud de Onda
              </a>{" "}
              donde encontrarás la explicación de cómo el color de la luz está determinado por su longitud de onda y cómo diferentes láseres generan patrones más anchos o más comprimidos.
            </p>
          </div>
        </div>
      }
    />
  );
}
