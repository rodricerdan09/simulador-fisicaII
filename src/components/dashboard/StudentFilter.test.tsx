import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { StudentFilter } from "./StudentFilter";

describe("StudentFilter", () => {
  it("renders filter selects", () => {
    render(
      <StudentFilter
        carrera="all"
        comision="all"
        onCarreraChange={vi.fn()}
        onComisionChange={vi.fn()}
      />
    );
    expect(screen.getByLabelText(/Carrera/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Comisión/i)).toBeInTheDocument();
  });
});
