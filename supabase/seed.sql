-- Seed data for the university physics simulator.
-- Run this after applying migrations to create the first profesor,
-- sample students, and a few demo visits.
--
-- IMPORTANT: This script cleans existing seed data before inserting.
-- Safe to run multiple times.

-- Make sure pgcrypto is available for password hashing.
create extension if not exists pgcrypto;

-- -----------------------------------------------------------------------------
-- Cleanup existing seed data
-- -----------------------------------------------------------------------------
delete from public.page_visits 
where user_id in (
  '22222222-2222-2222-2222-222222222222'::uuid,
  '33333333-3333-3333-3333-333333333333'::uuid,
  '44444444-4444-4444-4444-444444444444'::uuid,
  '55555555-5555-5555-5555-555555555555'::uuid
);

delete from public.profiles 
where id in (
  '11111111-1111-1111-1111-111111111111'::uuid,
  '22222222-2222-2222-2222-222222222222'::uuid,
  '33333333-3333-3333-3333-333333333333'::uuid,
  '44444444-4444-4444-4444-444444444444'::uuid,
  '55555555-5555-5555-5555-555555555555'::uuid
);

delete from auth.users 
where id in (
  '11111111-1111-1111-1111-111111111111'::uuid,
  '22222222-2222-2222-2222-222222222222'::uuid,
  '33333333-3333-3333-3333-333333333333'::uuid,
  '44444444-4444-4444-4444-444444444444'::uuid,
  '55555555-5555-5555-5555-555555555555'::uuid
);

-- -----------------------------------------------------------------------------
-- Sample users
-- -----------------------------------------------------------------------------

-- Profesor (solo nombre, apellido, email — sin legajo/carrera/comisión)
insert into auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data
) values (
  '11111111-1111-1111-1111-111111111111'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'authenticated',
  'authenticated',
  'profesor@example.com',
  crypt('password123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"role":"profesor","nombre":"Mario","apellido":"Cleva"}'::jsonb
);

-- Alumnos (con legajo, carrera y comisión)
insert into auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data
) values
  (
    '22222222-2222-2222-2222-222222222222'::uuid,
    '00000000-0000-0000-0000-000000000000'::uuid,
    'authenticated',
    'authenticated',
    'alumno1@example.com',
    crypt('password123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"role":"alumno","nombre":"Ana","apellido":"Martínez","legajo":"A0001","carrera":"Ingeniería en Sistemas","comision":"1K1"}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333333'::uuid,
    '00000000-0000-0000-0000-000000000000'::uuid,
    'authenticated',
    'authenticated',
    'alumno2@example.com',
    crypt('password123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"role":"alumno","nombre":"Bruno","apellido":"López","legajo":"A0002","carrera":"Ingeniería Electromecánica","comision":"1K2"}'::jsonb
  ),
  (
    '44444444-4444-4444-4444-444444444444'::uuid,
    '00000000-0000-0000-0000-000000000000'::uuid,
    'authenticated',
    'authenticated',
    'alumno3@example.com',
    crypt('password123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"role":"alumno","nombre":"Cecilia","apellido":"Fernández","legajo":"A0003","carrera":"Ingeniería Química","comision":"2K1"}'::jsonb
  ),
  (
    '55555555-5555-5555-5555-555555555555'::uuid,
    '00000000-0000-0000-0000-000000000000'::uuid,
    'authenticated',
    'authenticated',
    'alumno4@example.com',
    crypt('password123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"role":"alumno","nombre":"Diego","apellido":"Rodríguez","legajo":"A0004","carrera":"Ingeniería Química","comision":"1K3"}'::jsonb
  );

-- -----------------------------------------------------------------------------
-- Sample page visits for dashboard demos
-- -----------------------------------------------------------------------------

insert into public.page_visits (page_path, user_id, carrera, comision)
values
  ('/ejercicios/doble-rendija', '22222222-2222-2222-2222-222222222222'::uuid, 'Ingeniería en Sistemas', '1K1'),
  ('/ejercicios/pelicula-delgada', '22222222-2222-2222-2222-222222222222'::uuid, 'Ingeniería en Sistemas', '1K1'),
  ('/ejercicios/doble-rendija', '33333333-3333-3333-3333-333333333333'::uuid, 'Ingeniería Electromecánica', '1K2'),
  ('/ejercicios/polarizacion', '33333333-3333-3333-3333-333333333333'::uuid, 'Ingeniería Electromecánica', '1K2'),
  ('/ejercicios/espectro', '33333333-3333-3333-3333-333333333333'::uuid, 'Ingeniería Electromecánica', '1K2'),
  ('/ejercicios/difraccion', '44444444-4444-4444-4444-444444444444'::uuid, 'Ingeniería Química', '2K1'),
  ('/ejercicios/doble-rendija', '55555555-5555-5555-5555-555555555555'::uuid, 'Ingeniería Química', '1K3'),
  ('/ejercicios/teoria', '55555555-5555-5555-5555-555555555555'::uuid, 'Ingeniería Química', '1K3');
