# layout-unified Specification

## Purpose

Define the responsive application shell: persistent desktop sidebar, mobile drawer, semantic navigation, and consistent brand color identity.

## Color Identity

| Token | Value |
|---|---|
| Background | `slate-950` |
| Surface | `slate-900/50` with `backdrop-blur-md` |
| Border | `slate-800` |
| Primary | `cyan-400/500/600` |
| Text primary | `slate-50` |
| Text secondary | `slate-400` |
| Text muted | `slate-500` |

## UI Components

| Component | Responsibility |
|---|---|
| `AppShell` | Root layout providing background, viewport container, and responsive slots |
| `DesktopSidebar` | Persistent vertical navigation for viewports ≥ md |
| `MobileDrawer` | Slide-over navigation for viewports < md |
| `NavItem` | Link with active/inactive states and icons |

## Requirements

### Requirement: Responsive navigation layout

The system MUST render a desktop sidebar on large viewports and a hidden drawer on small viewports triggered by a hamburger button.

#### Scenario: Desktop viewport

- GIVEN a viewport width ≥ 768 px
- WHEN the app loads
- THEN the `DesktopSidebar` is visible and the hamburger button is absent

#### Scenario: Mobile viewport opens drawer

- GIVEN a viewport width < 768 px
- WHEN the user taps the hamburger button
- THEN the `MobileDrawer` opens and overlays the content

### Requirement: Semantic navigation

The system MUST provide navigation items that route to exercises, theory, and teacher dashboard (profesor only).

#### Scenario: Navigation links active state

- GIVEN the user is on the exercises page
- THEN the exercises `NavItem` renders the active primary color and distinct background

### Requirement: Simulator-safe mobile layout

The system MUST keep simulation canvases usable after opening and closing the mobile drawer.

#### Scenario: Drawer closes on mobile simulator

- GIVEN a user opens the drawer on a simulator page
- WHEN they select a navigation item or dismiss the drawer
- THEN the drawer closes AND the underlying canvas remains interactive and correctly sized
