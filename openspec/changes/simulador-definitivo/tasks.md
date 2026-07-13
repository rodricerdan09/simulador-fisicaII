# Tasks: Simulador Físico Universitario (simulador-definitivo)

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 3500-4000 lines |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (Foundation + Auth) → PR 2 (AppShell + Exercises) → PR 3 (Dashboard + Visits) |
| Delivery strategy | ask-on-risk |
| Chain strategy | stacked-to-main |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Foundation + Auth system (migrations, Supabase clients, auth UI with invitation code) | PR 1 | Base branch; includes config, types, catalogs |
| 2 | AppShell + Exercise engine (layout, navigation, 5 visualizations) | PR 2 | Depends on PR 1; core interactive features |
| 3 | Teacher dashboard + Visit tracking + Polish | PR 3 | Depends on PR 2; analytics and theory sections |

## Phase 1: Foundation & Infrastructure

- [x] 1.1 Create Next.js 14.2 project with `src/` structure, TypeScript, Tailwind CSS
  - Files: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.js`, `.env.local`
  - Acceptance: `npm run dev` starts without errors

- [x] 1.2 Initialize shadcn/ui with base-nova theme and install required components
  - Files: `components.json`, `src/components/ui/*.tsx` (button, input, select, card, dialog)
  - Acceptance: Components render with cyan-400/slate-950 palette

- [x] 1.3 Create Supabase migration 0001: profiles table with user_role enum
  - Files: `supabase/migrations/0001_create_profiles.sql`
  - Acceptance: Table created with columns: id, role, nombre, apellido, legajo, carrera, comision, created_at

- [x] 1.4 Create Supabase migration 0002: page_visits table with indexes
  - Files: `supabase/migrations/0002_create_page_visits.sql`
  - Acceptance: Table created with indexes on (carrera, comision) and (visited_at desc)

- [x] 1.5 Create Supabase migration 0003: RLS policies for profiles and page_visits
  - Files: `supabase/migrations/0003_enable_rls.sql`
  - Acceptance: alumno reads only own profile; profesor reads all profiles and visits

- [x] 1.6 Create Supabase migration 0004: trigger to auto-create profile on auth.users insert
  - Files: `supabase/migrations/0004_create_profile_trigger.sql`
  - Acceptance: Registering user creates profile row with metadata

- [x] 1.7 Define TypeScript types for Profile, PageVisit, User, Role
  - Files: `src/types/index.ts`
  - Acceptance: Types match database schema; exported and reusable

- [x] 1.8 Create hardcoded catalogs for carreras and comisiones
  - Files: `src/lib/catalogs/carreras.ts`, `src/lib/catalogs/comisiones.ts`
  - Acceptance: Arrays exported as const with typed values

- [x] 1.9 Create EXERCISES registry with 5 module definitions
  - Files: `src/constants/exercises.ts`
  - Acceptance: Array of {slug, title, description, icon} for doble-rendija, pelicula-delgada, difraccion, polarizacion, espectro

## Phase 2: Authentication System

- [x] 2.1 Create Supabase client utilities (browser, server, middleware)
  - Files: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/lib/supabase/middleware.ts`
  - Acceptance: Clients initialize with env vars; middleware refreshes session

- [x] 2.2 Create Next.js middleware to refresh Supabase session on every request
  - Files: `src/middleware.ts`
  - Acceptance: Authenticated routes receive valid session

- [x] 2.3 Create useUser hook to fetch current profile from Supabase
  - Files: `src/hooks/useUser.tsx`
  - Acceptance: Returns {user, profile, loading, error}; caches profile data

- [x] 2.4 Create AcademicSelect component for carrera and comision dropdowns
  - Files: `src/components/auth/AcademicSelect.tsx`
  - Acceptance: Renders <select> elements populated from catalogs; validates selection

- [x] 2.5 Create RoleSelect component for alumno/profesor selection
  - Files: `src/components/auth/RoleSelect.tsx`
  - Acceptance: Renders radio buttons or select with two options; shows invitation code field when profesor selected

- [x] 2.6 Create RegistrationForm with Zod validation and invitation code logic
  - Files: `src/components/auth/RegistrationForm.tsx`
  - Acceptance: Validates all fields; when role=profesor, requires invitation code; calls supabase.auth.signUp with metadata

- [x] 2.7 Create LoginForm with email/password and role-based redirection
  - Files: `src/components/auth/LoginForm.tsx`
  - Acceptance: Authenticates user; redirects alumno to /ejercicios, profesor to /dashboard

- [x] 2.8 Create login page with glassmorphism background glow
  - Files: `src/app/(auth)/login/page.tsx`
  - Acceptance: Page renders LoginForm; branded background with slate-950/cyan-400

- [x] 2.9 Create register page with academic form
  - Files: `src/app/(auth)/register/page.tsx`
  - Acceptance: Page renders RegistrationForm; includes all academic fields

- [x] 2.10 Create invitation code validation utility
  - Files: `src/lib/auth/validateInvitation.ts`
  - Acceptance: Validates code against env variable INVITATION_CODE; returns boolean

## Phase 3: Application Shell

- [x] 3.1 Create NavContent component with semantic navigation items
  - Files: `src/components/layout/NavContent.tsx`
  - Acceptance: Renders NavItem links for ejercicios, teoria, dashboard (profesor only); active state with cyan-400

- [x] 3.2 Create NavItem component with active/inactive states
  - Files: `src/components/layout/NavItem.tsx`
  - Acceptance: Link with icon; border-l-4 border-cyan-400 when active; slate-400 when inactive

- [x] 3.3 Create UserFooter component showing user name, role, and logout button
  - Files: `src/components/layout/UserFooter.tsx`
  - Acceptance: Displays nombre + apellido; role badge; calls supabase.auth.signOut

- [x] 3.4 Create DesktopSidebar component for viewports ≥ md
  - Files: `src/components/layout/DesktopSidebar.tsx`
  - Acceptance: Fixed left sidebar with brand chip, NavContent, UserFooter; slate-900/50 backdrop-blur

- [x] 3.5 Create MobileDrawer component for viewports < md
  - Files: `src/components/layout/MobileDrawer.tsx`
  - Acceptance: Slide-over drawer with onClose; hamburger button in header; closes on nav click

- [x] 3.6 Create AppShell layout wrapper
  - Files: `src/app/(app)/layout.tsx`
  - Acceptance: Renders DesktopSidebar + MobileDrawer + children; responsive breakpoint at md

- [x] 3.7 Create root layout with viewport and background
  - Files: `src/app/layout.tsx`
  - Acceptance: Sets slate-950 background; includes metadata; wraps children

## Phase 4: Exercise Engine

- [x] 4.1 Create ExerciseModule container component
  - Files: `src/components/exercise/ExerciseModule.tsx`
  - Acceptance: Receives exercise config; renders VisualizationCanvas, ParameterControl[], TheoryPanel, ResultsPanel

- [x] 4.2 Create ParameterControl with dual slider + numeric input
  - Files: `src/components/exercise/ParameterControl.tsx`
  - Acceptance: Slider and input synchronized; shows min/max/current; debounced onChange

- [x] 4.3 Create ResultsPanel for real-time computed values
  - Files: `src/components/exercise/ResultsPanel.tsx`
  - Acceptance: Displays values with SI units; scientific notation for small/large numbers

- [x] 4.4 Create TheoryPanel with collapsible KaTeX formulas
  - Files: `src/components/exercise/TheoryPanel.tsx`
  - Acceptance: Collapsible section; renders LaTeX formulas; includes pedagogical context

- [x] 4.5 Create useDebouncedParam hook for slider input
  - Files: `src/hooks/useDebouncedParam.ts`
  - Acceptance: Debounces value changes by 100ms; prevents excessive re-renders

- [x] 4.6 Create physics utility: wavelength to RGB color conversion
  - Files: `src/lib/physics/wavelengthToColor.ts`
  - Acceptance: λ=550nm → green; λ=400nm → violet; λ=700nm → red

- [x] 4.7 Create DobleRendija visualization (SVG slits + Canvas waves)
  - Files: `src/components/exercise/exercises/DobleRendija.tsx`
  - Acceptance: Shows two slits, propagating waves, interference fringes; parameters: λ, slit distance, screen distance

- [x] 4.8 Create PeliculaDelgada visualization (SVG layers + rays)
  - Files: `src/components/exercise/exercises/PeliculaDelgada.tsx`
  - Acceptance: Shows film layers, reflected/refracted rays, path difference highlights; parameters: λ, film thickness, refractive index

- [x] 4.9 Create Difraccion visualization (SVG sinc² plot)
  - Files: `src/components/exercise/exercises/Difraccion.tsx`
  - Acceptance: Shows single-slit diffraction pattern; parameters: λ, slit width

- [x] 4.10 Create Polarizacion visualization (Canvas E-field + Malus gauge)
  - Files: `src/components/exercise/exercises/Polarizacion.tsx`
  - Acceptance: Shows E-field oscillation, polarizer angle, Malus law gauge; parameters: θ, initial intensity

- [x] 4.11 Create Espectro visualization (Canvas λ→RGB + Recharts I vs λ)
  - Files: `src/components/exercise/exercises/Espectro.tsx`
  - Acceptance: Shows wavelength-to-color conversion, intensity spectrum chart; parameters: λ range, intensity

- [x] 4.12 Create ejercicios listing page with 5 module cards
  - Files: `src/app/(app)/ejercicios/page.tsx`
  - Acceptance: Renders cards for each exercise from EXERCISES registry; links to /ejercicios/[slug]

- [x] 4.13 Create dynamic exercise page [slug]
  - Files: `src/app/(app)/ejercicios/[slug]/page.tsx`
  - Acceptance: Loads exercise config by slug; renders ExerciseModule; 404 if slug not found

## Phase 5: Teacher Dashboard

- [x] 5.1 Create StudentFilter component with carrera and comision controls
  - Files: `src/components/dashboard/StudentFilter.tsx`
  - Acceptance: Two dropdowns populated from catalogs; onChange updates parent state

- [x] 5.2 Create StudentTable component with paginated student list
  - Files: `src/components/dashboard/StudentTable.tsx`
  - Acceptance: Displays nombre, apellido, legajo, carrera, comision; pagination controls

- [x] 5.3 Create VisitsChart component with Recharts bar/line chart
  - Files: `src/components/dashboard/VisitsChart.tsx`
  - Acceptance: Aggregates page_visits by carrera/comision; renders bar or line chart

- [x] 5.4 Create TeacherDashboard container with role guard
  - Files: `src/components/dashboard/TeacherDashboard.tsx`
  - Acceptance: Checks role=profesor; redirects alumno to /ejercicios; fetches students and visits

- [x] 5.5 Create dashboard page
  - Files: `src/app/(app)/dashboard/page.tsx`
  - Acceptance: Renders TeacherDashboard; only accessible to profesores

## Phase 6: Visit Tracking & Theory

- [x] 5.6 Create POST /api/visits route to insert page_visits
  - Files: `src/app/api/visits/route.ts`
  - Acceptance: Accepts {page_path}; inserts row with user_id, carrera, comision from session

- [x] 5.7 Create useVisit hook to fire-and-forget POST on mount
  - Files: `src/hooks/useVisit.ts`
  - Acceptance: Calls POST /api/visits in useEffect; non-blocking; logs errors only

- [x] 5.8 Integrate useVisit into ExerciseModule
  - Files: `src/components/exercise/ExerciseModule.tsx`
  - Acceptance: Records visit when module loads; includes page_path

- [x] 5.9 Create VisitCounter component (optional display)
  - Files: `src/components/exercise/VisitCounter.tsx`
  - Acceptance: Shows visit count for current module; fetches from Supabase

- [x] 5.10 Create KaTeX rendering utility
  - Files: `src/lib/katex/render.tsx`
  - Acceptance: Formula component wraps react-katex; handles SSR

- [x] 5.11 Add theory content to each exercise (formulas, derivations, context)
  - Files: `src/components/exercise/exercises/*.tsx` (update each)
  - Acceptance: Each exercise has TheoryPanel with LaTeX formulas and pedagogical context

## Phase 7: Cleanup & Verification

- [x] 6.1 Add README with setup instructions (Supabase env vars, migrations)
  - Files: `README.md`
  - Acceptance: Documents .env.local setup, migration steps, dev server start

- [x] 6.2 Create seed SQL for first profesor user
  - Files: `supabase/seed.sql`
  - Acceptance: Inserts profesor user via SQL (bypasses self-registration restriction)

- [ ] 6.3 Verify RLS policies with manual tests
  - Acceptance: Alumno queries foreign profile → 0 rows; profesor queries all → all rows returned

- [ ] 6.4 Smoke test all spec scenarios
  - Acceptance: All scenarios from specs pass (registration, login, navigation, exercises, dashboard, visits)

- [ ] 6.5 Test responsive layout on mobile viewport
  - Acceptance: MobileDrawer opens/closes correctly; canvas remains interactive after drawer close

- [ ] 6.6 Verify physics visualizations render realistically
  - Acceptance: Each exercise shows physically accurate patterns (fringes, rays, spectra), not basic shapes
