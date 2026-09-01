import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LaboratoriosPage from "./page";

describe("LaboratoriosPage", () => {
  it("renders the coming soon page", () => {
    render(<LaboratoriosPage />);
    expect(screen.getByText("Laboratorios")).toBeInTheDocument();
    expect(screen.getByText("Próximamente")).toBeInTheDocument();
  });
});
