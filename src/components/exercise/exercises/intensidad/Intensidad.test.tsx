import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { Intensidad, computeIntensidad } from ".";

describe("Intensidad", () => {
  beforeAll(() => {
    // Recharts ResponsiveContainer relies on ResizeObserver in test environments.
    class ResizeObserverMock {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    vi.stubGlobal("ResizeObserver", ResizeObserverMock);
  });

  it("computeIntensidad returns expected fringe spacing", () => {
    // The slitDistanceMm parameter is interpreted in millimeters.
    // d = 1.0 mm = 1e-3 m gives Δy = λL/d = 580e-9 * 1.0 / 1e-3 = 0.58 mm.
    const results = computeIntensidad(580, 1.0, 1.0, 1.0);

    expect(results[1].value).toBeCloseTo(0.58, 2);
  });

  it("renders the visualization component", () => {
    render(
      <Intensidad
        lambdaNm={580}
        slitDistanceMm={1.0}
        screenDistanceM={1.0}
        intensityI0={1.0}
      />
    );

    expect(
      screen.getByText("Visualización: distribución de intensidad")
    ).toBeInTheDocument();
  });
});
