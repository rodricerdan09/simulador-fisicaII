import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrandChip } from "./BrandChip";

vi.mock("@/components/icons/UtnShield", () => ({
  UtnShield: () => <svg data-testid="utn-shield" />,
}));

describe("BrandChip", () => {
  it("renders brand text and shield", () => {
    render(<BrandChip />);
    expect(screen.getByText("Simulador Física II")).toBeInTheDocument();
    expect(screen.getByText("Interferencia")).toBeInTheDocument();
    expect(screen.getByTestId("utn-shield")).toBeInTheDocument();
  });
});
