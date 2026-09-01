import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { EncuestaCard } from "./EncuestaCard";
import { getSesion } from "@/lib/role";

vi.mock("@/lib/role", () => ({
  getSesion: vi.fn(),
}));

describe("EncuestaCard", () => {
  beforeEach(() => {
    vi.mocked(getSesion).mockReset();
  });

  it("renderiza el título de la encuesta", () => {
    vi.mocked(getSesion).mockReturnValue(null);

    render(<EncuestaCard />);

    expect(
      screen.getByText("Encuesta de Satisfacción")
    ).toBeInTheDocument();
    expect(screen.getByText("Completar encuesta")).toBeInTheDocument();
  });

  it("usa el link base cuando no hay sesión", () => {
    vi.mocked(getSesion).mockReturnValue(null);

    render(<EncuestaCard />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", expect.stringContaining("docs.google.com/forms"));
  });

  it("pre-pobla el link con nombre y carrera del alumno", async () => {
    vi.mocked(getSesion).mockReturnValue({
      role: "alumno",
      nombre: "María",
      apellido: "González",
      carrera: "Ingeniería en Sistemas",
    });

    render(<EncuestaCard />);

    await waitFor(() => {
      const link = screen.getByRole("link");
      const href = link.getAttribute("href") ?? "";

      expect(href).toContain("entry.295797884");
      expect(href).toContain("entry.1103358039");
      // El nombre (María González) debe estar encodeado en el link
      expect(href).toContain("Mar%C3%ADa+Gonz%C3%A1lez");
      // La carrera (Ingeniería en Sistemas) debe estar encodeada en el link
      expect(href).toContain("Ingenier%C3%ADa+en+Sistemas");
    });
  });
});
