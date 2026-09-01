import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest, NextResponse } from "next/server";
import { middleware } from "./middleware";

vi.mock("@/config/features.json", () => ({
  default: {
    features: {
      auth: { login: false, register: false },
      supabase: { enabled: false },
      sqlite: { enabled: true },
      visitTracking: true,
    },
  },
}));

function createRequest(pathname: string) {
  return new NextRequest(new URL(`http://localhost:3000${pathname}`));
}

describe("middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects /login to /inicio when supabase is disabled", async () => {
    const response = await middleware(createRequest("/login"));
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/inicio");
  });

  it("redirects /register to /inicio when supabase is disabled", async () => {
    const response = await middleware(createRequest("/register"));
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/inicio");
  });

  it("allows other routes when supabase is disabled", async () => {
    const response = await middleware(createRequest("/inicio"));
    expect(response.status).toBe(200);
  });
});
