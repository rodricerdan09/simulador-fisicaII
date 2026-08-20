"use client";

import { useState } from "react";
import { ExerciseModule } from "../ExerciseModule";
import { ParameterControl } from "../ParameterControl";
import { ResultsPanel } from "../ResultsPanel";
import { TheoryPanel } from "../TheoryPanel";
import { DobleRendija, computeDobleRendija } from "./DobleRendija";
import { Exercise } from "@/types";
import { Formula } from "@/lib/katex/render";

export function DobleRendijaPage({ exercise }: { exercise: Exercise }) {
  const [screenDistance, setScreenDistance] = useState(1.2);
  const [slitDistance, setSlitDistance] = useState(0.03);
  const [orderM, setOrderM] = useState(2);
  const [fringePosition, setFringePosition] = useState(4.5);

  const results = computeDobleRendija(screenDistance, slitDistance, orderM, fringePosition);

  return (
    <ExerciseModule
      exercise={exercise}
      params={
        <>
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
            label="Separación entre rendijas (d)"
            value={slitDistance}
            min={0.01}
            max={0.1}
            step={0.01}
            unit="mm"
            onChange={setSlitDistance}
          />
          <ParameterControl
            label="Orden de la franja (m)"
            value={orderM}
            min={-5}
            max={5}
            step={1}
            unit=""
            onChange={setOrderM}
          />
          <ParameterControl
            label="Posición de la franja (y_m)"
            value={fringePosition}
            min={1}
            max={10}
            step={0.1}
            unit="cm"
            onChange={setFringePosition}
          />
        </>
      }
      visualization={
        <DobleRendija
          lambdaNm={results[1]?.value ?? 550}
          slitDistanceMm={slitDistance}
          screenDistanceM={screenDistance}
          orderM={orderM}
          fringePositionCm={fringePosition}
        />
      }
      results={<ResultsPanel results={results} />}
      theory={
        <TheoryPanel>
          <p className="mb-2">
            <strong className="text-slate-200">Datos del problema:</strong>
          </p>
          <ul className="mb-3 ml-4 list-disc text-sm text-slate-400">
            <li>Distancia pantalla a rendijas: <Formula math="L = 1.2 \text{ m}" /></li>
            <li>Separación entre rendijas: <Formula math="d = 0.03 \text{ mm} = 3 \times 10^{-5} \text{ m}" /></li>
            <li>Orden de la franja brillante: <Formula math="m = 2" /></li>
            <li>Posición de la franja: <Formula math="y_2 = 4.5 \text{ cm} = 0.045 \text{ m}" /></li>
          </ul>

          <p className="mb-2">
            <strong className="text-slate-200">a) Determinar la longitud de onda (λ):</strong>
          </p>
          <p className="mb-2">
            De la condición de máximo de interferencia para ángulos pequeños:
          </p>
          <Formula math="y_m = \frac{m \lambda L}{d}" block />
          <p className="my-2">Despejando λ:</p>
          <Formula math="\lambda = \frac{y_m \cdot d}{m \cdot L}" block />
          <p className="my-2">Sustituyendo valores:</p>
          <Formula math="\lambda = \frac{0.045 \times 3 \times 10^{-5}}{2 \times 1.2} = 5.625 \times 10^{-7} \text{ m} = 562.5 \text{ nm}" block />

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">b) Calcular la separación entre franjas (Δy):</strong>
          </p>
          <Formula math="\Delta y = \frac{\lambda L}{d}" block />
          <p className="my-2">Sustituyendo:</p>
          <Formula math="\Delta y = \frac{5.625 \times 10^{-7} \times 1.2}{3 \times 10^{-5}} = 2.25 \times 10^{-2} \text{ m} = 22.5 \text{ mm}" block />

          <p className="mt-4 text-sm text-slate-400">
            <strong className="text-slate-200">Resultado:</strong> La longitud de onda es <Formula math="\lambda = 562.5 \text{ nm}" /> (luz verde-amarilla) y la separación entre franjas brillantes consecutivas es <Formula math="\Delta y = 22.5 \text{ mm}" />.
          </p>
        </TheoryPanel>
      }
      context={
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md">
          <h3 className="mb-2 text-sm font-semibold text-slate-50">
            Contexto pedagógico
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            El experimento de Young (1801) demostró la naturaleza ondulatoria de la luz. 
            La interferencia de doble rendija se utiliza hoy en interferometría, sensores de fibra óptica 
            y medición precisa de longitudes de onda. El valor calculado (562.5 nm) corresponde a luz 
            verde-amarilla, cercana a la longitud de onda de máxima sensibilidad del ojo humano (555 nm).
          </p>

          <div className="mt-3 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
            <p className="text-sm text-cyan-300">
              <strong>¿Qué es el "orden" (m)?</strong> En interferencia, el orden <Formula math="m" /> indica la posición de la franja brillante respecto al centro. <Formula math="m = 0" /> es la franja central (máximo principal), <Formula math="m = \pm 1" /> son las primeras franjas laterales, <Formula math="m = \pm 2" /> las segundas, etc. En este problema, <Formula math="m = 2" /> significa que la franja medida está a dos franjas brillantes del centro.
            </p>
          </div>

          <h4 className="mb-2 mt-4 text-sm font-semibold text-slate-50">
            Interpretación de la visualización
          </h4>
          <p className="text-sm leading-relaxed text-slate-400">
            El gráfico dinámico que observás representa el <strong className="text-slate-300">experimento de doble rendija</strong> de forma esquemática. Cada elemento tiene un propósito específico:
          </p>

          <ul className="my-3 ml-4 list-disc space-y-2 text-sm text-slate-400">
            <li>
              <strong className="text-cyan-400">Círculos concéntricos (ondas):</strong> Representan los frentes de onda que emanan desde cada rendija (S₁ y S₂). Los círculos se expanden mostrando cómo la luz se propaga en todas direcciones desde cada fuente puntual. Cuando las ondas de ambas rendijas se superponen, interfieren entre sí.
            </li>
            <li>
              <strong className="text-cyan-400">Barrera vertical:</strong> Simula la pantalla opaca con las dos rendijas estrechas. La separación entre ellas es el parámetro <Formula math="d" /> que podés modificar con el slider.
            </li>
            <li>
              <strong className="text-cyan-400">Pantalla (canvas derecho):</strong> Muestra la distribución de intensidad luminosa <Formula math="I = I_0 \cos^2(\pi d y / \lambda L)" /> con envolvente de difracción. Las franjas brillantes (máximos) se atenúan hacia los costados, como en el experimento real.
            </li>
            <li>
              <strong className="text-cyan-400">Líneas horizontales con etiquetas de orden:</strong> Cada franja brillante está marcada con una línea horizontal y su orden <Formula math="m" />. La franja central (<Formula math="m = 0" />) tiene una línea blanca sólida; las demás (<Formula math="m = \pm 1, \pm 2, \dots" />) tienen líneas blancas punteadas. Las etiquetas muestran el orden de cada franja.
            </li>
            <li>
              <strong className="text-cyan-400">Línea cyan punteada (orden seleccionado):</strong> Resalta la franja brillante de orden <Formula math="m" /> que estás calculando. La etiqueta cyan muestra el valor de <Formula math="y_m" /> en centímetros. En este problema, <Formula math="m = 2" /> está resaltado con <Formula math="y_2 = 4.50 \text{ cm}" />.
            </li>
          </ul>

          <p className="text-sm leading-relaxed text-slate-400">
            <strong className="text-slate-300">¿Qué observar cuando modificás los parámetros?</strong> Al aumentar la distancia <Formula math="L" /> a la pantalla, las franjas se separan. Al aumentar la separación <Formula math="d" /> entre rendijas, las franjas se acercan entre sí. Al cambiar el orden <Formula math="m" />, la línea cyan se ubica en la franja correspondiente y la etiqueta muestra su posición <Formula math="y_m" />. El color del patrón cambia según la longitud de onda calculada.
          </p>

          <div className="mt-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
            <p className="text-sm text-cyan-300">
              <strong>📚 Para mayor detalle:</strong> Visitá la sección de{" "}
              <a href="/teoria" className="font-semibold underline hover:text-cyan-200">
                Teoría → El Experimento de Young y la Doble Rendija
              </a>{" "}
              donde encontrarás el desarrollo matemático completo, diagramas explicativos y videos recomendados sobre este fenómeno.
            </p>
          </div>
        </div>
      }
    />
  );
}
