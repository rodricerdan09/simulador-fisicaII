alter table public.profiles enable row level security;
alter table public.page_visits enable row level security;

-- Profiles: users can read their own profile.
create policy "own profile" on public.profiles
  for select using (auth.uid() = id);

-- Profiles: teachers can read all profiles.
create policy "profesor read profiles" on public.profiles
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'profesor')
  );

-- Page visits: authenticated users can insert their own visits.
create policy "insert own visit" on public.page_visits
  for insert with check (auth.uid() = user_id);

-- Page visits: teachers can read all visits.
create policy "profesor read visits" on public.page_visits
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'profesor')
  );
