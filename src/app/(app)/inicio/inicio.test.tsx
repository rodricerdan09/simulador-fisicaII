import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import InicioPage from "./page";

vi.mock("@/constants/exercises", () => ({
  EXERCISES: [
    { slug: "doble-rendija", title: "Doble Rendija", description: "Desc", icon: "waves" },
  ],
}));

describe("InicioPage", () => {
  it("renders welcome section and exercises", () => {
    render(<InicioPage />);
    expect(screen.getByText(/Bienvenidos al Simulador/)).toBeInTheDocument();
    expect(screen.getByText("Módulos Interactivos")).toBeInTheDocument();
    expect(screen.getByText("Doble Rendija")).toBeInTheDocument();
  });
});
