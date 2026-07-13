# Simulador de la Unidad 12: Interferencia, de la catedra Física II de la UTN FRRE

Aplicación web interactiva para el dictado de Física II (Óptica / Interferencia de la Luz) en carreras de Ingeniería y Ciencias Exactas de la Universidad Tecnológica Nacional. Permite a los estudiantes explorar fenómenos ópticos reales con representaciones físicas de alta fidelidad (Canvas/SVG), y a los docentes analizar métricas de visitas agrupadas por carrera y comisión mediante un panel dedicado.

## Stack tecnológico

- **Framework:** [Next.js 14.2](https://nextjs.org/) (App Router)
- **Lenguaje:** TypeScript 5.5
- **Estilos:** Tailwind CSS 3.4 + [shadcn/ui](https://ui.shadcn.com/) (base-nova)
- **Componentes base:** `@base-ui/react` (Base UI) + Radix UI
- **Backend / Auth:** [Supabase](https://supabase.com/) (Auth + Postgres con Row Level Security)
- **Gráficos:** [Recharts](https://recharts.org/)
- **Renderizado matemático:** [KaTeX](https://katex.org/)
- **Iconos:** Lucide React

---

## Características principales

- 🔐 **Autenticación académica unificada:** Registro diferenciado para Alumnos (con legajo, carrera y comisión obligatorios) y Profesores (con código de invitación obligatorio).
- 🔬 **Cinco simulaciones interactivas de alta fidelidad:**
  1. **Doble Rendija:** Simulación con frentes de onda interactivos y cálculo de la longitud de onda y espaciado de franjas.
  2. **Comparación de Espectros:** Comparación paralela de frentes de onda y franjas en pantalla para dos longitudes de onda distintas en doble rendija.
  3. **Mínimos de Interferencia:** Determinación de longitud de onda basada en el espaciado de franjas oscuras consecutivas.
  4. **Película Delgada:** Análisis del espesor de películas de jabón (<Formula math="n = 1.33" />) con rayos de reflexión, refracción e inversión de fase de <Formula math="\pi" />.
  5. **Distribución de Intensidad:** Gráficos de intensidad continuos <Formula math="I = I_0 \cos^2(\theta)" /> con Recharts (máximos y mínimos marcados) y canvas de patrón físico interactivo.
- 🧪 **Laboratorios interactivos:** Sección preparada para futuros laboratorios virtuales.
- 📈 **Seguimiento analítico de visitas:** Cada ejercicio tiene un contador de visitas que se registra en background de forma no bloqueante (con debounce de sesión).
- 👨‍🏫 **Panel Docente avanzado:** Vista para profesores con listado de alumnos matriculados por carrera/comisión y gráficos de visitas agrupados.
- 📚 **Teoría interactiva completa:** 5 tarjetas desplegables alineadas con cada simulación, integrando developments matemáticos detallados en KaTeX y videos embebidos de YouTube.

---

## Requisitos previos

- Node.js 18+ o superior
- Cuenta de Supabase (cloud o local)
- Archivo `.env.local` configurado con tus credenciales

---

## Configuración inicial

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Crear archivo de entorno:**
   Copia el archivo de ejemplo y completa las variables con tus propias claves:
   ```bash
   cp .env.local.example .env.local
   ```

   Las variables necesarias (sin valores explícitos en este documento) son:
   - `NEXT_PUBLIC_SUPABASE_URL` (URL de tu proyecto Supabase)
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (Clave pública anon de Supabase)
   - `NEXT_PUBLIC_INVITATION_CODE_PROFESOR` (Código secreto requerido para registrar cuentas de profesores)
   - `NEXT_PUBLIC_SITE_URL` (URL de tu deploy, por defecto http://localhost:3000 para local)

3. **Configurar Base de Datos (Supabase):**
   Copia y ejecuta en el **SQL Editor** de Supabase las migraciones ubicadas en `supabase/migrations/` en orden cronológico, o utiliza la Supabase CLI:
   ```bash
   supabase link --project-ref <tu-referencia>
   supabase db push
   ```

4. **(Opcional) Poblar base de datos con datos Seed:**
   Ejecuta el script `supabase/seed.sql` para crear usuarios de prueba y datos de métricas ficticias.
   - **Profesor de prueba:** `profesor@example.com` / `password123`
   - **Alumno de prueba:** `alumno1@example.com` / `password123`

5. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

---

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Inicia el entorno de desarrollo |
| `npm run build` | Compila la aplicación optimizada para producción |
| `npm run start` | Inicia la aplicación en modo producción |
| `npm run lint` | Ejecuta chequeos de sintaxis con ESLint |

Antes de realizar despliegues o commits, se recomienda correr el chequeo de tipos:
```bash
npx tsc --noEmit
```

---

## Seguridad y Row Level Security (RLS)

El proyecto implementa políticas estrictas de seguridad RLS a nivel de base de datos para garantizar la privacidad académica:
- **Profiles:** Un alumno solo puede consultar su propio perfil (`auth.uid() = id`). Los docentes pueden consultar todos los perfiles de los alumnos.
- **Page Visits:** Un alumno solo puede registrar visitas vinculadas a su propio ID. Un docente puede consultar las analíticas agregadas de todas las visitas para generar estadísticas en el gráfico.
- **Contador Público:** Se utiliza una vista de agregación SQL segura (`page_visit_counts`) para que los alumnos vean el contador de popularidad de cada ejercicio sin necesidad de acceder a los registros de visitas individuales.

---

## Testing y Verificación Manual

> TODO: Integrar tests de componentes con Vitest y pruebas de integración con Playwright.

Pasos recomendados para validación manual de entregas:
1. Confirmar compilación exitosa: `npx tsc --noEmit` y `npm run build`.
2. Verificar el registro como Alumno y confirmar que solo muestra campos académicos relevantes.
3. Verificar el registro como Profesor, confirmando que requiere el código de invitación correspondiente.
4. Interactuar con las 5 simulaciones; confirmar que las ecuaciones KaTeX se visualizan al ancho completo en Teoría, y que los sliders no se superponen en mobile ni impiden la entrada manual de texto.
5. Iniciar sesión como docente y verificar que los filtros por carrera (ISI, IEM, IQ) y comisión funcionen en el listado y el gráfico de Recharts.

---

## Licencia

Este proyecto está bajo la licencia MIT.
