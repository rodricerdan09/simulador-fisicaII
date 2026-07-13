# Proposal: Simulador Físico Universitario (simulador-definitivo)

## Intent

Consolidar cuatro prototipos de exploración en un único simulador definitivo de Física II (Óptica). Este cambio unifica los mejores patrones de UI/UX (glassmorphism, sidebar semántico, menú mobile) con un motor de ejercicios interactivo. Además, introduce una capa de gestión académica requerida (roles de Profesor/Alumno, registro de legajo/carrera/comisión) y un dashboard analítico para docentes, elevando la calidad de las representaciones visuales de los fenómenos físicos.

## Scope

### In Scope
- **Autenticación Académica**: Registro e inicio de sesión integrando campos específicos (Nombre, Apellido, Legajo, Carrera, Comisión) y roles (Alumno, Profesor).
- **Shell de Aplicación Unificado**: Sidebar de escritorio (Kimi/Mimo), Drawer mobile (Mimo), cabeceras y estilos visuales basados en Tailwind/glassmorphism (slate-950/cyan-400).
- **Dashboard Docente**: Vista exclusiva para profesores con listado de alumnos (filtrable por carrera/comisión) y métricas de uso/visitas del simulador.
- **Motor de Ejercicios**: Integración de 5 ejercicios interactivos (Minimax) con un upgrade significativo en las visualizaciones físicas (patrones de interferencia, franjas, etc.) utilizando SVG/Canvas o gráficos avanzados, superando los círculos básicos.

### Out of Scope
- Gestión de calificaciones o tareas (no es un LMS completo, es un simulador complementario).
- Ejercicios de otras ramas de la física fuera de los 5 módulos definidos de Óptica/Física II.

## Capabilities

> This section is the CONTRACT between proposal and specs phases.
> The sdd-spec agent reads this to know exactly which spec files to create or update.

### New Capabilities
- `user-auth-academic`: Registro de usuarios con Supabase Auth, perfiles extendidos (legajo, carrera, comisión) y control de acceso basado en roles (RBAC).
- `layout-unified`: Shell responsivo combinando Sidebar desktop y Drawer mobile, con diseño brand-cyan y navegación semántica.
- `teacher-dashboard`: Panel de métricas Recharts y tabla de alumnos con filtros académicos.
- `exercises-enhanced`: Motor de simulación para 5 módulos de óptica con representaciones físicas avanzadas y controles duales (slider/input).

### Modified Capabilities
- None

## Approach

1. **Infraestructura y BD**: Configurar Supabase Auth y crear esquema `profiles` (id, role, nombre, apellido, legajo, carrera, comision) con Row Level Security (RLS) estricto.
2. **Shell UI**: Implementar el Layout base fusionando la estructura de Deepseek con los estilos de Kimi y Mimo.
3. **Flujo de Acceso**: Desarrollar Auth (login/register) con validación de campos académicos y redirección condicional según rol.
4. **Vistas de Rol**: 
   - *Profesor*: Construir dashboard con listado y analíticas.
   - *Alumno*: Construir los 5 módulos de ejercicios, reemplazando las animaciones básicas por renders físicamente representativos (Canvas/SVG).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `/` | New | Proyecto base desde cero unificando prototipos. |
| `Supabase` | New | Tablas de perfiles, triggers de auth y políticas RLS. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| **Complejidad Visual Física** (Renderizar patrones de interferencia reales en React es costoso y complejo) | High | Usar API de Canvas para simulaciones de alta fidelidad o funciones generadoras de gradientes SVG paramétricos, iterando con el usuario para validar la calidad. |
| **Fugas de datos por RLS** (Alumnos viendo datos de otros alumnos) | Medium | Diseñar políticas RLS de Supabase donde `role = 'profesor'` permite lectura global, pero `role = 'alumno'` solo permite lectura de su propio `auth.uid()`. |

## Rollback Plan

Al ser un proyecto desde cero ("empty project"), el rollback implica volver al commit inicial de Next.js, eliminar las migraciones de base de datos de Supabase y destruir la carpeta de componentes UI generados.

## Dependencies

- **Supabase**: Auth, PostgreSQL, RLS.
- **shadcn/ui & Tailwind CSS**: Para los componentes base y el glassmorphism.
- **Recharts**: Para analíticas del profesor y gráficos del simulador (Ejercicio 5).
- **KaTeX/MathJax** (potencial): Para renderizar fórmulas matemáticas en la sección de teoría.

## Success Criteria

- [ ] Un usuario puede registrarse especificando su Legajo, Carrera y Comisión.
- [ ] Un Profesor puede acceder al dashboard y ver cuántos alumnos de la "Comisión X" utilizaron el simulador.
- [ ] La UI en móviles utiliza el menú hamburguesa correctamente sin romper la experiencia del simulador.
- [ ] Las simulaciones ópticas muestran visualizaciones realistas (ej. franjas de interferencia) y no abstracciones simplistas.