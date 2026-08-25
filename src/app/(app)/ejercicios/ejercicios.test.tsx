import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import EjerciciosPage from "./page";

vi.mock("@/constants/exercises", () => ({
  EXERCISES: [
    { slug: "espectros", title: "Comparación de Espectros", description: "Desc", icon: "sun" },
  ],
}));

describe("EjerciciosPage", () => {
  it("renders the exercises list", () => {
    render(<EjerciciosPage />);
    expect(screen.getByText("Módulos Interactivos")).toBeInTheDocument();
    expect(screen.getByText("Comparación de Espectros")).toBeInTheDocument();
  });
});
