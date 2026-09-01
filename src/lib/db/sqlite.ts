import { createClient, type Client } from "@libsql/client";

// Conexión a Turso (libSQL). Reemplaza la conexión local de better-sqlite3
// para que la base persista en Vercel (serverless, sin filesystem persistente).
let client: Client | null = null;

function getClient(): Client {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url) {
      throw new Error("TURSO_DATABASE_URL no está configurada");
    }

    client = createClient({ url, authToken });
  }

  return client;
}

let schemaPromise: Promise<void> | null = null;

// Crea el esquema de forma idempotente. Se memoiza para no repetir el DDL
// en cada invocación de la misma instancia serverless.
function ensureSchema(): Promise<void> {
  if (!schemaPromise) {
    schemaPromise = getClient()
      .batch(
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
      )
      .then(() => undefined)
      .catch((err) => {
        // Permitir reintento en la próxima llamada si falló (p. ej. red).
        schemaPromise = null;
        throw err;
      });
  }

  return schemaPromise;
}

export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  legajo: string;
  carrera: string;
  comision: string;
}

export interface VisitRow {
  id: number;
  page_path: string;
  user_id: number | null;
  visited_at: string;
  carrera: string | null;
  comision: string | null;
}

export async function getAlumnoByLegajo(
  legajo: string
): Promise<Alumno | undefined> {
  await ensureSchema();
  const result = await getClient().execute({
    sql: "SELECT * FROM alumnos WHERE legajo = ?",
    args: [legajo],
  });
  return result.rows[0] as unknown as Alumno | undefined;
}

export async function insertAlumno(data: {
  nombre: string;
  apellido: string;
  legajo: string;
  carrera: string;
  comision: string;
}): Promise<Alumno> {
  await ensureSchema();
  const result = await getClient().execute({
    sql: "INSERT INTO alumnos (nombre, apellido, legajo, carrera, comision) VALUES (?, ?, ?, ?, ?)",
    args: [data.nombre, data.apellido, data.legajo, data.carrera, data.comision],
  });

  const id = Number(result.lastInsertRowid);
  const selected = await getClient().execute({
    sql: "SELECT * FROM alumnos WHERE id = ?",
    args: [id],
  });
  return selected.rows[0] as unknown as Alumno;
}

export async function getAllAlumnos(): Promise<Alumno[]> {
  await ensureSchema();
  const result = await getClient().execute(
    "SELECT * FROM alumnos ORDER BY id DESC"
  );
  return result.rows as unknown as Alumno[];
}

export async function getStudents(): Promise<Alumno[]> {
  await ensureSchema();
  const result = await getClient().execute(
    "SELECT id, nombre, apellido, legajo, carrera, comision FROM alumnos ORDER BY apellido, nombre"
  );
  return result.rows as unknown as Alumno[];
}

export async function recordVisit(
  pagePath: string,
  alumnoId: number | null
): Promise<void> {
  await ensureSchema();
  await getClient().execute({
    sql: "INSERT INTO visitas (page_path, alumno_id) VALUES (?, ?)",
    args: [pagePath, alumnoId],
  });
}

export async function getVisitsWithAlumno(): Promise<VisitRow[]> {
  await ensureSchema();
  const result = await getClient().execute(
    `SELECT
      v.id,
      v.page_path,
      v.alumno_id AS user_id,
      v.visited_at,
      a.carrera,
      a.comision
    FROM visitas v
    LEFT JOIN alumnos a ON v.alumno_id = a.id
    ORDER BY v.visited_at DESC`
  );
  return result.rows as unknown as VisitRow[];
}
