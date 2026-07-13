# teacher-dashboard Specification

## Purpose

Define the professor-only dashboard: filtered student list and visit analytics visualized with Recharts.

## Data Model

Derived from `profiles` and `page_visits`.

| View | Source | Aggregation |
|---|---|---|
| student_list | profiles | filtered by carrera/comision |
| visit_chart | page_visits | count by carrera/comision |

## UI Components

| Component | Responsibility |
|---|---|
| `TeacherDashboard` | Guard role, layout, and data fetching |
| `StudentFilter` | Controls for carrera and comision |
| `StudentTable` | Paginated list of students |
| `VisitsChart` | Recharts bar/line chart of visits |

## Requirements

### Requirement: Role-gated access

The system MUST allow only users with role `profesor` to access the teacher dashboard.

#### Scenario: Profesor opens dashboard

- GIVEN an authenticated `profesor`
- WHEN they navigate to `/dashboard`
- THEN the dashboard renders with student filters and analytics

#### Scenario: Alumno denied dashboard

- GIVEN an authenticated `alumno`
- WHEN they navigate to `/dashboard`
- THEN they are redirected to the exercises view

### Requirement: Filterable student list

The system MUST display students filtered by `carrera` and `comision`.

#### Scenario: Filter by comision

- GIVEN a `profesor` views the student list
- WHEN they select comision `1A`
- THEN only profiles with `comision = '1A'` are shown

#### Scenario: Combined filters

- GIVEN a `profesor` selects carrera `Ingeniería Electrónica` and comision `2B`
- WHEN filters are applied
- THEN only matching profiles are shown

### Requirement: Visit analytics chart

The system MUST render a Recharts chart showing visit counts grouped by `carrera` and `comision`.

#### Scenario: Chart aggregates visits

- GIVEN `page_visits` contains visits from multiple carreras/comisiones
- WHEN the dashboard loads
- THEN a chart displays visit counts per group
