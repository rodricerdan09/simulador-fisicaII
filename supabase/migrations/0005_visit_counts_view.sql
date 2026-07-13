-- Public aggregate view for page visit counters.
-- The underlying page_visits table has RLS enabled; this view is owned by
-- postgres and only exposes per-path counts so students can see popularity
-- without accessing individual visit rows.

create or replace view public.page_visit_counts as
select
  page_path,
  count(*)::bigint as visit_count
from public.page_visits
group by page_path;

grant select on public.page_visit_counts to authenticated, anon;
