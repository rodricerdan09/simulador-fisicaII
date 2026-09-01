import { createClient } from "@libsql/client";

// Script de seed para la base Turso (libSQL).
// Uso: node --env-file=.env.local scripts/seed.mjs
// Crea el esquema (idempotente) e inserta los datos demo una sola vez.

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error(
    "TURSO_DATABASE_URL no está configurada. Ejecutá: node --env-file=.env.local scripts/seed.mjs"
  );
  process.exit(1);
}

const client = createClient({ url, authToken });

// 1. Esquema (idempotente)
await client.batch(
  [
    `CREATE TABLE IF NOT EXISTS alumnos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      legajo TEXT,
      carrera TEXT,
      comision TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS visitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_path TEXT NOT NULL,
      alumno_id INTEGER,
      visited_at TEXT DEFAULT (datetime('now'))
    )`,
  ],
  "write"
);

// 2. Verificar si ya hay datos
const countResult = await client.execute(
  "SELECT COUNT(*) AS total FROM alumnos"
);
const total = Number(countResult.rows[0].total);
if (total > 0) {
  console.log(`La base ya tiene ${total} alumnos. No se vuelve a sembrar.`);
  process.exit(0);
}

// 3. Datos demo
const seedStudents = [
  {
    nombre: "María",
    apellido: "González",
    legajo: "S-1001",
    carrera: "Ingeniería en Sistemas",
    comision: "1K1",
  },
  {
    nombre: "Lucas",
    apellido: "Fernández",
    legajo: "Q-1002",
    carrera: "Ingeniería Química",
    comision: "1K2",
  },
  {
    nombre: "Sofía",
    apellido: "Rodríguez",
    legajo: "E-1003",
    carrera: "Ingeniería Electromecánica",
    comision: "2K1",
  },
  {
    nombre: "Mateo",
    apellido: "Martínez",
    legajo: "S-1004",
    carrera: "Ingeniería en Sistemas",
    comision: "1K2",
  },
];

// [alumnoIndex (0-based), page_path, daysAgo]
const seedVisits = [
  // María (Sistemas 1K1) — 8 visitas
  [0, "/ejercicios/doble-rendija", "-5 days"],
  [0, "/ejercicios/doble-rendija", "-4 days"],
  [0, "/ejercicios/espectro", "-4 days"],
  [0, "/ejercicios/intensidad", "-3 days"],
  [0, "/teoria", "-3 days"],
  [0, "/ejercicios/minimos", "-2 days"],
  [0, "/ejercicios/pelicula-delgada", "-1 days"],
  [0, "/ejercicios/intensidad", "-1 days"],
  // Lucas (Química 1K2) — 5 visitas
  [1, "/ejercicios/doble-rendija", "-6 days"],
  [1, "/ejercicios/minimos", "-5 days"],
  [1, "/ejercicios/minimos", "-4 days"],
  [1, "/teoria", "-2 days"],
  [1, "/ejercicios/intensidad", "-1 days"],
  // Sofía (Electromecánica 2K1) — 6 visitas
  [2, "/ejercicios/doble-rendija", "-7 days"],
  [2, "/ejercicios/doble-rendija", "-6 days"],
  [2, "/ejercicios/pelicula-delgada", "-5 days"],
  [2, "/ejercicios/pelicula-delgada", "-3 days"],
  [2, "/teoria", "-2 days"],
  [2, "/ejercicios/espectro", "-1 days"],
  // Mateo (Sistemas 1K2) — 3 visitas
  [3, "/ejercicios/doble-rendija", "-3 days"],
  [3, "/teoria", "-2 days"],
  [3, "/ejercicios/intensidad", "-1 days"],
];

// 4. Insertar en una transacción
const tx = await client.transaction("write");
try {
  const studentIds = [];
  for (const s of seedStudents) {
    const r = await tx.execute({
      sql: "INSERT INTO alumnos (nombre, apellido, legajo, carrera, comision) VALUES (?, ?, ?, ?, ?)",
      args: [s.nombre, s.apellido, s.legajo, s.carrera, s.comision],
    });
    studentIds.push(Number(r.lastInsertRowid));
  }

  for (const [studentIndex, pagePath, daysAgo] of seedVisits) {
    const alumnoId = studentIds[studentIndex];
    if (alumnoId === undefined) continue;
    await tx.execute({
      sql: "INSERT INTO visitas (page_path, alumno_id, visited_at) VALUES (?, ?, datetime('now', ?))",
      args: [pagePath, alumnoId, daysAgo],
    });
  }

  await tx.commit();
  console.log(
    `Seed completado: ${seedStudents.length} alumnos y ${seedVisits.length} visitas.`
  );
} catch (err) {
  await tx.rollback();
  console.error("Error durante el seed:", err);
  process.exit(1);
}
