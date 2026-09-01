import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useVisit } from "./useVisit";

function mockSession(session: object | null) {
  if (session) {
    window.localStorage.setItem("simulador-sesion", JSON.stringify(session));
  } else {
    window.localStorage.removeItem("simulador-sesion");
  }
}

describe("useVisit", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("does not register visit for guests", async () => {
    mockSession(null);
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({}),
    } as unknown as Response);

    renderHook(() => useVisit("/inicio"));

    await waitFor(() => expect(fetchSpy).not.toHaveBeenCalled());
  });

  it("does not register visit for teachers", async () => {
    mockSession({ role: "profesor", alumnoId: 1 });
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({}),
    } as unknown as Response);

    renderHook(() => useVisit("/inicio"));

    await waitFor(() => expect(fetchSpy).not.toHaveBeenCalled());
  });

  it("registers visit for logged-in students", async () => {
    mockSession({ role: "alumno", alumnoId: 42 });
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({}),
    } as unknown as Response);

    renderHook(() => useVisit("/inicio"));

    await waitFor(() =>
      expect(fetchSpy).toHaveBeenCalledWith("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page_path: "/inicio", alumnoId: 42 }),
      })
    );

    expect(window.localStorage.getItem("visit:/inicio")).toBeTruthy();
  });

  it("debounces visits within 24 hours", async () => {
    mockSession({ role: "alumno", alumnoId: 42 });
    window.localStorage.setItem("visit:/inicio", String(Date.now()));

    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({}),
    } as unknown as Response);

    renderHook(() => useVisit("/inicio"));

    await waitFor(() => expect(fetchSpy).not.toHaveBeenCalled());
  });
});
