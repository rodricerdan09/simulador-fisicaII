create table public.page_visits (
  id uuid primary key default gen_random_uuid(),
  page_path text not null,
  user_id uuid references public.profiles(id) on delete set null,
  visited_at timestamptz not null default now(),
  carrera text,
  comision text
);

create index idx_page_visits_carrera_comision on public.page_visits (carrera, comision);
create index idx_page_visits_visited_at_desc on public.page_visits (visited_at desc);

comment on table public.page_visits is 'Registro de visitas a páginas desnormalizado con carrera y comisión.';
