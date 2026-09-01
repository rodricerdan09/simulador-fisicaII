import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DobleRendija, computeDobleRendija } from ".";

describe("DobleRendija", () => {
  it("computeDobleRendija returns expected wavelength and fringe spacing", () => {
    const results = computeDobleRendija(1.2, 0.03, 2, 4.5);

    // λ = y_m * d / (m * L) = 0.045 * 3e-5 / (2 * 1.2) = 5.625e-7 m = 562.5 nm
    expect(results[1].value).toBeCloseTo(562.5, 1);
    // Δy = λ * L / d = 5.625e-7 * 1.2 / 3e-5 = 2.25e-2 m = 22.5 mm
    expect(results[3].value).toBeCloseTo(22.5, 1);
  });

  it("renders the visualization component", () => {
    render(
      <DobleRendija
        lambdaNm={562.5}
        slitDistanceMm={0.03}
        screenDistanceM={1.2}
        orderM={2}
        fringePositionCm={4.5}
      />
    );

    expect(
      screen.getByText("Visualización: patrón de interferencia")
    ).toBeInTheDocument();
  });
});
