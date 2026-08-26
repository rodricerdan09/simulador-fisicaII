import { TheoryPanel } from "@/components/exercise/TheoryPanel";
import { Formula } from "@/lib/katex/render";
import { ScrollToHash } from "@/components/teoria/ScrollToHash";
import { VideoEmbed } from "@/components/teoria/VideoEmbed";

export const metadata = {
  title: "Teoría — Simulador Físico Universitario",
  description: "Fundamentos teóricos de óptica ondulatoria y simuladores.",
};

// Componente para diagramas SVG inline
function DiagramaDobleRendija() {
  return (
    <div className="my-4 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
      <svg viewBox="0 0 500 220" className="w-full max-w-full md:max-w-xl mx-auto h-auto">
        {/* Fuente de luz */}
        <circle cx="30" cy="110" r="10" fill="#22d3ee" opacity="0.8" />
        <text x="30" y="145" textAnchor="middle" className="fill-slate-300" fontSize="12">
          Fuente
        </text>
        
        {/* Barrera con rendijas */}
        <rect x="200" y="0" width="5" height="90" fill="#475569" />
        <rect x="200" y="130" width="5" height="90" fill="#475569" />
        
        {/* Ondas desde S1 */}
        <circle cx="202" cy="110" r="25" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
        <circle cx="202" cy="110" r="45" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
        <circle cx="202" cy="110" r="65" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.2" />
        
        {/* Ondas desde S2 */}
        <circle cx="202" cy="110" r="25" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.4" />
        <circle cx="202" cy="110" r="45" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
        <circle cx="202" cy="110" r="65" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.2" />
        
        {/* Etiquetas S1 y S2 - movidas a la izquierda de la barrera */}
        <text x="185" y="106" textAnchor="end" className="fill-cyan-300" fontSize="12" fontWeight="bold">S₁</text>
        <text x="185" y="122" textAnchor="end" className="fill-purple-300" fontSize="12" fontWeight="bold">S₂</text>
        
        {/* Pantalla */}
        <rect x="430" y="0" width="10" height="220" fill="#334155" />
        <text x="455" y="115" textAnchor="middle" className="fill-slate-300" fontSize="12">
          Pantalla
        </text>
        
        {/* Distancia d - movida a la derecha de la barrera */}
        <line x1="210" y1="90" x2="210" y2="130" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 3" />
        <text x="220" y="114" className="fill-amber-300" fontSize="13" fontWeight="bold">d</text>
        
        {/* Distancia L */}
        <line x1="200" y1="200" x2="430" y2="200" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 3" />
        <text x="315" y="215" textAnchor="middle" className="fill-amber-300" fontSize="13" fontWeight="bold">L</text>
      </svg>
      <p className="text-center text-xs text-slate-400 mt-2">
        Esquema del experimento de doble rendija: las ondas de S₁ y S₂ interfieren en la pantalla
      </p>
    </div>
  );
}

function DiagramaInterferenciaOndas() {
  return (
    <div className="my-4 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
      <svg viewBox="0 0 520 170" className="w-full max-w-full md:max-w-xl mx-auto h-auto">
        {/* Onda 1 (roja) */}
        <path
          d="M 40 85 Q 70 25, 100 85 Q 130 145, 160 85 Q 190 25, 220 85 Q 250 145, 280 85 Q 310 25, 340 85 Q 370 145, 400 85 Q 430 25, 460 85"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2.5"
        />
        <text x="465" y="88" className="fill-red-300" fontSize="12" fontWeight="bold">Onda 1</text>
        
        {/* Onda 2 (azul) - desfasada */}
        <path
          d="M 40 85 Q 70 145, 100 85 Q 130 25, 160 85 Q 190 145, 220 85 Q 250 25, 280 85 Q 310 145, 340 85 Q 370 25, 400 85 Q 430 145, 460 85"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
          opacity="0.7"
        />
        <text x="465" y="105" className="fill-blue-300" fontSize="12" fontWeight="bold">Onda 2</text>
        
        {/* Línea central */}
        <line x1="40" y1="85" x2="460" y2="85" stroke="#64748b" strokeWidth="0.5" strokeDasharray="3 3" />
        
        {/* Longitud de onda - reposicionada */}
        <line x1="100" y1="15" x2="220" y2="15" stroke="#fbbf24" strokeWidth="1.5" />
        <line x1="100" y1="10" x2="100" y2="20" stroke="#fbbf24" strokeWidth="1.5" />
        <line x1="220" y1="10" x2="220" y2="20" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="160" y="12" textAnchor="middle" className="fill-amber-300" fontSize="15" fontWeight="bold" fontStyle="italic">λ</text>
      </svg>
      <p className="text-center text-xs text-slate-400 mt-2">
        Dos ondas con igual amplitud y frecuencia, desfasadas en π (interferencia destructiva)
      </p>
    </div>
  );
}

function GraficoIntensidad() {
  return (
    <div className="my-4 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
      <svg viewBox="0 0 500 220" className="w-full max-w-full md:max-w-xl mx-auto h-auto">
        {/* Ejes */}
        <line x1="50" y1="190" x2="460" y2="190" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="50" y1="20" x2="50" y2="190" stroke="#94a3b8" strokeWidth="1.5" />
        
        {/* Etiquetas de ejes */}
        <text x="255" y="215" textAnchor="middle" className="fill-slate-300" fontSize="12">
          Posición y (mm)
        </text>
        <text x="15" y="105" textAnchor="middle" className="fill-slate-300" fontSize="12" transform="rotate(-90, 15, 105)">
          Intensidad I
        </text>
        
        {/* Líneas verticales punteadas para máximos */}
        <line x1="90" y1="20" x2="90" y2="190" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        <line x1="250" y1="20" x2="250" y2="190" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        <line x1="410" y1="20" x2="410" y2="190" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        
        {/* Líneas verticales punteadas para mínimos */}
        <line x1="170" y1="190" x2="170" y2="190" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        <line x1="330" y1="190" x2="330" y2="190" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        
        {/* Curva cos² */}
        <path
          d="M 50 105 Q 90 20, 130 105 Q 170 190, 210 105 Q 250 20, 290 105 Q 330 190, 370 105 Q 410 20, 450 105"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2.5"
        />
        
        {/* Máximos - puntos pequeños en los picos */}
        <circle cx="90" cy="20" r="4" fill="#22c55e" stroke="#22c55e" strokeWidth="1" />
        <circle cx="250" cy="20" r="4" fill="#22c55e" stroke="#22c55e" strokeWidth="1" />
        <circle cx="410" cy="20" r="4" fill="#22c55e" stroke="#22c55e" strokeWidth="1" />
        
        {/* Mínimos - puntos pequeños en los valles */}
        <circle cx="170" cy="190" r="4" fill="#f43f5e" stroke="#f43f5e" strokeWidth="1" />
        <circle cx="330" cy="190" r="4" fill="#f43f5e" stroke="#f43f5e" strokeWidth="1" />
        
        {/* Etiquetas */}
        <text x="90" y="12" textAnchor="middle" className="fill-green-300" fontSize="10" fontWeight="bold">máx</text>
        <text x="170" y="205" textAnchor="middle" className="fill-rose-300" fontSize="10" fontWeight="bold">mín</text>
      </svg>
      <p className="text-center text-xs text-slate-400 mt-2">
        Distribución de intensidad I = I₀ cos²(πdy/λL): máximos (verde) y mínimos (rojo)
      </p>
    </div>
  );
}

function DiagramaPeliculaDelgada() {
  return (
    <div className="my-4 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
      <svg viewBox="0 0 600 280" className="w-full max-w-2xl mx-auto h-auto">
        <defs>
          <marker id="arrowYellow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#fbbf24" />
          </marker>
          <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#f43f5e" />
          </marker>
          <marker id="arrowCyan" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#22d3ee" />
          </marker>
        </defs>

        {/* Medio superior (aire) */}
        <text x="300" y="20" textAnchor="middle" className="fill-slate-300" fontSize="13" fontWeight="bold">
          Aire (n₁ ≈ 1)
        </text>
        
        {/* Película delgada - label centrado */}
        <rect x="100" y="90" width="400" height="80" fill="#22d3ee" opacity="0.15" stroke="#22d3ee" strokeWidth="1.5" />
        <text x="330" y="135" textAnchor="middle" className="fill-cyan-300" fontSize="14" fontWeight="bold">
          Película (n₂ = 1.33)
        </text>
        
        {/* Medio inferior (aire) */}
        <text x="300" y="205" textAnchor="middle" className="fill-slate-300" fontSize="13" fontWeight="bold">
          Aire (n₁ ≈ 1)
        </text>
        
        {/* Rayo incidente - más largo, desde más arriba */}
        <line x1="220" y1="30" x2="220" y2="90" stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#arrowYellow)" />
        <text x="220" y="22" textAnchor="middle" className="fill-amber-300" fontSize="12" fontWeight="bold">Incidente</text>
        
        {/* Rayo reflejado 1 (con inversión de fase) */}
        <line x1="220" y1="90" x2="140" y2="35" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrowRed)" />
        <text x="70" y="50" className="fill-rose-300" fontSize="12" fontWeight="bold">Reflejado 1</text>
        <text x="70" y="65" className="fill-rose-300" fontSize="11">(cambio π)</text>
        
        {/* Rayo transmitido hacia abajo */}
        <line x1="220" y1="90" x2="220" y2="170" stroke="#22d3ee" strokeWidth="2.5" strokeDasharray="6 4" />
        
        {/* Rayo reflejado 2 */}
        <line x1="220" y1="170" x2="310" y2="35" stroke="#22d3ee" strokeWidth="2.5" markerEnd="url(#arrowCyan)" />
        <text x="320" y="50" className="fill-cyan-300" fontSize="12" fontWeight="bold">Reflejado 2</text>
        <text x="320" y="65" className="fill-cyan-300" fontSize="11">(sin cambio)</text>
        
        {/* Indicador de espesor t */}
        <line x1="480" y1="90" x2="480" y2="170" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="475" y1="90" x2="485" y2="90" stroke="#fbbf24" strokeWidth="1.5" />
        <line x1="475" y1="170" x2="485" y2="170" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="495" y="135" className="fill-amber-300" fontSize="14" fontWeight="bold">t</text>
      </svg>
      <p className="text-center text-xs text-slate-400 mt-2">
        Interferencia en película delgada: el rayo 1 se refleja en la superficie superior con inversión de fase (π); el rayo 2 atraviesa la película, se refleja en la superficie inferior sin cambio de fase y recorre una distancia extra de 2nt.
      </p>
    </div>
  );
}

export default function TheoryPage() {
  return (
    <div className="space-y-6 p-4 pb-12 md:p-6 md:pb-12">
      <ScrollToHash />
      <header className="space-y-1 w-full">
        <h1 className="text-2xl font-bold text-slate-50 md:text-3xl">
          Teoría
        </h1>
        <p className="text-slate-400">
          Repaso completo de los conceptos de óptica ondulatoria que sustentan los simuladores.
          Expandí cada sección para ver el desarrollo matemático detallado, diagramas explicativos y videos recomendados.
        </p>
      </header>

      <div className="space-y-4">
        {/* Tarjeta 1: El Experimento de Young */}
        <TheoryPanel id="young" title="1. El Experimento de Young y la Doble Rendija" defaultOpen>
          <h3 className="text-lg font-semibold text-slate-50 mb-3">
            Demostración histórica de la naturaleza ondulatoria de la luz
          </h3>
          
          <p className="mb-3 text-slate-300 leading-relaxed">
            En 1801, Thomas Young realizó uno de los experimentos más importantes de la física: demostró que la luz se comporta como una onda. 
            Su experimento consistió en hacer pasar luz monocromática (de una sola longitud de onda) a través de dos rendijas muy estrechas, 
            separadas por una distancia <Formula math="d" /> del orden de micrómetros.
          </p>

          <DiagramaDobleRendija />

          <h4 className="text-base font-semibold text-slate-50 mt-4 mb-2">
            ¿Qué ocurre en el experimento?
          </h4>
          
          <p className="mb-3 text-slate-300 leading-relaxed">
            Cuando la luz incide sobre las dos rendijas <Formula math="S_1" /> y <Formula math="S_2" />, cada una actúa como una fuente secundaria 
            de ondas esféricas coherentes (en fase). Estas ondas se propagan y se superponen en una pantalla ubicada a una distancia <Formula math="L" /> 
            (donde <Formula math="L \gg d" />).
          </p>

          <p className="mb-3 text-slate-300 leading-relaxed">
            En la pantalla no se observa una iluminación uniforme, sino un <strong className="text-cyan-400">patrón de interferencia</strong>: 
            franjas brillantes y oscuras alternadas. Esto ocurre porque las ondas que llegan a cada punto de la pantalla han recorrido 
            distancias diferentes desde cada rendija, generando una <strong className="text-cyan-400">diferencia de camino óptico</strong> <Formula math="\Delta L" />.
          </p>

          <h4 className="text-base font-semibold text-slate-50 mt-4 mb-2">
            Desarrollo matemático: posición de las franjas
          </h4>

          <p className="mb-3 text-slate-300 leading-relaxed">
            La diferencia de camino entre las dos ondas que llegan a un punto <Formula math="P" /> en la pantalla es:
          </p>
          
          <Formula math="\Delta L = d \sin \theta" block />

          <p className="mb-3 text-slate-300 leading-relaxed">
            donde <Formula math="\theta" /> es el ángulo entre la línea central y el punto <Formula math="P" />. 
            Para ángulos pequeños (<Formula math="\theta < 10°" />), podemos aproximar <Formula math="\sin \theta \approx \tan \theta = \frac{y}{L}" />, 
            donde <Formula math="y" /> es la distancia vertical desde el centro de la pantalla.
          </p>

          <p className="mb-3 text-slate-300 leading-relaxed">
            <strong className="text-cyan-400">Interferencia constructiva</strong> (franjas brillantes o máximos): ocurre cuando la diferencia de camino 
            es un múltiplo entero de la longitud de onda:
          </p>
          
          <Formula math="d \sin \theta = m \lambda \quad \Rightarrow \quad y_m = \frac{m \lambda L}{d}, \quad m = 0, \pm 1, \pm 2, \dots" block />

          <p className="mb-3 text-slate-300 leading-relaxed">
            <strong className="text-rose-400">Interferencia destructiva</strong> (franjas oscuras o mínimos): ocurre cuando la diferencia de camino 
            es un múltiplo semientero de la longitud de onda:
          </p>
          
          <Formula math="d \sin \theta = \left(m + \frac{1}{2}\right) \lambda \quad \Rightarrow \quad y_m = \frac{\left(m + \frac{1}{2}\right) \lambda L}{d}" block />

          <h4 className="text-base font-semibold text-slate-50 mt-4 mb-2">
            Separación entre franjas consecutivas
          </h4>

          <p className="mb-3 text-slate-300 leading-relaxed">
            La distancia entre dos franjas brillantes (o dos oscuras) consecutivas es constante y se calcula como:
          </p>
          
          <Formula math="\Delta y = y_{m+1} - y_m = \frac{\lambda L}{d}" block />

          <div className="mt-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
            <p className="text-sm text-cyan-300">
              <strong>💡 Aplicación al simulador:</strong> En el Ejercicio 1 (Doble Rendija), utilizás esta fórmula para calcular la longitud de onda <Formula math="\lambda" /> a partir de la posición medida de una franja de orden conocido <Formula math="m" />.
            </p>
          </div>
        </TheoryPanel>

        {/* Tarjeta 2: Naturaleza Ondulatoria y Longitud de Onda */}
        <TheoryPanel id="naturaleza-ondulatoria" title="2. Naturaleza Ondulatoria y Longitud de Onda">
          <h3 className="text-lg font-semibold text-slate-50 mb-3">
            La relación entre color y longitud de onda
          </h3>

          <p className="mb-3 text-slate-300 leading-relaxed">
            La luz visible es una onda electromagnética cuyo color percibido está determinado por su longitud de onda <Formula math="\lambda" />. 
            El espectro visible se extiende aproximadamente desde <Formula math="380 \text{ nm}" /> (violeta) hasta <Formula math="750 \text{ nm}" /> (rojo).
          </p>

          <DiagramaInterferenciaOndas />

          <h4 className="text-base font-semibold text-slate-50 mt-4 mb-2">
            Espectro visible y colores
          </h4>

          <div className="my-4 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
            <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-semibold">
              <div className="rounded bg-violet-500 p-2 text-white shadow-lg break-words">380-440<br/>Violeta</div>
              <div className="rounded bg-blue-500 p-2 text-white shadow-lg break-words">440-490<br/>Azul</div>
              <div className="rounded bg-cyan-500 p-2 text-white shadow-lg break-words">490-510<br/>Cian</div>
              <div className="rounded bg-green-500 p-2 text-white shadow-lg break-words">510-580<br/>Verde</div>
              <div className="rounded bg-yellow-400 p-2 text-slate-900 shadow-lg break-words">580-620<br/>Amarillo</div>
              <div className="rounded bg-orange-500 p-2 text-white shadow-lg break-words">620-680<br/>Naranja</div>
              <div className="rounded bg-red-500 p-2 text-white shadow-lg break-words">680-750<br/>Rojo</div>
            </div>
            <p className="text-center text-xs text-slate-400 mt-2">
              Espectro visible: cada color corresponde a un rango de longitudes de onda
            </p>
          </div>

          <h4 className="text-base font-semibold text-slate-50 mt-4 mb-2">
            Efecto de la longitud de onda en el patrón de interferencia
          </h4>

          <p className="mb-3 text-slate-300 leading-relaxed">
            La separación entre franjas <Formula math="\Delta y" /> es <strong className="text-cyan-400">directamente proporcional</strong> a la longitud de onda:
          </p>

          <Formula math="\Delta y = \frac{\lambda L}{d}" block />

          <p className="mb-3 text-slate-300 leading-relaxed">
            Esto significa que:
          </p>

          <ul className="mb-3 ml-6 list-disc space-y-2 text-slate-300">
            <li>
              <strong className="text-red-400">Luz roja</strong> (<Formula math="\lambda \approx 700 \text{ nm}" />): produce franjas más separadas, 
              patrón más "abierto"
            </li>
            <li>
              <strong className="text-blue-400">Luz azul</strong> (<Formula math="\lambda \approx 450 \text{ nm}" />): produce franjas más juntas, 
              patrón más "comprimido"
            </li>
            <li>
              <strong className="text-green-400">Luz verde</strong> (<Formula math="\lambda \approx 550 \text{ nm}" />): patrón intermedio
            </li>
          </ul>

          <div className="mt-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
            <p className="text-sm text-cyan-300">
              <strong>💡 Aplicación al simulador:</strong> En el Ejercicio 2 (Comparación de Espectros), comparás las posiciones de las franjas 
              para dos longitudes de onda diferentes (<Formula math="\lambda_1 = 430 \text{ nm}" /> y <Formula math="\lambda_2 = 510 \text{ nm}" />) 
              y calculás la separación entre ellas.
            </p>
          </div>
        </TheoryPanel>

        {/* Tarjeta 3: Interferencia Constructiva y Destructiva */}
        <TheoryPanel id="interferencia" title="3. Interferencia Constructiva y Destructiva">
          <h3 className="text-lg font-semibold text-slate-50 mb-3">
            Diferencia de camino y desfasaje entre ondas
          </h3>

          <p className="mb-3 text-slate-300 leading-relaxed">
            Cuando dos ondas coherentes (de igual frecuencia y amplitud) se superponen en un punto, el resultado depende de la 
            <strong className="text-cyan-400"> diferencia de fase</strong> <Formula math="\phi" /> entre ellas. Esta diferencia de fase está 
            directamente relacionada con la <strong className="text-cyan-400">diferencia de camino óptico</strong> <Formula math="\Delta L" /> 
            que recorrieron las ondas.
          </p>

          <h4 className="text-base font-semibold text-slate-50 mt-4 mb-2">
            Relación entre desfasaje y diferencia de camino
          </h4>

          <p className="mb-3 text-slate-300 leading-relaxed">
            Si una onda recorre una distancia adicional <Formula math="\Delta L" /> respecto a la otra, el desfasaje angular es:
          </p>

          <Formula math="\phi = \frac{2\pi}{\lambda} \Delta L" block />

          <p className="mb-3 text-slate-300 leading-relaxed">
            Esta relación es fundamental: un camino adicional de una longitud de onda completa (<Formula math="\Delta L = \lambda" />) 
            corresponde a un desfasaje de <Formula math="2\pi" /> radianes (360°), lo que significa que las ondas vuelven a estar en fase.
          </p>

          <h4 className="text-base font-semibold text-slate-50 mt-4 mb-2">
            Condiciones de interferencia
          </h4>

          <div className="my-4 space-y-3">
            <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
              <p className="text-sm font-semibold text-green-400 mb-1">
                ✅ Interferencia Constructiva (Máximos)
              </p>
              <p className="text-sm text-slate-300">
                Ocurre cuando las ondas llegan <strong>en fase</strong> (<Formula math="\phi = 0, 2\pi, 4\pi, \dots" />):
              </p>
              <Formula math="\Delta L = m\lambda \quad \Rightarrow \quad d\sin\theta = m\lambda, \quad m = 0, \pm 1, \pm 2, \dots" block />
              <p className="text-xs text-slate-400 mt-1">
                Las amplitudes se suman: <Formula math="A_{total} = 2A_0" />, intensidad máxima <Formula math="I_{max} = 4I_0" />
              </p>
            </div>

            <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-3">
              <p className="text-sm font-semibold text-rose-400 mb-1">
                ❌ Interferencia Destructiva (Mínimos)
              </p>
              <p className="text-sm text-slate-300">
                Ocurre cuando las ondas llegan <strong>en oposición de fase</strong> (<Formula math="\phi = \pi, 3\pi, 5\pi, \dots" />):
              </p>
              <Formula math="\Delta L = \left(m + \frac{1}{2}\right)\lambda \quad \Rightarrow \quad d\sin\theta = \left(m + \frac{1}{2}\right)\lambda" block />
              <p className="text-xs text-slate-400 mt-1">
                Las amplitudes se cancelan: <Formula math="A_{total} = 0" />, intensidad nula <Formula math="I = 0" />
              </p>
            </div>
          </div>

          <h4 className="text-base font-semibold text-slate-50 mt-4 mb-2">
            Distribución de intensidad
          </h4>

          <p className="mb-3 text-slate-300 leading-relaxed">
            La intensidad de la luz en un punto de la pantalla es proporcional al cuadrado de la amplitud del campo eléctrico resultante. 
            Cuando dos ondas de igual amplitud <Formula math="E_0" /> interfieren con un desfase <Formula math="\phi" />, la amplitud resultante es:
          </p>

          <Formula math="E_p = 2E_0 \cos\left(\frac{\phi}{2}\right)" block />

          <p className="mb-3 text-slate-300 leading-relaxed">
            Por lo tanto, la intensidad es:
          </p>

          <Formula math="I = I_{max} \cos^2\left(\frac{\phi}{2}\right)" block />

          <p className="mb-3 text-slate-300 leading-relaxed">
            donde <Formula math="I_{max} = 2E_0^2" /> es la intensidad máxima. El desfase <Formula math="\phi" /> está relacionado con la diferencia de camino <Formula math="\delta" /> por:
          </p>

          <Formula math="\phi = \frac{2\pi}{\lambda} \delta = \frac{2\pi}{\lambda} d \sin(\theta)" block />

          <p className="mb-3 text-slate-300 leading-relaxed">
            Para ángulos pequeños (<Formula math="\sin(\theta) \approx y/L" />):
          </p>

          <Formula math="I = I_{max} \cos^2\left(\frac{\pi d y}{\lambda L}\right)" block />

          <div className="my-4 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <p className="text-sm text-slate-300 mb-2">
              <strong className="text-cyan-400">Visualización de la interferencia de dos ondas:</strong>
            </p>
            <div className="mb-3 flex flex-wrap items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-0.5 w-6 bg-blue-500" /> Onda 1
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-0.5 w-6 bg-green-500" /> Onda 2
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-0.5 w-6 bg-red-500" /> Resultante
              </span>
            </div>
            <svg viewBox="0 0 600 300" className="mx-auto w-full max-w-md h-auto">
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
            </svg>
          </div>

          <h4 className="text-base font-semibold text-slate-50 mt-4 mb-2">
            Cálculo de la posición de mínimos
          </h4>

          <p className="mb-3 text-slate-300 leading-relaxed">
            Para ángulos pequeños, la posición vertical <Formula math="y_m" /> de los mínimos en la pantalla es:
          </p>

          <Formula math="y_m = \frac{\left(m + \frac{1}{2}\right) \lambda L}{d}" block />

          <p className="mb-3 text-slate-300 leading-relaxed">
            La distancia entre dos mínimos consecutivos es igual a la separación entre franjas:
          </p>

          <Formula math="\Delta y = y_{m+1} - y_m = \frac{\lambda L}{d}" block />

          <div className="mt-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
            <p className="text-sm text-cyan-300">
              <strong>💡 Aplicación al simulador:</strong> En el Ejercicio 3 (Mínimos de Interferencia), medís la distancia entre mínimos 
              consecutivos <Formula math="\Delta y" /> y calculás la longitud de onda <Formula math="\lambda" /> usando la fórmula despejada.
            </p>
          </div>
        </TheoryPanel>

        {/* Tarjeta 4: Interferencia en Películas Delgadas */}
        <TheoryPanel id="pelicula-delgada" title="4. Interferencia en Películas Delgadas">
          <h3 className="text-lg font-semibold text-slate-50 mb-3">
            Colores iridiscentes en burbujas de jabón y manchas de aceite
          </h3>

          <p className="mb-3 text-slate-300 leading-relaxed">
            Cuando la luz incide sobre una película delgada (como una burbuja de jabón o una capa de aceite sobre agua), 
            parte se refleja en la superficie superior y parte se transmite, reflejándose luego en la superficie inferior. 
            Estos dos rayos reflejados interfieren entre sí, generando los característicos colores iridiscentes.
          </p>

          <DiagramaPeliculaDelgada />

          <h4 className="text-base font-semibold text-slate-50 mt-4 mb-2">
            Cambio de fase en la reflexión
          </h4>

          <p className="mb-3 text-slate-300 leading-relaxed">
            Un fenómeno crucial es el <strong className="text-cyan-400">cambio de fase de π (180°)</strong> que ocurre cuando la luz se refleja 
            en un medio con <strong>mayor índice de refracción</strong>:
          </p>

          <ul className="mb-3 ml-6 list-disc space-y-2 text-slate-300">
            <li>
              <strong>De menor a mayor n</strong> (<Formula math="n_1 < n_2" />): la onda reflejada sufre inversión de fase (<Formula math="\pi" /> rad)
            </li>
            <li>
              <strong>De mayor a menor n</strong> (<Formula math="n_1 > n_2" />): la onda reflejada NO sufre cambio de fase
            </li>
          </ul>

          <p className="mb-3 text-slate-300 leading-relaxed">
            En una burbuja de jabón (<Formula math="n_{jabón} = 1.33" />) rodeada de aire (<Formula math="n_{aire} \approx 1" />):
          </p>

          <ul className="mb-3 ml-6 list-disc space-y-2 text-slate-300">
            <li>
              <strong className="text-rose-400">Rayo 1</strong> (reflejado en superficie exterior): sufre cambio de fase <Formula math="\pi" />
            </li>
            <li>
              <strong className="text-cyan-400">Rayo 2</strong> (reflejado en superficie interior): NO sufre cambio de fase
            </li>
          </ul>

          <h4 className="text-base font-semibold text-slate-50 mt-4 mb-2">
            Diferencia de camino óptico
          </h4>

          <p className="mb-3 text-slate-300 leading-relaxed">
            El rayo 2 recorre una distancia adicional de <Formula math="2t" /> dentro de la película (ida y vuelta), 
            donde <Formula math="t" /> es el espesor. Como la luz viaja más lento en el medio (<Formula math="v = c/n" />), 
            la longitud de onda dentro del medio es:
          </p>

          <Formula math="\lambda_n = \frac{\lambda}{n}" block />

          <p className="mb-3 text-slate-300 leading-relaxed">
            La diferencia de camino óptico entre los dos rayos reflejados es:
          </p>

          <Formula math="\Delta L = 2nt" block />

          <h4 className="text-base font-semibold text-slate-50 mt-4 mb-2">
            Condiciones de interferencia (con un cambio de fase)
          </h4>

          <p className="mb-3 text-slate-300 leading-relaxed">
            Debido al cambio de fase de <Formula math="\pi" /> en uno de los rayos, las condiciones se <strong className="text-cyan-400">invierten</strong>:
          </p>

          <div className="my-4 space-y-3">
            <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
              <p className="text-sm font-semibold text-green-400 mb-1">
                ✅ Interferencia Constructiva (colores brillantes)
              </p>
              <Formula math="2nt = \left(m + \frac{1}{2}\right)\lambda, \quad m = 0, 1, 2, \dots" block />
            </div>

            <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-3">
              <p className="text-sm font-semibold text-rose-400 mb-1">
                ❌ Interferencia Destructiva (colores oscuros)
              </p>
              <Formula math="2nt = m\lambda, \quad m = 0, 1, 2, \dots" block />
            </div>
          </div>

          <h4 className="text-base font-semibold text-slate-50 mt-4 mb-2">
            Espesor mínimo para interferencia constructiva
          </h4>

          <p className="mb-3 text-slate-300 leading-relaxed">
            Para el orden más bajo (<Formula math="m = 0" />), el espesor mínimo es:
          </p>

          <Formula math="t_{min} = \frac{\lambda}{4n}" block />

          <div className="mt-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
            <p className="text-sm text-cyan-300">
              <strong>💡 Aplicación al simulador:</strong> En el Ejercicio 4 (Película Delgada), calculás el espesor mínimo <Formula math="t" /> de una burbuja de jabón (<Formula math="n = 1.33" />) para observar interferencia constructiva con luz de <Formula math="\lambda = 600 \text{ nm}" />.
            </p>
          </div>
        </TheoryPanel>

        {/* Tarjeta 5: Análisis de la Intensidad Luminosa */}
        <TheoryPanel id="intensidad" title="5. Análisis de la Intensidad Luminosa">
          <h3 className="text-lg font-semibold text-slate-50 mb-3">
            Distribución de intensidad en el patrón de interferencia
          </h3>

          <p className="mb-3 text-slate-300 leading-relaxed">
            Hasta ahora analizamos dónde aparecen los máximos y mínimos, pero no cómo varía la <strong className="text-cyan-400">intensidad luminosa</strong> <Formula math="I" /> 
            entre ellos. La intensidad no cambia abruptamente de brillante a oscuro, sino que sigue una función continua.
          </p>

          <GraficoIntensidad />

          <h4 className="text-base font-semibold text-slate-50 mt-4 mb-2">
            Campo eléctrico resultante
          </h4>

          <p className="mb-3 text-slate-300 leading-relaxed">
            Si las dos fuentes <Formula math="S_1" /> y <Formula math="S_2" /> emiten ondas de igual amplitud <Formula math="E_0" /> y frecuencia <Formula math="\omega" />, 
            los campos eléctricos en el punto <Formula math="P" /> son:
          </p>

          <Formula math="E_1 = E_0 \sin(\omega t), \quad E_2 = E_0 \sin(\omega t + \phi)" block />

          <p className="mb-3 text-slate-300 leading-relaxed">
            donde <Formula math="\phi" /> es el desfasaje entre las ondas. Usando la identidad trigonométrica 
            <Formula math="\sin A + \sin B = 2\sin\left(\frac{A+B}{2}\right)\cos\left(\frac{A-B}{2}\right)" />, 
            el campo resultante es:
          </p>

          <Formula math="E_P = E_1 + E_2 = 2E_0 \cos\left(\frac{\phi}{2}\right) \sin\left(\omega t + \frac{\phi}{2}\right)" block />

          <p className="mb-3 text-slate-300 leading-relaxed">
            La <strong className="text-cyan-400">amplitud resultante</strong> es:
          </p>

          <Formula math="E_{max} = 2E_0 \cos\left(\frac{\phi}{2}\right)" block />

          <h4 className="text-base font-semibold text-slate-50 mt-4 mb-2">
            Intensidad en función del desfasaje
          </h4>

          <p className="mb-3 text-slate-300 leading-relaxed">
            La intensidad luminosa es proporcional al cuadrado de la amplitud del campo eléctrico:
          </p>

          <Formula math="I \propto E_{max}^2 = 4E_0^2 \cos^2\left(\frac{\phi}{2}\right)" block />

          <p className="mb-3 text-slate-300 leading-relaxed">
            Definimos la <strong className="text-cyan-400">intensidad máxima</strong> <Formula math="I_0 = 4E_0^2/2" /> (promediada en tiempo), entonces:
          </p>

          <Formula math="I = I_0 \cos^2\left(\frac{\phi}{2}\right)" block />

          <h4 className="text-base font-semibold text-slate-50 mt-4 mb-2">
            Intensidad en función de la posición
          </h4>

          <p className="mb-3 text-slate-300 leading-relaxed">
            El desfasaje <Formula math="\phi" /> está relacionado con la diferencia de camino <Formula math="\Delta L" />:
          </p>

          <Formula math="\phi = \frac{2\pi}{\lambda} \Delta L = \frac{2\pi}{\lambda} d\sin\theta" block />

          <p className="mb-3 text-slate-300 leading-relaxed">
            Para ángulos pequeños (<Formula math="\sin\theta \approx y/L" />):
          </p>

          <Formula math="I = I_0 \cos^2\left(\frac{\pi d y}{\lambda L}\right)" block />

          <h4 className="text-base font-semibold text-slate-50 mt-4 mb-2">
            Interpretación del gráfico
          </h4>

          <ul className="mb-3 ml-6 list-disc space-y-2 text-slate-300">
            <li>
              <strong className="text-cyan-400">Máximos</strong> (<Formula math="I = I_0" />): ocurren cuando <Formula math="\frac{\pi d y}{\lambda L} = m\pi" />, 
              es decir, <Formula math="y = \frac{m\lambda L}{d}" />
            </li>
            <li>
              <strong className="text-rose-400">Mínimos</strong> (<Formula math="I = 0" />): ocurren cuando <Formula math="\frac{\pi d y}{\lambda L} = \left(m+\frac{1}{2}\right)\pi" />, 
              es decir, <Formula math="y = \frac{\left(m+\frac{1}{2}\right)\lambda L}{d}" />
            </li>
            <li>
              La intensidad varía suavemente entre 0 e <Formula math="I_0" /> siguiendo la curva <Formula math="\cos^2" />
            </li>
          </ul>

          <div className="mt-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
            <p className="text-sm text-cyan-300">
              <strong>💡 Aplicación al simulador:</strong> En el Ejercicio 5 (Distribución de Intensidad), visualizás esta curva <Formula math="\cos^2" /> en el gráfico interactivo de intensidad en función de la posición, con los máximos (líneas verdes) y mínimos (líneas rojas) marcados, y comparás cómo cambia el patrón al modificar <Formula math="d" /> o <Formula math="\lambda" />.
            </p>
          </div>
        </TheoryPanel>

        {/* Tarjeta 6: Teoría de la Cátedra */}
        <TheoryPanel id="teoria-catedra" title="6. Teoría de la Cátedra">
          <p className="mb-3 text-slate-300 leading-relaxed">
            Todo el contenido teórico de este simulador se desarrolló en base a los videos oficiales de la cátedra. 
            Podés complementar y profundizar los conceptos vistos aquí repasando las explicaciones originales del docente, 
            donde se desarrollan las fórmulas y se muestran simulaciones y diagramas paso a paso.
          </p>

          <div className="my-4 space-y-4">
            <div>
              <p className="mb-2 text-sm font-semibold text-cyan-400">
                📺 Primera Parte — Superposición e interferencia
              </p>
              <VideoEmbed
                videoId="zmsvKMjiJZk"
                title="UT 12 Interferencia — Primera Parte"
                duration="38:00"
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-cyan-400">
                📺 Segunda Parte — Distribución de intensidades
              </p>
              <VideoEmbed
                videoId="QQhiJYbZaUU"
                title="UT 12 Interferencia — Segunda Parte"
                duration="30:00"
              />
            </div>
          </div>
        </TheoryPanel>
      </div>
    </div>
  );
}
