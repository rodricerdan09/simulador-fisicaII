# Simulador de la Unidad 12: Interferencia — Física II · UTN FRRE

Aplicación web interactiva para el dictado de **Física II (Óptica / Interferencia de la Luz)** en carreras de Ingeniería y Ciencias Exactas de la **Universidad Tecnológica Nacional, Facultad Regional Resistencia**.

Permite a los estudiantes explorar fenómenos ópticos reales con representaciones físicas de alta fidelidad (Canvas/SVG), y a los docentes analizar métricas de visitas agrupadas por carrera y comisión mediante un panel dedicado.

---

## Stack tecnológico

- **Framework:** [Next.js 14.2](https://nextjs.org/) (App Router)
- **Lenguaje:** TypeScript 5.5
- **Estilos:** Tailwind CSS 3.4 + [shadcn/ui](https://ui.shadcn.com/) (base-nova)
- **Componentes base:** `@base-ui/react` (Base UI) + Radix UI
- **Persistencia:** [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) (base de datos local SQLite)
- **Gráficos:** [Recharts](https://recharts.org/)
- **Renderizado matemático:** [KaTeX](https://katex.org/)
- **Testing:** [Vitest](https://vitest.dev/) + React Testing Library
- **Iconos:** Lucide React

---

## Características principales

- 🔐 **Autenticación local con roles:** Registro de Alumnos (nombre, apellido, legajo, carrera y comisión) e ingreso de Docentes mediante **código de profesor** (configurable). Los roles se gestionan sin depender de servicios externos.
- 🔬 **Cinco simulaciones interactivas de alta fidelidad:**
  1. **Doble Rendija:** Frentes de onda interactivos, patrón de interferencia con envolvente de difracción, cálculo de longitud de onda y separación de franjas.
  2. **Comparación de Espectros:** Dos longitudes de onda superpuestas, con orden de franja seleccionable independientemente para cada onda.
  3. **Mínimos de Interferencia:** Determinación de la longitud de onda a partir del espaciado de franjas oscuras consecutivas.
  4. **Película Delgada:** Espesor de películas de jabón con rayos de reflexión, cambio de fase π y distancia extra 2nt.
  5. **Distribución de Intensidad:** Curva `I = I₀·cos²(πdy/λL)` con patrón de franjas y gráfico de área, máximos y mínimos marcados, y pestañas de comparación (d×2, λ=400nm).
- 🧪 **Laboratorios:** Sección preparada para futuros laboratorios virtuales (controlada mediante feature flag).
- 📈 **Seguimiento analítico de visitas:** Registro de una visita por página cada 24 horas por dispositivo, **solo para alumnos** (no docentes ni invitados).
- 👨‍🏫 **Panel Docente:** Listado de alumnos filtrable por carrera/comisión, cantidad de visitas por alumno y gráfico de analytics agrupado.
- 📚 **Teoría interactiva completa:** Seis secciones desplegables con desarrollo matemático en KaTeX, diagramas y videos oficiales de la cátedra.
- 🚩 **Feature flags:** Sistema de activación/desactivación de funcionalidades mediante `src/config/features.json`.

---

## Requisitos previos

- Node.js 18+ o superior

---

## Configuración inicial

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar código de docente (opcional):**
   La aplicación usa `PROFESSOR_CODE` (variable de entorno) para el ingreso de docentes. Si no está definida, usa el valor por defecto `utn2026`. Podés definirla en `.env.local`:
   ```env
   PROFESSOR_CODE=tu-codigo-secreto
   ```

3. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abrí [http://localhost:3000](http://localhost:3000) en tu navegador.

4. **Base de datos SQLite:**
   La base de datos se crea automáticamente en `data/simulador.db` al primer arranque, con alumnos de ejemplo precargados.

---

## Feature flags

Las funcionalidades se activan/desactivan en `src/config/features.json`:

| Flag | Descripción | Valor por defecto |
|------|-------------|-------------------|
| `auth.login` | Habilitar inicio de sesión | `false` |
| `auth.register` | Habilitar registro | `false` |
| `supabase.enabled` | Usar Supabase (en vez de SQLite) | `false` |
| `sqlite.enabled` | Usar SQLite | `true` |
| `visitTracking` | Registrar visitas | `true` |
| `laboratorio` | Mostrar sección Laboratorios | `false` |

> Las rutas de funcionalidades deshabilitadas están protegidas en el middleware (redirigen a `/inicio`).

---

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Inicia el entorno de desarrollo |
| `npm run build` | Compila la aplicación optimizada para producción |
| `npm run start` | Inicia la aplicación en modo producción |
| `npm run lint` | Ejecuta chequeos de sintaxis con ESLint |
| `npm test` | Ejecuta tests en modo watch |
| `npm run test:run` | Ejecuta tests una sola vez |

Chequeo de tipos:
```bash
npx tsc --noEmit
```

---

## Docker

La aplicación incluye un `Dockerfile` multi-etapa (producción con `output: standalone`):

```bash
docker build -t simulador-fisica .
docker run -p 3000:3000 simulador-fisica
```

El volumen `data/` (base de datos SQLite) se crea dentro del contenedor.

---

## Testing

El proyecto cuenta con tests unitarios usando **Vitest** y **React Testing Library**:

- **Cobertura**: exercises (cálculos físicos y renderizado), hooks, middlewares, páginas y componentes.
- **Ejecutar**: `npm run test:run`

```bash
npm run test:run
```

---

## Seguridad

- **Roles protegidos**: El acceso al rol de docente requiere el código `PROFESSOR_CODE`.
- **Rutas protegidas**: Las rutas de funcionalidades deshabilitadas (feature flags) se bloquean en el middleware.
- **Visitas solo de alumnos**: El contador no registra visitas de docentes ni invitados.
- **Guard de autenticación**: Los usuarios invitados son redirigidos a la pantalla de acceso.

---

## Licencia

Este proyecto está bajo la licencia MIT.
