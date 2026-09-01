import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ComparacionEspectros, computeComparacionEspectros } from ".";

describe("ComparacionEspectros", () => {
  it("computeComparacionEspectros returns expected fringe separation", () => {
    const results = computeComparacionEspectros(430, 510, 0.025, 1.5, 3, 3);

    // Δy = |m2*λ2*L/d - m1*λ1*L/d| = 14.4 mm
    expect(results[results.length - 1].value).toBeCloseTo(14.4, 1);
  });

  it("renders the visualization component", () => {
    render(
      <ComparacionEspectros
        lambda1Nm={430}
        lambda2Nm={510}
        slitDistanceMm={0.025}
        screenDistanceM={1.5}
        orderM1={3}
        orderM2={3}
      />
    );

    expect(
      screen.getByText("Visualización: comparación de dos longitudes de onda")
    ).toBeInTheDocument();
  });
});
