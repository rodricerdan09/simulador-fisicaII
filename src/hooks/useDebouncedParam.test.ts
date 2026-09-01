import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useDebouncedParam } from "./useDebouncedParam";

describe("useDebouncedParam", () => {
  it("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebouncedParam("initial", 100));
    expect(result.current).toBe("initial");
  });

  it("debounces value updates", async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedParam(value, 50),
      { initialProps: { value: "a" } }
    );

    rerender({ value: "ab" });
    expect(result.current).toBe("a");

    rerender({ value: "abc" });
    expect(result.current).toBe("a");

    await waitFor(() => expect(result.current).toBe("abc"), { timeout: 200 });
  });

  it("resets timer on rapid changes", async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedParam(value, 50),
      { initialProps: { value: "a" } }
    );

    rerender({ value: "ab" });
    await new Promise((resolve) => setTimeout(resolve, 30));
    rerender({ value: "abc" });

    expect(result.current).toBe("a");

    await waitFor(() => expect(result.current).toBe("abc"), { timeout: 200 });
  });
});
