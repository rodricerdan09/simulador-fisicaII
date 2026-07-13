create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    role,
    nombre,
    apellido,
    legajo,
    carrera,
    comision
  )
  values (
    new.id,
    (new.raw_user_meta_data->>'role')::user_role,
    new.raw_user_meta_data->>'nombre',
    new.raw_user_meta_data->>'apellido',
    -- Solo insertar campos académicos si es alumno
    case when (new.raw_user_meta_data->>'role') = 'alumno' 
         then new.raw_user_meta_data->>'legajo' 
         else null end,
    case when (new.raw_user_meta_data->>'role') = 'alumno' 
         then new.raw_user_meta_data->>'carrera' 
         else null end,
    case when (new.raw_user_meta_data->>'role') = 'alumno' 
         then new.raw_user_meta_data->>'comision' 
         else null end
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
