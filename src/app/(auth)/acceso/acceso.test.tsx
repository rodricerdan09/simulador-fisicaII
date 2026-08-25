import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AccesoPage from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
}));

vi.mock("@/lib/role", () => ({
  setSesion: vi.fn(),
  getSesion: vi.fn().mockReturnValue(null),
  clearSesion: vi.fn(),
  subscribeToRoleChange: vi.fn().mockReturnValue(() => {}),
  getStoredRole: vi.fn().mockReturnValue("alumno"),
  setStoredRole: vi.fn(),
}));

describe("AccesoPage", () => {
  it("renders the page without crashing", () => {
    render(<AccesoPage />);
    expect(screen.getByText("Acceso al simulador")).toBeInTheDocument();
    const buttons = screen.getAllByRole("button");
    expect(buttons.some((b) => b.textContent === "Ingresar")).toBe(true);
    expect(buttons.some((b) => b.textContent === "Registrarse")).toBe(true);
  });
});
