# Design: Simulador Físico Universitario (simulador-definitivo)

## Technical Approach

Next.js 14.2 App Router, route groups `(auth)` + `(app)`. Server Components default; Client for interactive modules. Supabase Auth + Postgres trigger materializes `profiles`. Visits = fire-and-forget POST from `useEffect`. SVG for parametric patterns, Canvas for animated waves. Fused: Deepseek (login, NavContent, UserFooter), Kimi (active states), Mimo (drawer, glassmorphism, brand chip), Minimax (slider+input, theory, results).

## Architecture Decisions

| # | Decision | Choice | Rationale |
|---|---|---|---|
| 1 | Layout | `src/` | Cleaner imports. |
| 2 | Routing | Dynamic `[slug]` + `EXERCISES` registry | One `ExerciseModule` drives all 5 modules. |
| 3 | State | `useState`/`useReducer` + hooks | Local state; Supabase SDK has its cache. |
| 4 | Visuals | SVG (parametric) + Canvas (animated) | SVG = crisp fringes; Canvas = 60fps. |
| 5 | Math | `react-katex` | SSR, no MDX. |
| 6 | Forms | Native + Zod | ≤10 fields; RHF overkill. |
| 7 | Visits | `useEffect` → POST `/api/visits` | Explicit, non-blocking. |
| 8 | Catalogs | `src/lib/catalogs/*.ts` `as const` | No admin panel; typed arrays. |

## Data Flow

`Auth → trigger creates profile → middleware refreshes session → layout reads profile → AppShell → page mount → POST /api/visits. Slider → setState → useCallback → re-render. RLS: alumno=own, profesor=all.`

## File Changes (greenfield)

| Path | Purpose |
|---|---|
| `src/app/layout.tsx`, `src/middleware.ts` | Root + session refresh |
| `src/app/(auth)/{login,register}/page.tsx` | Auth screens |
| `src/app/(app)/layout.tsx`, `ejercicios/{page,[slug]/page}.tsx`, `dashboard/page.tsx` | Shell + module routes + teacher |
| `src/app/api/visits/route.ts` | POST inserts `page_visits` |
| `src/components/{layout,auth,exercise,dashboard}/*.tsx` | UI tree (6+4+6+4 files; 5 sim components) |
| `src/components/exercise/exercises/*.tsx` | DobleRendija, PeliculaDelgada, Difraccion, Polarizacion, Espectro |
| `src/lib/supabase/{client,server,middleware}.ts` | Supabase clients |
| `src/lib/catalogs/*.ts`, `src/lib/physics/*.ts`, `src/lib/katex/render.tsx` | Catalogs, math, `<Formula/>` |
| `src/hooks/{useUser,useVisit,useDebouncedParam}.tsx` | Custom hooks |
| `src/types/*.ts`, `src/constants/exercises.ts` | Types + `EXERCISES` registry |
| `supabase/migrations/000{1..4}_*.sql` | Schema + RLS + trigger |
| `tailwind.config.ts`, `components.json`, `.env.local` | shadcn/ui + env |

## Component Hierarchy

```
RootLayout
├─ (auth)/login → LoginForm
├─ (auth)/register → RegistrationForm → AcademicSelect, RoleSelect
└─ (app)/layout (AppShell)
   ├─ DesktopSidebar (≥md) / MobileDrawer (<md) → NavContent → NavItem[], UserFooter
   └─ children
      ├─ ejercicios/page → 5 module cards
      ├─ ejercicios/[slug] → ExerciseModule → VisualizationCanvas, ParameterControl[], TheoryPanel, ResultsPanel, PedagogicalContext, VisitCounter
      └─ dashboard → TeacherDashboard → StudentFilter, StudentTable, VisitsChart
```

## Supabase Schema

```sql
-- 0001 profiles
create type user_role as enum ('alumno','profesor');
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'alumno',
  nombre text not null, apellido text not null, legajo text not null unique,
  carrera text not null, comision text not null,
  created_at timestamptz not null default now());

-- 0002 page_visits
create table public.page_visits (
  id uuid primary key default gen_random_uuid(),
  page_path text not null,
  user_id uuid references public.profiles(id) on delete set null,
  visited_at timestamptz not null default now(),
  carrera text, comision text);
create index on public.page_visits (carrera, comision);
create index on public.page_visits (visited_at desc);

-- 0003 RLS
alter table public.profiles    enable row level security;
alter table public.page_visits enable row level security;
create policy "own profile"   on public.profiles for select using (auth.uid()=id);
create policy "profesor read" on public.profiles for select using
  (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='profesor'));
create policy "insert visit"  on public.page_visits for insert with check (auth.uid()=user_id);
create policy "profesor read" on public.page_visits for select using
  (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='profesor'));

-- 0004 trigger
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(id,role,nombre,apellido,legajo,carrera,comision)
  values (new.id,
    (new.raw_user_meta_data->>'role')::user_role,
    new.raw_user_meta_data->>'nombre', new.raw_user_meta_data->>'apellido',
    new.raw_user_meta_data->>'legajo',
    new.raw_user_meta_data->>'carrera', new.raw_user_meta_data->>'comision');
  return new; end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();
```

## Visualization Strategy

| Module | Render | Why |
|---|---|---|
| Doble rendija | SVG (slits+fringes) + Canvas (waves) | Static + animated |
| Película delgada | SVG (layers, rays, path-diff) | Pure geometry |
| Difracción | SVG (sinc² vs x) | 1D plot |
| Polarización | Canvas (E-field + Malus gauge) | Continuous animation |
| Espectro | Canvas (λ→RGB) + Recharts (I vs λ) | Color + plot |

## Testing Strategy

- **Unit**: `lib/physics/*` — Vitest later; now Node script asserts golden values (λ=550nm→green).
- **Integration**: RLS via Supabase local emulator: alumno cross-read → 0 rows; profesor → all.
- **Smoke**: Manual checklist mapped 1:1 to spec `#### Scenario` blocks.
- **E2E**: Playwright (v1 deferred).

## Rollout

No data migration. First `profesor` via SQL seed since self-registration grants `alumno`. No feature flags.

## Open Questions

- Self-registration as `profesor`: allowed or invite-only? Spec silent — design permits both, seed SQL for the first one.
- Visit dedup: per-mount (current) vs per-session? Reassess if dashboard shows noise.
