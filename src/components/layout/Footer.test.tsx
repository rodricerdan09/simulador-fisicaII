import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

vi.mock("@/components/icons/UtnLogo", () => ({
  UtnLogo: () => <svg data-testid="utn-logo" />,
}));

describe("Footer", () => {
  it("renders footer content", () => {
    render(<Footer />);
    expect(screen.getByText(/Física II - Unidad 12 - Interferencia/i)).toBeInTheDocument();
    expect(screen.getByText(/CERDAN, Rodrigo Daniel/i)).toBeInTheDocument();
    expect(screen.getByText(/UTN FRRE - 2026/i)).toBeInTheDocument();
    expect(screen.getByTestId("utn-logo")).toBeInTheDocument();
  });
});
