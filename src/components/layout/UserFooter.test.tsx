import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { UserFooter } from "./UserFooter";
import { UserProvider } from "@/hooks/useUser";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
}));

vi.mock("@/lib/features", () => ({
  isFeatureEnabled: vi.fn().mockReturnValue(false),
}));

function wrapper({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}

describe("UserFooter", () => {
  it("renders guest user info", async () => {
    render(<UserFooter />, { wrapper });
    expect(await screen.findByText("Invitado")).toBeInTheDocument();
    expect(screen.getByText("Alumno")).toBeInTheDocument();
  });
});
