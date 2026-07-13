create type user_role as enum ('alumno', 'profesor');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'alumno',
  nombre text not null,
  apellido text not null,
  legajo text,                          -- NULL para profesores
  carrera text,                         -- NULL para profesores
  comision text,                        -- NULL para profesores
  created_at timestamptz not null default now()
);

comment on table public.profiles is 'Perfiles de usuario extendidos con datos académicos.';
