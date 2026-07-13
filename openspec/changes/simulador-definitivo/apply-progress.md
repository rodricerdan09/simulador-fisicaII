# Apply Progress: simulador-definitivo / PR 1 (Foundation + Auth)

## Status

- **Overall**: PR 1 completed successfully
- **Build**: `npm run build` passes
- **Type check**: `npx tsc --noEmit` passes
- **Remaining work**: PR 2 (AppShell + Exercises), PR 3 (Dashboard + Visits)

## Completed Tasks

### Phase 1: Foundation & Infrastructure

- [x] 1.1 Next.js 14.2 project scaffold with TypeScript, Tailwind CSS, src/ structure
- [x] 1.2 shadcn/ui base-nova style initialized; Button, Input, Label, Select, Card, Dialog components
- [x] 1.3 Migration 0001: profiles table + user_role enum
- [x] 1.4 Migration 0002: page_visits table + indexes
- [x] 1.5 Migration 0003: RLS policies (alumno=own, profesor=all)
- [x] 1.6 Migration 0004: handle_new_user trigger
- [x] 1.7 TypeScript types: Profile, PageVisit, User, Role, Exercise
- [x] 1.8 Hardcoded catalogs: carreras, comisiones
- [x] 1.9 EXERCISES registry with 5 modules

### Phase 2: Authentication System

- [x] 2.1 Supabase clients: browser, server, middleware
- [x] 2.2 Next.js middleware session refresh
- [x] 2.3 useUser hook with profile caching
- [x] 2.4 AcademicSelect component
- [x] 2.5 RoleSelect component
- [x] 2.6 RegistrationForm with Zod + invitation code
- [x] 2.7 LoginForm with email/password, Google OAuth, mode toggle, role-based redirect
- [x] 2.8 Login page with glassmorphism glow
- [x] 2.9 Register page with academic form
- [x] 2.10 Invitation code validation utility

## Artifacts Created

- `.env.local.example`
- `.gitignore`
- `components.json`
- `next-env.d.ts`
- `next.config.mjs`
- `package.json`
- `postcss.config.mjs`
- `tailwind.config.ts`
- `tsconfig.json`
- `openspec/changes/simulador-definitivo/tasks.md` (updated)
- `openspec/changes/simulador-definitivo/apply-progress.md` (this file)
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/(app)/dashboard/page.tsx` (placeholder)
- `src/app/(app)/ejercicios/page.tsx` (placeholder)
- `src/app/(auth)/auth/callback/route.ts`
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/register/page.tsx`
- `src/components/auth/AcademicSelect.tsx`
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/RegistrationForm.tsx`
- `src/components/auth/RoleSelect.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/label.tsx`
- `src/components/ui/select.tsx`
- `src/constants/exercises.ts`
- `src/hooks/useUser.tsx`
- `src/lib/auth/validateInvitation.ts`
- `src/lib/catalogs/carreras.ts`
- `src/lib/catalogs/comisiones.ts`
- `src/lib/supabase/client.ts`
- `src/lib/supabase/middleware.ts`
- `src/lib/supabase/server.ts`
- `src/lib/utils.ts`
- `src/middleware.ts`
- `src/types/index.ts`
- `supabase/migrations/0001_profiles.sql`
- `supabase/migrations/0002_page_visits.sql`
- `supabase/migrations/0003_rls.sql`
- `supabase/migrations/0004_trigger.sql`

## Known Risks / Notes

- Build emits a warning about `process.version` in Edge Runtime from `@supabase/supabase-js` imported by middleware. This is a known warning with `@supabase/ssr` and does not break the build, but should be monitored in PR 2/3.
- OAuth `redirectTo` uses `window.location.origin` on the client and `/auth/callback` route on the server.
- Placeholder pages exist for `/ejercicios` and `/dashboard` so redirects after login/register resolve without 404.
- No test runner is configured; verification was done via `tsc` and `next build`.

## PR 2: AppShell + Exercise Engine

### Status

- **Overall**: PR 2 completed successfully
- **Build**: `npm run build` passes
- **Type check**: `npx tsc --noEmit` passes
- **Remaining work**: PR 3 (Dashboard + Visits + Polish)

### Completed Tasks

#### Phase 3: Application Shell

- [x] 3.1 NavContent component with semantic navigation items
- [x] 3.2 NavItem component with active/inactive states
- [x] 3.3 UserFooter component (Avatar + name/role + logout)
- [x] 3.4 DesktopSidebar component (fixed aside ≥md, w-64)
- [x] 3.5 MobileDrawer component (hamburger + slide-out drawer <md)
- [x] 3.6 AppShell layout wrapper (`src/app/(app)/layout.tsx`)
- [x] 3.7 Root layout with viewport and background

#### Phase 4: Exercise Engine

- [x] 4.1 ExerciseModule container component
- [x] 4.2 ParameterControl (dual slider + numeric input)
- [x] 4.3 ResultsPanel (real-time values with SI units / scientific notation)
- [x] 4.4 TheoryPanel (collapsible KaTeX formulas)
- [x] 4.5 useDebouncedParam hook
- [x] 4.6 Wavelength-to-RGB physics utility
- [x] 4.7 DobleRendija visualization (SVG)
- [x] 4.8 PeliculaDelgada visualization (SVG)
- [x] 4.9 Difraccion visualization (SVG)
- [x] 4.10 Polarizacion visualization (Canvas animation)
- [x] 4.11 Espectro visualization (Canvas + Recharts)
- [x] 4.12 `ejercicios/page.tsx` listing with 5 module cards
- [x] 4.13 `ejercicios/[slug]/page.tsx` dynamic route with 404 guard

### Artifacts Created in PR 2

- `src/app/(app)/layout.tsx`
- `src/app/(app)/ejercicios/page.tsx`
- `src/app/(app)/ejercicios/[slug]/page.tsx`
- `src/components/layout/BrandChip.tsx`
- `src/components/layout/DesktopSidebar.tsx`
- `src/components/layout/MobileDrawer.tsx`
- `src/components/layout/NavContent.tsx`
- `src/components/layout/NavItem.tsx`
- `src/components/layout/UserFooter.tsx`
- `src/components/exercise/ExerciseModule.tsx`
- `src/components/exercise/ParameterControl.tsx`
- `src/components/exercise/ResultsPanel.tsx`
- `src/components/exercise/TheoryPanel.tsx`
- `src/components/exercise/VisualizationCanvas.tsx`
- `src/components/exercise/exercises/DobleRendija.tsx`
- `src/components/exercise/exercises/DobleRendijaPage.tsx`
- `src/components/exercise/exercises/PeliculaDelgada.tsx`
- `src/components/exercise/exercises/PeliculaDelgadaPage.tsx`
- `src/components/exercise/exercises/Difraccion.tsx`
- `src/components/exercise/exercises/DifraccionPage.tsx`
- `src/components/exercise/exercises/Polarizacion.tsx`
- `src/components/exercise/exercises/PolarizacionPage.tsx`
- `src/components/exercise/exercises/Espectro.tsx`
- `src/components/exercise/exercises/EspectroPage.tsx`
- `src/components/ui/avatar.tsx`
- `src/components/ui/sheet.tsx`
- `src/hooks/useDebouncedParam.ts`
- `src/lib/katex/render.tsx`
- `src/lib/physics/wavelengthToColor.ts`
- `src/app/globals.css` (updated to import KaTeX CSS)

### Known Risks / Notes

- `@radix-ui/react-avatar` was installed to support the shadcn/ui Avatar component.
- The `process.version` Edge Runtime warning from `@supabase/supabase-js` remains but does not break the build.
- `/teoria` route exists in navigation but the page itself is out of scope for PR 2; it will be implemented/polished in PR 3.
- Visit tracking (`useVisit`, `/api/visits`, `VisitCounter`) is intentionally deferred to PR 3 as specified in the task breakdown.

## PR 3: Dashboard + Visits + Polish

### Status

- **Overall**: PR 3 implementation completed
- **Build**: `npm run build` passes
- **Type check**: `npx tsc --noEmit` passes
- **Remaining work**: manual RLS verification and responsive smoke tests (Phase 7 verification tasks)

### Completed Tasks

#### Phase 5: Teacher Dashboard

- [x] 5.1 StudentFilter component with carrera and comision controls
- [x] 5.2 StudentTable component with paginated student list
- [x] 5.3 VisitsChart component with Recharts bar chart
- [x] 5.4 TeacherDashboard container with role guard (redirects alumnos to /ejercicios)
- [x] 5.5 Dashboard page renders TeacherDashboard

#### Phase 6: Visit Tracking & Theory

- [x] 5.6 POST `/api/visits` route inserts page_visits with user_id, carrera, comision
- [x] 5.7 `useVisit` hook fire-and-forget POST on mount
- [x] 5.8 `useVisit` integrated into ExerciseModule
- [x] 5.9 VisitCounter component fetches and displays per-page visit count
- [x] 5.10 KaTeX rendering utility (`src/lib/katex/render.tsx`) already available
- [x] 5.11 Theory content present in each exercise page; `/teoria` general page added

#### Phase 7: Cleanup & Polish (partial)

- [x] 6.1 README with setup instructions, stack, scripts, screenshots placeholder
- [x] 6.2 `supabase/seed.sql` with sample profesor, alumnos, and demo visits
- [ ] 6.3 RLS manual verification pending
- [ ] 6.4 Smoke test of all spec scenarios pending
- [ ] 6.5 Responsive mobile layout smoke test pending
- [ ] 6.6 Physics visualizations realism verification pending

### Artifacts Created in PR 3

- `src/app/api/visits/route.ts`
- `src/app/(app)/dashboard/page.tsx` (updated)
- `src/app/(app)/teoria/page.tsx`
- `src/components/dashboard/StudentFilter.tsx`
- `src/components/dashboard/StudentTable.tsx`
- `src/components/dashboard/VisitsChart.tsx`
- `src/components/dashboard/TeacherDashboard.tsx`
- `src/components/exercise/VisitCounter.tsx`
- `src/components/exercise/ExerciseModule.tsx` (updated)
- `src/components/teoria/VideoEmbed.tsx`
- `src/hooks/useVisit.ts`
- `supabase/migrations/0005_visit_counts_view.sql`
- `supabase/seed.sql`
- `README.md`
- `.env.local.example` (updated)

### Known Risks / Notes

- Added `page_visit_counts` view (migration 0005) so the public visit counter does
  not expose individual user data. The view bypasses RLS for aggregate counts
  because it is owned by postgres; verify grants after applying migrations.
- Visit recording is fire-and-forget via `useVisit`; failures are logged to the
  console and never block rendering.
- `TeacherDashboard` performs a client-side role guard and redirect; the page is
  still reachable by an unauthenticated user briefly while `useUser` loads, but
  the middleware/session refresh already protects authenticated routes.
- The `seed.sql` file inserts directly into `auth.users`; ensure it is only run
  in development/staging environments.

## Next Recommended

- Run the verification phase:
  - Manual RLS checks (alumno cannot read foreign profiles; profesor reads all)
  - Smoke test login/register flows, navigation, each exercise, dashboard filters/chart, and visit recording
  - Mobile responsive check (open/close MobileDrawer, canvas interactivity)
- After verification, archive the SDD change.
