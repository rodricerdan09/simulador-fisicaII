import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TheoryPage from "./page";

vi.mock("@/components/exercise/TheoryPanel", () => ({
  TheoryPanel: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div data-testid="theory-panel">
      <h2>{title}</h2>
      {children}
    </div>
  ),
}));

vi.mock("@/lib/katex/render", () => ({
  Formula: ({ math }: { math: string }) => <span data-testid="formula">{math}</span>,
}));

vi.mock("@/components/teoria/ScrollToHash", () => ({
  ScrollToHash: () => null,
}));

describe("TheoryPage", () => {
  it("renders theory sections", () => {
    render(<TheoryPage />);
    expect(screen.getByText("Teoría")).toBeInTheDocument();
    expect(screen.getByText(/Repaso completo de los conceptos/)).toBeInTheDocument();
  });
});
