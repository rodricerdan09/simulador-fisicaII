import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { UserProvider, useUser } from "./useUser";

vi.mock("@/lib/features", () => ({
  isFeatureEnabled: vi.fn().mockReturnValue(false),
}));

function wrapper({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}

describe("useUser", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns guest user when no session is stored", async () => {
    const { result } = renderHook(() => useUser(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.isGuest).toBe(true);
    expect(result.current.user).not.toBeNull();
    expect(result.current.profile?.role).toBe("alumno");
    expect(result.current.profile?.nombre).toBe("Invitado");
  });

  it("returns mock user from local session", async () => {
    window.localStorage.setItem(
      "simulador-sesion",
      JSON.stringify({
        role: "alumno",
        nombre: "Juan",
        apellido: "Pérez",
        legajo: "12345",
        alumnoId: 1,
      })
    );

    const { result } = renderHook(() => useUser(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.isGuest).toBe(false);
    expect(result.current.profile?.nombre).toBe("Juan");
    expect(result.current.profile?.apellido).toBe("Pérez");
    expect(result.current.user?.email).toBe("alumno@local.com");
  });

  it("throws when used outside UserProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useUser())).toThrow(
      "useUser must be used within a UserProvider"
    );
    spy.mockRestore();
  });
});
