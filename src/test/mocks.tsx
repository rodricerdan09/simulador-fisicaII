import { vi } from "vitest";
import { ReactNode } from "react";
import { UserContextValue, UserProvider } from "@/hooks/useUser";

export const mockUser = (
  overrides: Partial<UserContextValue> = {}
): UserContextValue => ({
  user: null,
  profile: null,
  loading: false,
  error: null,
  isGuest: true,
  ...overrides,
});

export function createMockUserProvider(value: UserContextValue) {
  return function MockUserProvider({ children }: { children: ReactNode }) {
    return <UserProvider>{children}</UserProvider>;
  };
}

export function mockFetch(response: unknown, ok = true, status = 200) {
  global.fetch = vi.fn().mockResolvedValue({
    ok,
    status,
    json: vi.fn().mockResolvedValue(response),
    text: vi.fn().mockResolvedValue(JSON.stringify(response)),
  });
}
