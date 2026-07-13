"use client";

import { useState } from "react";
import { ExerciseModule } from "../ExerciseModule";
import { ParameterControl } from "../ParameterControl";
import { ResultsPanel } from "../ResultsPanel";
import { TheoryPanel } from "../TheoryPanel";
import { PeliculaDelgada, computePeliculaDelgada } from "./PeliculaDelgada";
import { Exercise } from "@/types";
import { Formula } from "@/lib/katex/render";

export function PeliculaDelgadaPage({ exercise }: { exercise: Exercise }) {
  const [refractiveIndex, setRefractiveIndex] = useState(1.33);
  const [lambda, setLambda] = useState(600);
  const [orderM, setOrderM] = useState(0);

  const results = computePeliculaDelgada(refractiveIndex, lambda, orderM);

  return (
    <ExerciseModule
      exercise={exercise}
      params={
        <>
          <ParameterControl
            label="Índice de refracción (n)"
            value={refractiveIndex}
            min={1.0}
            max={2.5}
            step={0.01}
            unit=""
            onChange={setRefractiveIndex}
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
          <ParameterControl
            label="Orden de interferencia (m)"
            value={orderM}
            min={0}
            max={5}
            step={1}
            unit=""
            onChange={setOrderM}
          />
        </>
      }
      visualization={
        <PeliculaDelgada
          refractiveIndex={refractiveIndex}
          lambdaNm={lambda}
          orderM={orderM}
        />
      }
      results={<ResultsPanel results={results} />}
      theory={
        <TheoryPanel>
          <p className="mb-2">
            <strong className="text-slate-200">Datos del problema:</strong>
          </p>
          <ul className="mb-3 ml-4 list-disc text-sm text-slate-400">
            <li>Índice de refracción de la película de jabón: <Formula math="n = 1.33" /></li>
            <li>Longitud de onda en el vacío: <Formula math="\lambda = 600 \text{ nm} = 6.00 \times 10^{-7} \text{ m}" /></li>
            <li>Incógnita: espesor mínimo <Formula math="t" /></li>
          </ul>

          <p className="mb-2">
            <strong className="text-slate-200">Interferencia en películas delgadas:</strong>
          </p>
          <p className="mb-2 text-sm text-slate-400">
            La luz reflejada en la superficie superior experimenta un cambio de fase de <Formula math="\pi" /> (equivalente a medio ciclo) porque el segundo medio tiene un índice de refracción mayor. La luz reflejada en la superficie inferior no sufre ese cambio de fase. Por eso, la condición de interferencia constructiva en la luz reflejada es:
          </p>
          <Formula math="2nt = \left(m + \frac{1}{2}\right) \lambda" block />

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Nota sobre el cambio de fase:</strong>
          </p>
          <p className="mb-2 text-sm text-slate-400">
            Cuando la luz se refleja en un medio de mayor índice de refracción, adquiere un desfase de <Formula math="\pi" />. Esto invierte la condición de constructiva/destructiva respecto a la transmisión.
          </p>

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Espesor mínimo:</strong>
          </p>
          <p className="mb-2 text-sm text-slate-400">
            Para obtener el espesor mínimo se toma <Formula math="m = 0" />:
          </p>
          <Formula math="2nt = \frac{\lambda}{2}" block />
          <Formula math="t = \frac{\lambda}{4n}" block />

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Sustitución paso a paso:</strong>
          </p>
          <Formula math="t = \frac{6.00 \times 10^{-7} \text{ m}}{4 \times 1.33}" block />
          <Formula math="t = \frac{6.00 \times 10^{-7}}{5.32} \text{ m}" block />
          <Formula math="t = 1.13 \times 10^{-7} \text{ m} = 113 \text{ nm}" block />

          <p className="mt-4 text-sm text-slate-400">
            <strong className="text-slate-200">Resultado:</strong> El espesor mínimo de la película de jabón para observar interferencia constructiva en la luz reflejada es <Formula math="t = 1.13 \times 10^{-7} \text{ m}" /> (aproximadamente <Formula math="113 \text{ nm}" />).
          </p>
        </TheoryPanel>
      }
      context={
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md">
          <h3 className="mb-2 text-sm font-semibold text-slate-50">
            Contexto pedagógico
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            Las películas delgadas producen interferencia por reflexión y transmisión. Los colores iridiscentes de las burbujas de jabón y los recubrimientos antirreflejantes se deben a la interferencia constructiva o destructiva de la luz reflejada en las dos superficies de la película.
          </p>

          <h4 className="mb-2 mt-4 text-sm font-semibold text-slate-50">
            Interpretación de la visualización
          </h4>
          <p className="text-sm leading-relaxed text-slate-400">
            El gráfico dinámico que observás representa la <strong className="text-slate-300">interferencia en una película delgada</strong> vista en corte transversal. Cada elemento tiene un propósito específico:
          </p>

          <ul className="my-3 ml-4 list-disc space-y-2 text-sm text-slate-400">
            <li>
              <strong className="text-cyan-400">Rectángulo central (película):</strong> Representa la capa delgada de material (jabón, aceite, etc.) con índice de refracción <Formula math="n" />. El grosor del rectángulo es proporcional al espesor <Formula math="t" /> que estás calculando.
            </li>
            <li>
              <strong className="text-cyan-400">Medios superior e inferior (aire):</strong> Las zonas por encima y por debajo de la película representan el aire (<Formula math="n_1 \approx 1" />) que rodea la película.
            </li>
            <li>
              <strong className="text-cyan-400">Rayo incidente (amarillo):</strong> Es la luz que llega desde arriba hacia la película. El color amarillo indica que es luz visible.
            </li>
            <li>
              <strong className="text-cyan-400">Rayo reflejado 1 (rojo):</strong> Es la parte de la luz que se refleja en la <strong>superficie superior</strong> de la película. Se muestra en rojo porque sufre un <strong>cambio de fase de π (180°)</strong> al reflejarse en un medio de mayor índice de refracción. La etiqueta "(cambio π)" lo indica.
            </li>
            <li>
              <strong className="text-cyan-400">Rayo transmitido y reflejado 2 (cyan punteado):</strong> Es la parte de la luz que atraviesa la película, se refleja en la <strong>superficie inferior</strong> (sin cambio de fase), y vuelve a salir. Se muestra con línea punteada para distinguirlo del rayo reflejado 1.
            </li>
            <li>
              <strong className="text-cyan-400">Indicador de espesor t:</strong> La línea vertical punteada con marcas en los extremos muestra el espesor <Formula math="t" /> de la película. Esta es la incógnita que estás calculando.
            </li>
          </ul>

          <p className="text-sm leading-relaxed text-slate-400">
            <strong className="text-slate-300">¿Qué observar cuando modificás los parámetros?</strong> Al aumentar el índice de refracción <Formula math="n" />, el espesor mínimo <Formula math="t" /> disminuye (la película puede ser más delgada). Al aumentar la longitud de onda <Formula math="\lambda" />, el espesor mínimo aumenta proporcionalmente. Al cambiar el orden <Formula math="m" /> de 0 a 1, 2, etc., calculás espesores mayores que también producen interferencia constructiva (múltiplos del espesor mínimo).
          </p>

          <div className="mt-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
            <p className="text-sm text-cyan-300">
              <strong>📚 Para mayor detalle:</strong> Visitá la sección de{" "}
              <a href="/teoria" className="font-semibold underline hover:text-cyan-200">
                Teoría → Interferencia en Películas Delgadas
              </a>{" "}
              donde encontrarás la explicación completa del cambio de fase en la reflexión, la fórmula de interferencia constructiva y ejemplos de aplicaciones como burbujas de jabón y recubrimientos antirreflejantes.
            </p>
          </div>
        </div>
      }
    />
  );
}
