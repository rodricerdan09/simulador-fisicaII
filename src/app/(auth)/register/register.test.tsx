import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RegisterPage from "./page";

vi.mock("@/components/auth/RegistrationForm", () => ({
  RegistrationForm: () => <div data-testid="registration-form">RegistrationForm</div>,
}));

vi.mock("@/components/icons/UtnLogo", () => ({
  UtnLogo: () => <svg data-testid="utn-logo" />,
}));

describe("RegisterPage", () => {
  it("renders the page without crashing", () => {
    render(<RegisterPage />);
    expect(screen.getByText("Crear cuenta")).toBeInTheDocument();
    expect(screen.getByText(/Completá tus datos académicos/)).toBeInTheDocument();
    expect(screen.getByTestId("registration-form")).toBeInTheDocument();
  });
});
