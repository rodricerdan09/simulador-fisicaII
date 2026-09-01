import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { seedDatabase } from "./seed";

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "simulador.db");

let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (db) {
    return db;
  }

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const isNewDatabase = !fs.existsSync(DB_PATH);

  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  initializeSchema(db);

  if (isNewDatabase) {
    seedDatabase(db);
  }

  return db;
}

function initializeSchema(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS alumnos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      legajo TEXT,
      carrera TEXT,
      comision TEXT
    );

    CREATE TABLE IF NOT EXISTS visitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_path TEXT NOT NULL,
      alumno_id INTEGER,
      visited_at TEXT DEFAULT (datetime('now'))
    );
  `);
}

export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  legajo: string;
  carrera: string;
  comision: string;
}

export function getAlumnoByLegajo(legajo: string): Alumno | undefined {
  const db = getDatabase();
  return db
    .prepare("SELECT * FROM alumnos WHERE legajo = ?")
    .get(legajo) as Alumno | undefined;
}

export function insertAlumno(data: {
  nombre: string;
  apellido: string;
  legajo: string;
  carrera: string;
  comision: string;
}): Alumno {
  const db = getDatabase();
  const result = db
    .prepare(
      "INSERT INTO alumnos (nombre, apellido, legajo, carrera, comision) VALUES (?, ?, ?, ?, ?)"
    )
    .run(data.nombre, data.apellido, data.legajo, data.carrera, data.comision);

  const alumno = db
    .prepare("SELECT * FROM alumnos WHERE id = ?")
    .get(result.lastInsertRowid) as Alumno;

  return alumno;
}

export function getAllAlumnos(): Alumno[] {
  const db = getDatabase();
  return db.prepare("SELECT * FROM alumnos ORDER BY id DESC").all() as Alumno[];
}
