import Database from "better-sqlite3";

export function seedDatabase(database: Database.Database) {
  const row = database
    .prepare("SELECT COUNT(*) AS total FROM alumnos")
    .get() as { total: number };

  if (row.total > 0) {
    return;
  }

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

  const insertStudent = database.prepare(
    "INSERT INTO alumnos (nombre, apellido, legajo, carrera, comision) VALUES (?, ?, ?, ?, ?)"
  );

  const insertVisit = database.prepare(
    "INSERT INTO visitas (page_path, alumno_id, visited_at) VALUES (?, ?, datetime('now', ?))"
  );

  // Visitas simuladas: [alumnoIndex (0-based), page_path, daysAgo]
  const seedVisits: Array<[number, string, string]> = [
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

  const seedTransaction = database.transaction(() => {
    const studentIds: number[] = [];

    for (const student of seedStudents) {
      const result = insertStudent.run(
        student.nombre,
        student.apellido,
        student.legajo,
        student.carrera,
        student.comision
      );
      studentIds.push(Number(result.lastInsertRowid));
    }

    for (const [studentIndex, pagePath, daysAgo] of seedVisits) {
      const alumnoId = studentIds[studentIndex];
      if (alumnoId === undefined) continue;
      insertVisit.run(pagePath, alumnoId, daysAgo);
    }
  });

  seedTransaction();
}
