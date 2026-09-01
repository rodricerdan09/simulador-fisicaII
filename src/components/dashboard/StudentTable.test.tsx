import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StudentTable } from "./StudentTable";
import { Profile } from "@/types";

const mockStudents: Profile[] = [
  {
    id: "1",
    role: "alumno",
    nombre: "Juan",
    apellido: "Pérez",
    legajo: "12345",
    carrera: "Ingeniería en Sistemas",
    comision: "1K1",
    created_at: "2026-01-01",
  },
  {
    id: "2",
    role: "alumno",
    nombre: "Ana",
    apellido: "García",
    legajo: "12346",
    carrera: "Ingeniería Química",
    comision: "1K2",
    created_at: "2026-01-02",
  },
];

describe("StudentTable", () => {
  it("renders empty state when no students", () => {
    render(<StudentTable students={[]} />);
    expect(screen.getByText("No se encontraron estudiantes.")).toBeInTheDocument();
  });

  it("renders student rows and visit counts", () => {
    const visitCounts = new Map([["1", 5]]);
    render(<StudentTable students={mockStudents} visitCounts={visitCounts} />);

    expect(screen.getByText("Pérez")).toBeInTheDocument();
    expect(screen.getByText("Juan")).toBeInTheDocument();
    expect(screen.getByText("García")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
