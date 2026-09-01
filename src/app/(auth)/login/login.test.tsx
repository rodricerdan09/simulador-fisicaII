import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage from "./page";

vi.mock("@/components/auth/LoginForm", () => ({
  LoginForm: () => <div data-testid="login-form">LoginForm</div>,
}));

vi.mock("@/components/icons/UtnLogo", () => ({
  UtnLogo: () => <svg data-testid="utn-logo" />,
}));

describe("LoginPage", () => {
  it("renders the page without crashing", () => {
    render(<LoginPage />);
    expect(screen.getByText("Simulador de Física II")).toBeInTheDocument();
    expect(screen.getByText(/Ingresá con tu cuenta institucional/)).toBeInTheDocument();
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });
});
