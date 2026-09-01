import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardPage from "./page";

vi.mock("@/components/dashboard/TeacherDashboard", () => ({
  TeacherDashboard: () => <div data-testid="teacher-dashboard">TeacherDashboard</div>,
}));

describe("DashboardPage", () => {
  it("renders the teacher dashboard", () => {
    render(<DashboardPage />);
    expect(screen.getByTestId("teacher-dashboard")).toBeInTheDocument();
  });
});
