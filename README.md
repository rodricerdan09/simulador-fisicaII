# Simulador Físico Universitario

Aplicación web interactiva para el dictado de Física II (Óptica) en carreras de
Ingeniería y Ciencias Exactas. Permite a los estudiantes explorar fenómenos de
interferencia, difracción, polarización y espectro, mientras los docentes
visualizan métricas de uso por carrera y comisión.

## Demo

- Despliegue de referencia: [simulador-fisica-ii.vercel.app](https://simulador-fisica-ii.vercel.app) *(placeholder)*
- Capturas de pantalla: ver carpeta `/docs/screenshots` *(placeholder)*

## Stack tecnológico

- **Framework:** [Next.js 14.2](https://nextjs.org/) (App Router)
- **Lenguaje:** TypeScript 5.5
- **Estilos:** Tailwind CSS 3.4 + [shadcn/ui](https://ui.shadcn.com/) (base-nova)
- **Componentes base:** Radix UI + `@base-ui/react`
- **Backend / Auth:** [Supabase](https://supabase.com/) (Auth + Postgres)
- **Gráficos:** [Recharts](https://recharts.org/)
- **Renderizado matemático:** [KaTeX](https://katex.org/) via `react-katex`
- **Iconos:** Lucide React

## Estructura del proyecto

```text
src/
  app/              # Rutas de Next.js (App Router)
    (app)/          # Layout con AppShell, sidebar y drawer
    (auth)/         # Login y registro
    api/visits/     # Endpoint para registrar visitas
  components/
    ui/             # Componentes de shadcn/ui
    layout/         # AppShell, sidebar, navegación, footer
    auth/           # Formularios de autenticación
    exercise/       # Motor de simulaciones
    dashboard/      # Panel docente
    teoria/         # Componentes de la página teórica
  lib/              # Clientes Supabase, catálogos, utilidades físicas
  hooks/            # useUser, useVisit, useDebouncedParam
  types/            # Tipos TypeScript
  constants/        # Registro de ejercicios
supabase/
  migrations/       # Esquema, RLS y triggers
  seed.sql          # Datos iniciales
```

## Requisitos previos

- Node.js 18+
- Cuenta de Supabase (puede ser local con la CLI o un proyecto en la nube)
- Variables de entorno configuradas en `.env.local`

## Configuración inicial

1. Clonar el repositorio e instalar dependencias:

   ```bash
   npm install
   ```

2. Copiar el archivo de variables de entorno:

   ```bash
   cp .env.local.example .env.local
   ```

3. Completar `.env.local` con los datos de tu proyecto Supabase:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<anon-key>
   INVITATION_CODE_PROFESOR=<código-secreto>
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

   - `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` se obtienen
     en **Project Settings > API** de Supabase.
   - `INVITATION_CODE_PROFESOR` es un valor arbitrario que se usa para validar
     el registro de cuentas docentes (las cuentas de alumno no lo requieren).
   - `NEXT_PUBLIC_SITE_URL` debe coincidir con el origen de tu despliegue para
     que los callbacks de OAuth funcionen correctamente.

4. Aplicar las migraciones en Supabase:

   ```bash
   supabase link
   supabase db push
   ```

   O ejecutar manualmente los archivos de `supabase/migrations/` en el SQL
   Editor de Supabase.

5. (Opcional) Poblar la base de datos con el usuario docente y alumnos de
   ejemplo:

   ```bash
   psql $SUPABASE_DB_URL -f supabase/seed.sql
   ```

   El seed crea un docente con email `profesor@example.com` y contraseña
   `password123`, además de varios alumnos de prueba. Ver el archivo para los
   datos exactos.

## Scripts disponibles

| Script           | Descripción                                      |
|------------------|--------------------------------------------------|
| `npm run dev`    | Inicia el servidor de desarrollo en `localhost:3000` |
| `npm run build`  | Construye la aplicación para producción          |
| `npm run start`  | Inicia la aplicación en modo producción          |
| `npm run lint`   | Ejecuta ESLint sobre el proyecto                 |

Además se recomienda correr el chequeo de tipos antes de commitear:

```bash
npx tsc --noEmit
```

## Testing

> TODO: Agregar suite de tests automatizados.
>
> Configuración recomendada:
> - Tests unitarios/de componentes: [Vitest](https://vitest.dev/) + React Testing Library
> - Tests end-to-end: [Playwright](https://playwright.dev/)
>
> Hasta que haya tests, ejecutar estos pasos de verificación manual antes de cada release:
> 1. `npx tsc --noEmit` — chequeo de tipos
> 2. `npm run build` — build de producción
> 3. `npm run lint` — ESLint
> 4. Iniciar sesión como alumno y visitar cada ejercicio; confirmar que los simuladores rendericen y los resultados se actualicen.
> 5. Iniciar sesión como profesor y abrir `/dashboard`; confirmar que filtros, listado de alumnos y gráfico de visitas carguen.
> 6. Verificar que la página `/teoria` renderice todas las fórmulas KaTeX sin warnings en el build.

## Funcionalidades principales

- **Autentación académica:** registro con carrera, comisión, legajo y código de
  invitación para docentes. Login con email/contraseña.
- **Cinco simulaciones interactivas:** doble rendija, película delgada,
  difracción, polarización y espectro. Cada una expone parámetros ajustables,
  resultados en tiempo real y panel teórico con fórmulas en KaTeX.
- **Seguimiento de visitas:** cada carga de ejercicio registra una fila en
  `page_visits` de forma fire-and-forget, sin bloquear la interfaz.
- **Panel docente:** solo accesible para usuarios con rol `profesor`. Muestra
  listado filtrable de alumnos y un gráfico de visitas agrupadas por carrera y
  comisión.
- **Teoría general:** página con secciones colapsables, videos de YouTube y
  desarrollos matemáticos paso a paso.

## Seguridad y RLS

El proyecto usa Row Level Security (RLS) en Supabase:

- Un alumno solo puede leer su propio perfil.
- Un docente puede leer todos los perfiles y todas las visitas.
- Las visitas solo pueden ser insertadas por el usuario autenticado que las
  genera.
- El contador público de visitas se expone a través de la vista
  `page_visit_counts` para no revelar datos individuales.

## Capturas de pantalla

> Agregar imágenes en `/docs/screenshots/` y enlazarlas aquí.
>
> - Login
> - Listado de ejercicios
> - Simulación de doble rendija
> - Panel docente
> - Página de teoría

## Licencia

MIT
