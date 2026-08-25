"use client";

import { useState } from "react";
import { ExerciseModule } from "../../ExerciseModule";
import { ParameterControl } from "../../ParameterControl";
import { ResultsPanel } from "../../ResultsPanel";
import { TheoryPanel } from "../../TheoryPanel";
import { Intensidad, computeIntensidad } from "./Intensidad";
import { Exercise } from "@/types";
import { Formula } from "@/lib/katex/render";
import { cn } from "@/lib/utils";

type ComparisonTab = "a" | "b" | "c";

export function IntensidadPage({ exercise }: { exercise: Exercise }) {
  const [lambda, setLambda] = useState(580);
  const [slitDistance, setSlitDistance] = useState(0.001);
  const [screenDistance, setScreenDistance] = useState(1.0);
  const [intensityI0, setIntensityI0] = useState(1.0);
  const [tab, setTab] = useState<ComparisonTab>("a");

  const results = computeIntensidad(lambda, slitDistance, screenDistance, intensityI0);

  const tabConfigs = {
    a: { lambda: 580, slitDistance: 0.001, label: "a) λ=580nm, d=0.001m" },
    b: { lambda: 580, slitDistance: 0.002, label: "b) λ=580nm, d=0.002m (d×2)" },
    c: { lambda: 400, slitDistance: 0.001, label: "c) λ=400nm, d=0.001m" },
  };

  const handleTabChange = (newTab: ComparisonTab) => {
    setTab(newTab);
    setLambda(tabConfigs[newTab].lambda);
    setSlitDistance(tabConfigs[newTab].slitDistance);
  };

  return (
    <ExerciseModule
      exercise={exercise}
      params={
        <>
          <div className="col-span-1 sm:col-span-2">
            <div className="flex flex-wrap gap-2 mb-4">
              {(["a", "b", "c"] as ComparisonTab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleTabChange(t)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                    tab === t
                      ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
                      : "border-slate-800 bg-slate-900/50 text-slate-400 hover:bg-slate-800/50"
                  )}
                >
                  {tabConfigs[t].label}
                </button>
              ))}
            </div>
          </div>
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
            unit="W/m²"
            onChange={setIntensityI0}
          />
        </>
      }
      visualization={
        <Intensidad
          lambdaNm={lambda}
          slitDistanceMm={slitDistance}
          screenDistanceM={screenDistance}
          intensityI0={intensityI0}
        />
      }
      results={<ResultsPanel results={results} />}
      theory={
        <TheoryPanel>
          <p className="mb-2">
            <strong className="text-slate-200">Datos del problema (caso a):</strong>
          </p>
          <ul className="mb-3 ml-4 list-disc text-sm text-slate-400">
            <li>Distancia a la pantalla: <Formula math="L = 1 \text{ m}" /></li>
            <li>Separación entre rendijas: <Formula math="d = 0.001 \text{ m} = 1 \text{ mm}" /></li>
            <li>Longitud de onda: <Formula math="\lambda = 580 \text{ nm} = 5.80 \times 10^{-7} \text{ m}" /></li>
            <li>Intensidad máxima: <Formula math="I_0 = 1 \text{ W/m}^2" /></li>
          </ul>

          <p className="mb-2">
            <strong className="text-slate-200">Distribución de intensidad:</strong>
          </p>
          <p className="mb-2 text-sm text-slate-400">
            La intensidad de la luz en un punto de la pantalla es proporcional al cuadrado de la amplitud del campo eléctrico resultante. Cuando dos ondas de igual amplitud <Formula math="E_0" /> interfieren con un desfase <Formula math="\phi" />, la amplitud resultante es:
          </p>
          <Formula math="E_p = 2E_0 \cos\left(\frac{\phi}{2}\right)" block />
          <p className="mb-2 text-sm text-slate-400">
            Por lo tanto, la intensidad es:
          </p>
          <Formula math="I = I_{max} \cos^2\left(\frac{\phi}{2}\right)" block />
          <p className="mb-2 text-sm text-slate-400">
            donde <Formula math="I_{max} = 2E_0^2" /> es la intensidad máxima. El desfase <Formula math="\phi" /> está relacionado con la diferencia de camino <Formula math="\delta" /> por:
          </p>
          <Formula math="\phi = \frac{2\pi}{\lambda} \delta = \frac{2\pi}{\lambda} d \sin(\theta)" block />
          <p className="mb-2 text-sm text-slate-400">
            Para ángulos pequeños (<Formula math="\sin(\theta) \approx y/L" />):
          </p>
          <Formula math="I = I_{max} \cos^2\left(\frac{\pi d y}{\lambda L}\right)" block />

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Interferencia de dos ondas:</strong>
          </p>
          <p className="mb-2 text-sm text-slate-400">
            La siguiente imagen muestra cómo dos ondas individuales interfieren para producir la onda resultante en tres casos:
          </p>
          <ul className="mb-3 ml-4 list-disc text-sm text-slate-400">
            <li><strong>φ = 0° (Constructiva):</strong> Las dos ondas están en fase y se suman, resultando en amplitud máxima.</li>
            <li><strong>φ = 180° (Destructiva):</strong> Las dos ondas están en oposición de fase y se cancelan completamente.</li>
            <li><strong>φ = 60° (Intermedia):</strong> Las dos ondas están parcialmente desfasadas, resultando en amplitud intermedia.</li>
          </ul>
          <div className="my-4 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <svg viewBox="0 0 600 400" className="w-full h-auto">
              {/* Section 1: Constructive */}
              <text x="100" y="20" textAnchor="middle" className="fill-slate-300 text-sm font-bold">φ = 0° (Constructiva)</text>
              <line x1="0" y1="75" x2="200" y2="75" stroke="#475569" strokeWidth="1" />
              <path d="M 0 75 Q 25 25, 50 75 T 100 75 T 150 75 T 200 75" fill="none" stroke="#3b82f6" strokeWidth="2" />
              <path d="M 0 75 Q 25 25, 50 75 T 100 75 T 150 75 T 200 75" fill="none" stroke="#10b981" strokeWidth="2" />
              <path d="M 0 75 Q 25 0, 50 75 T 100 75 T 150 75 T 200 75" fill="none" stroke="#ef4444" strokeWidth="3" />
              
              {/* Section 2: Destructive */}
              <text x="300" y="20" textAnchor="middle" className="fill-slate-300 text-sm font-bold">φ = 180° (Destructiva)</text>
              <line x1="200" y1="175" x2="400" y2="175" stroke="#475569" strokeWidth="1" />
              <path d="M 200 175 Q 225 125, 250 175 T 300 175 T 350 175 T 400 175" fill="none" stroke="#3b82f6" strokeWidth="2" />
              <path d="M 200 175 Q 225 225, 250 175 T 300 175 T 350 175 T 400 175" fill="none" stroke="#10b981" strokeWidth="2" />
              <line x1="200" y1="175" x2="400" y2="175" stroke="#ef4444" strokeWidth="3" />
              
              {/* Section 3: Intermediate */}
              <text x="500" y="20" textAnchor="middle" className="fill-slate-300 text-sm font-bold">φ = 60° (Intermedia)</text>
              <line x1="400" y1="275" x2="600" y2="275" stroke="#475569" strokeWidth="1" />
              <path d="M 400 275 Q 425 225, 450 275 T 500 275 T 550 275 T 600 275" fill="none" stroke="#3b82f6" strokeWidth="2" />
              <path d="M 400 275 L 417 245 L 433 260 L 450 230 L 467 250 L 483 220 L 500 240 L 517 210 L 533 230 L 550 200 L 567 220 L 583 190 L 600 210" fill="none" stroke="#10b981" strokeWidth="2" />
              <path d="M 400 275 Q 417 240, 433 255 T 467 240 T 500 255 T 533 240 T 567 255 T 600 240" fill="none" stroke="#ef4444" strokeWidth="3" />
              
              {/* Labels */}
              <text x="50" y="100" className="fill-blue-400 text-xs">Onda 1</text>
              <text x="50" y="115" className="fill-green-400 text-xs">Onda 2</text>
              <text x="50" y="130" className="fill-red-400 text-xs font-bold">Resultante</text>
            </svg>
          </div>

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Separación entre franjas:</strong>
          </p>
          <Formula math="\Delta y = \frac{\lambda L}{d}" block />
          <Formula math="\Delta y = \frac{5.80 \times 10^{-7} \times 1}{0.001} = 5.80 \times 10^{-4} \text{ m} = 0.58 \text{ mm}" block />

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Variación del patrón con los parámetros:</strong>
          </p>
          <p className="mb-2 text-sm text-slate-400">
            La separación entre franjas <Formula math="\Delta y" /> depende de los tres parámetros:
          </p>
          <ul className="mb-3 ml-4 list-disc text-sm text-slate-400">
            <li><strong>Si aumenta d:</strong> <Formula math="\Delta y" /> disminuye → las franjas se juntan</li>
            <li><strong>Si disminuye d:</strong> <Formula math="\Delta y" /> aumenta → las franjas se separan</li>
            <li><strong>Si aumenta λ:</strong> <Formula math="\Delta y" /> aumenta → las franjas se separan</li>
            <li><strong>Si aumenta L:</strong> <Formula math="\Delta y" /> aumenta → las franjas se separan</li>
          </ul>

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Máximos (franjas brillantes):</strong>
          </p>
          <p className="mb-2 text-sm text-slate-400">
            Ocurren cuando <Formula math="y = m \cdot \Delta y" />:
          </p>
          <ul className="mb-3 ml-4 list-disc text-sm text-slate-400">
            <li>m = 0: <Formula math="y_0 = 0 \text{ m}" /> (central)</li>
            <li>m = 1: <Formula math="y_1 = 5.80 \times 10^{-4} \text{ m}" /></li>
            <li>m = 2: <Formula math="y_2 = 1.16 \times 10^{-3} \text{ m}" /></li>
            <li>m = 3: <Formula math="y_3 = 1.74 \times 10^{-3} \text{ m}" /></li>
          </ul>

          <p className="mb-2 mt-4">
            <strong className="text-slate-200">Mínimos (franjas oscuras):</strong>
          </p>
          <p className="mb-2 text-sm text-slate-400">
            Ocurren cuando <Formula math="y = (m + \frac{1}{2}) \cdot \Delta y" />:
          </p>
          <ul className="mb-3 ml-4 list-disc text-sm text-slate-400">
            <li>m = 0: <Formula math="y = 2.90 \times 10^{-4} \text{ m}" /></li>
            <li>m = 1: <Formula math="y = 8.70 \times 10^{-4} \text{ m}" /></li>
            <li>m = 2: <Formula math="y = 1.45 \times 10^{-3} \text{ m}" /></li>
          </ul>

          <p className="mt-4 text-sm text-slate-400">
            <strong className="text-slate-200">Resultado:</strong> La separación entre franjas consecutivas es <Formula math="\Delta y = 0.58 \text{ mm}" />. Los máximos ocurren en múltiplos enteros de este valor y los mínimos en múltiplos semi-enteros.
          </p>
        </TheoryPanel>
      }
      context={
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md">
          <h3 className="mb-2 text-sm font-semibold text-slate-50">
            Contexto pedagógico
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            La distribución de intensidad en el experimento de doble rendija muestra cómo la luz se distribuye en la pantalla debido a la interferencia de las ondas provenientes de las dos rendijas. 
            La intensidad varía según <Formula math="I = I_{max} \cos^2(\phi/2)" />, donde <Formula math="\phi" /> es el desfase entre las ondas.
            Cuando <Formula math="\phi = 0°" /> (ondas en fase), la intensidad es máxima. Cuando <Formula math="\phi = 180°" /> (ondas en oposición), la intensidad es cero.
          </p>

          <h4 className="mb-2 mt-4 text-sm font-semibold text-slate-50">
            Interpretación de la visualización
          </h4>
          <p className="text-sm leading-relaxed text-slate-400">
            El gráfico dinámico que observás representa la <strong className="text-slate-300">distribución de intensidad</strong> en función de la posición <Formula math="y" /> en la pantalla. Cada elemento tiene un propósito específico:
          </p>

          <ul className="my-3 ml-4 list-disc space-y-2 text-sm text-slate-400">
            <li>
              <strong className="text-cyan-400">Canvas superior (patrón de franjas):</strong> Muestra la distribución de intensidad como franjas verticales brillantes y oscuras. Las zonas brillantes corresponden a máximos de intensidad (interferencia constructiva), las oscuras a mínimos (interferencia destructiva). La línea punteada blanca marca el centro (y = 0).
            </li>
            <li>
              <strong className="text-cyan-400">Gráfico inferior (curva I(y)):</strong> Representa matemáticamente la función <Formula math="I = I_0 \cos^2(\pi d y / \lambda L)" /> como un área sombreada. El eje horizontal es la posición <Formula math="y" /> en mm, el vertical es la intensidad <Formula math="I" />.
            </li>
            <li>
              <strong className="text-cyan-400">Líneas verdes:</strong> Marcan las posiciones de los <strong>máximos</strong> (franjas brillantes) donde <Formula math="I = I_0" />.
            </li>
            <li>
              <strong className="text-cyan-400">Líneas rojas:</strong> Marcan las posiciones de los <strong>mínimos</strong> (franjas oscuras) donde <Formula math="I = 0" />.
            </li>
            <li>
              <strong className="text-cyan-400">Comportamiento dinámico:</strong> Al modificar los parámetros, el patrón cambia visiblemente:
              <ul className="ml-4 mt-1 list-disc text-xs text-slate-500">
                <li><strong>Aumentar d:</strong> Las franjas se juntan → aparecen más picos en el mismo rango</li>
                <li><strong>Disminuir d:</strong> Las franjas se separan → aparecen menos picos</li>
                <li><strong>Cambiar λ:</strong> Efecto similar, el patrón se comprime o expande</li>
              </ul>
            </li>
            <li>
              <strong className="text-cyan-400">Tabs de comparación (a, b, c):</strong> Permiten comparar tres escenarios: (a) valores originales, (b) duplicando <Formula math="d" />, (c) cambiando <Formula math="\lambda" /> a 400nm.
            </li>
          </ul>

          <p className="text-sm leading-relaxed text-slate-400">
            <strong className="text-slate-300">¿Qué observar cuando modificás los parámetros?</strong> Al aumentar <Formula math="L" />, las franjas se separan (mayor <Formula math="\Delta y" />). Al aumentar <Formula math="d" />, las franjas se juntan (menor <Formula math="\Delta y" />). Al cambiar <Formula math="\lambda" />, el espaciado cambia proporcionalmente. Al modificar <Formula math="I_0" />, solo cambia la altura de los picos, no su posición.
          </p>

          <div className="mt-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
            <p className="text-sm text-cyan-300">
              <strong>📚 Para mayor detalle:</strong> Visitá la sección de{" "}
              <a href="/teoria#intensidad" className="font-semibold underline hover:text-cyan-200">
                Teoría → Análisis de la Intensidad Luminosa
              </a>{" "}
              donde encontrarás el desarrollo matemático completo de la función cos² y la relación con el vector de Poynting.
            </p>
          </div>
        </div>
      }
    />
  );
}
