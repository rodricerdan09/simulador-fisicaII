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

  const insert = database.prepare(
    "INSERT INTO alumnos (nombre, apellido, legajo, carrera, comision) VALUES (?, ?, ?, ?, ?)"
  );

  const seedTransaction = database.transaction(() => {
    for (const student of seedStudents) {
      insert.run(
        student.nombre,
        student.apellido,
        student.legajo,
        student.carrera,
        student.comision
      );
    }
  });

  seedTransaction();
}
