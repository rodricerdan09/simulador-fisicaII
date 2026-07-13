# user-auth-academic Specification

## Purpose

Define academic authentication: Supabase Auth registration/login, extended profiles with academic fields, hardcoded catalogs, and role-based access control.

## Data Model

### Table: `profiles`

| Column | Type | Constraints |
|---|---|---|
| id | uuid | PK, FK `auth.users(id)` |
| role | text | `'alumno' \| 'profesor'` |
| nombre | text | NOT NULL |
| apellido | text | NOT NULL |
| legajo | text | NOT NULL, unique |
| carrera | text | NOT NULL, hardcoded catalog |
| comision | text | NOT NULL, hardcoded catalog |
| created_at | timestamptz | default `now()` |

### Table: `page_visits`

| Column | Type | Constraints |
|---|---|---|
| id | uuid | PK |
| page_path | text | NOT NULL |
| user_id | uuid | FK `profiles(id)` |
| visited_at | timestamptz | default `now()` |
| carrera | text | denormalized from profile |
| comision | text | denormalized from profile |

### Trigger

A database trigger on `auth.users` insert MUST create one `profiles` row using registration metadata.

## UI Components

| Component | Responsibility |
|---|---|
| `RegistrationForm` | Collect email, password, nombre, apellido, legajo, carrera, comision, role |
| `LoginForm` | Collect email and password |
| `AcademicSelect` | Render hardcoded `carrera` and `comision` options |
| `RoleSelect` | Render `alumno` / `profesor` options |

## Requirements

### Requirement: Registration with academic fields

The system MUST provide a registration form collecting email, password, nombre, apellido, legajo, carrera, comision, and role.

#### Scenario: Student registers successfully

- GIVEN a visitor selects role `alumno` and fills valid academic data
- WHEN they submit the registration form
- THEN a Supabase Auth user is created AND a profile row with role `alumno` is inserted

#### Scenario: Teacher registers successfully

- GIVEN a visitor selects role `profesor` and fills valid data
- WHEN they submit the registration form
- THEN a Supabase Auth user is created AND a profile row with role `profesor` is inserted

### Requirement: Hardcoded academic catalogs

The system MUST use hardcoded lists for `carrera` and `comision`; no admin panel SHALL manage them.

#### Scenario: Catalogs render in selects

- GIVEN the registration form is displayed
- THEN `carrera` and `comision` inputs are `<select>` elements populated from code-defined arrays

### Requirement: Role-based redirection

The system MUST redirect authenticated users based on role after login or registration.

#### Scenario: Alumno signs in

- GIVEN an authenticated user with role `alumno`
- WHEN they complete login
- THEN they are redirected to the exercises view

#### Scenario: Profesor signs in

- GIVEN an authenticated user with role `profesor`
- WHEN they complete login
- THEN they are redirected to the teacher dashboard

### Requirement: Row Level Security for profiles

The system MUST enforce RLS so an `alumno` reads only their own profile and a `profesor` reads all profiles and all visits.

#### Scenario: Alumno reads foreign profile

- GIVEN an authenticated `alumno`
- WHEN they query a profile with a different `id`
- THEN the database returns zero rows

#### Scenario: Profesor reads profiles and visits

- GIVEN an authenticated `profesor`
- WHEN they query `profiles` or `page_visits`
- THEN all rows are returned
