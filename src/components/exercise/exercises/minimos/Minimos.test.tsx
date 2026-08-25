import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Minimos, computeMinimos } from ".";

describe("Minimos", () => {
  it("computeMinimos returns expected wavelength", () => {
    const results = computeMinimos(2.0, 0.5, 0.6);

    // λ = Δy * d / L = 0.6e-3 * 2.0e-3 / 0.5 = 2.4e-6 m = 2400 nm
    expect(results[results.length - 1].value).toBeCloseTo(2400, 0);
  });

  it("renders the visualization component", () => {
    render(
      <Minimos
        slitDistanceMm={2.0}
        screenDistanceM={0.5}
        fringeSpacingMm={0.6}
      />
    );

    expect(
      screen.getByText("Visualización: mínimos de interferencia")
    ).toBeInTheDocument();
  });
});
