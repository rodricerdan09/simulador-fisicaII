import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PeliculaDelgada, computePeliculaDelgada } from ".";

describe("PeliculaDelgada", () => {
  it("computePeliculaDelgada returns expected minimum thickness", () => {
    const results = computePeliculaDelgada(1.33, 600, 0);

    // t = (m + 0.5) * λ / (2n) = 0.5 * 600e-9 / (2 * 1.33) ≈ 112.8 nm
    expect(results[results.length - 1].value).toBeCloseTo(112.8, 1);
  });

  it("renders the visualization component", () => {
    render(
      <PeliculaDelgada refractiveIndex={1.33} lambdaNm={600} orderM={0} />
    );

    expect(
      screen.getByText("Visualización: película delgada")
    ).toBeInTheDocument();
  });
});
