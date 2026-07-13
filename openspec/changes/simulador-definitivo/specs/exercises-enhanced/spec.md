# exercises-enhanced Specification

## Purpose

Define five interactive optics exercise modules with realistic physics visualizations, dual parameter controls, theory sections, and per-page visit tracking.

## Data Model

| Table | Relevance |
|---|---|
| `page_visits` | Stores each module view with `page_path`, `user_id`, `carrera`, `comision`, `visited_at` |

## UI Components

| Component | Responsibility |
|---|---|
| `ExerciseModule` | Container: visualization, controls, theory, results |
| `VisualizationCanvas` | Canvas/SVG renderer for the physical phenomenon |
| `ParameterControl` | Dual slider + numeric input with min/max labels |
| `TheoryPanel` | Collapsible KaTeX formulas, video embeds, step-by-step derivation |
| `ResultsPanel` | Real-time computed values with SI units / scientific notation |

## Requirements

### Requirement: Five optics exercise modules

The system MUST provide five interactive optics modules, each exposing a distinct physical phenomenon.

#### Scenario: Module navigation

- GIVEN an authenticated `alumno`
- WHEN they open the exercises view
- THEN five module cards/links are displayed

### Requirement: Realistic physical visualization

Each module MUST render a physics-based visualization using Canvas or SVG, not simplistic moving shapes.

#### Scenario: Double-slit interference

- GIVEN the double-slit module is open
- THEN two slits, propagating waves, a superposition pattern, and a screen fringe pattern are visible

#### Scenario: Thin-film interference

- GIVEN the thin-film module is open
- THEN film layers, reflected/refracted rays, and constructive/destructive path highlights are visible

### Requirement: Dual interactive parameter input

Each adjustable parameter MUST provide a synchronized slider and numeric input showing min, max, and current value.

#### Scenario: Wavelength adjustment

- GIVEN a module exposes wavelength
- WHEN the user drags the slider
- THEN the numeric input updates AND the visualization re-renders in real time

### Requirement: Step-by-step mathematical development

Each module MUST display a collapsible theory section with KaTeX-rendered formulas showing the full derivation.

#### Scenario: Theory expansion

- GIVEN the theory section is collapsed
- WHEN the user expands it
- THEN LaTeX formulas and step-by-step derivation render correctly

### Requirement: Real-time results with units

Each module MUST display computed results in real time using correct SI units and scientific notation where appropriate.

#### Scenario: Result update

- GIVEN a parameter changes
- WHEN the simulation recalculates
- THEN the results panel shows updated values with units (e.g., nm, m, rad)

### Requirement: Pedagogical context

Each module MUST include real-world context and applications explaining why the phenomenon matters.

#### Scenario: Context visible

- GIVEN a module page is loaded
- THEN a pedagogical context block is present below the visualization or theory

### Requirement: Visit counter

Each module page MUST record a visit in `page_visits` when accessed.

#### Scenario: Visit recorded

- GIVEN an authenticated `alumno` opens a module
- THEN a row is inserted into `page_visits` with the module path and the user's academic metadata
